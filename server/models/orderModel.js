import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  // Items in the order (array of boxes or products)
  boxes: [
    {
      id: String, // box or product ID
      name: String,
      price: Number,
      image: String,
      // If box contains multiple items:
      items: [
        {
          name: String,
          quantity: Number,
          price: Number,
        },
      ],
    },
  ],

  // Shipping Details
  address: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },

  // Payment & Order Info
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Order Placed", // other values: "Processing", "Shipped", "Delivered"
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
