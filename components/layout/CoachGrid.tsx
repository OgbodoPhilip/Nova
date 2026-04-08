"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamData = [
  { id: "01 / 08", name: "Marcus Chen", role: "Lead Frontend Engineer", quote: '"Clean code is not written by following rules. It\'s written by caring."', img: "https://i.pinimg.com/736x/13/a4/15/13a415c3b4802c47529afe9c15179b12.jpg" },
  { id: "02 / 08", name: "Elena Voss", role: "UX Design Lead", quote: '"Design is intelligence made visible."', img: "https://i.pinimg.com/736x/53/ae/15/53ae15903bc6e5a41bbea4d4efbd756f.jpg" },
  { id: "03 / 08", name: "James Okonkwo", role: "Backend Architect", quote: '"Simplicity is the ultimate sophistication."', img: "https://i.pinimg.com/1200x/3f/30/9e/3f309e9aa079d1685061bc50c8a9ef39.jpg" },
  { id: "04 / 08", name: "Sofia Reyes", role: "DevOps Engineer", quote: '"Automate everything. Question nothing."', img: "https://i.pinimg.com/1200x/65/32/a5/6532a5afa2fedcc04b895adda337d69a.jpg" },
  { id: "05 / 08", name: "Ava Mitchell", role: "Product Manager", quote: '"Ship fast. Learn faster."', img: "https://i.pinimg.com/736x/98/d7/5f/98d75f5a0780c851ee66d717c1e993ac.jpg" },
  { id: "06 / 08", name: "Kai Tanaka", role: "Mobile Developer", quote: '"Every pixel tells a story."', img: "https://i.pinimg.com/736x/6ffda1b7b861e0e1e7f31140289303b0.jpg" },
  { id: "07 / 08", name: "Liam Foster", role: "Security Engineer", quote: '"Trust no one. Verify everything."', img: "https://i.pinimg.com/1200x/6c/71/51/6c7151dd37a0229f49e7ca46eecdc6e9.jpg" },
  { id: "08 / 08", name: "Nina Patel", role: "Data Scientist", quote: '"In data we trust. In models we verify."', img: "https://i.pinimg.com/736x/22/86/25/228625a239a9de5fe6482cc80bfdd439.jpg" },
];

export default function FinalTeamComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initialize Lenis with native touch scrolling (removes mobile lag)
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false, // Important: allows native mobile scroll speed
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const mm = gsap.matchMedia();

    // 2. MOBILE: Instant 3D Stacking
    mm.add("(max-width: 767px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".team-section");
      
      sections.forEach((section, index) => {
        const content = section.querySelector(".team-content");
        
        if (index < sections.length - 1) {
          // Pin section to make it feel grounded
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=100%", // Length of time card stays on screen
            pin: true,
            pinSpacing: true,
            scrub: true, // Links 1:1 with finger position
          });

          // Immediate 3D Exit
          gsap.to(content, {
            scrollTrigger: {
              trigger: sections[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true, // No numeric smoothing = instant response
            },
            opacity: 0,
            scale: 0.8,
            rotationX: 35,
            z: -400,
            yPercent: -15,
            ease: "none"
          });
        }
      });
    });

    // 3. DESKTOP: Grid Reveal Animation
    mm.add("(min-width: 768px)", () => {
      // Clean up mobile-specific inline styles if user resizes window
      gsap.set(".team-content", { clearProps: "all" });

      gsap.from(".team-section", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".section-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
      
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#160F03] w-full overflow-x-hidden min-h-screen">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;800&display=swap');
        
        /* Layout Hierarchy */
        .team-section {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          perspective: 1200px;
          padding: 1rem;
        }

        .team-content {
          height: 75%;
          width: 100%;
          max-width: 400px;
          border-radius: 2rem;
          overflow: hidden;
          position: relative;
          background: #1a1a1a;
          will-change: transform, opacity;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.7);
        }

        /* Fluid Desktop Grid */
        @media (min-width: 768px) {
          .section-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            padding: 5rem 3rem;
            max-width: 1440px;
            margin: 0 auto;
          }
          .team-section { height: auto !important; padding: 0; perspective: none; }
          .team-content { height: auto; width: 100%; aspect-ratio: 4/5; border-radius: 1.5rem; }
        }

        @media (min-width: 1024px) {
          .section-container { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1440px) {
          .section-container { grid-template-columns: repeat(4, 1fr); }
        }

        /* Typography & Overlay */
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          font-family: 'Syne', sans-serif;
        }

        .header-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 12vw, 8rem);
          background: linear-gradient(135deg, #FF6B35 0%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.05em;
          line-height: 0.9;
        }
      `}</style>

      {/* Hero Header */}
      <section className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="header-title uppercase">Our Team</h2>
        <p className="text-white/40 max-w-sm mt-6 font-['Syne'] text-base md:text-lg">
          Meet the builders, designers, and thinkers behind the screen.
        </p>
        <div className="w-px h-16 bg-gradient-to-b from-orange-500 to-transparent mt-12" />
      </section>

      {/* Main Content Area */}
      <div className="section-container">
        {teamData.map((member, i) => (
          <section key={i} className="team-section">
            <div className="team-content">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              <div className="card-overlay text-white">
                <span className="text-[10px] tracking-widest text-orange-500 font-bold mb-2 uppercase">
                  {member.id}
                </span>
                <h3 className="text-2xl font-extrabold leading-none">{member.name}</h3>
                <p className="text-sm opacity-60 mt-1 mb-4">{member.role}</p>
                <div className="h-[2px] w-8 bg-white/20 mb-4" />
                <p className="text-[11px] italic opacity-40 leading-relaxed line-clamp-3">
                  {member.quote}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-32" />
    </div>
  );
}