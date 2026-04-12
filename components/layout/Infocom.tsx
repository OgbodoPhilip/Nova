"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
interface NavLink {
  label: string;
  href: string;
}

const TitanHero = () => {
  return (
    <div className="min-h-screen p-2 md:p-1 font-sans antialiased selection:bg-[#CCFF00] selection:text-black">
      {/* Main Container with the "Device" border look */}
      <div className="relative min-h-[calc(100vh-3rem)] w-full overflow-hidden rounded-[3rem] border-[12px] border-[#1A1A1A] bg-[#0A0A0A]">
        {/* --- Main Hero Section --- */}
        {/* Adjusted grid-cols to give the right column (image) significantly more space */}
        <main className="relative z-20 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] items-center gap-4 px-5 md:px-10 pt-10 pb-10">
          {/* Left Column: Text and Actions */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-1"
            >
              {["Be healthier.", "Be stronger.", "Be confident."].map(
                (text, i) => (
                  <motion.h1
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                    className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-[0.85]"
                  >
                    {text}
                  </motion.h1>
                ),
              )}
            </motion.div>

            <div className="mt-8 flex gap-2">
              <button className="group flex items-center gap-3 rounded-full bg-[#CCFF00] px-4 py-4 font-bold text-black hover:brightness-110 transition-all">
                Try for free
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#CCFF00]">
                  <Play size={12} fill="currentColor" />
                </div>
              </button>

              <button className="rounded-full bg-white/10 px-4 py-4 font-bold text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
                More about Titan
              </button>
            </div>
          </div>

          {/* Right Column: Image (Expanded Space) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center h-full min-h-[500px] lg:min-h-[650px] w-full mt-[-70] md:mt-0"
          >
            {/* Using fill + object-contain to maximize the image size within the new wide column */}
            <Image
              src="/unsplash.jpg"
              alt="Athlete on treadmill"
              fill
              className="object-contain object-center grayscale-[0.2]"
              priority
            />
          </motion.div>
        </main>

        {/* --- Bottom Grid Section --- */}
        <div className="relative z-20 px-5 md:px-12 pb-12 mt-1 grid grid-cols-1 md:grid-cols-12 gap-5 mt-[-70] md:mt-0">
          {/* Left Card: Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="md:col-span-4 rounded-[1.2rem] bg-white/10 p-5 backdrop-blur-xl border border-white/10 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-black bg-gray-600"
                  />
                ))}
              </div>
              <div>
                <p className="text-xl font-bold text-white">10,000+</p>
                <p className="text-sm text-white uppercase tracking-wider">
                  Satisfied clients
                </p>
              </div>
            </div>
            <p className="mt-6 text-md leading-relaxed text-gray-300">
              They arrive with different goals, yet they all find the support
              and motivation they need. Their success is the ultimate validation
              of our method.
            </p>
          </motion.div>

          {/* Middle Card: Floating Tip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="md:col-span-4 relative flex flex-col justify-end p-8"
          >
            <div className="rounded-[0.9rem] bg-white/5 border border-white/5 p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 text-white"
                >
                  <ChevronLeft size={16} />
                </motion.button>
                <p className="text-[10px] text-center uppercase tracking-widest text-gray-100">
                  Your muscles grow while you sleep.
                  <br />
                  Make 7-9 hours your secret weapon.
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-white/10 text-white"
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
              <div className="flex justify-between text-[10px] font-medium text-gray-100">
                <span>Eric McCall</span>
                <span>Fitness Coach</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Neon CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-4 cursor-pointer rounded-[1.2rem] bg-[#CCFF00] p-5 text-black flex flex-col justify-between relative overflow-hidden"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 h-10 w-20 rounded-full bg-black flex items-center justify-center text-[#CCFF00]"
            >
              <ArrowUpRight size={36} />
            </motion.div>
            <div className="mt-2">
              <h3 className="text-3xl font-black leading-tight">
                Get 14 days
                <br />
                for free
              </h3>
              <p className="mt-2 text-sm font-semibold opacity-70">
                Just give us a call or message us in the chat. Just give us a
                call or message us in the chatJust give us a call or message us
                in the chatJust give us a call or message us in the chat
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TitanHero;
