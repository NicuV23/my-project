import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ events, gameTypes }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.eventId}
          className="bg-gray-900 p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold text-white">{event.name}</h3>
          <p className="text-gray-400">{event.location}</p>
          <p className="text-gray-400">
            Max Participants: {event.maxParticipants}
          </p>
          <p className="text-gray-400">Date: {event.eventDate}</p>
          <p className="text-gray-400">Time: {event.eventTime}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigate(`/my-events/${event.eventId}`)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/my-events/edit/${event.eventId}`)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
