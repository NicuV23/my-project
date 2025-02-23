import React from "react";
import { useNavigate } from "react-router-dom";

const MyEventCard = ({ event, gameTypes }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white">{event.name}</h3>
      <p className="text-gray-400">{gameTypes[event.gameTypeId]}</p>
      <p className="text-gray-400">
        {event.eventDate} at {event.eventTime}
      </p>
      <p className="text-gray-300">{event.location}</p>

      <div className="flex space-x-2 mt-4">
        {/* Buton pentru vizualizare */}
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          onClick={() => navigate(`/my-events/${event.eventId}`)}
        >
          View
        </button>

        {/* Buton pentru editare */}
        <button
          className="bg-yellow-500 text-black px-3 py-2 rounded-lg"
          onClick={() => navigate(`/my-events/edit/${event.eventId}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default MyEventCard;
