import axios from "axios";

// src/api/resume.js
export const BASE_URL = `${import.meta.env.VITE_BASE_URL}/resume`;


// CREATE RESUME
export const createResume = async (data:unknown) => {
  const res = await axios.post(`${BASE_URL}/create`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    
  });
  console.log(res.data);
  return res.data;
};

// ANALYZE RESUME
export const analyzeResume = async (file:File) => {
  const formData = new FormData();
  formData.append("resume", file);

 const res = await axios.post(`${BASE_URL}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return  res.data;
};
