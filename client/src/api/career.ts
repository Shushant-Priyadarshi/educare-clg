import axios from "axios";

export const BASE_URL = `${import.meta.env.VITE_BASE_URL}/career`;

export const recommendCareer = async (skills: string) => {
  const res = await axios.post(
    `${BASE_URL}/recommend`,
    { skills },
    { withCredentials: true }      // 🔥 send cookies
  );
  return res.data;
};

export const suggestLearning = async (missingSkills: string) => {
  const res = await axios.post(
    `${BASE_URL}/learn`,
    { missingSkills },
    { withCredentials: true }      // 🔥 send cookies
  );
  return res.data;
};

