import React from "react";
import { cn } from "@/lib/utils";
import AnimatedImage from "./AnimatedImage";

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
  index?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  imageSrc,
  icon,
  href,
  className,
  index = 0,
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-capsule transition-all duration-500 transform hover:-translate-y-1",
        className
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 z-0 opacity-90 transition-all duration-500 group-hover:opacity-100">
        <AnimatedImage
          src={imageSrc}
          alt={title}
          aspectRatio="aspect-[3/2]"
          className="w-full h-full"
          shouldBlur={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <div className="mb-4 w-14 h-14 rounded-full bg-capsule-accent backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>

        <h3 className="text-2xl font-serif font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="text-sm text-white/90 mb-4 max-w-xs">{description}</p>

        <div className="inline-flex items-center gap-1 text-white text-sm font-medium">
          <span>Explore</span>
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
            className="transition-transform duration-300 transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
