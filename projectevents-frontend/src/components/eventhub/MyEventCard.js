import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/api";

const MyEventCard = ({ event, gameTypes, onDelete }) => {
  const navigate = useNavigate();
  const [currentParticipants, setCurrentParticipants] = useState(event.currentParticipants);
  const [isOwner, setIsOwner] = useState(false);
  const currentUserId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const eventResponse = await fetch(`${apiBaseUrl}/main-events/${event.eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!eventResponse.ok) throw new Error("Failed to fetch event details");

        const eventData = await eventResponse.json();
        setCurrentParticipants(eventData.currentParticipants);
        setIsOwner(eventData.creatorId === currentUserId);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [event.eventId, currentUserId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${event.name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiBaseUrl}/main-events/${event.eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      if (!response.ok) throw new Error("Failed to delete event");

      onDelete(event.eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <article className="bg-[#111] rounded-lg overflow-hidden shadow-lg p-6" role="article">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-white">{event.name}</h2>
        <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
          {gameTypes[event.gameTypeId] || "Unknown Category"}
        </span>
      </div>

      <p className="text-gray-400 mb-4">{event.description}</p>

      <div className="space-y-2 text-gray-300">
        <p>📅 Date: {event.eventDate}</p>
        <p>⏰ Time: {event.eventTime}</p>
        <p>📍 Location: {event.location}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-400">
          <span className="font-semibold">{currentParticipants} / {event.maxParticipants}</span> participants
        </div>

        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
            onClick={() => navigate(`/my-events/${event.eventId}`)}
          >
            View
          </button>

          <button
            className="bg-white text-red-600 px-3 py-2 rounded-lg"
            onClick={() => navigate(`/my-events/edit/${event.eventId}`)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 text-white px-3 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default MyEventCard;