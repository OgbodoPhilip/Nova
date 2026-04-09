"use client";

import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

const IMAGES = [
  { id: 1, src: '/1.webp', alt: 'Gallery Image 1' },
  { id: 2, src: '/2.webp', alt: 'Gallery Image 2' },
  { id: 3, src: '/3.webp', alt: 'Gallery Image 3' },
  { id: 4, src: '/4.webp', alt: 'Gallery Image 4' },
  { id: 5, src: '/5.webp', alt: 'Gallery Image 5' },
  { id: 6, src: '/6.webp', alt: 'Gallery Image 6' },
  { id: 7, src: '/7.webp', alt: 'Gallery Image 7' },
  { id: 8, src: '/8.webp', alt: 'Gallery Image 8' },
  { id: 9, src: '/9.webp', alt: 'Gallery Image 9' },
  { id: 10, src: '/10.webp', alt: 'Gallery Image 10' },
];

const HorizontalParallaxGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // 1. Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate initial loading sequence
    const timer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  // 2. Setup Scroll Triggered Horizontal Movement
  const { scrollYProgress } = useScroll();
  
  // Transform vertical scroll (0 to 1) into horizontal movement (-100% to 0%)
  const xTranslationRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  
  // Add a spring physics layer to smooth out the horizontal movement
  const x = useSpring(xTranslationRaw, { stiffness: 100, damping: 20, restDelta: 0.001 });

  return (
    <div className="relative w-full bg-black text-white font-mono selection:bg-white selection:text-black">
      <Head>
        <title>Horizontal Parallax Gallery | Native Color & Scroll</title>
      </Head>

      {/* Loading Overlay (Unchanged) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-[100px] h-[1px] bg-white origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame / Navigation (Unchanged, fixed position) */}
      <header className="fixed inset-0 z-50 p-6 pointer-events-none flex flex-col md:grid md:grid-cols-[auto_auto_auto_auto_1fr] md:grid-rows-[auto_auto_1fr] gap-8 items-start content-start">
        <h1 className="text-sm m-0 pointer-events-auto md:col-span-1">
          Horizontal Scroll (Next.js)
        </h1>
        
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest pointer-events-auto">
          <Link href="#" className="hover:underline transition-all">Tutorial</Link>
          <Link href="#" className="hover:underline transition-all">GitHub</Link>
          <Link href="#" className="hover:underline transition-all">Archive</Link>
        </div>

        <nav className="flex flex-wrap gap-2 pointer-events-auto md:row-start-2 md:col-span-2">
          <Link href="#" className="px-4 py-2 border border-neutral-700 rounded-full text-[10px] hover:border-neutral-400 transition-colors uppercase">
            WebGL Version
          </Link>
        </nav>

        <nav className="flex flex-wrap gap-4 text-neutral-500 text-[10px] pointer-events-auto md:row-start-3 md:self-end">
          <Link href="#" className="hover:text-white">#scroll</Link>
          <Link href="#" className="hover:text-white">#lenis</Link>
          <Link href="#" className="hover:text-white">#framer-motion</Link>
        </nav>
      </header>

      {/* 3. The Scroll Wrapper: Defines the total vertical scroll height */}
      <main className="relative z-10 w-full h-[500vh]"> {/* Adjust height for scroll duration */}
        
        {/* 4. Sticky Container: Keeps the gallery in view while scrolling */}
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          {/* 5. Animated Track: Framer Motion moves this container horizontally */}
          <motion.div 
            style={{ x }} 
            className="flex flex-nowrap gap-10 md:gap-20 px-[10vw]"
            ref={galleryContainerRef}
          >
            {IMAGES.map((img) => (
              <div
                key={img.id}
                className="relative flex-shrink-0 w-[70vw] md:w-[35vw] aspect-[3/4] overflow-hidden bg-neutral-900 shadow-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  draggable={false}
                  // CHANGE: Removed 'grayscale' and 'transition-all'
                  // Added 'object-cover' for proper fitting
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, 35vw" // Optional: for image optimization
                />
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Global Style for hiding default scrollbars */}
      <style jsx global>{`
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        
        /* Hide scrollbar for main track but allow functional scroll */
        body::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalParallaxGallery;