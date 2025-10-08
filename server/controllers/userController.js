import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { isEmailVerified } from "./otpController.js";

// token generation
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// 🔹 USER REGISTER (requires verified OTP)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Check email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // ✅ Ensure OTP was verified before registration
    if (!isEmailVerified(email)) {
      return res.json({ success: false, message: "Please verify your email first" });
    }

    // Validate password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password should be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({ success: true, message: "Registration successful", token });
  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: error.message });
  }
};

// 🔹 USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User doesn't exist" });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// 🔹 ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
