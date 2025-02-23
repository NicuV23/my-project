import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatSection } from "./ChatSection";

const apiBaseUrl = "http://localhost:8080/api";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [currentUserId] = useState(1);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/main-events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch event details");

        const data = await response.json();

        data.currentParticipants = data.currentParticipants ?? 0;

        setEvent(data);

        const participantsResponse = await fetch(`${apiBaseUrl}/participants`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });

        if (!participantsResponse.ok)
          throw new Error("Failed to fetch participants");

        const participants = await participantsResponse.json();
        const userIsJoined = participants.some(
          (p) => p.userId === currentUserId && p.eventId === Number(id)
        );

        setIsJoined(userIsJoined);

        if (data.chatId) {
          const chatResponse = await fetch(
            `${apiBaseUrl}/messages/chats/${data.chatId}/messages`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          if (!chatResponse.ok)
            throw new Error("Failed to fetch chat messages");

          setChatMessages(await chatResponse.json());
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventDetails();
  }, [id, currentUserId]);

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

      setIsJoined(!isJoined);

      setEvent((prevEvent) => ({
        ...prevEvent,
        currentParticipants: isJoined
          ? prevEvent.currentParticipants - 1
          : prevEvent.currentParticipants + 1,
      }));
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
      setChatMessages((prev) => [...prev, newMessageData]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter] pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400">
              {event.eventDate} at {event.eventTime} | {event.location}
            </p>
            <p className="text-gray-300 mb-6">{event.description}</p>
            <p className="text-gray-300">
              <strong>
                {event.currentParticipants ?? 0}/{event.maxParticipants ?? 0}
              </strong>{" "}
              participants
            </p>
          </div>
          <button
            onClick={handleToggleJoin}
            className={`px-6 py-2 rounded-lg ${
              isJoined ? "bg-gray-600" : "bg-red-600"
            } text-white`}
          >
            {isJoined ? "Leave Event" : "Join Event"}
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
