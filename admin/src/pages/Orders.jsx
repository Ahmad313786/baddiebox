import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify";
import parcel_icon from "../assets/parcel_icon.svg";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all user orders (aggregated)
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.get(backendURL + "/api/order/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const allOrders = res.data.orders || [];
        console.log(res.data);

        setOrders(allOrders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    }
  };

  // ✅ Change order status
  const handleStatus = async (e, orderId, userId) => {
    try {
      const res = await axios.post(
        backendURL + "/api/order/update-status",
        { orderId, userId, status: e.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border border-gray-300 p-5 rounded-xl my-4 text-gray-800 bg-white shadow-md"
          >
            {/* Order Icon */}
            <img src={parcel_icon} alt="parcel" className="w-12 mx-auto" />

            {/* Items */}
            <div>
              {(order.items || []).map((box, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold text-pink-600">
                    {box.name || "Unnamed Box"}
                  </p>
                  <ul className="ml-4 text-sm text-gray-600 list-disc">
                    {(box.items || []).map((it, j) => (
                      <li key={j}>
                        {it.name} — {it.quantity} × $
                        {Number(it.price).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Order Meta */}
            <div className="text-sm">
              <p className="font-semibold">
                Date:{" "}
                {order.date ? new Date(order.date).toLocaleString() : "No date"}
              </p>
              <p>Total Items: {order.items?.length || 0}</p>
              <p>
                Total Amount: {currency}
                {Number(order.total || 0).toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Order ID: {(order.id || "").slice(-6)}
              </p>

              {/* ✅ Address & Phone */}
              {/* ✅ Shipping Details */}
              <div className="mt-3 bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <p className="font-semibold text-gray-700 mb-2">
                  Shipping Details:
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span>{" "}
                  {order.shippingDetails?.firstName}{" "}
                  {order.shippingDetails?.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span>{" "}
                  {order.shippingDetails?.address},{" "}
                  {order.shippingDetails?.city}, {order.shippingDetails?.state}{" "}
                  {order.shippingDetails?.postalCode}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.shippingDetails?.phone || "N/A"}
                </p>
              </div>
            </div>

            {/* Status Control */}
            <div className="flex flex-col items-center">
              <select
                onChange={(e) => handleStatus(e, order.id, order.userId)}
                value={order.status || "Pending"}
                className="p-2 border border-gray-300 rounded-md text-sm font-semibold bg-gray-50"
              >
                <option value="Pending">Pending</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
