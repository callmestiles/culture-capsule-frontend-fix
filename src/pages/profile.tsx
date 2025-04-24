"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ProfileHeader } from "@/components/profileHeader";
import { UserPosts } from "@/components/userPosts";
import { mockUserData, mockUserPosts } from "@/lib/mockData";
import { CategoryFilter } from "@/components/categoryFilter";

export default function ProfilePage() {
  // In a real application, you would fetch the user data from an API
  const userData = mockUserData;
  const userPosts = mockUserPosts;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
        <ProfileHeader user={userData} />
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
