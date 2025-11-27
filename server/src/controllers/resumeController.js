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
You are an expert resume evaluator and ATS analysis system.

Analyze the following resume text strictly based on the content provided:

=== RESUME TEXT START ===
${pdtText}
=== RESUME TEXT END ===

Return a STRICT JSON object with the following structure:

{
  "score": number (0-10),
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],
  "suggested_improvements": [
    "Improvement 1",
    "Improvement 2",
    "Improvement 3"
  ],
  "missing_key_skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ]
}

Rules:
- Score must be a number between 0 and 10.
- Do NOT fabricate information not present in the resume.
- Do NOT include any commentary or markdown.
- Output ONLY valid JSON. No backticks.

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
    let {
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

    // -----------------------------
    // 1. SANITIZE USER INPUT
    // -----------------------------
    const clean = (str = "") =>
      str
        .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // remove emojis
        .replace(/[^a-zA-Z0-9@.\-:/\s]/g, "") // remove weird chars
        .replace(/\s+/g, " ")
        .trim();

    name = clean(name);
    role = clean(role);
    email = clean(email);
    linkedin = clean(linkedin);
    experience = clean(experience);
    projects = clean(projects);
    education = clean(education);
    achievements = clean(achievements);
    skills = clean(skills);

    // Auto-fix LinkedIn URL
    if (linkedin && !linkedin.startsWith("http")) {
      linkedin = "https://linkedin.com/in/" + linkedin;
    }

    // -----------------------------
    // 2. PROMPT
    // -----------------------------
    const prompt = `
You are a senior professional resume writer and ATS optimization expert.

Generate a fully formatted resume as clean HTML.

IMPORTANT:
Return ONLY valid JSON in this exact format:

{
  "html": "<div> ... full resume here ... </div>"
}

STRICT RULES:
- The "html" value MUST be a single string with a <div> containing the resume.
- NO markdown.
- NO backticks.
- NO comments.
- NO explanations.
- NO text outside the JSON.
- You MUST escape internal double quotes so JSON becomes valid.

DESIGN REQUIREMENTS:
- Pure black text only.
- Minimal inline CSS.
- Professional, ATS-friendly format.
- No tables, no images, no multi-column layout.
- Use <strong> for section titles.
- Hyperlink email, LinkedIn, and project URLs.
- Include a 1–2 line professional summary at the top.
- The output must look good on PDF (single page if possible).

INPUT DATA:
Name: ${name}
Role: ${role}
Email: ${email}
LinkedIn: ${linkedin}
Experience: ${experience}
Projects: ${projects}
Education: ${education}
Achievements: ${achievements}
Skills: ${skills}
`;

    // -----------------------------
    // 3. CALL GEMINI
    // -----------------------------
    const response = await askGemini(prompt);

    // -----------------------------
    // 4. CLEAN RAW GEMINI OUTPUT
    // -----------------------------
    let cleaned = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
      .trim();


    // -----------------------------
    // 5. PARSE JSON SAFELY
    // -----------------------------
    let json;
    try {
      json = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON parse error:", err, "\nRAW:", cleaned);
      return res.status(500).json({
        error: "Invalid AI JSON output",
        raw: cleaned,
      });
    }

    // -----------------------------
    // 6. RETURN RESULT
    // -----------------------------
    return res.status(200).json({ resume: json.html });

  } catch (err) {
    console.error("❌ Resume Generation Error:", err);
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};
