// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL ,
});



export const askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    throw new Error("Gemini request failed. Check API key or model name.");
  }
};
