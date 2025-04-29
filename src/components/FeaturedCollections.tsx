import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import CollectionCard from "./CollectionCard";
import { collections } from "@/data/collections";
import { useEffect } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedCollections: React.FC = () => {
  const { t } = useLanguage();
  let localRecipes = [];
  const [recipesData, setRecipesData] = React.useState([]);
  const getResponse = async () => {
    try {
      const response = await axios.get(
        `https://culture-capsule-backend.onrender.com/api/posts?language=${localStorage.getItem(
          "language"
        )}`
      );
      const data = response.data.posts;
      const transformedData = data.map((item) => ({
        title: item.title,
        category: item.category, // Assuming category is not available in the response, you can set it to a default value or fetch it from another source
        contributor: `${item.author.firstName} ${item.author.lastName}`,
        date: new Date(item.createdAt).toLocaleDateString(),
        imageSrc: item.images[0] || "https://placehold.co/400?text=!",
        href: `/capsule/${item._id}`,
      }));
      setRecipesData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  localRecipes = recipesData.concat(localRecipes);

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <section id="explore" className="py-20 bg-white relative">
      <div className="absolute inset-0 opacity-[0.02] bg-noise-pattern mix-blend-multiply" />

      <div className="capsule-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="inline-block  px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-4">
              {t("featured_archives")}
            </div>

            <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-3">
              {t("latest_capsules")}
            </h2>

            <p className="text-capsule-text/80 text-black leading-relaxed max-w-2xl">
              {t("featured_description")}
            </p>
          </div>
        </div>

        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {localRecipes.slice(0, 6).map((collection, index) => (
              <CarouselItem
                key={collection.title}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CollectionCard {...collection} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 bg-white dark:bg-gray-800" />
            <CarouselNext className="-right-4 bg-white dark:bg-gray-800" />
          </div>
        </Carousel>

        <div className="mt-10 text-center">
          <Link
            to="/featured"
            className="inline-flex items-center gap-2 text-capsule-accent hover:text-capsule-accent/80 font-medium transition-colors"
          >
            <span>{t("view_all")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
