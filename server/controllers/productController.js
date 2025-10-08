import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ✅ ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    // multer single file
    const imageFile = req.file;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      images: uploadedImage.secure_url,
    });

    await newProduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ LIST PRODUCTS
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE PRODUCT
const delProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ SINGLE PRODUCT
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, delProduct, singleProduct };
