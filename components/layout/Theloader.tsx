"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ text = "NovaFitness" }) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const letters = lettersRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the whole preloader after animation
        gsap.to(".preloader-overlay", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setVisible(false),
        });
      },
    });

    tl.to(letters, {
      duration: 0.6,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
    })
      .to(letters, {
        "--clipPath": "inset(0% 0 0 0)",
        duration: 0.8,
        delay: 0.3,
        ease: "power1.inOut",
      })
      .to(letters, {
        duration: 0.6,
        y: 100,
        stagger: 0.05,
        delay: 0.5,
      });
  }, []);

  if (!visible) return null;

  const chars = text.split("");

  // insert space after 4th letter
  chars.splice(4, 0, " ");

  return (
    <div className="preloader-overlay">
      <style>{`
        .preloader-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #111;
          z-index: 9999;
          font-family: "Oswald", "Bebas Neue", sans-serif;
        }

        .text {
          display: flex;
          font-size: clamp(2rem, 10vw, 6.5rem);
          font-weight: 700;
          overflow: hidden;
        }

        .text span {
          display: inline-block;
          position: relative;
          color: rgba(255, 255, 255, 0.2);
          line-height: 1;
          transform: translateY(100px);
          --clipPath: inset(100% 0 0 0);
        }

        .text span::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(45deg, #ff0000, #ff3333, #ff6600, #cc0000);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          clip-path: var(--clipPath);
          -webkit-clip-path: var(--clipPath);
        }
      `}</style>

      <div className="text">
        {chars.map((char, index) =>
          char === " " ? (
            <span key={index} style={{ width: "0.5em" }} />
          ) : (
            <span
              key={index}
              data-text={char}
              ref={(el) => {
                if (lettersRef.current) {
                  lettersRef.current[index] = el;
                }
              }}
            >
              {char}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
