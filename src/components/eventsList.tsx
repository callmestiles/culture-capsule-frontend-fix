import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "./eventCard";
import axios from "axios";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

export function EventsList() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://culture-capsule-backend.onrender.com/api/events?language=${language}`
        );
        if (response.data.success) {
          console.log("Events fetched successfully:", response.data.events);
          const transformedData = response.data.events.map((item) => {
            return {
              id: item._id,
              title: item.title,
              description: item.description,
              date: item.startDate,
              time: `${item.startTime} - ${item.endTime}`,
              location: item.location || t("event_location"),
              category:
                item.category.charAt(0).toUpperCase() + item.category.slice(1),
              image:
                item.imageUrl.length > 0
                  ? item.imageUrl[0]
                  : "https://placehold.co/200?text=No+Image",
            };
          });
          setEventsData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [language, t]);

  const filteredEvents =
    activeTab === "all"
      ? eventsData
      : eventsData.filter(
          (event) => event.category.toLowerCase() === activeTab
        );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        {/* Wrap TabsList in ScrollArea for horizontal scrolling on mobile */}
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <TabsList className="mb-2 md:mb-6 inline-flex w-max bg-gray-100 px-1 gap-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("all")}
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("music")}
            </TabsTrigger>
            <TabsTrigger
              value="art"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("art")}
            </TabsTrigger>
            <TabsTrigger
              value="food"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("food")}
            </TabsTrigger>
            <TabsTrigger
              value="heritage"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("heritage")}
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("community")}
            </TabsTrigger>
            <TabsTrigger
              value="theater"
              className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white px-4 py-2 text-sm"
            >
              {t("theater")}
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <TabsContent value={activeTab} className="mt-2 md:mt-0">
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">{t("no_events_found")}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
