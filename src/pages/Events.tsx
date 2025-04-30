import { CalendarView } from "@/components/calendarView";
import { EventsList } from "@/components/eventsList";
import { HeroSection } from "@/components/eventsHeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EventsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4 py-12" id="main-content">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-2/3">
            <h2 className="mb-6 text-3xl font-bold text-[#333333]">
              {t("upcoming_events")}
            </h2>
            <EventsList />
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="mb-6 text-3xl font-bold text-[#333333]">
              {t("calendar")}
            </h2>
            <CalendarView />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
