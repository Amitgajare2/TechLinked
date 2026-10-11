import express from "express";

import {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  publishOpportunity,
  closeOpportunity,
} from "../../Controllers/opportunityController/opportunity.controller.js";

import { authenticate } from "../../Middleware/Auth/auth.middleware.js";

const router = express.Router();

router.get("/", getOpportunities);

router.get("/:id", getOpportunityById);

router.post("/", authenticate, createOpportunity);

router.patch("/:id", authenticate, updateOpportunity);

router.delete("/:id", authenticate, deleteOpportunity);

router.patch("/:id/publish",authenticate,publishOpportunity);

router.patch("/:id/close",authenticate,closeOpportunity);

export default router;