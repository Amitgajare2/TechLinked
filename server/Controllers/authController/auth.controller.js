import argon2 from "argon2";
import prisma from "../../Database/prisma.js";
import { registerSchema } from "../../Validators/auth.validator.js";

export const register = async (req, res, next) => {
  try {
    // 1. Validate request body
    const result = registerSchema.safeParse(req.body);

    console.log(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { FirstName,LastName, email, phone, password } = result.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
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

    // 4. Create user
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