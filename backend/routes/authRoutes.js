import express from "express";     
import { 
    registerUser, 
    loginUser, 
    sendOTPController, 
    verifyOTPController 
} from "../controllers/authController.js";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware.js"; // ✅ Import auth middlewares
import { getUserProfile, updateUserProfile, changePassword } from "../controllers/userController.js"; // ✅ Import new profile functions

const router = express.Router();

/**  
 * 🟢 PUBLIC ROUTES (No Authentication Required)  
 * OTP & Authentication Routes  
 */
router.post("/send-otp", sendOTPController);  // ✅ Send OTP
router.post("/verify-otp", verifyOTPController);  // ✅ Verify OTP
router.post("/register", registerUser);  // ✅ Register after OTP Verification
router.post("/login", loginUser);  // ✅ Login and Get Token

/**  
 * 🔐 PROTECTED ROUTES (Require Authentication)  
 * User must be authenticated to access these routes  
 */
router.get("/protected", authenticateUser, (req, res) => {
    res.json({ message: "✅ Welcome! You are authenticated.", user: req.user });
});

// ✅ NEW: User Profile Routes
router.get("/profile", authenticateUser, getUserProfile);
router.put("/profile", authenticateUser, updateUserProfile); // ✅ NEW: Update user profile
router.put("/change-password", authenticateUser, changePassword); // ✅ NEW: Change password

/**  
 * 🎭 ROLE-BASED ROUTES (Require Authentication & Specific Role)  
 * Only users with the correct role can access these routes  
 */
router.get("/admin", authenticateUser, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "✅ Welcome Admin! You have access to this route." });
});

router.get("/victim", authenticateUser, authorizeRoles("victim"), (req, res) => {
    res.json({ message: "✅ Welcome Victim! You have access to this route." });
});

router.get("/volunteer", authenticateUser, authorizeRoles("volunteer"), (req, res) => {
    res.json({ message: "✅ Welcome Volunteer! You have access to this route." });
});

router.get("/organization", authenticateUser, authorizeRoles("organization"), (req, res) => {
    res.json({ message: "✅ Welcome Organization! You have access to this route." });
});

/**  
 * ❌ UNAUTHORIZED HANDLER (Catches Unauthorized Access Attempts)  
 */
router.use((req, res) => {
    res.status(404).json({ message: "🚫 Route Not Found" });
});

export default router;
