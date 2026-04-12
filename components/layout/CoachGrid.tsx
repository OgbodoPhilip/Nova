"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  number: string;
  portfolio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "King Roy",
    role: "Mobile Developer",
    quote:
      "Clean code is not written by following rules. It's written by caring.",
    image:
      "https://images.unsplash.com/photo-1652532678111-85849708e1f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fG11c2N1bGFyJTIwZ3ltJTIwbWFufGVufDB8fDB8fHww",
    number: "01 / 08",
    portfolio: "https://www.google.com",
  },
  {
    id: "2",
    name: "Adam Eign",
    role: "Graphics Designer",
    quote: "Design is intelligence made visible.",
    image:
      "https://images.unsplash.com/photo-1664673810612-0a27865e12b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZlbWFsZSUyMGd5bSUyMGNvYWNofGVufDB8fDB8fHww",
    number: "02 / 08",
    portfolio: "/login",
  },
  {
    id: "3",
    name: "Amanda Chidi",
    role: "Customer Relation Officer",
    quote: "Simplicity is the ultimate sophistication.",
    image:
      "https://images.unsplash.com/photo-1667890786327-d28da55b0e57?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    number: "03 / 08",
    portfolio: "/loginnnmmnnnnbb",
  },
  {
    id: "4",
    name: "Cynthia Moore",
    role: "Frontend Engineer",
    quote: "Automate everything. Question nothing.",
    image:
      "https://images.unsplash.com/photo-1642267238449-5f2c7643c1a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8",
    number: "04 / 08",
    portfolio: "/login",
  },
 
];

const TeamSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth Scrolling Initialization
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();

    // 1. MOBILE VIEW ANIMATION (Stacked Card Effect)
    mm.add("(max-width: 767px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".team-section");

      sections.forEach((section, index) => {
        const content = section.querySelector(".card-content");

        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            endTrigger: sections[sections.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          ScrollTrigger.create({
            trigger: sections[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              gsap.set(content, {
                opacity: 1 - self.progress,
                y: -25 * self.progress + "%",
                z: -800 * self.progress,
                rotationX: 80 * self.progress,
              });
            },
          });
        }
      });
    });

    // 2. DESKTOP VIEW ANIMATION (Individual Row Reveal)
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-content");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers when the top of the card hits 85% of viewport height
              toggleActions: "play none none none",
            },
          },
        );
      });
    });

    return () => {
      lenis.destroy();
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-hidden font-['Syne'] bg-gradient-to-t from-[#FAFAF5] to-[#BEC430] pb-12 md:pb-24"
    >
      {/* HERO SECTION - Adjusted height for better flow */}
      <section className="h-[30vh] md:h-[30vh] flex flex-col justify-end items-center text-center px-8 pb-16">
        <h2 className="text-6xl md:text-6xl font-extrabold tracking-tight text-black">
          Our Team
        </h2>
        <p className="text-black/60 mt-0 max-w-md">
          Meet the experts behind the brand.
        </p>
      </section>

      {/* TEAM GRID */}
      <div className="relative w-full md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-12">
        {teamMembers.map((member) => (
          <section
            key={member.id}
            className="team-section h-[80vh] md:h-[600px] flex justify-center items-center p-4 md:p-0"
            style={{ perspective: "1200px" }} // Enhances the 3D reveal on Desktop
          >
            <div className="card-content relative w-full h-full max-w-[450px] rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY CONTENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="text-xs text-white/40 mb-2">
                  {member.number}
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {member.name}
                </h2>

                <p className="text-[#BEC430] font-semibold">{member.role}</p>

                <p className="text-white/60 italic mt-3 text-sm md:text-base">
                  "{member.quote}"
                </p>

                <Link
                  href={member.portfolio}
                  target="_blank"
                  className="mt-6 w-fit px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-[#BEC430] hover:text-black transition-all duration-300"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
