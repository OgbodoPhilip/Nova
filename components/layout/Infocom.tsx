"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const TitanHero = () => {
  return (
    <div className="min-h-screen p-2 md:p-1 font-sans antialiased selection:bg-[#CCFF00] selection:text-black">
      {/* Main Container */}
      <div className="relative min-h-[calc(100vh-3rem)] w-full overflow-hidden rounded-[3rem] border-[12px] border-[#1A1A1A] bg-[#0A0A0A]">
        
        {/* --- Main Hero Section --- */}
        <main className="relative z-20 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] items-center gap-4 px-5 md:px-10 pt-10 pb-10">
          
          {/* Left Column: Text and Actions */}
          <div className="flex flex-col justify-center">
            <div className="space-y-1">
              {["Be healthier.", "Be stronger.", "Be confident."].map((text, i) => (
                <motion.h1
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  /* Tighter stagger: 0.1s instead of 0.2s for faster perception */
                  transition={{ 
                    delay: i * 0.1 + 0.1, 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[0.85]"
                >
                  {text}
                </motion.h1>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <motion.div whileTap={{ scale: 0.95 }} className="group flex items-center gap-3 rounded-full bg-[#CCFF00] px-4 py-4 md:px-10 md:py-4 font-bold text-black hover:brightness-110 transition-all justify-center cursor-pointer">
                <Link href="/dashboard">Try for free</Link>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#CCFF00]">
                  <Play size={12} fill="currentColor" />
                </span>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div whileTap={{ scale: 0.95 }} className="rounded-full md:px-10 md:py-4 bg-white/10 px-4 py-4 font-bold text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-center cursor-pointer">
                <Link href="/pricing">Learn More</Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Optimized Image container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            /* will-change tells the browser to use the GPU for this specific element */
            className="relative flex items-center justify-center h-full min-h-[500px] lg:min-h-[650px] w-full mt-[-40px] md:mt-0 will-change-transform"
          >
            <Image
              src="/unsplash.avif"
              alt="Athlete on treadmill"
              fill
              /* Sizes is key for LCP speed: tells the browser which image size to fetch */
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-contain object-center grayscale-[0.2]"
              priority // Preloads the image immediately
              quality={85} // Optimized quality for smaller file size
            />
          </motion.div>
        </main>

        {/* --- Bottom Grid Section --- */}
        <div className="relative z-20 px-5 md:px-12 pb-12 grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Left Card */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-4 rounded-[1.2rem] bg-white/10 p-5 backdrop-blur-xl border border-white/10 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-black bg-zinc-800" />
                ))}
              </div>
              <div>
                <p className="text-xl font-bold text-white">10,000+</p>
                <p className="text-[10px] text-white uppercase tracking-wider opacity-60">Satisfied clients</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-400">
              They arrive with different goals, yet they all find the support and motivation they need. Their success stories fuel our passion to keep innovating and delivering the best fitness experience possible.
            </p>
          </motion.div> */}

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="md:col-span-4 rounded-[1.2rem] bg-white/10 p-5 backdrop-blur-xl border border-white/10 flex flex-col justify-between"
>
  <div className="flex items-center gap-4">
    {/* Stacked Avatar Group */}
    <div className="flex -space-x-3">
      {[
        "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHdvbWVufGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1690444963408-9573a17a8058?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHdvbWVufGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHdvbWVufGVufDB8fDB8fHww",
      ].map((src, i) => (
        <div 
          key={i} 
          className="relative h-10 w-10 rounded-full border-2 border-[#0A0A0A] overflow-hidden bg-zinc-800"
        >
          <Image
            src={src}
            alt={`Satisfied client ${i + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>

    <div>
      <p className="text-xl font-bold text-white tracking-tighter">10,000+</p>
      <p className="text-[10px] text-[#CCFF00] uppercase tracking-wider font-semibold">
        Satisfied clients
      </p>
    </div>
  </div>

  <p className="mt-6 text-sm leading-relaxed text-gray-400">
    They arrive with different goals, yet they all find the support and motivation they need. 
    Their success stories fuel our passion to keep innovating.
  </p>
</motion.div>

          {/* Middle Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="md:col-span-4 relative flex flex-col justify-end p-8"
          >
            <div className="rounded-[0.9rem] bg-white/5 border border-white/5 p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <p className="text-[9px] text-center uppercase tracking-widest text-gray-300">
                  Muscles grow during sleep. <br /> Aim for 7-9 hours. It helps with recovery and growth.
                </p>
                <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-tighter">
                <span>Eric McCall</span>
                <span>Fitness Coach</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Neon CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="md:col-span-4 cursor-pointer rounded-[1.2rem] bg-[#CCFF00] p-6 text-black flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-black flex items-center justify-center text-[#CCFF00] transition-transform group-hover:rotate-12">
              <ArrowUpRight size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-black leading-none">Get 14 days <br /> for free</h3>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-tight opacity-70">
                Contact us via chat to activate membership and start your fitness journey with us. No credit card required. Just pure motivation and results.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TitanHero;