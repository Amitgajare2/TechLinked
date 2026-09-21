import prisma from "../../Database/prisma.js";

export const createProject = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const {
      title,
      description,
      requiredMembers,
      imageUrl,
      projectUrl,
      githubUrl,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    const membersRequired = Number(requiredMembers);

    if (
      !Number.isInteger(membersRequired) ||
      membersRequired < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Required members must be at least 1",
      });
    }

    const project = await prisma.project.create({
      data: {
        ownerId: userId,
        title: title.trim(),
        description: description?.trim() || null,
        requiredMembers: membersRequired,
        imageUrl: imageUrl || null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        status: "OPEN",
      },
      include: {
        owner: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        owner: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
          },
        },

        _count: {
          select: {
            members: true,
            applications: true,
          },
        },

        applications: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
                status: true,
              },
              take: 1,
            }
          : false,
      },
    });

    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,

      requiredMembers: project.requiredMembers,

      currentMembers: project._count.members,

      spotsAvailable: Math.max(
        project.requiredMembers - project._count.members,
        0
      ),

      status: project.status,

      owner: project.owner,

      applicationCount: project._count.applications,

      // Current user's application
      myApplication: project.applications?.[0] ?? null,

      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: formattedProjects,
    });
  } catch (error) {
    next(error);
  }
};


export const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const viewerId = req.user?.userId || null;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      include: {
        owner: {
          select: {
            id: true,
            FirstName: true,
            LastName: true,
            profilePhoto: true,
            bio: true,
          },
        },

        members: {
          orderBy: {
            joinedAt: "asc",
          },

          include: {
            user: {
              select: {
                id: true,
                FirstName: true,
                LastName: true,
                profilePhoto: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    let applicationStatus = null;
    let isMember = false;

    if (viewerId) {
      const application =
        await prisma.projectApplication.findUnique({
          where: {
            projectId_applicantId: {
              projectId,
              applicantId: viewerId,
            },
          },

          select: {
            status: true,
          },
        });

      applicationStatus = application?.status || null;

      isMember = project.members.some(
        (member) => member.userId === viewerId
      );
    }

    const currentMembers = project.members.length;

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",

      data: {
        id: project.id,

        title: project.title,
        description: project.description,

        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl,
        githubUrl: project.githubUrl,

        requiredMembers: project.requiredMembers,
        currentMembers,
        spotsAvailable: Math.max(
          project.requiredMembers - currentMembers,
          0
        ),

        status: project.status,

        owner: project.owner,

        members: project.members.map((member) => ({
          id: member.id,
          joinedAt: member.joinedAt,
          user: member.user,
        })),

        viewer: {
          isOwner: viewerId === project.ownerId,
          isMember,
          applicationStatus,
        },

        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const applyToProject = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { projectId } = req.params;
    const { message } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // -----------------------------------------
    // Find project
    // -----------------------------------------

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // -----------------------------------------
    // Owner cannot apply
    // -----------------------------------------

    if (project.ownerId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to your own project",
      });
    }

    // -----------------------------------------
    // Check if already a member
    // -----------------------------------------

    const existingMember =
      await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId,
          },
        },
      });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this project",
      });
    }

    // -----------------------------------------
    // IMPORTANT:
    // Check existing application
    // -----------------------------------------

    const existingApplication =
      await prisma.projectApplication.findUnique({
        where: {
          projectId_applicantId: {
            projectId,
            applicantId: userId,
          },
        },
      });

    console.log(
      "Existing application:",
      existingApplication
    );

    // -----------------------------------------
    // Already applied
    // -----------------------------------------

    if (existingApplication) {
      if (
        existingApplication.status ===
        "PENDING"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You have already applied to this project",
        });
      }

      // ---------------------------------------
      // Re-apply after rejection/withdrawal
      // ---------------------------------------

      if (
        existingApplication.status ===
          "REJECTED" ||
        existingApplication.status ===
          "WITHDRAWN"
      ) {
        const updatedApplication =
          await prisma.projectApplication.update({
            where: {
              id: existingApplication.id,
            },
            data: {
              status: "PENDING",
              message: message || null,
            },
          });

        return res.status(200).json({
          success: true,
          message:
            "Application submitted successfully",
          data: updatedApplication,
        });
      }

      // ---------------------------------------
      // Accepted application
      // ---------------------------------------

      if (
        existingApplication.status ===
        "ACCEPTED"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Your application has already been accepted",
        });
      }
    }

    // -----------------------------------------
    // Check project status
    // -----------------------------------------

    if (project.status !== "OPEN") {
      return res.status(400).json({
        success: false,
        message:
          "This project is not accepting applications",
      });
    }

    // -----------------------------------------
    // Check available spots
    // -----------------------------------------

    if (
      project._count.members >=
      project.requiredMembers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This project is already full",
      });
    }

    // -----------------------------------------
    // Create application
    // -----------------------------------------

    const application =
      await prisma.projectApplication.create({
        data: {
          projectId,
          applicantId: userId,
          message: message || null,
          status: "PENDING",
        },
      });

    return res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectApplications = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        id: true,
        ownerId: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can view applications",
      });
    }

    const applications =
      await prisma.projectApplication.findMany({
        where: {
          projectId,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          applicant: {
            select: {
              id: true,
              FirstName: true,
              LastName: true,
              profilePhoto: true,
              bio: true,
              location: true,
            },
          },
        },
      });

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};


export const acceptApplication = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user.userId;

    const {
      projectId,
      applicationId,
    } = req.params;

    const result = await prisma.$transaction(
      async (tx) => {
        const project = await tx.project.findUnique({
          where: {
            id: projectId,
          },
        });

        if (!project) {
          const error = new Error(
            "PROJECT_NOT_FOUND"
          );

          error.statusCode = 404;

          throw error;
        }

        if (project.ownerId !== ownerId) {
          const error = new Error(
            "NOT_PROJECT_OWNER"
          );

          error.statusCode = 403;

          throw error;
        }

        if (project.status !== "OPEN") {
          const error = new Error(
            "PROJECT_NOT_OPEN"
          );

          error.statusCode = 400;

          throw error;
        }

        const application =
          await tx.projectApplication.findUnique({
            where: {
              id: applicationId,
            },
          });

        if (!application) {
          const error = new Error(
            "APPLICATION_NOT_FOUND"
          );

          error.statusCode = 404;

          throw error;
        }

        if (application.projectId !== projectId) {
          const error = new Error(
            "INVALID_APPLICATION"
          );

          error.statusCode = 400;

          throw error;
        }

        if (application.status !== "PENDING") {
          const error = new Error(
            "APPLICATION_ALREADY_PROCESSED"
          );

          error.statusCode = 400;

          throw error;
        }

        /*
         * Make sure applicant hasn't already joined.
         */
        const existingMember =
          await tx.projectMember.findUnique({
            where: {
              projectId_userId: {
                projectId,
                userId: application.applicantId,
              },
            },
          });

        if (existingMember) {
          const error = new Error(
            "USER_ALREADY_MEMBER"
          );

          error.statusCode = 400;

          throw error;
        }

        const memberCount =
          await tx.projectMember.count({
            where: {
              projectId,
            },
          });

        if (
          memberCount >= project.requiredMembers
        ) {
          const error = new Error(
            "PROJECT_FULL"
          );

          error.statusCode = 400;

          throw error;
        }

        /*
         * Accept application.
         */
        await tx.projectApplication.update({
          where: {
            id: applicationId,
          },

          data: {
            status: "ACCEPTED",
          },
        });

        /*
         * Create project member.
         */
        const member =
          await tx.projectMember.create({
            data: {
              projectId,
              userId: application.applicantId,
            },

            include: {
              user: {
                select: {
                  id: true,
                  FirstName: true,
                  LastName: true,
                  profilePhoto: true,
                },
              },
            },
          });

        const newMemberCount =
          memberCount + 1;

        /*
         * Mark project FULL when capacity is reached.
         */
        if (
          newMemberCount >=
          project.requiredMembers
        ) {
          await tx.project.update({
            where: {
              id: projectId,
            },

            data: {
              status: "FULL",
            },
          });
        }

        return member;
      }
    );

    return res.status(200).json({
      success: true,
      message: "Application accepted successfully",
      data: result,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: getProjectErrorMessage(error.message),
      });
    }

    next(error);
  }
};


export const rejectApplication = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user.userId;

    const {
      projectId,
      applicationId,
    } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        id: true,
        ownerId: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.ownerId !== ownerId) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can reject applications",
      });
    }

    const application =
      await prisma.projectApplication.findUnique({
        where: {
          id: applicationId,
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.projectId !== projectId) {
      return res.status(400).json({
        success: false,
        message: "Invalid application",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Application has already been processed",
      });
    }

    const updatedApplication =
      await prisma.projectApplication.update({
        where: {
          id: applicationId,
        },

        data: {
          status: "REJECTED",
        },

        include: {
          applicant: {
            select: {
              id: true,
              FirstName: true,
              LastName: true,
              profilePhoto: true,
            },
          },
        },
      });

    return res.status(200).json({
      success: true,
      message: "Application rejected",
      data: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};


export const withdrawApplication = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const application =
      await prisma.projectApplication.findUnique({
        where: {
          projectId_applicantId: {
            projectId,
            applicantId: userId,
          },
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending applications can be withdrawn",
      });
    }

    const updatedApplication =
      await prisma.projectApplication.update({
        where: {
          id: application.id,
        },

        data: {
          status: "WITHDRAWN",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
      data: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const removeProjectMember = async (
  req,
  res,
  next
) => {
  try {
    const ownerId = req.user.userId;

    const {
      projectId,
      memberId,
    } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        id: true,
        ownerId: true,
        status: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.ownerId !== ownerId) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can remove members",
      });
    }

    const member =
      await prisma.projectMember.findUnique({
        where: {
          id: memberId,
        },
      });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Project member not found",
      });
    }

    if (member.projectId !== projectId) {
      return res.status(400).json({
        success: false,
        message: "Invalid project member",
      });
    }

    await prisma.projectMember.delete({
      where: {
        id: memberId,
      },
    });
    if (project.status === "FULL") {
      await prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          status: "OPEN",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const leaveProject = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const member =
      await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId,
            userId,
          },
        },
      });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "You are not a member of this project",
      });
    }

    await prisma.projectMember.delete({
      where: {
        id: member.id,
      },
    });

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        status: true,
      },
    });

    if (project?.status === "FULL") {
      await prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          status: "OPEN",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "You left the project successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const completeProject = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        id: true,
        ownerId: true,
        status: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can complete the project",
      });
    }

    if (
      project.status === "COMPLETED"
    ) {
      return res.status(400).json({
        success: false,
        message: "Project is already completed",
      });
    }

    if (
      project.status === "CANCELLED"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cancelled project cannot be completed",
      });
    }

    const updatedProject =
      await prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          status: "COMPLETED",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Project completed successfully",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelProject = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },

      select: {
        id: true,
        ownerId: true,
        status: true,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "Only the project owner can cancel the project",
      });
    }

    if (project.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message:
          "Completed project cannot be cancelled",
      });
    }

    if (project.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Project is already cancelled",
      });
    }

    const updatedProject =
      await prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          status: "CANCELLED",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Project cancelled successfully",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectErrorMessage = (errorCode) => {
  const messages = {
    PROJECT_NOT_FOUND:
      "Project not found",

    NOT_PROJECT_OWNER:
      "Only the project owner can perform this action",

    PROJECT_NOT_OPEN:
      "Project is no longer accepting applications",

    APPLICATION_NOT_FOUND:
      "Application not found",

    INVALID_APPLICATION:
      "Invalid application",

    APPLICATION_ALREADY_PROCESSED:
      "Application has already been processed",

    USER_ALREADY_MEMBER:
      "User is already a project member",

    PROJECT_FULL:
      "Project has reached its member limit",
  };

  return (
    messages[errorCode] ||
    "Something went wrong"
  );
};

