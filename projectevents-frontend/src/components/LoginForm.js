import * as React from "react";
import { apiBaseUrl } from "../apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onViewChange }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        toast.error(data.error || "Login failed!");
        throw new Error(data.error || "Login failed!");
      }

      localStorage.setItem("jwt", data.jwt);
      if (data.userId) {
        localStorage.setItem("userId", String(data.userId));
        console.log("User ID saved in localStorage:", data.userId);
      } else {
        console.error("userId is missing from API response!");
      }

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-400 mt-2">Enter your credentials to log in</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign in"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onViewChange("register")}
            className="text-red-500 hover:text-red-400"
          >
            Sign up
          </button>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};
