import BeyondTheCodeSection from "@/components/BeyondTheCodeSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className='relative p-0 m-0 min-h-screen'>
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <BeyondTheCodeSection />
      <SkillsSection />
      <Footer />
    </main>
  );
}
