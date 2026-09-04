import { z } from "zod";

export const updateProfileSchema = z.object({
  FirstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .optional(),

  LastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .optional(),

  dateOfBirth: z
  .string()
  .date()
  .optional(),

  gender: z
    .string()
    .max(20, "Gender is too long")
    .optional(),

  location: z
    .string()
    .max(100, "Location is too long")
    .optional(),

  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),

  education: z
    .string()
    .max(200, "Education is too long")
    .optional(),

  skills: z
    .string()
    .max(500, "Skills cannot exceed 500 characters")
    .optional(),

  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional(),

  githubUrl: z
    .string()
    .url("Invalid GitHub URL")
    .optional(),

  portfolioUrl: z
    .string()
    .url("Invalid portfolio URL")
    .optional(),
});