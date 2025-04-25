import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  lowResSrc?: string;
  aspectRatio?: string;
  loadingColor?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  lowResSrc,
  aspectRatio = "aspect-video",
  loadingColor = "bg-capsule-paper",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    const currentElement = document.getElementById(
      `image-${src.replace(/\W/g, "")}`
    );
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [src]);

  return (
    <div
      id={`image-${src.replace(/\W/g, "")}`}
      className={cn(
        aspectRatio,
        "overflow-hidden relative",
        loadingColor,
        className
      )}
      style={
        lowResSrc
          ? { backgroundImage: `url(${lowResSrc})`, backgroundSize: "cover" }
          : undefined
      }
    >
      {isIntersecting && (
        <>
          <div className="absolute inset-0 backdrop-blur-xs" />
          <img
            src={src}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedImage;
