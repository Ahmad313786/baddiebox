import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart } = useContext(shopContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, box) => sum + (box.price || 0), 0);

  const handleProceedCheckout = () => {
    navigate("/checkout", { state: { cart, totalPrice } });
  };

  if (cart.length === 0) {
    return (
      <div className="bg-black text-pink-400 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty 🛍️</h2>
        <p className="mb-6 text-lg text-pink-300">
          Looks like you haven’t added anything cute yet!
        </p>
        <Link
          to="/"
          className="bg-pink-500 hover:bg-pink-600 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Go Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen px-6 py-12 mt-10 text-white">
      <h1 className="text-4xl font-extrabold text-center text-pink-400 mb-10 tracking-wide">
        💖 Your Baddie Box Cart 💖
      </h1>

      <div className="max-w-4xl mx-auto space-y-10">
        {cart.map((box) => (
          <div
            key={box.id}
            className="bg-black border-2 border-pink-500 rounded-3xl p-6 shadow-[0_0_25px_rgba(255,192,203,0.3)] transition-all hover:shadow-[0_0_40px_rgba(255,105,180,0.5)]"
          >
            <h2 className="text-2xl font-bold text-pink-400 mb-5 text-center">
              {box.name} 🎁 – Rs.{box.price}
            </h2>

            <div className="space-y-4">
              {box.items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-800 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-pink-400 shadow-[0_0_10px_rgba(255,192,203,0.4)]"
                    />
                    <div>
                      <p className="font-semibold text-lg text-pink-300">{item.name}</p>
                      <p className="text-sm text-pink-200">
                        Rs.{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-pink-400 text-right sm:text-left">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Grand Total */}
        <div className="bg-pink-950/40 border-2 border-pink-500 rounded-3xl p-6 text-center shadow-[0_0_30px_rgba(255,182,193,0.3)]">
          <h2 className="text-2xl font-extrabold text-pink-400 mb-6">
            Grand Total: Rs.{totalPrice.toFixed(2)}
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleProceedCheckout}
              className="bg-pink-500 hover:bg-pink-600 text-black font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            >
              Proceed to Checkout 💌
            </button>
            <button
              onClick={clearCart}
              className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-black font-semibold px-10 py-3 rounded-full shadow-md transition-all duration-300"
            >
              Clear Cart 🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
