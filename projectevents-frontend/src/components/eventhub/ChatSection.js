export const ChatSection = ({
  chat = [], // Default to an empty array if chat is undefined
  newMessage,
  setNewMessage,
  onSendMessage,
}) => {
  return (
    <div className="bg-[#111] rounded-lg p-4 mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">Event Chat</h3>
      <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
        {chat.length > 0 ? (
          chat.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    User {message.senderId}
                  </span>{" "}
                  {/* Adjust if you have username */}
                  <span className="text-gray-400 text-sm">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-300">{message.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages in the chat yet.</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-[#222] text-white rounded px-4 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={onSendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};
