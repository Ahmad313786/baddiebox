import React, { useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call new admin login endpoint
      const response = await axios.post(`${backendURL}/api/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;

        // Save token locally (optional)
        localStorage.setItem("adminToken", token);

        // Update token in state
        setToken(token);

        toast.success("Login successful 🎉");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-black"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-black"
              type="password"
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-900 transition-all"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
