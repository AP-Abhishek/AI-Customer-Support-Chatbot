
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ai-customer-support-chatbot-frontend-by-tuttu.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: "You are a friendly and helpful customer support agent. Answer every user query concisely in 2 to 3 complete sentences using as few words as possible. Always finish your thoughts completely and never cut off mid-sentence."
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error("Chat API Error:", error);
    const isRateLimit = error.status === 429 || error.message?.includes('429');
    const errorMessage = isRateLimit
      ? "⏳ I'm receiving too many messages right now. Please wait about a minute and try again."
      : "Sorry, I encountered a server error. Please try again later.";

    res.json({ text: errorMessage });
  }
});

if (!process.env.GEMINI_API_KEY) {
  process.exit(1);
}

app.post('/api/summary', async (req, res) => {
  try {
    const { conversation } = req.body;

    if (!conversation) {
      return res.status(400).json({ error: 'Conversation history is required' });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: "You are a fast JSON ticket generator. Extract summary, category, and priority in JSON format immediately.",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const transcript = Array.isArray(conversation)
      ? conversation.map(c => `${c.role}: ${c.text}`).join('\n')
      : String(conversation);

    const prompt = `Categorize and summarize this chat transcript:
${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch (e) {
      res.json({ summary: text, category: "General", priority: "Low" });
    }
  } catch (error) {
    console.error("Summary API Error:", error);
    res.json({ summary: "Summary unavailable (Rate Limit/Error)", category: "General", priority: "Low" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
