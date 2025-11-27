// services/geminiService.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});



const groundingTool = {
  googleSearch: {},
};

const config = {
  tools: [groundingTool],
};


export const askGemini = async (prompt) => {
  try {
    const result = await ai.models.generateContent({
      model:process.env.GEMINI_MODEL,
      contents:prompt,
      config,
    });
    
    const text = result.text;
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    throw new Error("Gemini request failed. Check API key, model name, or ensure your key is correct.");
  }
};