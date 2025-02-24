import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatSection } from "./ChatSection";  // Asumând că aveți această componentă

const apiBaseUrl = "http://localhost:8080/api";

const MyEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId] = useState(parseInt(localStorage.getItem("userId"), 10));

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch event details");

        const data = await response.json();
        setEvent(data);

        // Assuming we have a chatId available in the event details
        if (data.chatId) {
          fetchChatMessages(data.chatId);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/messages/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch chat messages");

      const messages = await response.json();
      setChatMessages(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${apiBaseUrl}/messages/chats/${event.chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ content: newMessage, senderId: currentUserId }),
      });
      if (!response.ok) throw new Error("Failed to send message");

      const messageData = await response.json();
      setChatMessages(prev => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter] pt-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400">
              {event.eventDate} at {event.eventTime} | {event.location}
            </p>
            <p className="text-gray-300 mb-6">{event.description}</p>
            <p className="text-gray-300">
              <strong>1/{event.maxParticipants}</strong> participants
            </p>
          </div>
        </div>

        <ChatSection
          chat={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MyEventDetails;
