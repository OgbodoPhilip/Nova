'use client';

/* eslint-disable @next/next/no-img-element */
import img03 from "../../public/xxyy.png";

// Updated classes for a bigger mobile presence
// const IMG_CLASS = 
//   "w-full h-full min-h-[100dvh] object-cover scale-110 md:scale-100 md:w-[90vw] md:h-auto md:max-w-[1200px] md:object-contain";


const IMG_CLASS = 
  "w-[100%] h-[60%] object-cover rounded-lg md:w-[90vw] md:h-auto md:max-w-[1200px] md:object-contain";










// function HeroText() {
//   return (
//     <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[8vh] md:pb-[2.5vh] pointer-events-none">
//       <div className="w-fit h-fit overflow-hidden pb-0 md:pb-1">
//         <h1 className="font-(family-name:--font-display) uppercase text-[14vw] md:text-[12vw] leading-none tracking-[0.06em] text-center text-white dark:text-white">
//           NOVa
//         </h1>
//       </div>

//       <div className="w-fit h-fit overflow-hidden pb-0.5 md:pb-1">
//         <h1 className="font-(family-name:--font-display) uppercase text-[12vw] md:text-[10vw] leading-none tracking-[0.06em] text-center text-white dark:text-white/40">
//           Fitness Arena
//         </h1>
//       </div>
//     </div>
//   );
// }


function HeroText() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[8vh] md:pb-[3vh] pointer-events-none">
      
      {/* NOVA */}
      <div className="overflow-hidden">
        <h1 className="font-[Orbitron] uppercase text-[15vw] md:text-[11vw] leading-none tracking-[0.12em] text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
          NOVA
        </h1>
      </div>

      {/* Fitness Arena */}
      <div className="overflow-hidden">
        <h2 className="font-[Orbitron] uppercase text-[6vw] md:text-[4vw] leading-none tracking-[0.35em] text-center text-white/70 dark:text-white/40">
          Fitness Arena
        </h2>
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