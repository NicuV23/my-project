import * as React from "react";
import { apiBaseUrl } from "../apiConfig";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onViewChange }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.jwt);
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-gray-400 mt-2">
          Please enter your details to sign in
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-700 bg-[#2a2a2a] text-red-500 focus:ring-red-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => onViewChange("forgot")}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        Sign in
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
  );
};
