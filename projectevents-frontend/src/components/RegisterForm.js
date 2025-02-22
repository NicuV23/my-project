import * as React from "react";
import { apiBaseUrl } from "../apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterForm = ({ onViewChange }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      toast.success("Account created successfully!");
      console.log("Success:", data);
    } catch (error) {
      toast.error(error);
      console.error("Error:", error.error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-gray-400 mt-2">
            Join EventHub to discover amazing events
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-700 text-white focus:outline-none focus:border-red-500"
              placeholder="Create a password"
              required
            />
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
