import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EventDetailsPage() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setEventDetails(data));

    fetch(`/api/chat/${id}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, [id]);

  const handleSendMessage = () => {
    const messageData = { content: newMessage, chatId: id };
    fetch(`/api/chat/${id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    })
      .then(() => {
        setMessages([...messages, messageData]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container">
      <h1>{eventDetails.name}</h1>
      <p>Location: {eventDetails.location}</p>
      <p>Max Participants: {eventDetails.maxParticipants}</p>
      <div className="chat">
        <h2>Chat</h2>
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id}>{msg.content}</div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default EventDetailsPage;
