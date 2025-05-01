// api/tokenService.ts
import axios from "axios";

// Keep track of refresh failures to prevent repeated attempts
let refreshFailedTimestamp: number | null = null;
const REFRESH_RETRY_DELAY = 60 * 1000; // 1 minute

/**
 * Refreshes the access token using the refresh token (stored in cookies)
 * @returns Promise that resolves to the new access token or null if refresh failed
 */
export default async function refreshToken(): Promise<string | null> {
  // Prevent repeated refresh attempts if we recently failed
  if (
    refreshFailedTimestamp &&
    Date.now() - refreshFailedTimestamp < REFRESH_RETRY_DELAY
  ) {
    console.log("Skipping token refresh - recent failure");
    return null;
  }

  try {
    // Clear the failed timestamp as we're trying again
    refreshFailedTimestamp = null;

    const response = await axios.post(
      "https://culture-capsule-backend.onrender.com/api/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);

    // Mark that we failed a refresh attempt
    refreshFailedTimestamp = Date.now();

    // Don't perform page redirects here - let the auth context handle that
    localStorage.removeItem("accessToken");
    throw error;
  }
}
