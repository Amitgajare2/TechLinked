import express from "express";

import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../Controllers/postController/comment.controller.js";

import { authenticate } from "../../Middleware/Auth/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management APIs
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 maxLength: 500
 *                 example: This is a great project!
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid comment data
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/posts/:postId/comments",
  authenticate,
  createComment
);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/posts/:postId/comments",
  authenticate,
  getComments
);

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 maxLength: 500
 *                 example: Updated comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       403:
 *         description: User is not the owner of the comment
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/comments/:id",
  authenticate,
  updateComment
);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: User is not the owner of the comment
 *       404:
 *         description: Comment not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/comments/:id",
  authenticate,
  deleteComment
);

export default router;