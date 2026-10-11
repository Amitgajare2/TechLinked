import prisma from "../../Config/prisma.js";

export const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      companyName,
      location,
      isRemote,
      applicationUrl,
      startDate,
      endDate,
      deadline,
      status,
    } = req.body;

    if (!title || !description || !type || !companyName || !location) {
      return res.status(400).json({
        success: false,
        message: "Mandatory fields are required",
      });
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        type,
        companyName: companyName || null,
        location: location || null,
        isRemote: isRemote ?? false,
        applicationUrl: applicationUrl || null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        deadline: deadline ? new Date(deadline) : null,
        status: status || "DRAFT",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Opportunity created successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Create opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create opportunity",
    });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const { type, status, search } = req.query;

    const opportunities = await prisma.opportunity.findMany({
      where: {
        ...(type && {
          type,
        }),

        ...(status && {
          status,
        }),

        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              companyName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    console.error("Get opportunities error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch opportunities",
    });
  }
};


export const getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await prisma.opportunity.findUnique({
      where: {
        id,
      },
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    console.error("Get opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch opportunity",
    });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      type,
      companyName,
      location,
      isRemote,
      applicationUrl,
      startDate,
      endDate,
      deadline,
      status,
    } = req.body;

    const existingOpportunity =
      await prisma.opportunity.findUnique({
        where: {
          id,
        },
      });

    if (!existingOpportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const opportunity = await prisma.opportunity.update({
      where: {
        id,
      },

      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(companyName !== undefined && { companyName }),
        ...(location !== undefined && { location }),
        ...(isRemote !== undefined && { isRemote }),
        ...(applicationUrl !== undefined && {
          applicationUrl,
        }),

        ...(startDate !== undefined && {
          startDate: startDate
            ? new Date(startDate)
            : null,
        }),

        ...(endDate !== undefined && {
          endDate: endDate
            ? new Date(endDate)
            : null,
        }),

        ...(deadline !== undefined && {
          deadline: deadline
            ? new Date(deadline)
            : null,
        }),

        ...(status !== undefined && {
          status,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Opportunity updated successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Update opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update opportunity",
    });
  }
};


export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const existingOpportunity =
      await prisma.opportunity.findUnique({
        where: {
          id,
        },
      });

    if (!existingOpportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    await prisma.opportunity.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete opportunity",
    });
  }
};

export const publishOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const existingOpportunity =
      await prisma.opportunity.findUnique({
        where: {
          id,
        },
      });

    if (!existingOpportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const opportunity = await prisma.opportunity.update({
      where: {
        id,
      },

      data: {
        status: "PUBLISHED",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Opportunity published successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Publish opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to publish opportunity",
    });
  }
};

export const closeOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const existingOpportunity =
      await prisma.opportunity.findUnique({
        where: {
          id,
        },
      });

    if (!existingOpportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    const opportunity = await prisma.opportunity.update({
      where: {
        id,
      },

      data: {
        status: "CLOSED",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Opportunity closed successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error("Close opportunity error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to close opportunity",
    });
  }
};