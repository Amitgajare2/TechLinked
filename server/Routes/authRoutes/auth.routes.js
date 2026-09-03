import express from "express";
import { login, logout, refreshAccessToken, register, sendOtp, verifyOtp } from "../../Controllers/authController/auth.controller.js";

import {
  loginLimiter,
  otpSendLimiter,
  otpVerifyLimiter,
  refreshLimiter,
} from "../../Middleware/Auth/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/send-otp", otpSendLimiter, sendOtp);
router.post("/verify-otp", otpVerifyLimiter, verifyOtp);

router.post("/login", loginLimiter, login);
router.post("/refresh", refreshLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;