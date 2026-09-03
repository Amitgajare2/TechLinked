import express from "express";
import { authenticate } from "../../Middleware/Auth/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

export default router;