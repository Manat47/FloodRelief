import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTP } from "../utils/sendOTP.js"; // ✅ Import OTP sender

// ✅ Send OTP for Email Verification (Step 1)
// ✅ Send OTP for Email Verification
export const sendOTPController = async (req, res) => {
  try {
      const { email } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          // ✅ If the user has a password, they are fully registered → Block sending OTP
          if (existingUser.password) {
              return res.status(400).json({ message: "User already exists." });
          }

          // ✅ If user exists but has NO password → Allow OTP for registration
      }

      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
      const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

      // Save OTP in the database (Temporary user entry)
      await User.updateOne(
          { email },
          { $set: { otp, otpExpires } },
          { upsert: true } // ✅ If user doesn't exist, create one
      );

      // Send OTP via email (Replace with your email function)
      const response = await sendOTP(email, otp);
      if (!response.success) {
          return res.status(500).json({ message: "Failed to send OTP." });
      }

      res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// ✅ Verify OTP Before Completing Registration (Step 2)
export const verifyOTPController = async (req, res) => {
  try {
      const { email, otp } = req.body;

      // ✅ Find the user who requested the OTP
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "User not found." });
      }

      // ✅ Check if OTP is correct and not expired
      if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ message: "Invalid or expired OTP." });
      }

      // ✅ Mark OTP as verified (clear OTP)
      await User.updateOne(
          { email },
          { $unset: { otp: 1, otpExpires: 1 }, $set: { isOtpVerified: true } }
      );

      res.status(200).json({ message: "OTP verified successfully! Proceed with registration." });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// ✅ Register User After OTP Verification (Step 3)
export const registerUser = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;

      // ✅ Fix: Check if user exists (OTP should already be removed after verification)
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "OTP verification required before registration." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Update user with name, password, and role
      await User.updateOne(
          { email },
          { $set: { name, password: hashedPassword, role } }
      );

      res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};




// ✅ Step 5: Modify Login to Ensure OTP Verification
export const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // ✅ Ensure user has verified OTP before logging in
      if (user.otp) {
          return res.status(400).json({ message: "Please verify OTP before logging in." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, user });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
