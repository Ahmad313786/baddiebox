import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/">
            <p className="text-pink-600 text-3xl font-bold tracking-wide">
              Baddie<span className="text-white">Box</span>
            </p>
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            Gift boxes so customized, you'll think we made them just for you 🎀  
            Advance Payment Only 🌸 Delivery All Over Pakistan 🌷💗
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-pink-500 text-xl font-semibold mb-4">Company</p>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-pink-400 transition">About</Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-pink-400 transition">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-pink-400 transition">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-pink-500 text-xl font-semibold mb-4">Get in Touch</p>
          <ul className="space-y-2 text-gray-300">
            <li>📞 +92 324 7316502</li>
            <li>📧 ah2319655@gmail.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-pink-500 text-xl font-semibold mb-4">Follow Us</p>
          <div className="flex gap-4 text-gray-300">
            <a href="#" className="hover:text-pink-400 transition">Instagram</a>
            <a href="#" className="hover:text-pink-400 transition">Facebook</a>
            <a href="#" className="hover:text-pink-400 transition">TikTok</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center text-sm text-gray-400 py-4">
        © 2025 BaddieBox — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
