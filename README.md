# 🤖 AI Customer Support Chatbot

> A modern, AI-powered customer support assistant built with React, Gemini AI, and Firebase.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Vibe](https://img.shields.io/badge/Vibe-Immaculate-purple)
![Editor](https://img.shields.io/badge/Editor-VS_Code-blue)

[**🌐 Visit Website**](https://ai-customer-support-chatbot-frontend-by-tuttu.vercel.app)

## 🚀 Overview

This project is a **"Vibe Code"** intern-level project designed to demonstrate full-stack integration of modern AI tools. It features a responsive chat interface that communicates with Google's Gemini Pro model to answer user queries and automatically generates smart summaries of the conversation (Issue, Category, Priority) using AI logic.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), Vanilla CSS (Modern Variables & Glassmorphism)
-   **Backend**: Express.js (Node.js)
-   **AI**: Google Gemini API (`gemini-flash-latest`)
-   **Database**: Firebase Firestore (for storing tickets)
-   **Tooling**: Concurrently (run client/server together)

## ✨ Features

-   **💬 Real-Time Chat**: Fluid conversation with an AI agent.
-   **🧠 Smart Summarization**: Automatically analyzes completed chats to extract the issue, categorize it, and assign priority.
-   **💾 Persistence**: Saves chat history and summaries to Firebase Firestore.
-   **🔒 Secure**: Uses a Backend Proxy architecture to secure API keys.
-   **✨ Premium UI**: Polished, "vibe-checked" design with smooth animations and responsive layout.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd ai-customer-support-chatbot
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    cd server && npm install && cd ..
    ```

3.  **Environment Setup**:
    *   Create `.env` in the root:
        ```env
        VITE_API_URL=http://localhost:3000
        VITE_FIREBASE_API_KEY=...
        # ... other firebase config
        ```
    *   Create `server/.env`:
        ```env
        GEMINI_API_KEY=AIzaSy...
        PORT=3000
        ```

4.  **Run the App**:
    ```bash
    npm run dev
    ```
    *   Frontend: `http://localhost:5173`
    *   Backend: `http://localhost:3000`

## 📝 Usage

1.  Open the app in your browser.
2.  Type a message to start chatting (e.g., "I have a billing issue").
3.  Click **"End Chat & Summarize"** to generate a ticket.
4.  View the summary card and check Firebase for the saved record.
