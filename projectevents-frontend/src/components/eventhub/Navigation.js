import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth");
  };

  return (
    <nav className="bg-[#111] border-b border-red-800 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-0 sm:px-4"> {/* Ajustat pentru a avea px-0 la mobile și sm:px-4 la dispozitive mai mari */}
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
            EventHub
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 text-white hover:bg-red-600 rounded-lg"
            >
              All Events
            </button>
            <button
              onClick={() => navigate("/my-events")}
              className="px-4 py-2 text-white hover:bg-red-600 rounded-lg"
            >
              My Events
            </button>
            <button
              onClick={() => navigate("/create-event")}
              className="px-4 py-2 text-white hover:bg-red-600 rounded-lg"
            >
              Create Event
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
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
