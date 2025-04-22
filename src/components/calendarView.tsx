"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { eventData } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventCard } from "./eventCard";

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // Create array of day numbers for the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Add empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  // Combine empty cells and days
  const allCells = [...emptyCells, ...days];

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  // Check if a day has events
  const hasEvents = (day: number) => {
    if (!day) return false;
    const dateToCheck = new Date(year, month, day);
    const dateString = dateToCheck.toISOString().split("T")[0];
    return eventData.some((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === dateString;
    });
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    if (!day) return [];
    const dateToCheck = new Date(year, month, day);
    const dateString = dateToCheck.toISOString().split("T")[0];
    return eventData.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === dateString;
    });
  };

  // Handle day click
  const handleDayClick = (day: number | null) => {
    if (!day || !hasEvents(day)) return;

    setSelectedDate(new Date(year, month, day));
    setIsDialogOpen(true);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Card className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{`${monthName} ${year}`}</h3>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextMonth}
              className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1 text-center">
          {allCells.map((day, index) => {
            const hasEventsForDay = hasEvents(day as number);
            return (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative flex h-10 items-center justify-center rounded-full text-sm",
                  day ? "cursor-pointer hover:bg-gray-100" : "",
                  hasEventsForDay ? "font-bold" : "",
                  hasEventsForDay ? "hover:bg-[rgba(82,104,45,0.1)]" : ""
                )}
              >
                {day}
                {hasEventsForDay && (
                  <div className="absolute bottom-1 h-1 w-1 rounded-full bg-[rgb(82,104,45)]"></div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedDate ? formatDate(selectedDate) : "Events"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            {selectedDate &&
            getEventsForDay(selectedDate.getDate()).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDay(selectedDate.getDate()).map((event) => (
                  <EventCard key={event.id} event={event} compact />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No events found for this date.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
