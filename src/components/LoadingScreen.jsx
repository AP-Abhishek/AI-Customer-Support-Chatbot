import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const messages = [
    "Compiling your thoughts...",
    "Analyzing the vibes...",
    "Connecting dots...",
    "Generating magic...",
    "Almost there..."
  ];
  
  const [currentMsg, setCurrentMsg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <p className="loading-text">{messages[currentMsg]}</p>
    </div>
  );
};

export default LoadingScreen;
