import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../apiConfig";

function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/main-events`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="container">
      <h1>Event List</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>Location: {event.location}</p>
          <p>Max Participants: {event.maxParticipants}</p>
          <Link to={`/events/${event.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default EventListPage;
