import { z } from "zod";

export const registerSchema = z.object({
    FirstName: z
        .string()
        .trim()
        .min(2, "firstName must be at least 2 characters")
        .max(100, "Name is too long"),

    LastName: z
        .string()
        .trim()
        .min(2, "LastName must be at least 2 characters")
        .max(100, "lastName is too long"),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .transform((email) => email.toLowerCase()),

    phone: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, "Invalid phone number"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password is too long"),
});