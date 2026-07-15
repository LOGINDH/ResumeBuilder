import express from "express";
import { registerUser, loginUser, getMe, updateMe, forgotPassword, resetPassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/update", protect, updateMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;