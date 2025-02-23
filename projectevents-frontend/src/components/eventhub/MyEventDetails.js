import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/api";

const MyEventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch event details");

        const data = await response.json();
        setEvent({ ...data, currentParticipants: 1 }); 
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter] pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white">{event.name}</h1>
        <p className="text-gray-400">
          {event.eventDate} at {event.eventTime} | {event.location}
        </p>
        <p className="text-gray-300 mb-6">{event.description}</p>
        <p className="text-gray-300">
          <strong>1/{event.maxParticipants}</strong> participants
        </p>
      </div>
    </div>
  );
};

export default MyEventDetails;
