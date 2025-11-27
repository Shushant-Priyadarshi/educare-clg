import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/study`;


export const findStudyResources = async (topic:string) => {
  try { 
    const response = await axios.post(`${BASE_URL}/find`, { topic },{ headers: { "Content-Type": "application/json" }, withCredentials: true});
    console.log(response?.data);
    
    return response.data; 
  } catch (error) {
    console.error("Error fetching study resources:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch resources");
  }
};
