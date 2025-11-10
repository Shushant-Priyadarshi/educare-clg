import { askGemini } from "../services/geminiService.js";

export const recommendCareer = async (req, res) => {
  try {
    const { skills } = req.body;
const prompt = `
You are an AI career assistant.

Given these skills: ${skills}

You must respond ONLY in valid JSON (no explanations, no text outside JSON).

The JSON should strictly follow this structure:
{
  "job_titles": [
    "string (top 5 job titles that match the skills)"
  ],
  "missing_skills": [
    "string (skills the user should learn to improve career opportunities)"
  ],
  "job_portal_links": [
    {
      "name": "string (portal name, e.g. 'LinkedIn Jobs')",
      "url": "string (must be a valid working link, e.g. 'https://www.linkedin.com/jobs')"
    }
  ]
}

Rules:
- Include exactly 5 job_titles.
- Include at least 5-10 missing_skills.
- Include 5-7 job_portal_links (mix of general and domain-specific).
- DO NOT include markdown, code blocks, or extra text.
Output must start with { and end with }.
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
      return res.status(200).json({ topic, rawText: cleaned });
    }
    res.json({ data: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const suggestLearning = async (req, res) => {
  try {
    const { missingSkills } = req.body;
   const prompt = `
You are a learning resource recommender.

Given these skills: ${missingSkills}

Return ONLY valid JSON (no markdown, no explanations, no code fences).

The JSON must strictly follow this schema:
{
  "resources": {
    "Skill Name": [
      {
        "title": "string (course/article/video title)",
        "url": "string (working link)"
      }
    ]
  }
}

Rules:
- For each skill, give 2 to 3 learning resources.
- Use real or realistic URLs (YouTube, Coursera, Udemy, freeCodeCamp, etc.).
- DO NOT include markdown, comments, or extra text.
Output must start with { and end with }.
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
      return res.status(200).json({ topic, rawText: cleaned });
    }
    res.json({ data: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
