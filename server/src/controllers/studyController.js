import { askGemini } from "../services/geminiService.js";

export const findResources = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
You are an AI that finds online study resources.
Please find real youtube videos with valid youtube links , real articles link so someone can read them
Topic: "${topic}"

Return a JSON structure with:
{
  "articles": [
    { "title": "Article Title", "summary": "Short summary" }
  ],
  "pdfs": [
    { "title": "PDF Name", "link": "valid URL" }
  ],
  "videos": [
    { "title": "Video Title", "youtube_link": "valid YouTube URL" }
  ],
  "structured_learning_path": [
    "Step 1 - ...",
    "Step 2 - ...",
    "Step 3 - ..."
  ]
}

Make sure the response is strictly valid JSON — no markdown formatting, no extra commentary.
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

    return res.json({
      topic,
      ...parsed,
    });

  } catch (err) {
    console.error("❌ Error in findResources:", err.message);
    res.status(500).json({ error: err.message });
  }
};
