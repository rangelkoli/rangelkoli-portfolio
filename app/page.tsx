"use client";
import { useState } from "react";
import Header from "@/components/Header";
import AnimatedHeader from "@/components/AnimatedHeader";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  const [showReel, setShowReel] = useState(false);

  return (
    <main>
      <div className='min-h-screen snap-y snap-mandatory'>
        <Header />

        <div className='relative min-h-[100vh] w-full overflow-hidden snap-start'>
          <AnimatedHeader
            showReel={showReel}
            onReelToggle={() => setShowReel(true)}
          />
        </div>
      </div>

      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
    </main>
  );
}
