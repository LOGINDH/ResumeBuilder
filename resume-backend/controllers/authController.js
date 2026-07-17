import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= GET CURRENT USER =================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= UPDATE USER PROFILE =================
export const updateMe = async (req, res) => {
  try {
    const { name, avatar, role } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (role !== undefined) user.role = role;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= EMAIL TRANSPORTER HELPER =================
const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      auth: {
        user: process.env.SMTP_EMAIL || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    });

    const mailOptions = {
      from: `"ResumeVault" <${process.env.SMTP_EMAIL || "no-reply@resumevault.com"}>`,
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your password reset verification code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111827; background-color: #f9fafb; border-radius: 8px;">
          <h2 style="color: #C6A969;">ResumeVault Password Reset</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. Please use the following 6-digit verification code to reset your password:</p>
          <div style="padding: 15px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-align: center; color: #111827; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 30px;">This is an automated message, please do not reply.</p>
        </div>
      `,
    };

    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      await transporter.sendMail(mailOptions);
      console.log(`Password reset OTP email sent to ${email}`);
      return true;
    } else {
      console.log(`SMTP not configured. Mocking OTP send to ${email}`);
      console.log(`=== MOCK OTP FOR ${email} ===: ${otp}`);
      return false;
    }
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const isEmailSent = await sendOtpEmail(email, otp);

    res.json({
      success: true,
      message: isEmailSent 
        ? "Verification code sent to your email." 
        : "Reset code generated (Mocked). Check developer console for the OTP.",
      mockOtp: !isEmailSent ? otp : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      email,
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= ADD DOWNLOAD HISTORY =================
export const addDownloadHistory = async (req, res) => {
  try {
    const { resumeId, title, templateId, templateName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.downloadHistory.push({
      resumeId,
      title,
      templateId,
      templateName,
      downloadedAt: new Date(),
    });

    await user.save();

    res.json({
      success: true,
      message: "Download logged successfully",
      downloadHistory: user.downloadHistory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================= CLEAR DOWNLOAD HISTORY =================
export const clearDownloadHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.downloadHistory = [];
    await user.save();

    res.json({
      success: true,
      message: "Download history cleared successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

