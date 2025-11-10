import axios from "axios";

export const BASE_URL = `${import.meta.env.VITE_BASE_URL}/career`;

// POST: Recommend careers
export const recommendCareer = async (skills:string) => {
  const res = await axios.post(`${BASE_URL}/recommend`, { skills }); 
  return res.data;
};

// POST: Suggest learning paths
export const suggestLearning = async (missingSkills:string) => {
  const res = await axios.post(`${BASE_URL}/learn`, { missingSkills });
  return res.data;
};
