import React, { useState } from "react";
import upload from "../assets/upload_area.png";
import loadingIcon from "../assets/loadingIcon.gif";
import axios from "axios";
import { toast } from "react-toastify";
import { backendURL } from "../App";

const AddProduct = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-4"
    >
      {/* Image Upload */}
      <div>
        <p className="mb-2 font-medium">Upload Product Image</p>
        <label htmlFor="image">
          <img
            className="w-24 border cursor-pointer"
            src={!image ? upload : URL.createObjectURL(image)}
            alt="upload"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
        />
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-1 font-medium">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Enter product name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-1 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Enter description"
          required
        />
      </div>

      {/* Product Price */}
      <div className="w-full">
        <p className="mb-1 font-medium">Product Price</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Enter price"
          required
          min="0"
        />
      </div>

      {/* Product Quantity */}
      <div className="w-full">
        <p className="mb-1 font-medium">Product Quantity</p>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Enter stock quantity"
          required
          min="0"
        />
      </div>

      {/* Submit */}
      {loading ? (
        <img className="w-20" src={loadingIcon} alt="loading" />
      ) : (
        <button
          disabled={loading}
          type="submit"
          className="w-28 py-3 mt-3 bg-black text-white"
        >
          ADD
        </button>
      )}
    </form>
  );
};

export default AddProduct;
