import jwt from "jsonwebtoken"; 

// ✅ Middleware: General Authentication (with Bearer Token Handling)
export const authenticateUser = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        // Verify JWT token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data (id, role) to request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired Token!" });
    }
};

// ✅ Role-Based Middleware (Supports Multiple Roles)
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied! Insufficient permissions." });
        }
        next(); // Proceed if the role is allowed
    };
};
