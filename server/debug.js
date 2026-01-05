
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
      console.error("❌ NO API KEY FOUND in process.env");
      return;
  }
  console.log(`Checking models for key: ${key.substring(0, 4)}...${key.substring(key.length - 4)} (Length: ${key.length})`);
  
  const genAI = new GoogleGenerativeAI(key);

  const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-1.0-pro",
      "gemini-pro"
  ];

  for (const modelName of modelsToTry) {
      try {
          console.log(`Testing model: ${modelName}...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent("Test");
          console.log(`✅ SUCCESS: ${modelName} works!`);
          return; // Stop after finding one
      } catch (error) {
          console.error(`❌ FAILED ${modelName}: ${error.message.split('\n')[0]}`);
      }
  }
}

listModels();
