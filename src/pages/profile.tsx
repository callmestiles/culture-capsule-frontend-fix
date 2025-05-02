"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { ProfileHeader } from "@/components/profileHeader";
import { UserPosts } from "@/components/userPosts";
import { CategoryFilter } from "@/components/categoryFilter";
import { getRealUserData, getRealUserPosts } from "@/lib/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { t, language } = useLanguage();
  const [userPosts, setUserPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const realUser = await getRealUserData();
      const realPosts = await getRealUserPosts();
      setUser(realUser);
      setUserPosts(realPosts);
      console.log(realUser);
      console.log("Posts: ", realPosts);
    };

    fetchData();
  }, [language]);

  const categories = Array.from(
    new Set(userPosts.map((post) => post.category))
  );

  const filteredPosts = activeCategory
    ? userPosts.filter((post) => post.category === activeCategory)
    : userPosts;

  if (!user)
    return (
      <div className="min-h-screen bg-capsule-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-capsule-accent mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader user={user} />
        <div className="mt-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("profile_title")}
            </h2>
            <div className="mt-4 sm:mt-0">
              <button className="rounded-md bg-[rgb(82,104,45)] px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(65,85,35)]">
                {t("profile_button")}
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
      <Footer />
    </div>
  );
}
