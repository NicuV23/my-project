import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";

const apiBaseUrl = "http://localhost:8080/api";

const EventHub = () => {
  const [currentView, setCurrentView] = useState("events");
  const [events, setEvents] = useState([]);
  const [gameTypes, setGameTypes] = useState({});

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

    fetchGameTypes();
    fetchEvents();
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter]">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto px-4 pt-20">
        {(currentView === "events" || currentView === "myevents") && (
          <EventList
            events={
              currentView === "myevents"
                ? events.filter((event) => event.isJoined)
                : events
            }
            gameTypes={gameTypes}
          />
        )}
        {currentView === "create" && <CreateEvent />}
      </main>
    </div>
  );
};

export default EventHub;
