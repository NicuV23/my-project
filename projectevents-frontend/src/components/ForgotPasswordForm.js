import * as React from "react";

export const ForgotPasswordForm = ({ onViewChange }) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
        <p className="text-gray-400 mt-2">
          Enter your email and we'll send you instructions to reset your
          password
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
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        Send reset instructions
      </button>

      <p className="text-center text-gray-400 text-sm">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => onViewChange("login")}
          className="text-red-500 hover:text-red-400"
        >
          Back to login
        </button>
      </p>
    </form>
  );
};
