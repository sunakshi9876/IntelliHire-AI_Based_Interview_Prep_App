import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompts.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Safe JSON parser
const safeJSONParse = (text) => {
  try {
    return { parsed: JSON.parse(text), success: true };
  } catch {
    return { parsed: { text }, success: false };
  }
};

// Retry helper with exponential backoff + jitter
const generateWithRetry = async (options, maxRetries = 5, initialDelay = 1000) => {
  let delay = initialDelay;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(options);
    } catch (err) {
      if (err.status === 503 && attempt < maxRetries) {
        const jitter = Math.floor(Math.random() * 500); // random 0-500ms
        console.warn(`Service busy. Retrying in ${delay + jitter}ms... (${attempt}/${maxRetries})`);
        await new Promise(r => setTimeout(r, delay + jitter));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
};

// Generate interview questions
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const result = await generateWithRetry({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = result.text || "";

    const { parsed: data, success } = safeJSONParse(
      rawText.replace(/```(?:json|javascript)?/g, "").replace(/```/g, "").trim()
    );

    res.status(200).json(success ? data : { text: rawText });
  } catch (err) {
    console.error("Error generating questions:", err);
    res.status(503).json({
      message: "Service temporarily unavailable. Please try again later.",
      error: err.message,
    });
  }
};

// Generate concept explanation
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing question" });

    const prompt = conceptExplainPrompt(question);

    const result = await generateWithRetry({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = result.text || "";

    const { parsed: data, success } = safeJSONParse(
      rawText.replace(/```(?:json|javascript)?/g, "").replace(/```/g, "").trim()
    );

    res.status(200).json(success ? data : { text: rawText });
  } catch (err) {
    console.error("Error generating explanation:", err);
    res.status(503).json({
      message: "Service temporarily unavailable. Please try again later.",
      error: err.message,
    });
  }
};
