import userModel from "../models/userModel.js";

// 🟢 GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {
  try {
    const users = await userModel.find();
    let allOrders = [];

    users.forEach((user) => {
      user.orders?.forEach((order) => {
        allOrders.push({
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          ...order,
        });
      });
    });

    res.json({ success: true, orders: allOrders });
  } catch (error) {
    console.error("Error getting all orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, orders: user.orders || [] });
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 UPDATE ORDER STATUS (ADMIN)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status)
      return res
        .status(400)
        .json({ success: false, message: "Order ID and status required" });

    const user = await userModel.findOne({ "orders.id": orderId });
    if (!user)
      return res.status(404).json({ success: false, message: "Order not found" });

    const updatedOrders = user.orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );

    await userModel.findByIdAndUpdate(user._id, { orders: updatedOrders });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 CANCEL ORDER (USER)
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body;

    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const updatedOrders = user.orders.map((order) => {
      if (order.id === orderId && order.status !== "Delivered") {
        return { ...order, status: "Cancelled" };
      }
      return order;
    });

    await userModel.findByIdAndUpdate(userId, { orders: updatedOrders });

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllOrders, getUserOrders, updateOrderStatus, cancelOrder };
