import express from "express";
import {
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.post("/my-orders", auth, getUserOrders);
router.post("/cancel", auth, cancelOrder);
router.get("/all", adminAuth, getAllOrders);
router.post("/update-status", adminAuth, updateOrderStatus);

export default router;
