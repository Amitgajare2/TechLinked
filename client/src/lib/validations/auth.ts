import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

const passwordRules = yup
  .string()
  .required("Password is required")
  .min(8, "Use at least 8 characters")
  .matches(/[A-Z]/, "Include at least one uppercase letter")
  .matches(/[a-z]/, "Include at least one lowercase letter")
  .matches(/[0-9]/, "Include at least one number")
  .matches(/[^A-Za-z0-9]/, "Include at least one special character");

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "Enter at least 2 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Enter at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  password: passwordRules,
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;

export interface RegisterPayload {
  FirstName: string;
  LastName: string;
  email: string;
  phone: string;
  password: string;
}