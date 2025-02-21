import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../apiConfig";

function EventDetailsPage() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const eventResponse = await fetch(`${apiBaseUrl}/main-events/${id}`);
        const eventData = await eventResponse.json();
        setEventDetails(eventData);

        if (eventData.chatId) {
          const messagesResponse = await fetch(
            `${apiBaseUrl}/chat/${eventData.chatId}/messages`
          );
          const messagesData = await messagesResponse.json();
          setMessages(messagesData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageData = { content: newMessage, chatId: eventDetails.chatId };
    try {
      await fetch(`${apiBaseUrl}/chat/${eventDetails.chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      setMessages([...messages, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default EventDetailsPage;
