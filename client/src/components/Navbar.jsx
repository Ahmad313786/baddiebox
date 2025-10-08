import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import { shopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(shopContext);

  // ✅ Check login status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setVisible(false);
    navigate("/");
  };

  const handleProfileClick = () => setVisible(false);

  // ✅ Count items in cart
  const cartCount = cart?.length || 0;

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50  shadow-[0_0_10px_-3px_rgba(236,72,153,0.4)]">
      <div className="flex items-center justify-between container mx-auto py-4 px-4 font-medium">
        {/* Logo */}
        <Link to="/" onClick={() => setVisible(false)}>
          <p className="text-pink-600 text-2xl font-bold">
            Baddie<span className="text-white">Box</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-sm">
          {[
            { name: "HOME", path: "/" },
            { name: "COLLECTION", path: "/collection" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:text-pink-500 transition ${
                  isActive ? "text-pink-500" : "text-gray-300"
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* ✅ Orders Link (only if logged in) */}
          {isLoggedIn && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `hover:text-pink-500 transition ${
                  isActive ? "text-pink-500" : "text-gray-300"
                }`
              }
            >
              ORDERS
            </NavLink>
          )}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-300 relative">
          <FiSearch className="w-5 h-5 cursor-pointer hover:text-pink-500" />

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-pink-500 transition"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          ) : (
            <Link to="/login" onClick={handleProfileClick}>
              <FiUser className="w-5 h-5 cursor-pointer hover:text-pink-500" />
            </Link>
          )}

          {/* ✅ Cart with count */}
          <Link to="/cart" className="relative">
            <FiShoppingCart className="w-5 h-5 cursor-pointer hover:text-pink-500" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <FiMenu
            onClick={() => setVisible(true)}
            className="w-6 h-6 cursor-pointer sm:hidden hover:text-pink-500"
          />
        </div>

        {/* ✅ Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full bg-black/95 text-gray-200 transition-all duration-500 sm:hidden flex flex-col ${
            visible ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b border-pink-700">
            <p className="text-pink-500 text-xl font-bold">Menu</p>
            <FiX
              onClick={() => setVisible(false)}
              className="w-6 h-6 cursor-pointer hover:text-pink-500"
            />
          </div>

          <nav className="flex flex-col mt-6 gap-4 px-6">
            {[
              { name: "HOME", path: "/" },
              { name: "COLLECTION", path: "/collection" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
            ].map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 text-lg border-b border-gray-700 hover:text-pink-500 transition ${
                    isActive ? "text-pink-500" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ))}

            {/* ✅ Orders (Mobile only if logged in) */}
            {isLoggedIn && (
              <NavLink
                to="/orders"
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 text-lg border-b border-gray-700 hover:text-pink-500 transition ${
                    isActive ? "text-pink-500" : ""
                  }`
                }
              >
                ORDERS
              </NavLink>
            )}

            {/* ✅ Login / Logout */}
            <div className="py-2 border-b border-gray-700">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-lg hover:text-pink-500 transition w-full text-left"
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setVisible(false)}
                  className="flex items-center gap-2 text-lg hover:text-pink-500 transition"
                >
                  <FiUser className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
