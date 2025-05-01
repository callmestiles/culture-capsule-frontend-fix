// api/axios.ts
import axios from "axios";
import refreshToken from "./tokenService";

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Subscribe failed requests to be retried after token refresh
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Execute all subscribers with new token
function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

// Axios instance for all API calls
const api = axios.create({
  baseURL: "https://culture-capsule-backend.onrender.com/api",
  withCredentials: true, // Required for sending cookies like refresh token
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

    // Skip for these conditions:
    // 1. Not a 401 error
    // 2. Already retried
    // 3. Login endpoint (avoid refresh loops)
    // 4. Refresh token endpoint itself (avoid recursion)
    if (
      error.response?.status !== 401 ||
      originalRequest._retry === true ||
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If we're already refreshing, wait for the new token
    if (isRefreshing) {
      try {
        // Wait for the refresh to complete
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // Start a new refresh
    isRefreshing = true;

    try {
      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        onTokenRefreshed(newToken);
        return api(originalRequest);
      } else {
        // Force logout without redirection (let auth context handle it)
        localStorage.removeItem("accessToken");
        return Promise.reject(new Error("Token refresh failed"));
      }
    } catch (refreshError) {
      // Let auth context handle redirection (avoid direct window.location changes)
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
