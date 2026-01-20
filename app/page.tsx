"use client";
import AboutSection from "@/components/AboutSection";
import BeyondTheCodeSection from "@/components/BeyondTheCodeSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <main className='relative p-0 m-0 min-h-screen'>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <BeyondTheCodeSection />
      <SkillsSection />
      <Footer />
      <div className="w-full py-3 relative z-0">
        <div className="w-full mx-auto flex flex-col md:flex-row justify-around items-center text-md text-neutral-500">
          <p>Rangel Koli &copy; {currentYear}</p>
          <p>New York, USA</p>
        </div>
      </div>
    </main>
  );
}
