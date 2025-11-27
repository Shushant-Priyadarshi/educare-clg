import { askGemini } from "../services/geminiService.js";
import { findRealYouTubeLink } from "../utils/youtubeSearch.js";

export const findResources = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
You are an AI that finds REAL online study resources using web search. Do NOT hallucinate URLs.

Topic: "${topic}"

Return EXACTLY:
- 5 real articles (roadmaps, official docs, guides, tutorials)
- 5 real PDFs or official documentation links
- 5 real YouTube videos that genuinely exist
- A short structured learning path of 3–5 steps only (no long paragraphs)

Return strictly valid JSON:
{
  "articles": [
    { "title": "...", "summary": "...", "link": "valid URL" },
    { "title": "...", "summary": "...", "link": "valid URL" }
  ],
  "pdfs": [
    { "title": "...", "link": "valid URL" },
    { "title": "...", "link": "valid URL" }
  ],
  "videos": [
    { "title": "...", "youtube_link": "let it empty" },
    { "title": "...", "youtube_link": "let it empty" }
  ],
  "structured_learning_path": [
    "Step 1 - ...",
    "Step 2 - ...",
    "Step 3 - ...",
    "Step 4 - ... (optional)",
    "Step 5 - ... (optional)"
  ]
}

Rules:
- OUTPUT JSON ONLY.
- NO markdown formatting.
- NO extra commentary.
- NO invented or fake URLs — only real online links.
- If a real link cannot be found, leave the field empty instead of inventing one.
- Return video title ONLY. Do NOT include youtube_link.I will fetch the YouTube link myself.

`;

    const response = await askGemini(prompt);
    let cleaned = response
      .replace(/```json/g, "") // remove ```json
      .replace(/```/g, "") // remove ```
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      for (let v of parsed.videos) {
        const realLink = await findRealYouTubeLink(v.title);
        if (realLink) v.youtube_link = realLink;
      }
    } catch (err) {
      console.error("❌ JSON Parse Error, returning raw text:", err.message);
      return res.status(200).json({ topic, rawText: cleaned });
    }

    return res.json({
      topic,
      ...parsed,
    });
  } catch (err) {
    console.error("❌ Error in findResources:", err.message);
    res.status(500).json({ error: err.message });
  }
};
