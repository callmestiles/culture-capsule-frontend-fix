import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import AnimatedImage from "./AnimatedImage";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface CollectionCardProps {
  title: string;
  category: string;
  contributor: string;
  date: string;
  imageSrc: string;
  href: string;
  className?: string;
  index?: number;
  likes: number;
  dislikes: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  category,
  contributor,
  date,
  imageSrc,
  href,
  className,
  index = 0,
  likes,
  dislikes,
}) => {
  const { t } = useLanguage();

  // Extract the collection index from the href if it exists
  const detailLink = `/capsule/${index}`;

  return (
    <Link
      to={href}
      className={cn(
        "group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-card hover:shadow-capsule transition-all duration-500 transform hover:-translate-y-1",
        className
      )}
    >
      <div className="relative overflow-hidden">
        <AnimatedImage
          src={imageSrc}
          alt={title}
          aspectRatio="aspect-[3/2]"
          className="w-full transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-capsule-text dark:text-white">
          {category}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-serif font-semibold text-capsule-text dark:text-white mb-2 group-hover:text-capsule-accent dark:group-hover:text-capsule-accent/80 transition-colors">
          {title}
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-capsule-text/70 dark:text-gray-400">
          <span>
            <p>{date}</p>
            {t("by")} {contributor}
          </span>
          <div className="flex items-left space-x-2">
            <button className="flex items-center text-capsule-text/70 dark:text-gray-400 hover:text-capsule-accent dark:hover:text-capsule-accent/80 transition-colors">
              <ThumbsUp />
              <span className="ml-1">{likes || 0}</span>
            </button>
            <button className="flex items-center text-capsule-text/70 dark:text-gray-400 hover:text-capsule-accent dark:hover:text-capsule-accent/80 transition-colors">
              <ThumbsDown />
              <span className="ml-1">{likes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
