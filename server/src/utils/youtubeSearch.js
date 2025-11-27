import axios from "axios";

export const findRealYouTubeLink = async (title) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          q: title,
          part: "snippet",
          maxResults: 1,
          type: "video"
        },
      }
    );
    const video = res.data.items[0];
    if (!video) return null;
    return `https://www.youtube.com/watch?v=${video.id.videoId}`;
  } catch (err) {
    console.error("YouTube API error:", err.message);
    return null;
  }
};
