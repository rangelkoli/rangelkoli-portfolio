"use client";
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className='p-0 m-0 min-h-screen'>
      <HeroSection />
      <Header />
      <ProjectsSection />

      <SkillsSection />
    </main>
  );
}
