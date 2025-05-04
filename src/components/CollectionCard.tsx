import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThumbsUp, ThumbsDown, Image } from "lucide-react";
import { NoImagePlaceholder2 } from "./ImagePlaceholders";

interface CollectionCardProps {
  title: string;
  category: string;
  contributor: string;
  date: string;
  imageSrc: string;
  hasImages?: boolean;
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
  hasImages,
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
        "group bg-capsule-accent text-white flex flex-col rounded-xl overflow-hidden shadow-card hover:shadow-capsule transition-all duration-500 transform hover:-translate-y-1 h-full",
        className
      )}
    >
      <div className="relative overflow-hidden">
        {hasImages ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full aspect-[3/2] transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="bg-capsule-olive w-full h-full aspect-[3/2] flex justify-center items-center transition-transform duration-700 group-hover:scale-105">
            <NoImagePlaceholder2 />
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1 bg-capsule-sand text-white backdrop-blur-sm rounded-full text-xs font-medium">
          {category}
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between h-[175px]">
        <div>
          <h3 className="text-xl font-serif font-semibold text-white mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span>
            <p className="mb-2">{date}</p>
            {localStorage.getItem("language") === "tr" ? (
              <>
                {contributor} {t("by")}
              </>
            ) : (
              <>
                {t("by")} {contributor}
              </>
            )}
          </span>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-gray-300 transition-colors">
              <ThumbsUp size={24} />
              <span className="ml-1">{likes || 0}</span>
            </button>
            <button className="flex items-center text-gray-300 transition-colors">
              <ThumbsDown />
              <span className="ml-1">{dislikes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
