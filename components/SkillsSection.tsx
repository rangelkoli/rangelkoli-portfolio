"use client";
import React from "react";
import Image from "next/image";
import "./SkillsSection.css";

const skills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

const SkillIcon = ({ skill }: { skill: { name: string; icon: string } }) => (
  <div 
    className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0 transition-all duration-300 hover:scale-110"
    title={skill.name}
  >
    <Image
      src={skill.icon}
      alt={skill.name}
      fill
      className="object-contain"
      unoptimized
    />
  </div>
);

export default function SkillsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-[#F4F4F4] overflow-hidden">
      <div className="px-6 md:px-20">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="uppercase tracking-widest text-xs font-bold text-gray-500">Skills</span>
          </div>
          <h2 className="font-mango uppercase text-4xl md:text-[5vw] leading-[1.1] text-[#1a1a1a] max-w-4xl">
            My Tech Stack
          </h2>
          <p className="font-playfair italic text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl">
            The technologies I use to bring ideas to life.
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#F4F4F4] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#F4F4F4] to-transparent pointer-events-none" />

        {/* Marquee Container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {skills.map((skill, index) => (
              <SkillIcon key={`first-${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {skills.map((skill, index) => (
              <SkillIcon key={`second-${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
