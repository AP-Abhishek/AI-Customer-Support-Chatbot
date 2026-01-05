import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import './ChatWindow.css';

const ChatWindow = ({ onEndChat, isSummarizing }) => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI support assistant. How can I help you today?' }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use helper to get history in Gemini format if needed, but for now sending simple history
      // or just the new message is fine depending on backend.
      // Our backend expects { message, history? }
      
      const validMessages = messages.filter((m, i) => !(i === 0 && m.role === 'model'));

      const history = validMessages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';


      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            message: input, 
            history: history 
        }),
      });

      const data = await response.json();

      if (data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-area">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {isLoading && (
           <div className="message-container bot-container">
             <div className="message-bubble bot-bubble typing-indicator">
               <span>.</span><span>.</span><span>.</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-area">
        <form onSubmit={handleSend} className="input-form">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
        {messages.length > 2 && (
             <button 
                type="button" 
                className="end-chat-btn" 
                onClick={() => onEndChat(messages)}
                disabled={isSummarizing}
             >
                {isSummarizing ? "Wrapping up..." : "End Chat & Summarize"}
             </button>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
