"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Flame,
  Smartphone,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Real-time Tracking",
    description:
      "Watch your nova update live as you move. Syncs perfectly with your favorite wearables.",
    className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20",
    icon: <Activity className="w-8 h-8 text-primary" />,
    visual: (
      <div className="mt-4 h-32 w-full bg-primary/10 rounded-xl border border-dashed border-primary/30 flex items-center justify-center">
        Waveform Chart Placeholder
      </div>
    ),
  },
  {
    title: "Calorie Intelligence",
    description: "Smart logging for every meal.",
    className: "md:col-span-1 md:row-span-1",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    title: "Mobile First",
    description: "Log your sets on the go.",
    className: "md:col-span-1 md:row-span-1",
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Progress Analytics",
    description:
      "Visual data that actually makes sense. Deep dive into your weekly and monthly trends with interactive heatmaps.",
    className: "md:col-span-2 md:row-span-1 flex-row gap-6 items-center",
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
  },
  {
    title: "24/7 Support",
    description: "Always here for you.",
    className: "md:col-span-1 md:row-span-1",
    icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
  },
  {
    title: "Rest Timer",
    description: "Precise intervals.",
    className: "md:col-span-1 md:row-span-1",
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
  },
];

export default function FeaturesBento() {
  return (
    <section id="features" className="pb-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to level up.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stop guessing and start measuring with our comprehensive suite of
            fitness tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border bg-card p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-primary/5",
                feature.className,
              )}
            >
              <div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              {feature.visual && feature.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
