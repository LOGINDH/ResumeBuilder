import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: Number,
      default: 1, // 1: Modern, 2: Classic, 3: Professional
    },
    name: String,
    role: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    portfolio: String,
    summary: String,
    skills: [String],
    experience: String,
    education: String,
    projects: String,
    certifications: String,
    languages: String,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
