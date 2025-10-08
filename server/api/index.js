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

// Connect services safely
await connectCloudinary();
await connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is working and DB connected successfully!");
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/otp", otpRoutes);

export default app;
