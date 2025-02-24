import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/api";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    gameTypeId: "",
    maxParticipants: "",
    creatorId: "",
    currentParticipants: 1,
  });

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setCurrentUserId(parseInt(userIdFromStorage, 10));
      setFormData((prev) => ({ ...prev, creatorId: parseInt(userIdFromStorage, 10) }));
    }
  }, []);

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/game-types`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch game types");

        const data = await response.json();
        setGameTypes(data);
      } catch (error) {
        console.error("Error fetching game types:", error);
      }
    };

    fetchGameTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/main-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      const newEvent = await response.json();
      console.log("✅ Event created successfully!");

      await fetch(
        `${apiBaseUrl}/participants/toggle?userId=${formData.creatorId}&eventId=${newEvent.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("✅ Creator added as a participant!");
      navigate("/my-events");
    } catch (error) {
      console.error("❌ Error creating event:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto  bg-[#111] p-6 rounded-lg shadow-md relative">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-4 left-4 text-white flex items-center gap-2 hover:text-gray-300 transition"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold text-white mb-6 text-center">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Time</label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2">Category</label>
          <select
            name="gameTypeId"
            value={formData.gameTypeId}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#111] text-white border border-gray-700 rounded-lg "
            required
          >
            <option value="">Select category</option>
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;