"use client";
import heroImg from "/images/events.webp";
import { useLanguage } from "@/contexts/LanguageContext"; // adjust the path if needed

export function HeroSection() {
  const { t } = useLanguage(); // assuming your context exposes t()

  const scrollToEvents = () => {
    const eventsSection = document.getElementById("main-content");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <img
        src={heroImg}
        alt={t("hero_alt")}
        loading="lazy"
        width={1600}
        height={800}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-5xl font-bold">{t("cultural_events")}</h1>
        <p className="mb-6 max-w-2xl text-xl">{t("discover_events")}</p>
        <button
          onClick={scrollToEvents}
          className="rounded-full bg-[rgb(82,104,45)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[rgb(65,85,35)]"
        >
          {t("explore_events")}
        </button>
      </div>
    </div>
  );
}
