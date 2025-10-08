import express from "express";
import {
  addProduct,
  listProducts,
  delProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.post("/remove", adminAuth, delProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
