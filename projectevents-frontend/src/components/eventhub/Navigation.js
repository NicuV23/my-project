import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth");
  };

  return (
    <nav
      className="bg-[#111] border-b border-gray-800 fixed w-full top-0 z-50"
      role="navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
            EventHub
          </div>
          <div className="flex space-x-4" role="tablist">
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 text-white"
            >
              All Events
            </button>
            <button
              onClick={() => navigate("/my-events")}
              className="px-4 py-2 text-white"
            >
              My Events
            </button>
            <button
              onClick={() => navigate("/home?view=create")}
              className="px-4 py-2 text-white"
            >
              Create Event
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
