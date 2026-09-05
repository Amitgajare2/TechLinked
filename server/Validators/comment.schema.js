import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters"),
});

export const updateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters"),
});
