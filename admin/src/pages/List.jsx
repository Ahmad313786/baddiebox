import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendURL + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ---------- Table Header ---------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-2 px-3 bg-gray-100 text-sm font-semibold rounded">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------- Product Rows ---------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-2 px-3 border rounded-md hover:shadow-md transition"
          >
            {/* image */}
            <img
              className="w-14 h-14 object-cover rounded-md"
              src={item.images}
              alt={item.name}
            />

            {/* name */}
            <p className="font-medium truncate">{item.name}</p>

            {/* price */}
            <p>
              {currency}
              {item.price}
            </p>

            {/* action */}
            <p
              onClick={() => removeProduct(item._id)}
              className="text-center cursor-pointer text-red-500 hover:text-red-700 text-lg font-bold"
            >
              ✕
            </p>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">
            No products found.
          </p>
        )}
      </div>
    </>
  );
};

export default List;
