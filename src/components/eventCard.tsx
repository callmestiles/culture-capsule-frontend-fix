import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Event } from "@/lib/data";
import { Image } from "lucide-react";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (compact) {
    return (
      <Card className="overflow-hidden hover:shadow-sm transition-shadow">
        <CardContent className="p-4">
          <div className="mb-2 inline-block rounded-full bg-capsule-sand px-3 py-1 text-xs font-medium text-white">
            {event.category}
          </div>
          <h3 className="mb-2 text-lg font-bold text-capsule-accent">
            {event.title}
          </h3>
          <p className="mb-3 text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="h-48 w-full md:h-auto md:w-1/3">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image className="w-full h-full text-gray-400 object-cover" />
          )}
        </div>
        <CardContent className="flex-1 py-9 px-6 items-center">
          <div className="mb-2 inline-block rounded-full bg-capsule-sand px-3 py-1 text-xs font-medium text-white">
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
        </CardContent>
      </div>
    </Card>
  );
}
