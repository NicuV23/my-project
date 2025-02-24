import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Importăm useNavigate
import { ChatSection } from "./ChatSection";

const apiBaseUrl = "http://localhost:8080/api";

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Folosim navigate pentru butonul de back
  const [event, setEvent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [currentParticipants, setCurrentParticipants] = useState(0);
  const currentUserId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch event details");

        const data = await response.json();
        setEvent(data);
        setCurrentParticipants(data.currentParticipants);

        // Check if user is the creator
        setIsOwner(data.creatorId === currentUserId);

        // Fetch participants
        const participantsResponse = await fetch(`${apiBaseUrl}/participants?eventId=${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!participantsResponse.ok) throw new Error("Failed to fetch participants");

        const participants = await participantsResponse.json();
        setIsJoined(participants.some((p) => p.userId === currentUserId));

        // Fetch chat messages
        if (data.chatId) {
          fetchChatMessages(data.chatId);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id, currentUserId]);

  // Function to fetch chat messages
  const fetchChatMessages = async (chatId) => {
    try {
      const chatResponse = await fetch(`${apiBaseUrl}/messages/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      if (!chatResponse.ok) throw new Error("Failed to fetch chat messages");

      const chatData = await chatResponse.json();
      setChatMessages(chatData);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleToggleJoin = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/participants/toggle?userId=${currentUserId}&eventId=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle participation");

      // Fetch updated event data after join/leave
      const updatedResponse = await fetch(`${apiBaseUrl}/main-events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      if (!updatedResponse.ok) throw new Error("Failed to fetch updated event");

      const updatedEvent = await updatedResponse.json();
      setCurrentParticipants(updatedEvent.currentParticipants);
      setIsJoined(!isJoined);
    } catch (error) {
      console.error("Error toggling participation:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !event?.chatId) return;

    try {
      const response = await fetch(
        `${apiBaseUrl}/messages/chats/${event.chatId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            content: newMessage,
            senderId: currentUserId,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      const newMessageData = await response.json();
      setChatMessages((prev) => [...prev, newMessageData]); // Append new message
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter] pt-20">
      <div className="max-w-4xl mx-auto">
        {/* 🔙 Butonul de Back */}
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
              <strong>
                {currentParticipants} / {event.maxParticipants}
              </strong>{" "}
              participants
            </p>
          </div>

          {isOwner ? (
            <button className="px-6 py-2 rounded-lg bg-gray-600 text-white cursor-not-allowed">
              You are the creator
            </button>
          ) : currentParticipants >= event.maxParticipants ? (
            <button className="px-6 py-2 rounded-lg bg-gray-600 text-white cursor-not-allowed">
              Event is Full
            </button>
          ) : (
            <button
              onClick={handleToggleJoin}
              className={`px-6 py-2 rounded-lg ${isJoined ? "bg-gray-600" : "bg-red-600"} text-white`}
            >
              {isJoined ? "Leave Event" : "Join Event"}
            </button>
          )}
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
