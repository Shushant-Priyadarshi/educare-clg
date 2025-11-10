import multer from "multer";
import fs from "fs";
import { askGemini } from "../services/geminiService.js";
import { extractPDFTexts } from "../utils/pdf.js";

const upload = multer({ dest: "uploads/" });
export const uploadMiddleware = upload.single("resume");

export const analyzeResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const pdtText = await extractPDFTexts(filePath)
    fs.unlinkSync(filePath);

    const prompt = `
Analyze this resume text:
${pdtText}
Return:
- Resume score (out of 10)
- 3 strengths
- 3 weaknesses
- Suggested improvements
- Missing key skills
Format in JSON.
`;
    const response = await askGemini(prompt);
    let cleaned = response
      .replace(/```json/g, "")  // remove ```json
      .replace(/```/g, "")      // remove ```
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON Parse Error, returning raw text:", err.message);
      return res.status(200).json({ rawText: cleaned });
    }
    res.json({ data:parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createResume = async (req, res) => {
  try {
    const { name, role, experience, skills } = req.body;

    const prompt = `
You are an expert resume writer. Generate a professional, ATS-friendly resume in Markdown format using the following details:
- Name: ${name}
- Role: ${role}
- Experience: ${experience}
- Skills: ${skills}

Return only the formatted resume text, not JSON or explanations.
`;

    const response = await askGemini(prompt);

    // Clean and ensure text format
    const cleaned = response
      .replace(/```(json|markdown|md)?/gi, "")
      .replace(/```/g, "")
      .trim();

    res.status(200).json({ resume: cleaned });
  } catch (err) {
    console.error("❌ Error creating resume:", err);
    res.status(500).json({ error: err.message });
  }
};