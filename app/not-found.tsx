"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCcw } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* --- BACKGROUND ANIMATION --- */}
      {/* Floating Ambient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#CCFF00]/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -100, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-zinc-800/50 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Large Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.h1 
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-white/5 select-none"
          >
            404
          </motion.h1>
          
          {/* Overlay Glitch Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl font-bold text-[#CCFF00] uppercase tracking-[0.3em] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]"
            >
              Way off track
            </motion.p>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-md -mt-8 md:-mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Even Titans get lost sometimes.
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-10">
            The page you're looking for has moved to a different coordinate or never existed. Let's get you back to your training.
          </p>

          {/* --- ANIMATED ACTIONS --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/" 
                className="flex items-center gap-2 bg-[#CCFF00] text-black px-8 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
              >
                <Home size={18} />
                Back to Home
              </Link>
            </motion.div>

            <motion.button 
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/5 text-white px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/10 transition-all"
            >
              <RefreshCcw size={18} />
              Retry
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* --- FOOTER DECORATION --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold"
      >
        <span>Error Code: 0x00404</span>
        <span className="h-1 w-1 bg-zinc-800 rounded-full" />
        <span>Titan System v3.0</span>
      </motion.div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-50 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default NotFound;