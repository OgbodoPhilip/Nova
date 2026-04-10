'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  number: string;
}

const teamMembers: TeamMember[] = [
  { id: '1', name: 'King Roy', role: 'Mobile Developer', quote: '"Clean code is not written by following rules. It\'s written by caring."', image: 'https://i.pinimg.com/736x/6b/c0/0d/6bc00df634e26ef044553ac2a4091ac0.jpg', number: '01 / 08' },
  { id: '2', name: 'Adam Eign', role: 'Graphics Designer', quote: '"Design is intelligence made visible."', image: 'https://i.pinimg.com/1200x/d6/79/d3/d679d37ded0acabd6751fbff183be042.jpg', number: '02 / 08' },
  { id: '3', name: 'Amanda Chidi', role: 'Customer Relation Officer', quote: '"Simplicity is the ultimate sophistication."', image: 'https://i.pinimg.com/1200x/a0/95/24/a095243e3f12696e7b7a78081b77c8c2.jpg', number: '03 / 08' },
  { id: '4', name: 'Cynthia Moore', role: 'Frontend Engineer', quote: '"Automate everything. Question nothing."', image: 'https://i.pinimg.com/736x/15/d9/7f/15d97ffc2ec9f969be08f0260be2e608.jpg', number: '04 / 08' },
  { id: '5', name: 'The Prince ', role: 'Backend Engineer', quote: '"Ship fast. Learn faster."', image: 'https://i.pinimg.com/1200x/ee/ec/14/eeec14370c100eec38eaa7ed1f002d70.jpg', number: '05 / 08' },
  { id: '6', name: 'Chidi Nwoke', role: 'Backend Developer', quote: '"Every pixel tells a story."', image: 'https://i.pinimg.com/736x/d6/c2/4f/d6c24f87f5cbbace27139dfae59faa9e.jpg', number: '06 / 08' },
  { id: '7', name: 'Eze Marcus', role: 'CyberSecurity', quote: '"Trust no one. Verify everything."', image: 'https://i.pinimg.com/736x/0f/39/83/0f39834471233115208b57ec9f227344.jpg', number: '07 / 08' },
  { id: '8', name: 'Philips', role: 'Chief Executive Officer', quote: '"In data we trust. In models we verify."', image: 'https://i.pinimg.com/736x/78/b4/28/78b428a174dc782a5f886e06e7561a34.jpg', number: '08 / 08' },
];

const TeamSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const sections = gsap.utils.toArray<HTMLElement>('.team-section');

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

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Hover Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(target, {
      duration: 0.5,
      rotationX: rotateX,
      rotationY: rotateY,
      ease: 'power2.out',
      overwrite: true
    });
  };

  const handleMouseLeave = (target: HTMLDivElement) => {
    gsap.to(target, {
      duration: 0.5,
      rotationX: 0,
      rotationY: 0,
      ease: 'power2.out'
    });
  };

  return (
    <div ref={containerRef} className="bg-black w-full overflow-x-hidden font-['Syne']">
      {/* Intro Section */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center px-8 relative z-10">
        <h2 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-6 mt-auto bg-gradient-to-br from-[#FF6B35] via-[#F7C59F] to-white bg-clip-text text-transparent">
          Our Team
        </h2>
        <p className="text-white/40 text-base md:text-xl max-w-md leading-relaxed">
          The creative minds behind the magic. Meet the experts who turn vision into reality.
        </p>
        <div className="h-32 md:h-48 w-px bg-white/10 mt-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#FF6B35] to-transparent animate-line-scroll" />
        </div>
      </section>

      {/* Cards Section */}
      <div className="relative w-full">
        {teamMembers.map((member) => (
          <section key={member.id} className="team-section h-screen w-full flex justify-center items-center p-6 md:p-12 perspective-1000">
            <div 
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="card-content relative w-full h-[80%] max-w-[450px] rounded-[2rem] overflow-hidden transform-style-3d shadow-2xl shadow-orange-950/20"
            >
              <img src={member.image} alt={member.name} className="w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4">{member.number}</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-2">{member.name}</h2>
                <p className="text-orange-400 font-medium tracking-wide text-sm md:text-base">{member.role}</p>
                <div className="w-12 h-1 bg-white/20 my-6 rounded-full" />
                <p className="text-white/50 italic text-sm md:text-base leading-relaxed">"{member.quote}"</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;