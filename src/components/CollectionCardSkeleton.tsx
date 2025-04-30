import React from "react";
import { cn } from "@/lib/utils";

interface CollectionCardSkeletonProps {
  className?: string;
}

const CollectionCardSkeleton: React.FC<CollectionCardSkeletonProps> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl overflow-hidden shadow-card h-full animate-pulse",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="w-full aspect-[3/2] bg-gray-300/30"></div>

      {/* Content placeholder */}
      <div className="p-5 flex flex-col justify-between h-[175px]">
        <div>
          {/* Title placeholder */}
          <div className="h-6 bg-gray-300/30 rounded w-4/5 mb-2"></div>
          <div className="h-6 bg-gray-300/30 rounded w-3/5"></div>
        </div>

        <div className="flex items-center justify-between">
          {/* Date and contributor placeholder */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-300/30 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-300/30 rounded w-20"></div>
          </div>

          {/* Likes/dislikes placeholder */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300/30"></div>
              <div className="h-3 w-3 bg-gray-300/30 rounded ml-1"></div>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-gray-300/30"></div>
              <div className="h-3 w-3 bg-gray-300/30 rounded ml-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;
