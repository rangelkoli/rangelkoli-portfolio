"use client";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className='p-0 m-0 min-h-screen'>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
