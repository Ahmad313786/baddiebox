import express from "express";
import {
  addToCart,
  removeFromCart,
  clearCart,
  getUserCart,
  placeOrder,
} from "../controllers/cartController.js";

import auth from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth,addToCart);
cartRouter.post("/remove", auth,removeFromCart);
cartRouter.post("/clear", auth,clearCart);
cartRouter.post("/get",auth, getUserCart);
cartRouter.post("/place-order", auth,placeOrder);

export default cartRouter;
