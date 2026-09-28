"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import "./SkillsSection.css";

type Skill = { name: string; icon: string; invertInDark?: boolean };

const skills: Skill[] = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invertInDark: true },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertInDark: true },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

const SkillIcon = ({
  skill,
  onClick,
}: {
  skill: Skill;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <div
    data-loader-media="skill-icon"
    onClick={onClick}
    className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
    title={skill.name}
  >
    <Image
      src={skill.icon}
      alt={skill.name}
      fill
      className={`object-contain transition-all duration-500${skill.invertInDark ? " dark:invert dark:brightness-110" : ""}`}
      unoptimized
    />
  </div>
);

export default function SkillsSection() {
  const [isClicked, setIsClicked] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToolboxClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    setIsClicked(true);
    clickTimeoutRef.current = setTimeout(() => {
      setIsClicked(false);
    }, 750);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 py-10 md:py-12 bg-[var(--background)] transition-colors duration-500 overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-20">
        <SectionTitle
          title="Toolbox"
          index="02"
          eyebrow="Capabilities"
          description="The technologies I use to bring ideas to life."
        />
      </div>

      <div
        onClick={handleToolboxClick}
        role="region"
        aria-label="Interactive skills toolbox"
        className="relative w-full overflow-hidden py-6 cursor-pointer select-none group"
      >
        {/* Left animated edge mask & glow */}
        <div
          className={`toolbox-edge toolbox-edge-left absolute left-0 top-0 bottom-0 z-10 pointer-events-none ${
            isClicked ? "edge-clicked" : ""
          }`}
        >
          {/* Light-theme edge gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent dark:opacity-0 opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Dark-theme edge gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Ambient & click reactive vertical accent glow line */}
          <div
            className={`toolbox-edge-accent toolbox-edge-accent-left absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-[2px] rounded-full pointer-events-none ${
              isClicked ? "edge-clicked" : ""
            }`}
          />
        </div>

        {/* Right animated edge mask & glow */}
        <div
          className={`toolbox-edge toolbox-edge-right absolute right-0 top-0 bottom-0 z-10 pointer-events-none ${
            isClicked ? "edge-clicked" : ""
          }`}
        >
          {/* Light-theme edge gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#F4F4F4] via-[#F4F4F4]/80 to-transparent dark:opacity-0 opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Dark-theme edge gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-500 pointer-events-none" />
          {/* Ambient & click reactive vertical accent glow line */}
          <div
            className={`toolbox-edge-accent toolbox-edge-accent-right absolute right-0 top-1/2 -translate-y-1/2 h-3/4 w-[2px] rounded-full pointer-events-none ${
              isClicked ? "edge-clicked" : ""
            }`}
          />
        </div>

        <div className="marquee-container">
          <div className="marquee-content">
            {skills.map((skill, index) => (
              <SkillIcon
                key={`first-${skill.name}-${index}`}
                skill={skill}
                onClick={handleToolboxClick}
              />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {skills.map((skill, index) => (
              <SkillIcon
                key={`second-${skill.name}-${index}`}
                skill={skill}
                onClick={handleToolboxClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
