import fs from "fs/promises";
import path from "path";

import prisma from "../../Database/prisma.js";

import {
  createPostSchema,
  updatePostSchema,
} from "../../Validators/post.schema.js";


export const createPost = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Post image is required",
      });
    }

    const validation = createPostSchema.safeParse(req.body);

    if (!validation.success) {
      await fs.unlink(req.file.path).catch(() => {});

      return res.status(400).json({
        success: false,
        message: "Invalid post data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { caption } = validation.data;

    const imageUrl = `/uploads/posts/${req.file.filename}`;

    const post = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        caption: caption || null,
      },
      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};


export const getPosts = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    // Find which posts the current user has liked
    let likedPostIds = new Set();

    if (userId && posts.length > 0) {
      const postIds = posts.map((post) => post.id);

      const userLikes = await prisma.postLike.findMany({
        where: {
          userId,
          postId: {
            in: postIds,
          },
        },

        select: {
          postId: true,
        },
      });

      likedPostIds = new Set(
        userLikes.map((like) => like.postId)
      );
    }

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,

      user: post.user,

      likeCount: post._count.likes,
      commentCount: post._count.comments,

      isLiked: userId
        ? likedPostIds.has(post.id)
        : false,
    }));

    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: formattedPosts,
    });
  } catch (error) {
    next(error);
  }
};


export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },

        comments: {
          orderBy: {
            createdAt: "asc",
          },

          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,

            user: {
              select: {
                id: true,
                FirstName: true,
                LastName: true,
                profilePhoto: true,
              },
            },
          },
        },

        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const validation = updatePostSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid post data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (existingPost.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own post",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id,
      },

      data: {
        caption: validation.data.caption,
      },

      select: {
        id: true,
        imageUrl: true,
        caption: true,
        createdAt: true,
        updatedAt: true,

        user: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};



export const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Find post
    const existingPost = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership check
    if (existingPost.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own post",
      });
    }


    await prisma.post.delete({
      where: {
        id,
      },
    });

    const imagePath = path.join(
      process.cwd(),
      existingPost.imageUrl.replace(/^\/+/, "")
    );

    await fs.unlink(imagePath).catch(() => {});

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};