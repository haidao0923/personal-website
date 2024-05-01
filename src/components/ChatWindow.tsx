import React, { useEffect, useRef, useState } from 'react';

const UserMessageBubble: React.FC<{ message: string }> = ({ message }) => (
  <div className="user-message-bubble">
    {message}
  </div>
);

const AIMessageBubble: React.FC<{ message: string }> = ({ message }) => (
  <div className="ai-message-bubble">
    AI: {message}
  </div>
);

const ChatWindow: React.FC = () => {
    const [inputMessage, setInputMessage] = useState<string>("");
    const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleMessageSend = () => {
        if (inputMessage.trim() !== "") {
          setMessages([...messages, { text: inputMessage, fromUser: true }, {text: "Generating response...", fromUser: false}]);
          setInputMessage("");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleMessageSend();
        }
    };

    useEffect(() => {
        // Scroll to bottom when messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
      }, [messages]);

    return (
        <div className="chat-window" ref={messagesEndRef}>
            <div className="message-list">
                {messages.map((message, index) => (
                    message.fromUser ? (
                        <UserMessageBubble key={index} message={message.text} />
                    ) : (
                        <AIMessageBubble key={index} message={message.text} />
                    )
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