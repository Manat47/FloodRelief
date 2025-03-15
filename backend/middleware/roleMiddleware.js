import jwt from "jsonwebtoken";

// ✅ Role-Based Middleware (Supports Multiple Roles)
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            // Get token from Authorization header
            const token = req.header("Authorization");
            if (!token) {
                return res.status(401).json({ message: "🚫 Access Denied: No token provided." });
            }

            // Verify and decode the token
            const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
            req.user = decoded;

            // Check if the user's role is in the allowed roles
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "🚫 Access Denied: You do not have the required permissions." });
            }

            next(); // ✅ User has the correct role, proceed
        } catch (error) {
            res.status(401).json({ message: "🚫 Invalid token." });
        }
    };
};
