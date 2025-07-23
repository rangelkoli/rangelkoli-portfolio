"use client";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SkillsSection from "@/components/SkillsSection";

const MobileSection = dynamic(() => import("@/components/MobileSection"), {
  ssr: false,
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className='p-0 m-0 min-h-screen'>
      {!isMobile && <HeroSection />}
      {isMobile && <MobileSection />}
      <FeaturedProjects />

      <SkillsSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
