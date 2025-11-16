import { GoogleGenAI } from "@google/genai"; // correct SDK import
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

// Generate interview questions
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", // or "text-bison-001" if your account has access
      contents: prompt,
    });

    const rawText = result.text;

    const { parsed: data, success } = safeJSONParse(
      rawText.replace(/```(?:json|javascript)?/g, "").replace(/```/g, "").trim()
    );

    res.status(200).json(success ? data : { text: rawText });
  } catch (err) {
    console.error("Error generating questions:", err);
    res.status(500).json({ message: "Failed to generate questions", error: err.message });
  }
};

// Generate concept explanation
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Missing question" });

    const prompt = conceptExplainPrompt(question);

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = result.text;

    const { parsed: data, success } = safeJSONParse(
      rawText.replace(/```(?:json|javascript)?/g, "").replace(/```/g, "").trim()
    );

    res.status(200).json(success ? data : { text: rawText });
  } catch (err) {
    console.error("Error generating explanation:", err);
    res.status(500).json({ message: "Failed to generate explanation", error: err.message });
  }
};
