import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import CollectionCard from "./CollectionCard";
import { useEffect } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const FeaturedCollections: React.FC = () => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [featuredData, setFeaturedData] = useState([]);
  console.log("Language:", language);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com/api/posts?language=${language}`
        );
        if (response.data.success) {
          const transformedData = response.data.posts.map((item) => {
            let hasImages = true;
            if (item.images.length === 0) {
              hasImages = false;
            }
            return {
              title: item.title,
              category: item.category,
              contributor: item.author.username,
              date: new Date(item.createdAt).toLocaleDateString(),
              hasImages: hasImages,
              imageSrc: item.images[0] || " ",
              href: `/capsule/${item._id}`,
              likes: item.likes.length || 0,
              dislikes: item.dislikes.length || 0,
            };
          });
          setFeaturedData(transformedData);
        } else {
          toast.error("Failed to fetch data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [language]);

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

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {featuredData.slice(0, 6).map((collection, index) => (
                <CarouselItem
                  key={collection.title}
                  className="pl-4 basis-full sm:basis-1/3 lg:basis-1/4"
                >
                  <div className="animate-fade-in opacity-0">
                    <CollectionCard {...collection} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-4 bg-white" />
              <CarouselNext className="-right-4 bg-white" />
            </div>
          </Carousel>
        )}

        <div className="mt-10 text-center">
          <a
            href="/featured"
            className="flex justify-center items-center gap-2 text-capsule-accent hover:text-capsule-accent/80 font-medium transition-colors"
          >
            <span>{t("view_all")}</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
