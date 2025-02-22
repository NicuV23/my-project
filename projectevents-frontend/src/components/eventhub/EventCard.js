import React from "react";

const EventCard = ({ event, onToggleJoin }) => {
  const {
    id,
    title,
    date,
    time,
    location,
    participants,
    maxParticipants,
    category,
    description,
    isJoined,
  } = event;

  return (
    <article
      className="bg-[#111] rounded-lg overflow-hidden shadow-lg"
      role="article"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
            {category}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="space-y-2 text-gray-300">
          <p className="flex items-center">
            <span className="font-semibold mr-2">Date:</span> {date}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Time:</span> {time}
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Location:</span> {location}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-gray-400">
            <span className="font-semibold">{participants}</span>/
            {maxParticipants} participants
          </div>
          <button
            onClick={() => onToggleJoin(id)}
            className={`px-4 py-2 rounded-lg ${
              isJoined ? "bg-gray-600 text-white" : "bg-red-600 text-white"
            }`}
            aria-label={isJoined ? "Leave event" : "Join event"}
          >
            {isJoined ? "Leave" : "Join"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
