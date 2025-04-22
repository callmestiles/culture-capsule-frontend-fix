// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://culture-capsule-backend.onrender.com/api", // Replace with your real backend URL
  withCredentials: true, // This sends the refresh token cookie
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const res = await api.post("/refresh-token");
        const newAccessToken = res.data.accessToken;

        // Update the failed request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        window.location.href = "/login"; // Optional: auto logout on refresh failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
