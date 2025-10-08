import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "../config/mongoDB.js";
import connectCloudinary from "../config/cloudinary.js";

import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import orderRouter from "../routes/orderRoute.js";
import adminRouter from "../routes/adminRoute.js";
import otpRoutes from "../routes/otpRoute.js";

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🧠 Connect services (run once)
connectCloudinary();
connectDB();

// ✅ Root test route — so /api shows something
app.get("/", (req, res) => {
  res.status(200).send("✅ API is working! 🚀");
});

// ✅ Route mappings
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/user", otpRoutes); // optional if OTP routes are separate

// 🧩 Health check endpoint (optional for uptime monitoring)
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ✅ Export for Vercel serverless function
export default app;
