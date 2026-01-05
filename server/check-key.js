
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ NO API KEY FOUND in process.env");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log(`Checking API Key permissions...`);
console.log(`Endpoint: https://generativelanguage.googleapis.com/v1beta/models`);

fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("\n❌ API Error:");
            console.error(JSON.stringify(data.error, null, 2));
            console.log("\nPossible causes:");
            console.log("1. This is a Firebase Key, not a Gemini Key.");
            console.log("2. The 'Generative Language API' is not enabled in Google Cloud Console.");
        } else if (data.models) {
            console.log("\n✅ SUCCESS! The key works. Available Models:");
            const modelNames = data.models.map(m => m.name.replace('models/', ''));
            console.log(modelNames.join('\n'));
            
            console.log("\nRecommended change in server/index.js: Use one of the names above.");
        } else {
            console.log("\n⚠️ Unexpected response:");
            console.log(data);
        }
    })
    .catch(err => {
        console.error("\n❌ Network Error:", err.message);
    });
