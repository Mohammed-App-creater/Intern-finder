import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you’re using cookies
});

// Optional: Add interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = getCookie("token") ? getCookie("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
