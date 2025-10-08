import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { shopContext } from "../context/ShopContext";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const { backendURL } = useContext(shopContext);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${backendURL}/api/user/login`, form);

      if (res.data.success) {
        // ✅ Save token & user info in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/"); // redirect to homepage or dashboard
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Mock social login handlers (keep as-is)
  const handleGoogleLogin = () => alert("Google Login coming soon!");
  const handleFacebookLogin = () => alert("Facebook Login coming soon!");

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 border border-pink-600 mt-20">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-pink-500">Baddie</span>
            <span className="text-white">Box</span>
          </h1>
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-pink-400 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-300 text-center mb-8 text-sm">
          Login to explore your favorite goodies ✨
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Login Buttons (unchanged) */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black font-medium rounded-lg shadow hover:bg-gray-100 transition-all duration-300"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-3 w-full py-3 bg-[#1877F2] text-white font-medium rounded-lg shadow hover:bg-[#0f5dc0] transition-all duration-300"
          >
            <FaFacebookF className="text-white text-lg" />
            Continue with Facebook
          </button>
        </div>

        {/* Extra Links */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <Link to="#" className="hover:text-pink-400">
            Forgot Password?
          </Link>
          <Link to="/register" className="hover:text-pink-400">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
