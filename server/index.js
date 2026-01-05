
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

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
    const chat = model.startChat({
        history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
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

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
    
    const prompt = `
      Analyze the following customer support conversation and provide:
      1. A short issue summary (2 lines max).
      2. Issue Category (choose closest: "Billing", "Technical", "Account", "General").
      3. Priority level (Low, Medium, High) based on urgency and sentiment.
      
      Output ONLY raw JSON with keys: summary, category, priority.
      
      Conversation:
      ${JSON.stringify(conversation)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        const json = JSON.parse(text);
        res.json(json);
    } catch (e) {
        res.json({ summary: text, category: "General", priority: "Low" });
    }
  } catch (error) {
    res.json({ summary: "Summary unavailable (Rate Limit/Error)", category: "General", priority: "Low" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
