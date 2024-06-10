import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
const { GoogleGenerativeAI } = require("@google/generative-ai");


const UserMessageBubble: React.FC<{ message: string }> = ({ message }) => (
    <div className="user-message-bubble">
        {message}
    </div>
);

const AIMessageBubble: React.FC<{ message: string }> = ({ message }) => (
    <div className="ai-message-bubble" dangerouslySetInnerHTML={{ __html: message }}>
    </div>
);

const ChatWindow: React.FC = () => {
    const [inputPrompt, setInputPrompt] = useState<string>("");
    const [messages, setMessages] = useState<{ text: string | any; fromUser: boolean }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [genAI, setGenAI] = useState<any>(null)
    const [model, setModel] = useState<any>(null)
    const [chat, setChat] = useState<any>(null)
    const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
    const [chatInput, setChatInput] = useState<string>("");

    useEffect(() => {
        setGenAI(new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY));
        setTimeout(() => {
            setMessages(prevMessage => [...messages, { text: "Hey there, I'm a chatbot integrated using Google Gemini. I'm still in development to be more Hai-like.", fromUser: false}]);
        }, 1000)
    }, [])

    useEffect(() => {
        if (genAI) {
            setModel(genAI.getGenerativeModel({model: "gemini-1.0-pro-latest"}));
            console.log("Model set")
        }
    }, [genAI])

    useEffect(() => {
        if (model) {
            setChat(model.startChat({
                history: [
                    {
                      role: "user",
                      parts: [{text: "Your name is Hai Dao. Do not say that you are an AI chatbot"}],
                    },
                    {
                      role: "model",
                      parts: [{text: "Hi there! My name is Hai Dao"}],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 4000,
                },
            }))
            console.log("Chat session started")
        };
    }, [model])


    const handleSendMessage = (message: string) => {
        setMessages([...messages, { text: message, fromUser: true }, { text: "Generating response...", fromUser: false}]);
        setInputPrompt(chatInput);
        setIsGeneratingResponse(true);
        setChatInput("");
    };

    function displayResponseMessage(message: string) {
        const tempMessageArray = [...messages]
        tempMessageArray[messages.length - 1] = { text: marked.parse(message), fromUser: false }
        setMessages(prevMessage => tempMessageArray);
    }

    useEffect(() => {
        if (inputPrompt.trim() == '') {
            return;
        }
        respond(inputPrompt);
    }, [inputPrompt])

    async function respond(inputPrompt: string) {
        try {
            const result = await chat.sendMessage(inputPrompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);
            displayResponseMessage(text)
            console.log(messages)
            setIsGeneratingResponse(false);
        } catch (error: any) {
            if (error.message.includes('429')) {
            displayResponseMessage("*You exceeded your per minute quota: Try again in 1 minute*")
            } else if (error.message.includes('400')) {
            displayResponseMessage("*The provided API key is invalid*")
            } else {
            displayResponseMessage("*Unknown Error*")
            }
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSendMessage(chatInput);
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
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={() => handleSendMessage(chatInput)}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;