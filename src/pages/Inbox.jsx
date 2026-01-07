import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { getReceiverAPI, sendMessageAPI, getConversationsAPI, getConversationMessagesAPI, createConversationAPI, deleteMessageAPI, deleteConversationAPI, searchUsersAPI } from "../server/Allapi";

function Inbox() {
  const token = sessionStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const currentUserId = payload?.userId;

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { blogId } = useParams(); // gets blogId from URL

  const [selectedUser, setSelectedUser] = useState(null);

  const [newChatQuery, setNewChatQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchUsers = async (q) => {
    if (!q || q.length < 2) {
      setSearchResults([]);
      return;
    }
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const res = await searchUsersAPI(q, reqHeader);
      if (res.status === 200) setSearchResults(res.data);
    } catch (err) {
      console.log('Search users error:', err.response?.data || err.message || err);
    }
  };

useEffect(() => {
  const fetchReceiver = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      if (blogId) {
        const res = await getReceiverAPI(blogId, reqHeader);
        if (res.status === 200) {
          setReceiver(res.data);
          setSelectedUser(res.data); // set chat header

          // Try to find an existing conversation for this blog
          try {
            const convRes = await getConversationsAPI(reqHeader);
            if (convRes.status === 200) {
              const found = convRes.data.find(c => String(c.blogId) === String(blogId));
              if (found) setSelectedConversation(found);
            }
          } catch (convErr) {
            console.log('Error fetching conversations:', convErr);
          }
        }
      }
    } catch (err) {
      console.log("Error fetching receiver:", err);
    }
  };
  fetchReceiver();
}, [blogId, token]);
// Fetch user's conversations on load
useEffect(() => {
  const fetchConversations = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const res = await getConversationsAPI(reqHeader);
      if (res.status === 200) {
        setConversations(res.data);
        // If no selected conversation but we have list, select first
        if (!selectedConversation && res.data.length) {
          setSelectedConversation(res.data[0]);
        }
      }
    } catch (err) {
      console.log('Error fetching conversations:', err);
    }
  };
  fetchConversations();
}, [token]);

// Fetch messages when a conversation is selected
useEffect(() => {
  const fetchMessagesForConversation = async () => {
    if (!selectedConversation) return;
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const res = await getConversationMessagesAPI(selectedConversation._id, reqHeader);
      if (res.status === 200) {
        const formattedMessages = res.data.map(msg => ({
          _id: msg._id,
          text: msg.message,
          sender: String(msg.sender) === String(currentUserId) ? "me" : "them",
          senderId: msg.sender,
        }));
        setMessages(formattedMessages);

        // set header user to the other participant
        const other = selectedConversation.participants.find(p => String(p._id) !== String(currentUserId));
        if (other) setSelectedUser({ id: other._id, name: other.username, avatar: other.profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png" });
      }
    } catch (err) {
      console.log('Error fetching conversation messages:', err);
    }
  };
  fetchMessagesForConversation();
}, [selectedConversation, token, currentUserId]);



const sendMessage = async () => {
  if (!text.trim() || (!selectedConversation && !selectedUser)) return;

  const reqHeader = { Authorization: `Bearer ${token}` };

  try {
    let conversationId = selectedConversation?._id;

    // If no conversation but blogId present, create one
    if (!conversationId && blogId) {
      const convRes = await createConversationAPI(blogId, reqHeader);
      if (convRes.status === 201 || convRes.status === 200) {
        conversationId = convRes.data._id;
        setSelectedConversation(convRes.data);
        // update conversations list
        setConversations(prev => [convRes.data, ...prev]);
      }
    }

    // If still no conversation, fallback to receiverId flow
    const messageBody = conversationId ? { conversationId, message: text } : { receiverId: selectedUser.id, message: text };

    const res = await sendMessageAPI(messageBody, reqHeader);

    if (res.status === 200) {
      const newMsg = {
        _id: res.data.message._id,
        text: res.data.message.message,
        sender: String(res.data.message.sender) === String(currentUserId) ? "me" : "them",
        senderId: res.data.message.sender,
      };

      setMessages(prev => [...prev, newMsg]);
      setText("");

      // update conversation lastMessage locally
      if (conversationId) {
        setConversations(prev => prev.map(c => c._id === conversationId ? { ...c, lastMessage: text } : c));
      }
    }
  } catch (err) {
    console.log("Error sending message:", err.response?.data || err.message || err);
  }
};

const deleteMessage = async (messageId) => {
  if (!messageId) return;
  const reqHeader = { Authorization: `Bearer ${token}` };
  try {
    const res = await deleteMessageAPI(messageId, reqHeader);
    if (res.status === 200) {
      setMessages(prev => prev.filter(m => m._id !== messageId));
      const convRes = await getConversationsAPI(reqHeader);
      if (convRes.status === 200) setConversations(convRes.data);
    }
  } catch (err) {
    console.log("Error deleting message:", err.response?.data || err.message || err);
  }
};

const deleteConversation = async () => {
  if (!selectedConversation) return;
  const reqHeader = { Authorization: `Bearer ${token}` };
  try {
    const res = await deleteConversationAPI(selectedConversation._id, reqHeader);
    if (res.status === 200) {
      setConversations(prev => prev.filter(c => c._id !== selectedConversation._id));
      setSelectedConversation(null);
      setMessages([]);
    }
  } catch (err) {
    console.log("Error deleting conversation:", err.response?.data || err.message || err);
  }
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

          {/* New Chat (search users) */}
          <div className="mb-4">
            <input
              value={newChatQuery}
              onChange={(e) => { setNewChatQuery(e.target.value); searchUsers(e.target.value); }}
              type="text"
              placeholder="Start new chat by name or email"
              className="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none"
            />
            {searchResults.length > 0 && (
              <div className="bg-white border rounded-md max-h-40 overflow-y-auto">
                {searchResults.map(u => (
                  <div key={u._id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedUser({ id: u._id, name: u.username, avatar: u.profile || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }); setSelectedConversation(null); setMessages([]); setSearchResults([]); setNewChatQuery(''); }}>
                    <div className="flex items-center gap-3">
                      <img src={u.profile || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} className="w-8 h-8 rounded-full" alt="" />
                      <div>
                        <div className="font-semibold">{u.username}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {conversations.length === 0 && (
              <div className="text-sm text-gray-500">No conversations yet</div>
            )}
            {conversations.map((conv) => {
              const other = conv.participants.find(p => String(p._id) !== String(currentUserId));
              return (
                <div
                  key={conv._id}
                  onClick={() => { setSelectedConversation(conv); if (other) setSelectedUser({ id: other._id, name: other.username, avatar: other.profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }); }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                    ${selectedConversation?._id === conv._id ? "bg-blue-100" : "hover:bg-blue-50"}`}
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={other?.profile || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt=""
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{other?.username || "Chat"}</h4>
                    <p className="text-sm text-gray-500 truncate w-40">{conv.lastMessage || ""}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        {(selectedConversation || selectedUser) ? (
          <div className="flex-1 bg-white rounded-2xl shadow-md flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b">
              <img
                className="w-10 h-10 rounded-full"
                src={selectedUser?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt=""
              />
              <div>
                <p className="font-semibold">{selectedUser?.name || "Chat"}</p>
              </div>
              <div className="ml-auto">
                {selectedConversation && (
                  <button onClick={deleteConversation} className="text-sm text-red-500">Delete Chat</button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg._id || Math.random()}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div className="relative">
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-md shadow ${msg.sender === "me"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white rounded-bl-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "me" && (
                      <button onClick={() => deleteMessage(msg._id)} className="text-xs text-red-500 mt-1 block ml-auto">Delete</button>
                    )}
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
