import React from "react";
import { useNavigate } from "react-router-dom";

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

  const handleViewDetails = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <article
      className="bg-[#111] rounded-lg overflow-hidden shadow-lg p-6"
      role="article"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-white">{name}</h2>
        <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
          {category}
        </span>
      </div>

      <p className="text-gray-400 mb-4">{description}</p>

      <div className="space-y-2 text-gray-300">
        <p className="flex items-center">
          <span className="font-semibold mr-2">📅 Date:</span> {eventDate}
        </p>
        <p className="flex items-center">
          <span className="font-semibold mr-2">⏰ Time:</span> {eventTime}
        </p>
        <p className="flex items-center">
          <span className="font-semibold mr-2">📍 Location:</span> {location}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-gray-400">
          <span className="font-semibold">{maxParticipants}</span> participants
        </div>
        <button
          onClick={handleViewDetails}
          className="px-4 py-2 rounded-lg bg-red-600 text-white"
        >
          View
        </button>
      </div>
    </article>
  );
};

export default EventCard;
