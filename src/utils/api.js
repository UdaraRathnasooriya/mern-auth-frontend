import axios from "axios";

// Base URL from env
const API_BASE_URL = import.meta.env.VITE_API_HOST; // e.g., http://localhost:5001/api/v1

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default api;
