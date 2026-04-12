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
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis();
    
    const onScroll = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(onScroll);
    };
    requestAnimationFrame(onScroll);

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Animation Logic
    const workItems = GSAP.utils.toArray<HTMLElement>(".work-img");

    workItems.forEach((img, index) => {
      // Set Initial State
      GSAP.set(img, {
        rotation: index % 2 === 0 ? -15 : 15, // Less extreme rotation
        y: 150, // Pushed down slightly (within container bounds)
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });

      // Create the Reveal Animation
      GSAP.to(img, {
        rotation: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: img,
          // Start when top of image hits 90% of viewport height
          start: "top 90%",
          // End when bottom of image leaves 10% of viewport height
          end: "bottom 10%",
          toggleActions: "play none none reverse", // Plays forward on enter, reverses on leaveBack
        }
      });
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-red min-h-screen w-full selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-18">
        
        {/* Title */}
        <h1 className="text-[10vw] md:text-[8vw] leading-[0.8] text-center uppercase tracking-tighter mb-10 md:mb-20">
          Nova Gallery
        </h1>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 ">
          {WORKS_DATA.map((work, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col group",
                // Stagger column layout for visual interest on larger screens
                index % 2 !== 0 ? "lg:mt-40" : ""
              )}
            >
              <div className="overflow-hidden aspect-[4/5] bg-gray-100 rounded-3xl">
                <img
                  src={work.img}
                  alt={work.title}
                  className="work-img w-full h-full object-cover will-change-transform rounded-3xl"
                />
              </div>
              
              <div className="mt-3">
                <p className="text-lg md:text-xl font-bold uppercase tracking-tight leading-none">
                  {work.title}
                </p>
                <span className="text-sm md:text-base text-black/40 font-medium mt-0 block">
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

/**
 * Utility for conditional Tailwind classes
 */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}