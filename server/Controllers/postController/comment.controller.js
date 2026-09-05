
import prisma from "../../Database/prisma.js";

import {
  createCommentSchema,
  updateCommentSchema,
} from "../../Validators/comment.schema.js";


export const createComment = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;

    // Validate comment
    const validation = createCommentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Check whether post exists
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

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content: validation.data.content,
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
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};


export const getComments = async (req, res, next) => {
  try {
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

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },

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
    });

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};


export const updateComment = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Validate comment
    const validation = updateCommentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Find comment
    const existingComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Ownership check
    if (existingComment.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own comment",
      });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },

      data: {
        content: validation.data.content,
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
    });

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};



export const deleteComment = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const existingComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own comment",
      });
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};