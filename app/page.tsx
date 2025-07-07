"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className='p-0 m-0 min-h-screen'>
      <HeroSection />
      <Header />
      <FeaturedProjects />

      <SkillsSection />
    </main>
  );
}
