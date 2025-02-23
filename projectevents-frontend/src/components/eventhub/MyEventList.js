import React from "react";
import MyEventCard from "./MyEventCard";

const MyEventList = ({ events, gameTypes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <MyEventCard key={event.eventId} event={event} gameTypes={gameTypes} />
      ))}
    </div>
  );
};

export default MyEventList;
