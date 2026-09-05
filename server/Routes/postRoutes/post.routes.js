import express from "express";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../../Controllers/postController/post.controller.js";

import { authenticate } from "../../Middleware/Auth/auth.middleware.js";
import { uploadPostImage } from "../../Middleware/upload.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management APIs
 */

/**
 * @swagger
 * /api/posts:

 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Post image
 *               caption:
 *                 type: string
 *                 maxLength: 500
 *                 example: My new TechLink project 🚀
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid post data or image missing
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  uploadPostImage.single("image"),
  createPost
);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  authenticate,
  getPosts
);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  authenticate,
  getPostById
);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post caption
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               caption:
 *                 type: string
 *                 maxLength: 500
 *                 example: Updated TechLink project caption
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       403:
 *         description: User is not the owner of the post
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/:id",
  authenticate,
  updatePost
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: User is not the owner of the post
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authenticate,
  deletePost
);

export default router;