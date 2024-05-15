import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../styles/chatbot.css";

const WindowComponent = ({ onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("/chat", { userInput });
      const botResponse = response.data.response;
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", text: userInput },
        { role: "bot", text: botResponse },
      ]);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message"
          className="user-input"
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default WindowComponent;
