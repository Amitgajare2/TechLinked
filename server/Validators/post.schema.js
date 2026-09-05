import { z } from "zod";

export const createPostSchema = z.object({
  caption: z
    .string()
    .max(500, "Caption cannot exceed 500 characters")
    .optional(),
});

export const updatePostSchema = z.object({
  caption: z
    .string()
    .max(500, "Caption cannot exceed 500 characters")
    .optional(),
});
