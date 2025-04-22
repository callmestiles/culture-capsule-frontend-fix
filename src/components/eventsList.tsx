"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventData } from "@/lib/data";

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
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="h-48 w-full md:h-auto md:w-1/3">
                      <img
                        src={
                          event.image || `/placeholder.svg?height=300&width=400`
                        }
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                        {event.category}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="mb-4 text-gray-600">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <button className="mt-4 rounded-full bg-[rgb(82,104,45)] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[rgb(65,85,35)]">
                        View Details
                      </button>
                    </CardContent>
                  </div>
                </Card>
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
