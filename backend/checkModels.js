import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const apikey = process.env.GEMINI_API_KEY;

if (!apikey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
  process.exit(1);
}

const ai = new GoogleGenerativeAI({ apiKey: apikey });

async function listModels() {
  try {
    const models = await ai.models.list();  // v0.24.1 method
    console.log("Available models:");
    models.forEach((model) => {
      console.log(`- ${model.name} (ID: ${model.id})`);
    });
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();
