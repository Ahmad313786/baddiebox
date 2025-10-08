import React, { useContext, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { orders, fetchUserOrders, cancelOrder } = useContext(shopContext);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-400">
          No Orders Yet 📦
        </h2>
        <Link
          to="/home"
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Build Your First Box
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen px-4 md:px-8 py-10 text-white">
      <h1 className="text-4xl mt-10 font-extrabold text-center text-pink-400 mb-12">
        My Orders
      </h1>

      <div className="max-w-5xl mx-auto space-y-10">
        {orders.map((order, index) => (
          <div
            key={order.id || index}
            className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-pink-600 shadow-[0_0_15px_-3px_rgba(236,72,153,0.5)] transition-transform hover:scale-[1.02]"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-6">
              <div className="space-y-1">
                <span className="font-semibold text-pink-400 text-lg">
                  Order #{(order.id || "").toString().slice(-6) || "N/A"}
                </span>
                <p className="text-gray-400 text-sm">
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "No Date Available"}
                </p>
              </div>

              <div className="mt-2 sm:mt-0">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-black"
                      : order.status === "Cancelled"
                      ? "bg-red-500 text-black"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>
            </div>

            {/* Items */}
            {(order.items || []).map((box, i) => (
              <div
                key={i}
                className="bg-black rounded-xl p-4 sm:p-6 mb-5 border border-pink-700 shadow-inner"
              >
                <h3 className="text-xl font-bold text-pink-300 mb-3">
                  {box.name || "Untitled Box"}
                </h3>
                <ul className="ml-4 sm:ml-6 list-disc space-y-1 text-gray-300 text-sm sm:text-base">
                  {(box.items || []).map((it, j) => (
                    <li key={j}>
                      {it.name} — {it.quantity} × $
                      {Number(it.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-semibold text-right text-pink-400">
                  Box Total: ${Number(box.price || 0).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
              <div className="text-xl font-bold text-pink-400">
                Total: ${Number(order.total || 0).toFixed(2)}
              </div>

              {order.status !== "Delivered" &&
                order.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-transform hover:scale-105"
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
