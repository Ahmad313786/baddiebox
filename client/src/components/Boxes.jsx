import React, { useState, useContext } from "react";
import { shopContext } from "../context/ShopContext";

import smallBoxImg from "../assets/small.jpg";
import mediumBoxImg from "../assets/medium.jpg";
import largeBoxImg from "../assets/large.jpg";


const Boxes = () => {
  const { products, addBoxToCart } = useContext(shopContext);

  const featuredBoxes = [
    {
      id: 1,
      name: "Small Box",
      min: 1099,
      max: 1499,
      image: smallBoxImg,
    },
    {
      id: 2,
      name: "Medium Box",
      min: 1599,
      max: 2299,
      image: mediumBoxImg,
    },
    {
      id: 3,
      name: "Large Box",
      min: 1999,
      max: 2999,
      image: largeBoxImg,
    },
  ];

  const [selectedBox, setSelectedBox] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);

  const handleQuantityChange = (id, price, qty) => {
    const q = Math.max(0, parseInt(qty) || 0);
    const updated = { ...quantities, [id]: q };
    setQuantities(updated);

    let newTotal = 0;
    products.forEach((p) => {
      newTotal += (updated[p._id] || 0) * p.price;
    });
    setTotal(newTotal);
  };

  const confirmBox = () => {
    const chosenItems = products
      .filter((p) => quantities[p._id] > 0)
      .map((p) => ({
        _id: p._id,
        name: p.name,
        price: p.price,
        quantity: quantities[p._id],
        // ✅ Fix: ensure the correct image field is used
        image:
          p.image || p.img || p.imageUrl || (Array.isArray(p.images) ? p.images[0] : p.images) || "",
      }));

    console.log("🧩 Items being sent:", chosenItems); // temporary check

    addBoxToCart(selectedBox.name, chosenItems, total);
    setSelectedBox(null);
    setQuantities({});
    setTotal(0);
  };

  return (
    <section
      id="boxes"
      className="relative px-4 sm:px-10 md:px-20 py-16 bg-gradient-to-b from-black to-pink-950/30 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-transparent blur-3xl opacity-50"></div>

      <h2 className="text-4xl md:text-5xl text-center font-extrabold text-pink-500 mb-14 relative z-10">
        Featured Boxes
      </h2>

      {/* Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {featuredBoxes.map((box) => (
          <div
            key={box.id}
            className="group border border-pink-500/30 rounded-2xl p-6 text-center bg-black/90 backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="relative flex justify-center">
              <img
                src={box.image}
                alt={box.name}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full mb-5 border-4 border-pink-500 group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{box.name}</h3>
            <p className="mb-4 text-pink-400 font-medium">
              Rs.{box.min} – Rs.{box.max}
            </p>
            <button
              onClick={() => {
                setSelectedBox(box);
                setQuantities({});
                setTotal(0);
              }}
              className="bg-pink-600 hover:bg-pink-500 text-black font-semibold px-8 py-2 rounded-full transition-all duration-300"
            >
              Build Box
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4 backdrop-blur-sm">
          <div className="bg-black text-white w-full max-w-lg rounded-2xl p-8 shadow-[0_0_30px_rgba(236,72,153,0.3)] relative border border-pink-500/40">
            <button
              onClick={() => setSelectedBox(null)}
              className="absolute top-4 right-5 text-pink-400 hover:text-pink-500 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold text-pink-500 mb-4">
              {selectedBox.name}
            </h3>
            <p className="text-pink-300 mb-4">Select items for your box:</p>

            <div className="max-h-64 overflow-y-auto space-y-4 mb-6 pr-2">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between border-b border-pink-800/30 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        p.image ||
                        p.img ||
                        p.imageUrl ||
                        (Array.isArray(p.images) ? p.images[0] : p.images) ||
                        "/placeholder.jpg"
                      }
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md border border-pink-500/40"
                    />
                    <span className="font-medium text-sm sm:text-base text-white">
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-400 text-sm">Rs.{p.price}</span>
                    <input
                      type="number"
                      min="0"
                      value={quantities[p._id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(p._id, p.price, e.target.value)
                      }
                      className="w-16 px-2 py-1 border border-pink-600 rounded text-center bg-black text-white focus:outline-none focus:border-pink-400 h-9"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <p
              className={`text-lg font-semibold mb-4 ${
                total < selectedBox.min || total > selectedBox.max
                  ? "text-red-500"
                  : "text-pink-400"
              }`}
            >
              Total: Rs.{total}
            </p>

            <div className="flex justify-center flex-wrap gap-4">
              <button
                disabled={
                  total < selectedBox.min ||
                  total > selectedBox.max ||
                  total === 0
                }
                onClick={confirmBox}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  total < selectedBox.min ||
                  total > selectedBox.max ||
                  total === 0
                    ? "bg-pink-950/40 text-pink-300 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-500 text-black"
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedBox(null)}
                className="border border-pink-500 text-pink-400 px-6 py-2 rounded-full font-semibold hover:bg-pink-500/10 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Boxes;
