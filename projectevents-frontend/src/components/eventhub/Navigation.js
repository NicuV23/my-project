import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ currentView, setCurrentView }) => {
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
              onClick={() => setCurrentView("events")}
              className={`px-4 py-2 text-white ${
                currentView === "events" ? "bg-red-600 rounded-lg" : ""
              }`}
              role="tab"
              aria-selected={currentView === "events"}
              aria-controls="events-panel"
            >
              All Events
            </button>
            <button
              onClick={() => setCurrentView("myevents")}
              className={`px-4 py-2 text-white ${
                currentView === "myevents" ? "bg-red-600 rounded-lg" : ""
              }`}
              role="tab"
              aria-selected={currentView === "myevents"}
              aria-controls="myevents-panel"
            >
              My Events
            </button>
            <button
              onClick={() => setCurrentView("create")}
              className={`px-4 py-2 text-white ${
                currentView === "create" ? "bg-red-600 rounded-lg" : ""
              }`}
              role="tab"
              aria-selected={currentView === "create"}
              aria-controls="create-panel"
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
