import React, { useState } from 'react';

const ChatWindow: React.FC = () => {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleMessageSend = () => {
        if (inputMessage.trim() !== "") {
          setMessages([...messages, inputMessage]);
          setInputMessage("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleMessageSend();
        }
    };

    return (
        <div className="chat-window">
            <div className="message-list">
                {messages.map((message, index) => (
                <div key={index}>{message}</div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;