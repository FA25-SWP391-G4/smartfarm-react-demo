// src/api/axiosClient.js
import axios from "axios";

// Use test server API URL for local development
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000' // Our test server URL
  : ''; // Will be relative to the current domain in production

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if backend uses cookies
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
