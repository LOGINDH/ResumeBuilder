import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/create", protect, createResume);

router.get("/", protect, getMyResumes);

router.get("/:id", protect, getResumeById);

router.put("/:id", protect, updateResume);

router.delete("/:id", protect, deleteResume);

export default router;