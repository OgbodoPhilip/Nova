import React from "react";
import { Send, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-zinc-900 dark:text-white pt-20 font-sans selection:bg-[#FF0000] selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Left Column: CTA + Newsletter - First on mobile */}
          <div className="lg:col-span-5 space-y-10 lg:order-1 order-1">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight max-w-md">
              Have a Cool Idea? Let&apos;s Collaborate
              <span className="text-[#FF0000]">.</span>
            </h2>

            <div className="space-y-4 max-w-sm">
              <h4 className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em] pl-1">
                Newsletter
              </h4>
              <form
                className="relative group"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-zinc-100 dark:bg-[#0A0A0A] border border-zinc-300 dark:border-zinc-800 rounded-full py-4 pl-6 pr-14 text-sm outline-none focus:border-[#FF0000]/60 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-700"
                />

                <motion.button  whileTap={{ scale: 0.9 }} 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF0000] text-white p-2.5 rounded-full hover:bg-red-700 transition-colors group"
                >
                  
                    <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                 
                </motion.button>
              </form>
              <p className="text-zinc-500 dark:text-zinc-400 text-[10px] pl-2 italic tracking-wide">
                Get the latest design insights and studio updates.
              </p>
            </div>
          </div>

          {/* Right Column: Support Ticket + Navigation Grid */}
          <div className="lg:col-span-7 space-y-16 lg:order-2 order-2">
            {/* Support Ticket Section - Comes after Newsletter on mobile */}
            <div className="space-y-6 pt-10 border-zinc-200 dark:border-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-[#FF0000]" />
                <h4 className="text-zinc-800 dark:text-zinc-100 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Support Ticket
                </h4>
              </div>

              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-zinc-100 dark:bg-[#0A0A0A] border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-5 text-sm outline-none focus:border-[#FF0000]/40 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-700"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-zinc-100 dark:bg-[#0A0A0A] border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-5 text-sm outline-none focus:border-[#FF0000]/40 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-700"
                />
                <textarea
                  placeholder="How can we help you?"
                  rows={3}
                  className="sm:col-span-2 bg-zinc-100 dark:bg-[#0A0A0A] border border-zinc-300 dark:border-zinc-800 rounded-xl py-4 px-5 text-sm outline-none focus:border-[#FF0000]/40 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-700 resize-none"
                />
                <motion.button whileTap={{ scale: 0.9 }} 
                  type="submit"
                  className="sm:col-span-2 flex items-center justify-center gap-3 bg-[#FF0000] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all uppercase tracking-widest text-xs group"
                >
                  Send Message
                  <Send
                    size={14}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </motion.button>
              </form>
            </div>

            {/* The 4-Column Navigation Grid - Last on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* 1. Location */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Location
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  1330 Huffman Rd, Anchorage,
                  <br />
                  Alaska, United States
                </p>
              </div>

              {/* 2. Contact */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Contact
                </h4>
                <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                  <p className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                    +661 2058 6987 20
                  </p>
                  <p className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                    Hello@Studio.com
                  </p>
                </div>
              </div>

              {/* 3. Social */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Social
                </h4>
                <div className="grid grid-cols-1 gap-y-2">
                  {["Instagram", "Twitter/X", "YouTube", "Pinterest"].map(
                    (social) => (
                      <div
                        key={social}
                        className="flex items-center gap-2 group cursor-pointer w-fit"
                      >
                        <div className="w-1 h-1 bg-[#FF0000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <motion.span whileTap={{scale:0.85}} className="text-zinc-600 dark:text-zinc-400 text-sm group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                          {social}
                        </motion.span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 4. Helpful Links */}
              <div className="space-y-2">
                <h4 className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-[0.2em]">
                  Links
                </h4>
                <div className="grid grid-cols-1 gap-y-2">
                  {["About", "Services", "Work", "Blog"].map((link) => (
                    <span
                      key={link}
                      className="text-zinc-600 dark:text-zinc-400 text-sm hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer w-fit"
                    >
                      {link}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Row */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-10 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wider justify-center">
          <div className=" pt-8 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <p>© 2026 Nova Fitness. All right reserved.  </p>
            <p>Built with precision for the community.</p>
           
            <div className="flex gap-4">
              <motion.div whileTap={{ scale: 0.9 }} >
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
               </motion.div>

               <motion.div whileTap={{ scale: 0.9 }} >
              <Link href="#" className="hover:text-primary">
                Terms of Service
              </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.9 }} >
              <Link href="#" className="hover:text-primary">
                Cookie Settings
              </Link>
              </motion.div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-10 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wider">
          <div className="uppercase">© Studiogram 2025</div>
          
          <div className="flex items-center gap-2 uppercase">
            <Heart size={12} className="text-[#FF0000] fill-[#FF0000]" />
            <span>Made with Love on Framer</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="uppercase text-[10px]">Created by</span>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden ring-2 ring-transparent hover:ring-zinc-400 dark:hover:ring-zinc-600 transition-all">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Avatar"
                />
              </div>
              <span className="italic font-serif text-zinc-900 dark:text-white text-lg lowercase tracking-tighter">studio.</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Massive Typographic Hero Section */}
      <div
        className="relative w-full h-[15vh] md:h-[35vh] flex items-center justify-center overflow-hidden cursor-default group rounded-4xl"
        style={{ background: "linear-gradient(to right, #990000, #FF4500)" }}
      >
        <h1 className="text-[17vw] font-[900] leading-none tracking-tighter text-black select-none translate-y-0 transition-transform duration-1000 group-hover:translate-y-[28%]">
          Nova Fitness
        </h1>
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>
    </footer>
  );
};

export default Footer;
