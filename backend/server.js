import express from "express";   
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import { authenticateUser, authorizeRoles } from "./middleware/authMiddleware.js"; // ✅ Updated Import
import "./models/User.js";
import "./models/Request.js";

dotenv.config(); // ✅ Load environment variables

const app = express(); // ✅ Initialize Express
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Register Routes (Public Routes)
app.use("/api/auth", authRoutes);

// ✅ Sample route to check if backend is running
app.get("/", (req, res) => {
    res.send("🚀 Rescue Bridge Backend is Running!");
});

// ✅ Protected Route (Requires Authentication)
app.get("/api/protected", authenticateUser, (req, res) => {
    res.json({ message: "✅ Welcome! You are authenticated.", user: req.user });
});

// ✅ Role-Based Routes (Require Authentication and Specific Role)
app.get("/api/admin", authenticateUser, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "✅ Welcome Admin! You have access to this route." });
});

app.get("/api/volunteer", authenticateUser, authorizeRoles("volunteer"), (req, res) => {
    res.json({ message: "✅ Welcome Volunteer! You have access to this route." });
});

app.get("/api/organization", authenticateUser, authorizeRoles("organization"), (req, res) => {
    res.json({ message: "✅ Welcome Organization! You have access to this route." });
});

app.get("/api/victim", authenticateUser, authorizeRoles("victim"), (req, res) => {
    res.json({ message: "✅ Welcome Victim! You have access to this route." });
});

// ✅ Debug Registered Routes
console.log("Registered Routes:");
console.log(app._router.stack.map(r => r.route && r.route.path));

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
