///api/refresh.ts
import axios from "axios";

export default async function refreshToken() {
  await axios
    .post(
      "https://culture-capsule-backend.onrender.com/api/auth/refresh-token",
      {},
      { withCredentials: true }
    )
    .then((response) => {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure (e.g., redirect to login)
      // window.location.href = "/login";
    });
}
