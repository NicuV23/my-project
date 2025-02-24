import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import EventCard from "./EventCard";

const apiBaseUrl = "http://localhost:8080/api";

const EventHub = () => {
  const [events, setEvents] = useState([]);
  const [gameTypes, setGameTypes] = useState({});
  const [selectedGameType, setSelectedGameType] = useState(""); 

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/game-types`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch game types");

        const data = await response.json();
        const gameTypeMap = data.reduce((acc, type) => {
          acc[type.id] = type.name;
          return acc;
        }, {});
        setGameTypes(gameTypeMap);
      } catch (error) {
        console.error("Error fetching game types:", error);
      }
    };

    fetchGameTypes();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedGameType
    ? events.filter(event => event.gameTypeId === parseInt(selectedGameType, 10))
    : events;

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 pt-20">
        <h2 className="text-white text-2xl mb-4">All Events</h2>

        <div className="mb-4">
          <label className="text-white mr-2">Filter by Category:</label>
          <select
            className="px-3 py-2 bg-[#111] text-white border border-gray-700 rounded-lg "
            value={selectedGameType}
            onChange={(e) => setSelectedGameType(e.target.value)}
          >
            <option value="">All Categories</option>
            {Object.entries(gameTypes).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.eventId} event={event} gameTypes={gameTypes} />
          ))}
        </div>
      </main>
    </>
  );
};

export default EventHub;