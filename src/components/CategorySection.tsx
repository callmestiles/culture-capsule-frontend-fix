import React from "react";
import { Book, Utensils, Palette, Music, Landmark, Camera } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { useLanguage } from "@/contexts/LanguageContext";

const CategorySection: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t("historical_events"),
      description: t("historical_events_desc"),
      imageSrc: "/images/history.jpg",
      icon: <Landmark className="text-white" size={24} />,
      href: "/history",
    },
    {
      title: t("local_recipes"),
      description: t("local_recipes_desc"),
      imageSrc: "/images/food.jpg",
      icon: <Utensils className="text-white" size={24} />,
      href: "/recipes",
    },
    {
      title: t("arts_crafts"),
      description: t("arts_crafts_desc"),
      imageSrc: "/images/arts.jpg",
      icon: <Palette className="text-white" size={24} />,
      href: "/arts",
    },
    {
      title: t("folklore_stories"),
      description: t("folklore_stories_desc"),
      imageSrc: "/images/folklore.jpg",
      icon: <Book className="text-white" size={24} />,
      href: "/folklore",
    },
    {
      title: t("music_dance"),
      description: t("music_dance_desc"),
      imageSrc: "/images/music.jpg",
      icon: <Music className="text-white" size={24} />,
      href: "#music",
    },
    // {
    //   title: t("photo_archive"),
    //   description: t("photo_archive_desc"),
    //   imageSrc:
    //     "https://images.unsplash.com/photo-1551225183-94acb7d595b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    //   icon: <Camera className="text-capsule-accent" size={24} />,
    //   href: "#photos",
    // },
  ];

  return (
    <section id="categories" className="py-20 bg-capsule-paper relative">
      <div className="absolute inset-0 opacity-[0.04] bg-noise-pattern mix-blend-multiply" />

      <div className="capsule-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block  px-3 py-1 bg-capsule-sand rounded-full text-sm font-medium mb-4">
            {t("explore_categories")}
          </div>

          <h2 className="text-3xl text-black sm:text-4xl font-serif font-semibold mb-4">
            {t("discover_heritage")}
          </h2>

          <p className="text-capsule-text/80 text-black leading-relaxed">
            {t("categories_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              icon={category.icon}
              href={category.href}
              index={index}
              className="animate-fade-in opacity-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
