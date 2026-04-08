import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
  timeout: 10000,
});

API.interceptors.request.use(
  (config) => {
    const method = config.method ? config.method.toUpperCase() : "GET";
    console.log(`🚀 Sending ${method} to ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
