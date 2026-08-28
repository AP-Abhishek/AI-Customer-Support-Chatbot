# AI Customer Support Chatbot (React + Node.js)

A modern, AI-powered customer support assistant built with React, Gemini AI, and Firebase.

## The Backstory
This project is a full-stack AI application designed to demonstrate real-time conversational AI integration and automated ticket summarization. The primary focus is on backend proxy architecture, securing AI credentials, asynchronous database persistence, and providing a sleek, responsive customer support user interface.

## Features
* **Real-Time AI Chat:** Fluid conversation with an AI support agent powered by Google Gemini (`gemini-3.5-flash`).
* **Smart Ticket Summarization:** Automatically analyzes completed chat transcripts to extract concise issue summaries, categorize problems (`Billing`, `Technical`, `Account`, `General`), and assign priority levels (`Low`, `Medium`, `High`).
* **Cloud Persistence:** Asynchronously saves chat history, metadata, and ticket summaries to Firebase Firestore (`support_tickets` collection).
* **Secure Backend Proxy:** Node.js/Express proxy backend preventing frontend Gemini API key leaks.
* **Non-Blocking UI:** Optimistically updates the interface so ticket summaries load instantly while database writes complete silently in the background.
* **Premium Glassmorphism UI:** Polished, responsive design with smooth typing indicators and dark mode aesthetics.

## Tech Stack
- Frontend
    - React + Vite
    - Vanilla CSS (Modern CSS Variables & Glassmorphism)
    - React Markdown
- Backend
    - Node.js + Express
    - Google Generative AI SDK (`@google/generative-ai`)
    - CORS & dotenv
- Database & Services
    - Firebase Firestore (Cloud DB)
    - Google Gemini AI (`gemini-3.5-flash`)

## Visit Website & Demo Credentials
Check out the live deployed application:
* **Live Demo:** [AI Customer Support Chatbot](https://ai-customer-support-chatbot-frontend-by-tuttu.vercel.app/)

### Usage Guide
1. Open the app in your browser.
2. Type a support message (e.g., *"I have a billing issue with my invoice"*).
3. Chat with the AI agent to resolve or troubleshoot your issue.
4. Click **"End Chat & Summarize"** to generate an automated support ticket.
5. View the summary card and check your Firebase Firestore database for saved ticket records.

## How to Clone and Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AP-Abhishek/AI-Customer-Support-Chatbot.git
   cd AI-Customer-Support-Chatbot
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
1. Create `.env` file inside `server/` directory.
1. Add following variables.
    ```
    GEMINI_API_KEY
    PORT
    ```
   Run the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window, navigate to root directory, and install dependencies:
   ```bash
   npm install
   ```
1. Create `.env` file in the root directory.
1. Add following variables.
    ```
    VITE_API_URL
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID
    ```
1. Run application (Concurrent Server + React Frontend) - `npm run dev`
1. Visit - `http://localhost:5173` to view.

<hr/>

## Future Enhancements
* Add human agent live takeover and escalation routing.
* Support multimedia attachments (images, PDFs) in chat messages.
* Build an Admin Dashboard to manage and filter Firestore support tickets.

## Folder Structure

```
ai-customer-support-chatbot
├─ .env.example
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.png
├─ README.md
├─ server
│  ├─ .env.example
│  ├─ index.js
│  ├─ package-lock.json
│  └─ package.json
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ components
│  │  ├─ ChatWindow.css
│  │  ├─ ChatWindow.jsx
│  │  ├─ LoadingScreen.css
│  │  ├─ LoadingScreen.jsx
│  │  ├─ MessageBubble.css
│  │  └─ MessageBubble.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ services
│     └─ firebase.js
└─ vite.config.js
```
