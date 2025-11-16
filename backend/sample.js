import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY, // make sure your .env has GEMINI_API_KEY
});

// Use the model directly
const model = ai.models.textBison;

// Async function to test
const run = async () => {
  try {
    const response = await model.generate({
      // The prompt you want to send
      prompt: "Generate a simple technical interview question for a frontend developer",
      temperature: 0.7,
      candidateCount: 1,
    });

    console.log(response.candidates[0].content[0].text);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
};

run();
