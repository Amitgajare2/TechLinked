import prisma from "../../Database/prisma.js";

export const likePost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user already liked the post
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      return res.status(409).json({
        success: false,
        message: "You already liked this post",
      });
    }

    const like = await prisma.postLike.create({
      data: {
        postId,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Post liked successfully",
      data: {
        id: like.id,
        postId: like.postId,
        userId: like.userId,
        createdAt: like.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const unlikePost = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (!existingLike) {
      return res.status(404).json({
        success: false,
        message: "You have not liked this post",
      });
    }

    await prisma.postLike.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post unliked successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getPostLikes = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const likes = await prisma.postLike.findMany({
      where: { postId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
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
      data: {
        count: likes.length,
        likes,
      },
    });
  } catch (error) {
    next(error);
  }
};
