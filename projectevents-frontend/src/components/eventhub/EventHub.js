import React, { useState } from "react";
import Navigation from "./Navigation";
import EventList from "./EventList";
import CreateEvent from "./CreateEvent";
import { useEffect } from "react";

const EventHub = () => {
  const [currentView, setCurrentView] = useState("events");
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2024-07-15",
      time: "18:00",
      location: "Central Park, New York",
      participants: 128,
      maxParticipants: 200,
      category: "Music",
      image: "https://placehold.co/800x400",
      description:
        "A vibrant music festival featuring top artists and local talents.",
      isJoined: false,
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "2024-08-20",
      time: "09:00",
      location: "Convention Center, San Francisco",
      participants: 256,
      maxParticipants: 300,
      category: "Technology",
      image: "https://placehold.co/800x400",
      description: "Explore the latest in technology and innovation.",
      isJoined: true,
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "2024-09-10",
      time: "14:00",
      location: "Grand Hotel, Chicago",
      participants: 75,
      maxParticipants: 100,
      category: "Food",
      image: "https://placehold.co/800x400",
      description: "Experience culinary excellence and wine tasting.",
      isJoined: false,
    },
  ]);

  const handleToggleJoin = (eventId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isJoined: !event.isJoined,
              participants: event.isJoined
                ? event.participants - 1
                : event.participants + 1,
            }
          : event
      )
    );
  };

  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
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
            onToggleJoin={handleToggleJoin}
          />
        )}
        {currentView === "create" && <CreateEvent />}
      </main>
    </div>
  );
};

export default EventHub;
