import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["victim", "volunteer", "organization", "admin"], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },

  // ✅ OTP Fields
  otp: { type: String },   // Stores the OTP
  otpExpires: { type: Date }  // OTP expiration time (5 minutes validity)
});

const User = mongoose.model("User", userSchema);
export default User;
