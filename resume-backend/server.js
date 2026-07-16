import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

import connectDB from "./config/db.js";
import User from "./models/user.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const seedDefaultUser = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.create({
        name: "John Doe",
        email: "user@example.com",
        password: hashedPassword,
        role: "Professional",
      });
      console.log("--------------------------------------------------");
      console.log("Seeded default user credentials:");
      console.log("Email: user@example.com");
      console.log("Password: password123");
      console.log("--------------------------------------------------");
    }
  } catch (err) {
    console.log("Error seeding default user:", err.message);
  }
};

connectDB().then(() => {
  seedDefaultUser();
});

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - Status: ${res.statusCode} (${duration}ms)`);
  });
  if (req.method !== 'GET') {
    console.log('Body:', req.body);
  }
  next();
});

// routes

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});