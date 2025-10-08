import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Accept both Bearer and token headers
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Verify this token actually belongs to an admin
    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized as admin",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired admin token",
    });
  }
};

export default adminAuth;
