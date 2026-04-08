'use client';

import About from "@/components/layout/About";
import CoachGrid from "@/components/layout/CoachGrid";
import FeaturesBento from "@/components/layout/FeaturesBento";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import LogoMarquee from "@/components/layout/LogoMarquee";
import Testimonials from "@/components/layout/Testimonials";
import { AnimatedList } from "@/components/ui/animated-list";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <section>
     
      <Hero/>
      <LogoMarquee/>
      <About/>
  
      <FeaturesBento/>
      <CoachGrid/>
      <Testimonials/>
      <Footer/>
      
    </section>
  );
}