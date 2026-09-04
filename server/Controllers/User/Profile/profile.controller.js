import prisma from "../../../Config/prisma.js";
import fs from "fs/promises";
import path from "path";
import { updateProfileSchema } from "../../../Validators/profile.validator.js";

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        email: true,
        phone: true,
        phoneVerified: true,

        profilePhoto: true,
        dateOfBirth: true,
        gender: true,
        location: true,
        bio: true,
        education: true,
        skills: true,
        resumeUrl: true,
        linkedinUrl: true,
        githubUrl: true,
        portfolioUrl: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const validation = updateProfileSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile data",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const data = validation.data;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
        ...(data.dateOfBirth && {
          dateOfBirth: new Date(data.dateOfBirth),
        }),
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        email: true,
        phone: true,
        phoneVerified: true,
        profilePhoto: true,
        dateOfBirth: true,
        gender: true,
        location: true,
        bio: true,
        education: true,
        skills: true,
        resumeUrl: true,
        linkedinUrl: true,
        githubUrl: true,
        portfolioUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};


export const uploadUserResume = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        resumeUrl: true,
      },
    });

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resumeUrl,
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        resumeUrl: true,
      },
    });

    if (existingUser?.resumeUrl) {
      const oldFilePath = path.join(
        process.cwd(),
        existingUser.resumeUrl.replace(/^\/+/, "")
      );

      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Failed to delete old resume:", error);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch {
        // Ignore cleanup error
      }
    }

    next(error);
  }
};


export const deleteUserResume = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        resumeUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }

    const filePath = path.join(
      process.cwd(),
      user.resumeUrl.replace(/^\/+/, "")
    );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resumeUrl: null,
      },
    });

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Failed to delete resume file:", error);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const uploadProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profilePhoto: true,
      },
    });

    const profilePhoto = `/uploads/profile/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePhoto,
      },
      select: {
        id: true,
        FirstName: true,
        LastName: true,
        profilePhoto: true,
      },
    });

    // Delete previous profile photo
    if (existingUser?.profilePhoto) {
      const oldFilePath = path.join(
        process.cwd(),
        existingUser.profilePhoto.replace(/^\/+/, "")
      );

      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error(
            "Failed to delete old profile photo:",
            error
          );
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Profile photo uploaded successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch {
        // Ignore cleanup error
      }
    }

    next(error);
  }
};

export const deleteProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profilePhoto: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profilePhoto) {
      return res.status(404).json({
        success: false,
        message: "No profile photo found",
      });
    }

    const filePath = path.join(
      process.cwd(),
      user.profilePhoto.replace(/^\/+/, "")
    );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePhoto: null,
      },
    });

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Failed to delete profile photo:", error);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Profile photo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};