import React, { useEffect, useState } from "react";

function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents([
      { id: 1, name: "Morning Yoga", location: "Park", maxParticipants: 15 },
      {
        id: 2,
        name: "Tech Meetup",
        location: "Community Hall",
        maxParticipants: 100,
      },
      {
        id: 3,
        name: "Live Concert",
        location: "Downtown",
        maxParticipants: 500,
      },
    ]);
  }, []);

  return (
    <div className="container">
      <h1>Event List</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>Location: {event.location}</p>
          <p>Max Participants: {event.maxParticipants}</p>
        </div>
      ))}
    </div>
  );
}

export default EventListPage;
