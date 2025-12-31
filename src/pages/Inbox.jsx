import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Inbox() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello Raju, nice to meet you 👋", sender: "me" },
    { text: "Hi! Nice to meet you too 😊", sender: "them" },
  ]);

  const users = [
    {
      id: 1,
      name: "Raju",
      avatar: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
      lastMessage: "Hi, how are you?",
    },
  ];

  const sendMessage = () => {
    if (!text.trim()) return;

    setMessages([...messages, { text, sender: "me" }]);
    setText("");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-[250px] bg-white shadow-lg z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[250px] flex w-full p-6 gap-6">

        {/* Chat List */}
        <div className="w-[300px] bg-white rounded-2xl shadow-md p-4">
          <input
            type="text"
            placeholder="Search Messenger"
            className="w-full px-4 py-2 border rounded-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                ${selectedUser?.id === user.id ? "bg-blue-100" : "hover:bg-blue-50"}`}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.avatar}
                  alt=""
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {user.name}
                  </h4>
                  <p className="text-sm text-gray-500 truncate w-40">
                    {user.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedUser ? (
          <div className="flex-1 bg-white rounded-2xl shadow-md flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b">
              <img
                className="w-10 h-10 rounded-full"
                src={selectedUser.avatar}
                alt=""
              />
              <div>
                <p className="font-semibold">{selectedUser.name}</p>
             
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-md shadow
                    ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex items-center gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                type="text"
                placeholder="Write a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-full shadow"
              >
                Send
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl shadow-md flex items-center justify-center text-gray-400 text-lg">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
