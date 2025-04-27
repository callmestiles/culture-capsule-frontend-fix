"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ProfileHeader } from "@/components/profileHeader";
import { UserPosts } from "@/components/userPosts";
import { mockUserData, mockUserPosts } from "@/lib/mockData";
import { CategoryFilter } from "@/components/categoryFilter";
import axios from "axios";
import refreshToken from "@/api/refresh";
import { useEffect } from "react";
import { get } from "http";

export default function ProfilePage() {
  // In a real application, you would fetch the user data from an API
  const [user, setUser] = useState(null);
  const userData = mockUserData; // Replace with actual user data fetching logic
  const userPosts = mockUserPosts;

  const getData = async () => {
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
      console.log("User Profile:", response.data);
      setUser(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        await refreshToken();
        getData(); // Retry after token refresh
      } else {
        console.error("Error fetching user profile:", error);
      }
    }
  };
  // getData();
  console.log(user?.user?.firstName);
  const realUserData = {
    id: user?.user?.id,
    name: `${user?.user?.firstName} ${user?.user?.lastName}`,
    bio: "Cultural enthusiast and photographer. I love documenting the traditions and heritage of North Cyprus.",
    profileImage:
      user?.user?.profilePicture ||
      "/placeholder.svg?height=128&width=128&text=John",
    posts: user?.user?.posts.length || 0,
    likes: 248,
    contributions: user?.user?.posts.length || 0,
  };
  console.log(user);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  // Extract unique categories from posts
  const categories = Array.from(
    new Set(userPosts.map((post) => post.category))
  );

  // Filter posts by category
  const filteredPosts = activeCategory
    ? userPosts.filter((post) => post.category === activeCategory)
    : userPosts;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <br />
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader user={realUserData} />
        <div className="mt-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              My Contributions
            </h2>
            <div className="mt-4 sm:mt-0">
              <button className="rounded-md bg-[rgb(82,104,45)] px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(65,85,35)]">
                Create New Post
              </button>
            </div>
          </div>

          <CategoryFilter
            categories={categories}
            onCategoryChange={setActiveCategory}
            activeCategory={activeCategory}
          />

          <UserPosts posts={filteredPosts} />
        </div>
      </main>
    </div>
  );
}
