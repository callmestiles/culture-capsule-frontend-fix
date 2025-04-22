"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { eventData } from "@/lib/data";

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    const dateToCheck = new Date(year, month, day).toISOString().split("T")[0];
    return eventData.some((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === dateToCheck;
    });
  };

  return (
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
        {allCells.map((day, index) => (
          <div
            key={index}
            className={cn(
              "relative flex h-10 items-center justify-center rounded-full text-sm",
              day ? "cursor-pointer hover:bg-gray-100" : "",
              hasEvents(day as number) && day ? "font-bold" : ""
            )}
          >
            {day}
            {hasEvents(day as number) && day && (
              <div className="absolute bottom-1 h-1 w-1 rounded-full bg-[rgb(82,104,45)]"></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
