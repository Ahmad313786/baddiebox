import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";

const Collection = () => {
  const { products } = useContext(shopContext);

  return (
    <div className="bg-black min-h-screen py-16 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-500 tracking-wide mb-3">
          Our Collection
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Explore our curated range of BaddieBox goodies — chic, girly, and
          totally unique.
        </p>
      </div>

      {/* Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((item) => (
          <div
            key={item._id}
            className="group rounded-xl overflow-hidden border border-pink-600 hover:border-pink-400 transition-all duration-300"
          >
            {/* Product Image */}
            <div className="overflow-hidden">
              <img
                src={item.images}
                alt={item.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-500 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <p className="text-white font-bold text-lg">
                Rs. {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No products available at the moment.
        </p>
      )}
    </div>
  );
};

export default Collection;
