import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatSection } from "./ChatSection";
const apiBaseUrl = "http://localhost:8080/api";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch event details");
        setEvent(data);

        if (data.chatId) {
          const chatResponse = await fetch(
            `${apiBaseUrl}/messages/chats/${data.chatId}/messages`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          const chatData = await chatResponse.json();
          if (!chatResponse.ok)
            throw new Error("Failed to fetch chat messages");
          setChatMessages(chatData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

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
          body: JSON.stringify({ content: newMessage, senderId: 1 }),
        }
      );
      if (!response.ok) throw new Error("Failed to send message");
      const messageData = await response.json();
      setChatMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter] pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400">
              {event.date} at {event.time} | {event.location}
            </p>
            <p className="text-gray-300 mb-6">{event.description}</p>
          </div>
          <button
            onClick={handleSendMessage}
            className={`px-6 py-2 rounded-lg ${
              event.isJoined ? "bg-gray-600" : "bg-red-600"
            } text-white`}
          >
            {event.isJoined ? "Leave Event" : "Join Event"}
          </button>
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
