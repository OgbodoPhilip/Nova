"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// CSS imports are safe for SSR
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

const TypographyShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety check: Ensure we are in the browser and ref is assigned
    if (typeof window === 'undefined' || !containerRef.current) return;

    let ctx: gsap.Context;
    let lenis: Lenis;

    const init = async () => {
      // 1. Setup & Plugins
      gsap.registerPlugin(ScrollTrigger);

      // 2. Dynamic Import for Splitting
      // This prevents the "document is not defined" error during build/SSR
      const Splitting = (await import('splitting')).default;
      Splitting({ target: containerRef.current! });

      // Helper for wrapping elements (Effect 11, 12)
      const wrapElements = (elems: NodeListOf<Element>, wrapType: string, wrapClass: string) => {
        elems.forEach(char => {
          const wrapEl = document.createElement(wrapType);
          wrapEl.className = wrapClass; // Corrected from .classList.value
          char.parentNode?.appendChild(wrapEl);
          wrapEl.appendChild(char);
        });
      };

      // 3. Initialize Scoped Lenis
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      const scrollFn = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
      };
      requestAnimationFrame(scrollFn);

      // 4. GSAP Animation Context
      ctx = gsap.context(() => {
        const select = (s: string) => containerRef.current?.querySelectorAll(s) || [];

        // Effect 1: Random Rotation & Scale
        select('.content__title[data-effect1]').forEach(title => {
          gsap.fromTo(title.querySelectorAll('.char'), 
            { opacity: 0, scale: 0.6, rotationZ: () => gsap.utils.random(-20, 20) },
            { ease: 'power4', opacity: 1, scale: 1, rotation: 0, stagger: 0.1,
              scrollTrigger: { trigger: title, start: 'top bottom', end: 'center center', scrub: true }
            });
        });

        // Effect 2: Vertical Stretch
        select('.content__title[data-effect2]').forEach(title => {
          gsap.fromTo(title.querySelectorAll('.char'),
            { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
            { ease: 'back.inOut(2)', opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger: 0.03,
              scrollTrigger: { trigger: title, start: 'center bottom+=50%', end: 'bottom top+=40%', scrub: true }
            });
        });

        // Effect 3: Dropdown Scale
        select('.content__title[data-effect3]').forEach(title => {
          gsap.fromTo(title.querySelectorAll('.char'),
            { transformOrigin: '50% 0%', scaleY: 0 },
            { ease: 'back', scaleY: 1, stagger: 0.03,
              scrollTrigger: { trigger: title, start: 'center bottom-=5%', end: 'top top-=20%', scrub: true }
            });
        });

        // Effect 4: Word-Centric Explosion
        select('.content__title[data-effect4]').forEach(title => {
          title.querySelectorAll('.word').forEach(word => {
            gsap.fromTo(word.querySelectorAll('.char'),
              { x: (pos, _, arr) => 150 * (pos - arr.length / 2) },
              { ease: 'power1.inOut', x: 0, stagger: { grid: 'auto', from: 'center' },
                scrollTrigger: { trigger: word, start: 'center bottom+=30%', end: 'top top+=15%', scrub: true }
              });
          });
        });

        // Effect 5: Chaos to Order
        select('.content__title[data-effect5]').forEach(title => {
          gsap.fromTo(title.querySelectorAll('.char'),
            { opacity: 0, xPercent: () => gsap.utils.random(-200, 200), yPercent: () => gsap.utils.random(-150, 150) },
            { ease: 'power1.inOut', opacity: 1, xPercent: 0, yPercent: 0, stagger: { each: 0.05, from: 'random' },
              scrollTrigger: { trigger: title, start: 'center bottom+=10%', end: 'bottom center', scrub: 0.9 }
            });
        });

        // Effect 6: 3D Flip X
        select('.content__title[data-effect6]').forEach(title => {
          title.querySelectorAll('.word').forEach(word => {
            const chars = word.querySelectorAll('.char');
            chars.forEach(c => gsap.set(c.parentNode, { perspective: 2000 }));
            gsap.fromTo(chars, { opacity: 0, rotationX: -90, yPercent: 50 },
              { ease: 'power1.inOut', opacity: 1, rotationX: 0, yPercent: 0, stagger: 0.03,
                scrollTrigger: { trigger: word, start: 'center bottom+=40%', end: 'bottom center-=30%', scrub: 0.9 }
              });
          });
        });

        // Effect 7: 3D Flip Y
        select('.content__title[data-effect7]').forEach(title => {
          title.querySelectorAll('.word').forEach(word => {
            const chars = word.querySelectorAll('.char');
            chars.forEach(c => gsap.set(c.parentNode, { perspective: 2000 }));
            gsap.fromTo(chars, { transformOrigin: '100% 50%', opacity: 0, rotationY: -90, z: -300 },
              { ease: 'expo', opacity: 1, rotationY: 0, z: 0, stagger: { each: 0.06, from: 'end' },
                scrollTrigger: { trigger: word, start: 'bottom bottom+=20%', end: 'bottom top', scrub: 1 }
              });
          });
        });

        // Effect 8: Hacker/Scramble
        const symbols = ['!', '@', '#', '$', '%', '&', '*', '+', '=', ';', '<', '>'];
        select('.content__title[data-effect8]').forEach(title => {
          title.querySelectorAll('.char').forEach((char) => {
            const initialHTML = char.innerHTML;
            gsap.fromTo(char, { opacity: 0 }, {
              duration: 0.03, innerHTML: () => symbols[Math.floor(Math.random() * symbols.length)],
              repeat: 1, repeatRefresh: true, opacity: 1, repeatDelay: 0.03,
              onComplete: () => { gsap.set(char, { innerHTML: initialHTML }); },
              scrollTrigger: { trigger: title, start: 'top bottom', toggleActions: "play resume resume reset" }
            });
          });
        });

        // Effect 9: Horizontal Compression
        select('.content__title[data-effect9]').forEach(title => {
          title.querySelectorAll('.word').forEach(word => {
            gsap.fromTo(word.querySelectorAll('.char'),
              { scaleX: 0, x: (_, target) => (window.innerWidth / 2) - (target as HTMLElement).offsetLeft },
              { ease: 'power1.inOut', scaleX: 1, x: 0, 
                scrollTrigger: { trigger: word, start: 'top bottom', end: 'top top', scrub: true }
              });
          });
        });

        // Effect 10: Blur In
        select('.content__title[data-effect10]').forEach(title => {
          gsap.fromTo(title.querySelectorAll('.char'),
            { opacity: 0, filter: 'blur(20px)' },
            { duration: 0.25, ease: 'power1.inOut', opacity: 1, filter: 'blur(0px)', stagger: { each: 0.05, from: 'random' },
              scrollTrigger: { trigger: title, start: 'top bottom', toggleActions: "play resume resume reset" }
            });
        });

        // Effect 11: Slide Mask (X)
        select('.content__title[data-effect11]').forEach(title => {
          const chars = title.querySelectorAll('.char');
          wrapElements(chars, 'span', 'char-wrap overflow-hidden inline-block');
          gsap.fromTo(chars, { xPercent: 105 },
            { duration: 1, ease: 'expo', xPercent: 0, stagger: 0.042,
              scrollTrigger: { trigger: title, start: 'top bottom', toggleActions: "play resume resume reset" }
            });
        });

        // Effect 12: Stretch & Slide
        select('.content__title[data-effect12]').forEach(title => {
          const chars = title.querySelectorAll('.char');
          wrapElements(chars, 'span', 'char-wrap overflow-hidden inline-block');
          gsap.fromTo(chars, { xPercent: -250, rotationZ: 45, scaleX: 6, transformOrigin: '100% 50%' },
            { duration: 1, ease: 'power2', xPercent: 0, rotationZ: 0, scaleX: 1, stagger: -0.06,
              scrollTrigger: { trigger: title, start: 'top bottom+=10%', end: 'bottom top+=10%', scrub: true }
            });
        });

        // Effect 13: 3D Multi-axis
        select('.content__title[data-effect13]').forEach(title => {
          const chars = title.querySelectorAll('.char');
          chars.forEach(c => gsap.set(c.parentNode, { perspective: 2000 }));
          gsap.fromTo(chars, { opacity: 0, rotationY: 180, xPercent: -40, yPercent: 100 },
            { ease: 'power4.inOut', opacity: 1, rotationY: 0, xPercent: 0, yPercent: 0, stagger: -0.03,
              scrollTrigger: { trigger: title, start: 'center bottom', end: 'bottom center-=30%', scrub: 0.9 }
            });
        });

        // Effect 14: Pin & Fly-in
        select('.content__title[data-effect14]').forEach(title => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: title, scrub: true, start: 'center center', end: '+=100%', pin: (title as HTMLElement).parentElement }
          });
          tl.fromTo(title, { xPercent: 100 }, { xPercent: 0 })
            .fromTo(title.querySelectorAll('.char'), { scale: 3, yPercent: -900 }, { scale: 1, yPercent: 0, stagger: 0.05 }, 0);
        });

        // Effect 15: Pin & 3D Rotate
        select('.content__title[data-effect15]').forEach(title => {
          const chars = title.querySelectorAll('.char');
          chars.forEach(c => gsap.set(c.parentNode, { perspective: 2000 }));
          const tl = gsap.timeline({
            scrollTrigger: { trigger: title, scrub: true, start: 'center center', end: '+=140%', pin: (title as HTMLElement).parentElement }
          });
          tl.fromTo(title, { xPercent: -80 }, { xPercent: 0 })
            .fromTo(chars, { transformOrigin: '50% 50% -200px', rotationX: 380, opacity: 0 },
              { rotationX: 0, opacity: 1, stagger: -0.03 }, 0);
        });

      }, containerRef);
    };

    init();

    return () => {
      ctx?.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <section key={i} className="min-h-screen flex items-center justify-center p-10 border-b border-white/10">
          <h2 
            className="content__title text-5xl md:text-8xl font-black uppercase leading-none" 
            data-splitting 
            {...{ [`data-effect${i + 1}`]: true }}
          >
            Effect {i + 1}
          </h2>
        </section>
      ))}
      
      <style jsx global>{`
        .char-wrap { position: relative; }
        .overflow-hidden { overflow: hidden; }
        .inline-block { display: inline-block; }
      `}</style>
    </div>
  );
};

export default TypographyShowcase;