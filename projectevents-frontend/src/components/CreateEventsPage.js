import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../apiConfig";

function CreateEventPage() {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [gameTypeId, setGameTypeId] = useState("");
  const [gameTypes, setGameTypes] = useState([]);

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/game-types`);
        if (!response.ok) {
          throw new Error("Failed to fetch game types");
        }
        const data = await response.json();
        setGameTypes(data);
      } catch (error) {
        console.error("Error fetching game types:", error);
      }
    };

    fetchGameTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const eventData = {
      name: eventName,
      location: eventLocation,
      maxParticipants: parseInt(maxParticipants, 10),
      gameTypeId: parseInt(gameTypeId, 10),
    };

    try {
      const response = await fetch(`${apiBaseUrl}/main-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event. Please try again.");
      }

      const result = await response.json();
      console.log("Event created successfully:", result);
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">
            Event Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventLocation" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="eventLocation"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxParticipants" className="form-label">
            Max Participants:
          </label>
          <input
            type="number"
            className="form-control"
            id="maxParticipants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gameTypeId" className="form-label">
            Game Type:
          </label>
          <select
            className="form-select"
            id="gameTypeId"
            value={gameTypeId}
            onChange={(e) => setGameTypeId(e.target.value)}
            required
          >
            <option value="">Select Game Type</option>
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
