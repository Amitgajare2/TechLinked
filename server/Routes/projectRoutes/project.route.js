import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  applyToProject,
  getProjectApplications,
  acceptApplication,
  rejectApplication,
  withdrawApplication,
  removeProjectMember,
  leaveProject,
  completeProject,
  cancelProject,
} from "../../Controllers/projectController/proectController.js";

import { authenticate } from "../../Middleware/Auth/auth.middleware.js";
import { optionalAuthenticate } from "../../Middleware/Auth/optionalAuthenticate.js";

const router = express.Router();


// --------------------------------------------------
// Projects
// --------------------------------------------------

router.post(
  "/",
  authenticate,
  createProject
);

router.get(
  "/",
  getProjects
);

router.get(
  "/:id",
  optionalAuthenticate,
  getProjectById
);


// --------------------------------------------------
// Applications
// --------------------------------------------------

router.post(
  "/:projectId/apply",
  authenticate,
  applyToProject
);

router.get(
  "/:projectId/applications",
  authenticate,
  getProjectApplications
);

router.patch(
  "/:projectId/applications/:applicationId/accept",
  authenticate,
  acceptApplication
);

router.patch(
  "/:projectId/applications/:applicationId/reject",
  authenticate,
  rejectApplication
);

router.delete(
  "/:projectId/applications/me",
  authenticate,
  withdrawApplication
);


// --------------------------------------------------
// Members
// --------------------------------------------------

router.delete(
  "/:projectId/members/:memberId",
  authenticate,
  removeProjectMember
);

router.delete(
  "/:projectId/members/me",
  authenticate,
  leaveProject
);


// --------------------------------------------------
// Project lifecycle
// --------------------------------------------------

router.patch(
  "/:projectId/complete",
  authenticate,
  completeProject
);

router.delete(
  "/:projectId",
  authenticate,
  cancelProject
);


export default router;