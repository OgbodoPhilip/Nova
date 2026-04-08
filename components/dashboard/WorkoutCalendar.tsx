'use client';

import * as React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Dumbbell, 
  Flame, 
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock Data for "Completed Workouts"
const completedWorkouts = [
  { date: new Date(2026, 3, 2), type: "Strength", volume: "4,500kg" },
  { date: new Date(2026, 3, 4), type: "HIIT", volume: "450kcal" },
  { date: new Date(2026, 3, 6), type: "Strength", volume: "5,200kg" },
];

export default function WorkoutCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT: The Monthly Grid (8 Cols) */}
      <div className="lg:col-span-8 bg-card border-2 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day} className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const hasWorkout = completedWorkouts.some(w => isSameDay(w.date, day));
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all border-2",
                  !isSameMonth(day, currentMonth) && "opacity-20 pointer-events-none",
                  isSameDay(day, selectedDate) ? "border-primary bg-primary/5" : "border-transparent bg-muted/30",
                  isToday(day) && "ring-2 ring-primary ring-offset-2 bg-background"
                )}
              >
                <span className={cn("text-sm font-bold", isToday(day) ? "text-primary" : "text-foreground")}>
                  {format(day, "d")}
                </span>
                {hasWorkout && (
                  <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Day Details & Planning (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-primary text-primary-foreground p-8 rounded-3xl shadow-xl shadow-primary/20">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Consistency</p>
          <h3 className="text-3xl font-extrabold mb-4">12 Day Streak</h3>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Flame className="w-4 h-4 fill-current" />
            <span>You're in the top 5% this month!</span>
          </div>
        </div>

        <div className="bg-card border-2 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold">{format(selectedDate, "MMM do")} Summary</h4>
            <Button size="icon" variant="ghost" className="rounded-full bg-muted">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {completedWorkouts.some(w => isSameDay(w.date, selectedDate)) ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border">
                <div className="bg-primary/20 p-2 rounded-xl">
                  <Dumbbell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Strength Training</p>
                  <p className="text-xs text-muted-foreground">Volume: 5,200kg</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">No activity recorded for this day.</p>
              <Button variant="link" className="text-primary font-bold">Schedule a session?</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}