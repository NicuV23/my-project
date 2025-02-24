import * as React from "react";
import { apiBaseUrl } from "../apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterForm = ({ onViewChange }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Registration failed!");
        throw new Error(data.error || "Registration failed!");
      }

      toast.success("Account created successfully!");
      setTimeout(() => onViewChange("login"), 1500);
    } catch (error) {
      console.error("❌ Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-gray-400 mt-2">Join EventHub to discover amazing events</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Create a password"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onViewChange("login")}
            className="text-red-500 hover:text-red-400"
          >
            Sign in
          </button>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};
