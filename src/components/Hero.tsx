import React, { useEffect, useState } from "react";
import { ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h- flex items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-capsule-bg to-white/50 -z-10" />

      <div className="absolute inset-0 opacity-[0.03] bg-noise-pattern mix-blend-multiply -z-10" />

      <div className="capsule-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="max-w-xl">
          <div
            className={cn(
              "opacity-0 transform translate-y-4 transition-all duration-700 ease-out",
              isVisible && "opacity-100 translate-y-0"
            )}
          >
            <div className="inline-block px-3 py-1 bg-capsule-sand text-white rounded-full text-sm font-medium mb-6">
              {t("hero_title")}
            </div>

            <h1 className="text-4xl text-black sm:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-6 text-balance">
              {t("hero_subtitle")}
            </h1>

            <p className="text-lg text-black text-capsule-text/80 mb-8 leading-relaxed">
              {t("hero_description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contribute"
                className="px-6 py-3 bg-capsule-accent hover:bg-capsule-accent/90 text-white rounded-md font-medium transition-all transform hover:translate-y-[-2px] hover:shadow-md"
              >
                {t("hero_contribute")}
              </a>

              <a
                href="#explore"
                className="px-6 py-3 bg-transparent border border-capsule-accent text-capsule-accent rounded-md font-medium hover:bg-capsule-accent/5 transition-all"
              >
                {t("hero_explore")}
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative opacity-0 transform translate-y-4 transition-all duration-700 delay-300 ease-out",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-capsule-paper relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-noise-pattern opacity-[0.04] mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
              <img
                src="/images/hero.jpeg"
                alt="Cyprus Sea View"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToCategories}
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 animate-float text-capsule-accent hover:text-capsule-text transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={36} />
      </button>
    </section>
  );
};

export default Hero;
