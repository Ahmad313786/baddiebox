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
app.use(cors());
app.use(express.json());

connectCloudinary();
connectDB();

// Health check route
app.get("/", (req, res) => res.send("✅ API is working on Vercel!"));

// Routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/otp", otpRoutes);

export default app;
