import express from "express";

import { getProfile,updateProfile,uploadUserResume,deleteUserResume,uploadProfilePhoto,deleteProfilePhoto
 } from "../../Controllers/User/Profile/profile.controller.js";
import { authenticate } from "../../Middleware/Auth/auth.middleware.js";
import { uploadResume, uploadProfilePhoto as uploadProfilePhotoMiddleware, } from "../../Middleware/upload.middleware.js";

const router = express.Router();

router.get("/", authenticate, getProfile);
router.patch("/", authenticate, updateProfile);

router.post(
  "/resume",
  authenticate,
  uploadResume.single("resume"),
  uploadUserResume
);

router.delete(
  "/resume",
  authenticate,
  deleteUserResume
);

router.post(
  "/photo",
  authenticate,
  uploadProfilePhotoMiddleware.single("photo"),
  uploadProfilePhoto
);

router.delete(
  "/photo",
  authenticate,
  deleteProfilePhoto
);

export default router;