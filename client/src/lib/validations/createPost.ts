import * as yup from "yup";

export const createPostValidationSchema = yup.object({
  caption: yup
    .string()
    .min(5,"description is too short")
    .trim()
    .max(500, "Caption cannot exceed 500 characters")
    .optional(),

  image: yup
    .mixed<File>()
    .nullable()
    .optional()
    .test(
      "fileSize",
      "Image must be less than 5MB",
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      }
    )
    .test(
      "fileType",
      "Only image files are allowed",
      (file) => {
        if (!file) return true;
        return file.type.startsWith("image/");
      }
    ),
});