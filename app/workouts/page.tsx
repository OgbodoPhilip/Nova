'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Info, Dumbbell, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MuscleGroup, workoutData } from '@/types/workout';

const categories: (MuscleGroup | 'All')[] = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];

export default function WorkoutLibrary() {
  const [activeCategory, setActiveCategory] = React.useState<MuscleGroup | 'All'>('All');
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const filteredWorkouts = workoutData.filter((workout) => {
    const matchesCategory = activeCategory === 'All' || workout.category === activeCategory;
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workout.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
            Exercise Library
          </h1>
          <p className="mt-3 text-xl text-zinc-400 max-w-md">
            Master your form with 200+ professional exercises
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
            <Search className="w-5 h-5" />
          </div>
          <Input
            placeholder="Search exercises or equipment..."
            className="pl-14 h-14 bg-zinc-900 border border-zinc-800 focus:border-violet-500 rounded-2xl text-lg placeholder:text-zinc-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs - Premium Style */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3.5 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0
              ${activeCategory === category 
                ? 'bg-white text-zinc-950 shadow-xl shadow-violet-500/20 scale-105' 
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <p>
          Showing <span className="font-semibold text-white">{filteredWorkouts.length}</span> exercises
        </p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-zinc-400 hover:text-white"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Exercise Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.3) }}
              className="group relative h-[420px] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-violet-500/50 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img 
                  src={workout.image} 
                  alt={workout.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/90" />
              </div>

              {/* Top Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white font-medium px-4 py-1">
                  {workout.category}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white font-medium px-4 py-1"
                >
                  {workout.difficulty}
                </Badge>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Dumbbell className="w-4 h-4 text-violet-400" />
                  <span className="text-xs tracking-[2px] uppercase font-mono text-zinc-400">
                    {workout.equipment}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight mb-6 line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {workout.name}
                </h3>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    size="lg"
                    className="flex-1 bg-white hover:bg-white/90 text-black font-semibold rounded-2xl h-14 transition-all active:scale-[0.985]"
                  >
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Start Exercise
                  </Button>

                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-14 w-14 rounded-2xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
                  >
                    <Info className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Subtle Hover Glow */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-violet-500/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State - Premium */}
      {filteredWorkouts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-zinc-950/50 border border-zinc-900 rounded-3xl"
        >
          <div className="mx-auto w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
            <Dumbbell className="w-10 h-10 text-zinc-600" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">No matching exercises</h3>
          <p className="text-zinc-500 max-w-sm mx-auto">
            We couldn’t find any exercises matching your current filters. 
            Try broadening your search or category.
          </p>
          <Button 
            variant="outline" 
            className="mt-8 rounded-full"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory('All');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}