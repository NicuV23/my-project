import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/api";

const EventCard = ({ event, gameTypes }) => {
  const navigate = useNavigate();
  const {
    eventId,
    name,
    eventDate,
    eventTime,
    location,
    maxParticipants,
    description,
    gameTypeId,
  } = event;

  const category = gameTypes[gameTypeId] || "Unknown Category";
  const [currentParticipants, setCurrentParticipants] = useState(event.currentParticipants);
  const [isJoined, setIsJoined] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const currentUserId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const eventResponse = await fetch(`${apiBaseUrl}/main-events/${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!eventResponse.ok) throw new Error("Failed to fetch event details");

        const eventData = await eventResponse.json();
        setCurrentParticipants(eventData.currentParticipants);
        setIsOwner(eventData.creatorId === currentUserId);

        const participantsResponse = await fetch(`${apiBaseUrl}/participants?eventId=${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!participantsResponse.ok) throw new Error("Failed to fetch participants");

        const participants = await participantsResponse.json();
        setIsJoined(participants.some((p) => p.userId === currentUserId));
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [eventId, currentUserId]);

  return (
    <article className="bg-[#111] rounded-lg overflow-hidden shadow-lg p-6" role="article">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">{category}</span>
      </div>

      <p className="text-gray-400 mb-4">{description}</p>

      <div className="space-y-2 text-gray-300">
        <p>📅 Date: {eventDate}</p>
        <p>⏰ Time: {eventTime}</p>
        <p>📍 Location: {location}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-400">
          <span className="font-semibold">{currentParticipants} / {maxParticipants}</span> participants
        </div>

        <button onClick={() => navigate(`/events/${eventId}`)} className="px-4 py-2 rounded-lg bg-red-600 text-white">
          View
        </button>
      </div>
    </article>
  );
};

export default EventCard;
