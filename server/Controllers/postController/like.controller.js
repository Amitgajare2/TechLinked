import prisma from "../../Database/prisma.js";

export const toggleLike = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check existing like
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    let isLiked;

    if (existingLike) {
      // Already liked → unlike
      await prisma.postLike.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      isLiked = false;
    } else {

      await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });

      isLiked = true;
    }

    const likeCount = await prisma.postLike.count({
      where: {
        postId,
      },
    });

    return res.status(200).json({
      success: true,
      message: isLiked
        ? "Post liked successfully"
        : "Post unliked successfully",

      data: {
        postId,
        likeCount,
        isLiked,
      },
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
