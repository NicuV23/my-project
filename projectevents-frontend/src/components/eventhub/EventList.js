import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, onToggleJoin }) => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Events list"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} onToggleJoin={onToggleJoin} />
      ))}
    </div>
  );
};

export default EventList;
