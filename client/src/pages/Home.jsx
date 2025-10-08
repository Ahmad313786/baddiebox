import React from "react";
import { Link } from "react-router-dom";
import Boxes from "../components/Boxes";

const Home = () => {
  return (
    <div className="bg-black text-gray-200 min-h-screen overflow-x-hidden mt-10">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 md:px-12 py-20 bg-gradient-to-b from-pink-800/30 to-black">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-500 tracking-wide drop-shadow-lg">
          Welcome to <span className="text-pink-400">BaddieBox</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
          Chic, cute & curated gift boxes filled with girly must-haves like{" "}
          <span className="text-pink-400">pins</span>,{" "}
          <span className="text-pink-400">nail cutters</span>, and self-care
          surprises.
        </p>
        <a href="#boxes">
          <button className="mt-10 bg-pink-600 text-black font-semibold py-3 px-10 rounded-full shadow-md hover:bg-pink-700 hover:scale-105 transition-all duration-300">
            Shop Now
          </button>
        </a>
        <div className="absolute bottom-5 animate-bounce text-pink-400 text-sm">
          ↓ Scroll Down ↓
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 sm:px-10 md:px-20 py-16 text-center bg-black/70 border-t border-pink-800/20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-pink-500 mb-6">
          Why BaddieBox?
        </h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed">
          Because every girl deserves a little sparkle! We handpick adorable
          goodies and self-care treats to create gift boxes that bring{" "}
          <span className="text-pink-400 font-medium">
            joy, confidence, and pink magic
          </span>{" "}
          to your everyday life.
        </p>
        <Link to="/about">
          <button className="mt-8 border border-pink-500 text-pink-400 font-medium px-8 py-3 rounded-full hover:bg-pink-600 hover:text-black transition-all duration-300">
            Learn More
          </button>
        </Link>
      </section>

      {/* Featured Boxes */}
      <div id="boxes" className="py-10 px-4 sm:px-10 md:px-20 bg-gradient-to-b from-black to-pink-900/10">
        <Boxes />
      </div>

      {/* Call To Action */}
      <section className="px-6 sm:px-10 md:px-20 py-16 text-center bg-black/80 border-t border-pink-700/20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-pink-500 mb-6">
          Ready to Treat Yourself?
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
          Whether it’s for a bestie or a self-care day, our boxes are packed
          with happiness and cuteness. Your perfect{" "}
          <span className="text-pink-400">BaddieBox</span> is waiting!
        </p>
        <a href="#boxes">
          <button className="bg-pink-600 text-black font-semibold py-3 px-10 rounded-full hover:bg-pink-700 hover:scale-105 transition-all duration-300 shadow-md">
            Start Shopping
          </button>
        </a>
      </section>
    </div>
  );
};

export default Home;
