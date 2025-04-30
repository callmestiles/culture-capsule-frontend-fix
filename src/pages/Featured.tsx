import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import CollectionCard from "@/components/CollectionCard";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";

interface Collection {
  id: string;
  title: string;
  imageSrc: string;
  category: string;
  hasImages: boolean;
  content: string;
  contributor: string;
  date: string;
  href: string;
  noOfLikes: number;
  noOfDislikes: number;
  likes: number;
  dislikes: number;
}

const Featured: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all_category");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryData = [
    { key: "all_category", route: "/categories" },
    { key: "historical_events_category", route: "/history" },
    { key: "local_recipes_category", route: "/recipes" },
    { key: "arts_and_crafts_category", route: "/arts" },
    { key: "folklore_and_stories_category", route: "/folklore" },
    { key: "poems_category", route: "/poems" },
    { key: "music_and_dance_category", route: "/music" },
  ];

  const categoryApiMap = useMemo<Record<string, string>>(
    () => ({
      all_category: "all",
      historical_events_category: "Historical Events",
      local_recipes_category: "Local Recipes",
      arts_and_crafts_category: "Arts and Crafts",
      folklore_and_stories_category: "Folklore and Stories",
      poems_category: "Poems",
      music_and_dance_category: "Music and Dance",
    }),
    []
  );

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const apiCategory =
          activeCategory === "all" ? "all" : categoryApiMap[activeCategory];

        const endpoint = `/api/posts/${
          apiCategory === "all" ? "" : `category/${apiCategory}`
        }?language=${language}`;

        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com${endpoint}`
        );

        if (response.data.success) {
          const data = response.data.posts.slice(0, 8);
          const transformedData = data.map((item) => {
            const hasImages = item.images.length > 0;
            return {
              title: item.title,
              content: item.content,
              category: item.category,
              contributor: item.author.username,
              date: new Date(item.createdAt).toLocaleDateString(),
              imageSrc: item.images[0] || " ",
              hasImages: hasImages,
              href: `/capsule/${item._id}`,
              noOfLikes: item.likes.length || 0,
              noOfDislikes: item.dislikes.length || 0,
            };
          });
          setCollections(transformedData);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [activeCategory, language, categoryApiMap]);

  return (
    <div className="min-h-screen bg-capsule-bg">
      <Navbar />

      <main className="pt-20 pb-20">
        <section className="capsule-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
              {t("featured_capsules")}
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-semibold mb-6">
              {t("cultural_capsules")}
            </h1>

            <p className="text-capsule-text/80 leading-relaxed">
              {t("featured_description")}
            </p>
          </div>

          <Tabs defaultValue="all_category" className="w-full mb-10">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-capsule-paper">
                {categoryData.map(({ key }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    onClick={() => setActiveCategory(key)}
                    className="capitalize"
                  >
                    {t(key)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categoryData.map(({ key, route }) => (
              <TabsContent key={key} value={key} className="space-y-4">
                {loading && key === activeCategory ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-3 gap-8">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <CollectionCardSkeleton />
                      ))}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {collections.length > 0 &&
                        collections
                          .filter(
                            (collection) =>
                              key === "all_category" ||
                              collection.category === t(key)
                          )
                          .map((collection, index) => (
                            <CollectionCard
                              key={index}
                              {...collection}
                              index={index}
                            />
                          ))}
                    </div>

                    {collections.length > 0 && (
                      <div className="flex justify-center mt-12">
                        <Link
                          to={route}
                          className="inline-flex items-center justify-center px-6 py-2 bg-capsule-sand text-white rounded-lg hover:bg-capsule-sand/90 transition-colors"
                        >
                          {t("view_more_category")}
                        </Link>
                      </div>
                    )}
                  </>
                )}

                {!loading &&
                  collections.length === 0 &&
                  key === activeCategory && (
                    <div className="text-center py-20">
                      <h3 className="text-2xl font-serif mb-4">
                        {t("no_results")}
                      </h3>
                      <p className="text-capsule-text/70 mb-6">
                        {t("try_different_category")}
                      </p>
                      <Button
                        className="flex items-center gap-2"
                        onClick={() => setActiveCategory("all")}
                      >
                        <span>{t("view_all")}</span>
                        <ArrowRight />
                      </Button>
                    </div>
                  )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Featured;
