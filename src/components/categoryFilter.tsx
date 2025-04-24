"use client";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string | null) => void;
  activeCategory: string | null;
}

export function CategoryFilter({
  categories,
  onCategoryChange,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-max space-x-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === null
              ? "bg-[rgb(82,104,45)] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category
                ? "bg-[rgb(82,104,45)] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
