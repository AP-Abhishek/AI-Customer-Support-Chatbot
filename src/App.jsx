import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

import { saveConversation } from './services/firebase';

function App() {
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleEndChat = async (messages) => {
    if (messages.length <= 1 || isSummarizing) return;
    setIsSummarizing(true);

    try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';
        const response = await fetch(`${API_URL}/api/summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation: messages })
        });
        const data = await response.json();
        setSummary(data);
        setIsSummarizing(false);
        
        // Save to Firebase asynchronously in background
        saveConversation(messages, data).catch(err => {
            console.error("Failed to save support ticket to Firebase:", err);
        });
    } catch (e) {
        console.error("Summary error:", e);
        setIsSummarizing(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className='app-title'><img src="favicon.png" alt="favicon" className='favicon' /> AI Support Agent</h1>
      </header>

      <main className="main-content">
        {isSummarizing && <LoadingScreen />}
        {!summary ? (
             <ChatWindow onEndChat={handleEndChat} isSummarizing={isSummarizing} />
        ) : (
            <div className="summary-card">
                <h2>Conversation Summary</h2>
                <div className="summary-item">
                    <strong>Issue:</strong>
                    <p>{summary.summary}</p>
                </div>
                <div className="summary-item">
                    <strong>Category:</strong>
                    <span className={`tag tag-${summary.category?.toLowerCase()}`}>{summary.category}</span>
                </div>
                <div className="summary-item">
                    <strong>Priority:</strong>
                    <span className={`tag tag-${summary.priority?.toLowerCase()}`}>{summary.priority}</span>
                </div>
                <button className="reset-btn" onClick={() => window.location.reload()}>Start New Chat</button>
            </div>
        )}
      </main>
    </div>
  )
}

export default App
