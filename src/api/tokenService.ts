import axios from "axios";

/**
 * Refreshes the access token using the refresh token (stored in cookies)
 * @returns Promise that resolves when token is successfully refreshed
 */
export default async function refreshToken(): Promise<string | null> {
  try {
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

    // Check if error is due to expired refresh token (after 7 days)
    const refreshTokenExpiredError =
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response?.data?.message?.includes("refresh token");

    if (refreshTokenExpiredError) {
      // Clear stored tokens and redirect to login
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    throw error;
  }
}
