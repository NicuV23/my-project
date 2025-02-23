import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, gameTypes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} gameTypes={gameTypes} />
      ))}
    </div>
  );
};

export default EventList;
