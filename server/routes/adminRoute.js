import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // ✅ Add isAdmin flag in token payload
      const token = jwt.sign(
        { email, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid admin credentials",
      });
    }
  } catch (error) {
    console.log("Admin login error:", error);
    res.json({ success: false, message: error.message });
  }
});

export default router;
