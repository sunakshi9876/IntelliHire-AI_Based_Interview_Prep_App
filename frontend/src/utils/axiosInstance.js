import axios from 'axios';

// Set your backend URL here
export const BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000, // 80 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.warn("Bad Request. Redirecting to login...");
          window.location.href = "/";
          break;
        case 401:
          console.warn("Unauthorized. Redirecting to login...");
          window.location.href = "/";
          break;
        case 403:
          console.warn("Forbidden. Access denied.");
          break;
        case 404:
          console.warn("Resource not found.");
          break;
        case 500:
          console.error("Server error. Please try again later.");
          break;
        default:
          console.warn(`Unexpected error: ${status}`);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else {
      console.error("Network error or server not reachable.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
