"use client";

import React, { useRef } from "react";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

GSAP.registerPlugin(ScrollTrigger);

const WORKS_DATA = [
  { title: "Ethereal Dreams", category: "Visual storytelling", img: "https://images.pexels.com/photos/8467429/pexels-photo-8467429.jpeg" },
  { title: "Midnight Bloom", category: "Dark elegance", img: "https://images.pexels.com/photos/33276110/pexels-photo-33276110.jpeg" },
  { title: "Golden Hour", category: "Warm minimalism", img: "https://images.pexels.com/photos/3378993/pexels-photo-3378993.jpeg" },
  { title: "Urban Solace", category: "City life reimagined", img: "https://images.pexels.com/photos/1231258/pexels-photo-1231258.jpeg" },
  { title: "Velvet Skies", category: "Soft gradients", img: "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=500&auto=format&fit=crop&q=60" },
  { title: "Serene Moments", category: "Peaceful composition", img: "https://images.unsplash.com/photo-1541331270253-b7cb940d4e1a?w=500&auto=format&fit=crop&q=60" },
  { title: "Neon Reflections", category: "Modern aesthetics", img: "https://images.unsplash.com/photo-1562157697-74f3f1deab4f?w=500&auto=format&fit=crop&q=60" },
  { title: "Ocean Whispers", category: "Coastal serenity", img: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=500&auto=format&fit=crop&q=60" },
];

export default function ProofOfWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    GSAP.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    GSAP.ticker.lagSmoothing(0);

    // 2. Animation Logic
    const workItems = GSAP.utils.toArray<HTMLElement>(".work-img");
    const isDesktop = window.innerWidth > 768;

    workItems.forEach((img, index) => {
      // Set initial state: Hidden, rotated, and pushed down
      GSAP.set(img, {
        rotation: index % 2 === 0 ? -45 : 45,
        transformOrigin: "center center",
        y: isDesktop ? 400 : 250,
        opacity: 0,
        scale: 0.8
      });

      // Create Trigger for each image
      ScrollTrigger.create({
        trigger: img,
        start: isDesktop ? "top 105%" : "top 115%",
        onEnter: () => {
          GSAP.to(img, {
            rotation: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            // Stagger slightly on desktop for the two-column layout
            delay: isDesktop ? (index % 2 === 0 ? 0 : 0.2) : 0
          });
        },
        // Reset animation if user scrolls back up (optional)
        onLeaveBack: () => {
          GSAP.to(img, { opacity: 0, y: 100, duration: 0.5 });
        }
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
        
        {/* Title */}
        <h1 className="font-(family-name:--font-display) text-[15vw] md:text-[12vw] leading-[0.8] text-center uppercase tracking-tighter mb-20 md:mb-40">
          My Works
        </h1>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 md:gap-y-32">
          {WORKS_DATA.map((work, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col group",
                // Offset every second item on desktop for a more dynamic feel
                index % 2 !== 0 ? "md:mt-40" : ""
              )}
            >
              <div className="overflow-hidden aspect-square bg-gray-100">
                <img
                  src={work.img}
                  alt={work.title}
                  className="work-img w-full h-full object-cover will-change-transform"
                />
              </div>
              
              <div className="mt-6">
                <p className="text-lg md:text-xl font-semibold uppercase tracking-tight leading-none">
                  {work.title}
                </p>
                <span className="text-sm md:text-base text-black/50 font-medium mt-2 block">
                  {work.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Utility for cleaner classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}