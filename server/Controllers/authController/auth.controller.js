import argon2 from "argon2";
import prisma from "../../Database/prisma.js";
import { registerSchema } from "../../Validators/auth.validator.js";
import { loginSchema } from "../../Schemas/auth.schema.js";
import {
  generateAccessToken, generateRefreshToken,
  verifyRefreshToken,
} from "../../Utils/jwt.js"

import {
  sendOtp as send2FactorOtp,
  verifyOtp as verify2FactorOtp,
} from "../../Services/2factor.service.js";

import {
  hashRefreshToken,
  verifyRefreshTokenHash,
} from "../../Utils/refreshToken.js";


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

    // Send OTP 
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
    // Validate request body
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = result.data;


    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //  Check phone verification
    if (!user.phoneVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your phone number before logging in",
      });
    }

    //  Verify password
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

    //  Generate JWT
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    const refreshTokenHash =
      await hashRefreshToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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


export const refreshAccessToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify refresh token JWT
    let decoded;

    try {
      decoded = verifyRefreshToken(oldRefreshToken);
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Make sure this is a refresh token
    if (decoded.tokenType !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const refreshTokens = await prisma.refreshToken.findMany({
      where: {
        userId: decoded.userId,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    let matchedToken = null;

    for (const storedToken of refreshTokens) {
      const isMatch = await verifyRefreshTokenHash(
        oldRefreshToken,
        storedToken.tokenHash
      );

      if (isMatch) {
        matchedToken = storedToken;
        break;
      }
    }


    if (!matchedToken) {
      await prisma.refreshToken.updateMany({
        where: {
          userId: decoded.userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      return res.status(401).json({
        success: false,
        message:
          "Refresh token reuse detected. Please login again.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

  
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const newRefreshTokenHash =
      await hashRefreshToken(newRefreshToken);

    await prisma.$transaction([
      prisma.refreshToken.update({
        where: {
          id: matchedToken.id,
        },
        data: {
          revokedAt: new Date(),
        },
      }),

      prisma.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: newRefreshTokenHash,
          expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ),
        },
      }),
    ]);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);

        const refreshTokens =
          await prisma.refreshToken.findMany({
            where: {
              userId: decoded.userId,
              revokedAt: null,
            },
          });

        for (const storedToken of refreshTokens) {
          const isMatch = await verifyRefreshTokenHash(
            refreshToken,
            storedToken.tokenHash
          );

          if (isMatch) {
            await prisma.refreshToken.update({
              where: {
                id: storedToken.id,
              },
              data: {
                revokedAt: new Date(),
              },
            });

            break;
          }
        }
      } catch {
      }
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};