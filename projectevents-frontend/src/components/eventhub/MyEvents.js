import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import MyEventList from "./MyEventList";

const apiBaseUrl = "http://localhost:8080/api";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [gameTypes, setGameTypes] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setCurrentUserId(parseInt(userIdFromStorage, 10));
      console.log("User ID from localStorage:", userIdFromStorage);
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
          console.log("My events fetched:", data);
        } catch (error) {
          console.error("Error fetching my events:", error);
        }
      };

      fetchMyEvents();
    }
  }, [currentUserId]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter]">
      <Navigation />
      <main className="container mx-auto px-4 pt-20">
        <h2 className="text-white text-2xl mb-4">My Events</h2>
        <MyEventList events={events} gameTypes={gameTypes} />
      </main>
    </div>
  );
};

export default MyEvents;
