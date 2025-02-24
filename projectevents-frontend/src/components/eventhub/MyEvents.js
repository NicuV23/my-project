import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import MyEventList from "./MyEventList";

const apiBaseUrl = "http://localhost:8080/api";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [gameTypes, setGameTypes] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedGameType, setSelectedGameType] = useState(""); // 🔥 Filtru

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setCurrentUserId(parseInt(userIdFromStorage, 10));
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
    if (currentUserId !== null) {
      const fetchMyEvents = async () => {
        try {
          const response = await fetch(
            `${apiBaseUrl}/main-events/user/${currentUserId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch my events");

          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error("Error fetching my events:", error);
        }
      };

      fetchMyEvents();
    }
  }, [currentUserId]);

  // ✅ Funcție pentru eliminarea evenimentului șters
  const handleDeleteEvent = (deletedEventId) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.eventId !== deletedEventId));
  };

  // ✅ Aplicăm filtrul de evenimente după gameTypeId
  const filteredEvents = selectedGameType
    ? events.filter(event => event.gameTypeId === parseInt(selectedGameType, 10))
    : events;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter]">
      <Navigation />
      <main className="container mx-auto px-4 pt-20">
        <h2 className="text-white text-2xl mb-4">My Events</h2>

        {/* 🔥 Dropdown pentru filtrare */}
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

        <MyEventList events={filteredEvents} gameTypes={gameTypes} onDelete={handleDeleteEvent} />
      </main>
    </div>
  );
};

export default MyEvents;