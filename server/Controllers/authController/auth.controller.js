import argon2 from "argon2";
import prisma from "../../Database/prisma.js";
import { registerSchema } from "../../Validators/auth.validator.js";
import { loginSchema } from "../../Schemas/auth.schema.js";
import { generateAccessToken } from "../../Utils/jwt.js"
import {
  sendOtp as send2FactorOtp,
  verifyOtp as verify2FactorOtp,
} from "../../Services/2factor.service.js";


export const register = async (req, res, next) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { FirstName, LastName, email, phone, password } = result.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }

      if (existingUser.phone === phone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        FirstName,
        LastName,
        email,
        phone,
        passwordHash,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your phone number.",
      user: {
        id: user.id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        email: user.email,
        phone: user.phone,
        phoneVerified: user.phoneVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.phoneVerified) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already verified",
      });
    }

    // Send OTP through 2Factor
    const result = await send2FactorOtp(phone);

    // 2Factor returns the session ID in Details
    const sessionId = result.Details;

    if (!sessionId) {
      return res.status(500).json({
        success: false,
        message: "OTP service did not return a session ID",
      });
    }

    // Invalidate previous OTP sessions
    await prisma.otpVerification.updateMany({
      where: {
        userId: user.id,
        verifiedAt: null,
      },
      data: {
        verifiedAt: new Date(),
      },
    });

    // Save new 2Factor session
    await prisma.otpVerification.create({
      data: {
        userId: user.id,
        sessionId,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.phoneVerified) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already verified",
      });
    }

    // Get the latest unverified 2Factor session
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        userId: user.id,
        verifiedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP session not found. Please request a new OTP.",
      });
    }

    // Check our local session expiry
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // Ask 2Factor to verify the OTP
    const verified = await verify2FactorOtp(
      otpRecord.sessionId,
      otp
    );

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified successfully
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          phoneVerified: true,
        },
      }),

      prisma.otpVerification.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          verifiedAt: new Date(),
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Phone number verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // 1. Validate request body
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = result.data;

    // 2. Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // 3. Don't reveal whether phone exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Check phone verification
    if (!user.phoneVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your phone number before logging in",
      });
    }

    // 5. Verify password
    const passwordValid = await argon2.verify(
      user.passwordHash,
      password
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 6. Generate JWT
    const accessToken = generateAccessToken(user);

    // 7. Return response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          firstName: user.FirstName,
          lastName: user.LastName,
          phone: user.phone,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};