// mockData.ts
import type { User, Post } from "./types";
import axios from "axios";

// Function to get real user data
export const getRealUserData = async (): Promise<User | null> => {
  try {
    const response = await axios.get(
      "https://culture-capsule-backend.onrender.com/api/auth/me",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const user = response.data.user;

    return {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      bio: "Cultural enthusiast and photographer. I love documenting the traditions and heritage of North Cyprus.",
      profileImage: user.profilePicture || "/placeholder.svg?height=128&width=128&text=User",
      posts: user.posts.length,
      likes: 0, // You can fetch likes if your API supports it
      contributions: user.posts.length,
      userName: user.userName,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// Function to get real posts data
export const getRealUserPosts = async (): Promise<Post[]> => {
  try {
    // First, get the user ID
    const userResponse = await axios.get(
      "https://culture-capsule-backend.onrender.com/api/auth/me",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const userId = userResponse.data.user._id;

    // Then fetch posts for that user
    const postsResponse = await axios.get(
      `https://culture-capsule-backend.onrender.com/api/posts/user/${userId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const posts = postsResponse.data.posts;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      excerpt: post.content.substring(0, 100) + "...",
      content: post.content,
      likes: post.likes.length,
      dislikes: post.dislikes.length,
      date: post.createdAt,
      time: post.time || "6:00 PM - 8:00 PM",
      category: post.category,
      image: post.imageUrl?.length > 0 ? post.imageUrl[0] : "https://picsum.photos/200",
    }));
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};
