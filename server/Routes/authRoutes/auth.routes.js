import express from "express";
import { login, register, sendOtp, verifyOtp } from "../../Controllers/authController/auth.controller.js";
import { otpRateLimiter } from "../../Middleware/Auth/authRateLimiter.js"

const router = express.Router();

router.post("/register", register);
router.post("/send-otp", otpRateLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/login", login);

export default router;