"use client";
import heroImg from "/images/events.webp";

export function HeroSection() {
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
        src={heroImg || "https://placehold.co/1600x800"}
        alt="An event happening where fireworks are being displayed"
        loading="lazy"
        width={1600}
        height={800}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-5xl font-bold">Cultural Events</h1>
        <p className="mb-6 max-w-2xl text-xl">
          Discover and participate in cultural events happening around you
        </p>
        <button
          onClick={scrollToEvents}
          className="rounded-full bg-[rgb(82,104,45)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[rgb(65,85,35)]"
        >
          Explore Events
        </button>
      </div>
    </div>
  );
}
