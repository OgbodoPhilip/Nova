'use client';

import { motion } from "framer-motion";
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  HeartPulse, 
  Timer, 
  Zap, 
  Trophy 
} from "lucide-react";

const brands = [
  { name: "Fitbit", icon: Activity },
  { name: "Strava", icon: Flame },
  { name: "Peloton", icon: Timer },
  { name: "Apple Health", icon: HeartPulse },
  { name: "Garmin", icon: Zap },
  { name: "Nike Run", icon: Trophy },
  { name: "MyFitnessPal", icon: Dumbbell },
];

export default function LogoMarquee() {
  return (
    <section className="py-12 bg-background overflow-hidden border-y border-border/50">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Integrated with the world's leading fitness ecosystems
        </p>
      </div>

      <div className="relative flex w-full">
        {/* Gradient Overlays for smooth fade-in/out edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{ x: [0, -1035] }} // Adjust number based on total width
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Render the list twice for seamless looping */}
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-default"
            >
              <brand.icon className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}