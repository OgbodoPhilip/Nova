'use client';

/* eslint-disable @next/next/no-img-element */
import img03 from "../../public/xxyy.png";

// Updated classes for a bigger mobile presence
// const IMG_CLASS = 
//   "w-full h-full min-h-[100dvh] object-cover scale-110 md:scale-100 md:w-[90vw] md:h-auto md:max-w-[1200px] md:object-contain";


const IMG_CLASS = 
  "w-[100%] h-[60%] object-cover rounded-lg md:w-[90vw] md:h-auto md:max-w-[1200px] md:object-contain";










function HeroText() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[8vh] md:pb-[2.5vh] pointer-events-none">
      <div className="w-fit h-fit overflow-hidden pb-0 md:pb-1">
        <h1 className="font-(family-name:--font-display) uppercase text-[14vw] md:text-[12vw] leading-none tracking-[0.06em] text-center text-[#1C2418] dark:text-white">
          NOVa
        </h1>
      </div>

      <div className="w-fit h-fit overflow-hidden pb-0.5 md:pb-1">
        <h1 className="font-(family-name:--font-display) uppercase text-[12vw] md:text-[10vw] leading-none tracking-[0.06em] text-center text-[#1C2418]/35 dark:text-white/40">
          Fitness Arena
        </h1>
      </div>
    </div>
  );
}

export default function Alexandra() {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden flex justify-center items-center bg-black">
      {/* BIG IMAGE */}
      <img
        src={img03.src}
        alt="Hero"
        className={IMG_CLASS}
      />
      <HeroText />
    </div>
  );
}