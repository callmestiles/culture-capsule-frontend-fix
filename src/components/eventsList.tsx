"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventData } from "@/lib/data";
import { EventCard } from "./eventCard";

export function EventsList() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter events based on active tab
  const filteredEvents =
    activeTab === "all"
      ? eventData
      : eventData.filter((event) => event.category.toLowerCase() === activeTab);

  // Format date
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
        <TabsList className="mb-6 grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="music"
            className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white"
          >
            Music
          </TabsTrigger>
          <TabsTrigger
            value="art"
            className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white"
          >
            Art
          </TabsTrigger>
          <TabsTrigger
            value="food"
            className="data-[state=active]:bg-[rgb(82,104,45)] data-[state=active]:text-white"
          >
            Food
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">
                  No events found in this category.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
