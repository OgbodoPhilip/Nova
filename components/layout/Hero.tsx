"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import img03 from "../../public/xxyy.png";

const IMG_CLASS = "w-[100%] h-[60%] object-cover rounded-lg md:w-[90vw] md:h-auto md:max-w-[1200px] md:object-contain mt-[-13vh] md:mt-0";

function HeroText({ textRef }: { textRef: RefObject<(HTMLElement | null)[]> }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-[8vh] md:pb-[3vh] pointer-events-none">
      <div className="overflow-hidden">
        <h1
          ref={(el) => { if (textRef.current) textRef.current[0] = el; }}
          className="font-[Orbitron] uppercase text-[15vw] md:text-[11vw] leading-none tracking-[0.12em] text-center text-white opacity-0 translate-y-[120px] scale-110"
        >
          NOVA
        </h1>
      </div>
      <div className="overflow-hidden">
        <h2
          ref={(el) => { if (textRef.current) textRef.current[1] = el; }}
          className="font-[Orbitron] uppercase text-[6vw] md:text-[4vw] leading-none tracking-[0.35em] text-center text-white/70 opacity-0 translate-y-[120px]"
        >
          Fitness Arena
        </h2>
      </div>
    </div>
  );
}

export default function Alexandra() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<(HTMLElement | null)[]>([]);
  
  // 1. Add a state to track if the preloader has ever finished in this session
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // 2. Check if preloader was already completed (using a global window var or similar)
    const isPreloaderDone = (window as any).preloaderFinished === true;

    const runAnimation = () => {
      (window as any).preloaderFinished = true; // Mark as done globally
      setHasPlayed(true);

      const tl = gsap.timeline();
      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        .fromTo(imageRef.current, 
          { scale: 1.4, opacity: 0, rotate: 2 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.6, ease: "power4.out" }, 
          "-=0.3"
        )
        .to(textRef.current, {
          y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 1, ease: "power4.out"
        }, "-=1");
    };

    // 3. Logic: If already done, just show elements. If not, wait for event.
    if (isPreloaderDone) {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(imageRef.current, { scale: 1, opacity: 1, rotate: 0 });
      gsap.set(textRef.current, { y: 0, opacity: 1, scale: 1 });
      setHasPlayed(true);
    } else {
      window.addEventListener("preloaderDone", runAnimation);
    }

    // Parallax logic (kept outside the conditional to ensure it works on return)
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(imageRef.current, { x, y, duration: 1, ease: "power3.out" });
      gsap.to(textRef.current, { x: x * 0.5, y: y * 0.5, duration: 1, ease: "power3.out" });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("preloaderDone", runAnimation);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-dvw overflow-hidden flex justify-center items-center bg-black opacity-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_60%)] pointer-events-none" />
      <img ref={imageRef} src={img03.src} alt="Hero" className={IMG_CLASS} />
      <HeroText textRef={textRef} />
    </div>
  );
}