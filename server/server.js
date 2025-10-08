import express from "express"
import cors from "cors"
import "dotenv/config.js"
import connectDB from "./config/mongoDB.js"
import connectCloudinary from "./config/cloudinary.js"

import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js";
import otpRoutes from "./routes/otpRoute.js";

const app = express()
const port = 3000;
const host = "0.0.0.0";

app.use(cors())
app.use(express.json())

connectCloudinary()
connectDB()

// Route mappings
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)
app.use("/api/admin", adminRouter);
app.use("/api/user", otpRoutes);

app.listen(port, host, () => console.log(`Server running on http://${host}:${port}`));


export default app