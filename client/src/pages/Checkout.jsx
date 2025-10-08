import React, { useContext, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

const Checkout = () => {
  const { state } = useLocation();
  const { cart = [], totalPrice = 0 } = state || {};
  const { placeOrder } = useContext(shopContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    for (let key in form) {
      if (!form[key]) {
        alert(`Please fill in your ${key}`);
        return;
      }
    }
    placeOrder(form);
    navigate("/orders");
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-12 mt-10">
      <h1 className="text-4xl font-extrabold text-center text-pink-400 mb-10 tracking-wide">
        💌 Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-pink-300 mb-6 text-lg">
            Your cart is empty — let’s add some sparkle ✨
          </p>
          <Link
            to="/boxes"
            className="bg-pink-500 hover:bg-pink-600 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Go Back to Boxes
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Shipping Details */}
          <div className="bg-black border-2 border-pink-500 rounded-3xl p-8 shadow-[0_0_25px_rgba(255,192,203,0.3)] hover:shadow-[0_0_40px_rgba(255,105,180,0.5)] transition-all duration-300">
            <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
              Shipping Details 🚚
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Address", name: "address", full: true },
                { label: "City", name: "city" },
                { label: "State / Province", name: "state" },
                { label: "Postal Code", name: "postalCode" },
                { label: "Phone Number", name: "phone" },
              ].map((field) => (
                <div
                  key={field.name}
                  className={field.full ? "md:col-span-2" : ""}
                >
                  <label className="block mb-2 text-pink-300 font-medium">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full bg-pink-950/30 border-2 border-pink-500 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-black border-2 border-pink-500 rounded-3xl p-8 shadow-[0_0_25px_rgba(255,192,203,0.3)] hover:shadow-[0_0_40px_rgba(255,105,180,0.5)] transition-all duration-300">
            <h2 className="text-2xl font-bold text-center text-pink-400 mb-6">
              Order Summary 💝
            </h2>

            {cart.map((box) => (
              <div
                key={box._id}
                className="border-b border-pink-900 pb-3 mb-3"
              >
                <h3 className="text-lg font-bold text-pink-300 mb-2">
                  {box.name}
                </h3>
                <ul className="ml-6 list-disc text-pink-200">
                  {box.items.map((it, i) => (
                    <li key={i}>
                      {it.name} — {it.quantity} × Rs.{Number(it.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-pink-300">
                  Box Total: Rs.{Number(box.price).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="text-right text-xl font-bold text-pink-400">
              Total: Rs.{Number(totalPrice).toFixed(2)}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-black font-semibold text-lg rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            Place Order 💌
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
