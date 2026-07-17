import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  forgotPassword,
  resetPassword,
  addDownloadHistory,
  clearDownloadHistory,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/update", protect, updateMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/download-history", protect, addDownloadHistory);
router.delete("/download-history", protect, clearDownloadHistory);

export default router;