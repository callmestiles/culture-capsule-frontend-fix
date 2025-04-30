import axios from "axios";
import refreshToken from "./tokenService";

// Axios instance for all API calls
const api = axios.create({
  baseURL: "https://culture-capsule-backend.onrender.com/api",
  withCredentials: true, // Required for sending cookies like refresh token
});

// Separate instance for refreshing tokens (avoids recursion)
const refreshInstance = axios.create({
  baseURL: "https://culture-capsule-backend.onrender.com/api",
  withCredentials: true,
});

// Attach access token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401s by attempting token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") // Don't refresh on login failures
    ) {
      originalRequest._retry = true;
      try {
        // Use the refreshToken function
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          // Set new token in the original request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // retry original request
        } else {
          // Token refresh failed
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Either refresh token expired (7 days) or network error
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
