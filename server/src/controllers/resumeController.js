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
    const {
      name,
      role,
      email,
      linkedin,
      experience,
      projects,
      education,
      achievements,
      skills,
    } = req.body;

    const prompt = `
You are a professional resume builder AI.
Generate a clean, ATS-optimized resume in well-formatted HTML (not markdown). 
Make it look modern and structured like a premium resume template.
Use clear sections with subtle styling and spacing.

Input:
Name: ${name}
Role: ${role}
Email: ${email}
LinkedIn: ${linkedin}
Experience: ${experience}
Projects: ${projects}
Education: ${education}
Achievements: ${achievements}
Skills: ${skills}

generate a summary (1-2 line from the info) and put it in the resume
Return only the formatted HTML inside a <div> (no <html>, <head>, <body>).
`;

    const response = await askGemini(prompt);
    const cleaned = response
      .replace(/```(html)?/gi, "")
      .replace(/```/g, "")
      .trim();

    res.status(200).json({ resume: cleaned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
