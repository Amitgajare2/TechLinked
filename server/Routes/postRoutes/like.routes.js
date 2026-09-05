import express from "express";

import {
  likePost,
  unlikePost,
  getPostLikes,
} from "../../Controllers/postController/like.controller.js";

import { authenticate } from "../../Middleware/Auth/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Post like management APIs
 */

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
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
 *       201:
 *         description: Post liked successfully
 *       404:
 *         description: Post not found
 *       409:
 *         description: User already liked this post
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/posts/:postId/like",
  authenticate,
  likePost
);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   delete:
 *     summary: Unlike a post
 *     tags: [Likes]
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
 *         description: Post unliked successfully
 *       404:
 *         description: Like not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/posts/:postId/like",
  authenticate,
  unlikePost
);

/**
 * @swagger
 * /api/posts/{postId}/likes:
 *   get:
 *     summary: Get likes for a post
 *     tags: [Likes]
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
 *         description: Likes retrieved successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/posts/:postId/likes",
  authenticate,
  getPostLikes
);

export default router;