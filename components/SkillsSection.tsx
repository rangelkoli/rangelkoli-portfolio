"use client";

import React from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import "./SkillsSection.css";

type Skill = { name: string; icon: string; invertInDark?: boolean };

const skills: Skill[] = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    invertInDark: true,
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Sass",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    invertInDark: true,
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
];

const SkillIcon = ({ skill }: { skill: Skill }) => (
  <div
    data-loader-media="skill-icon"
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
  return (
    <section className="w-full px-4 py-10 md:py-12 bg-[var(--background)] transition-colors duration-500 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        <SectionTitle
          title="Toolbox"
          description="The technologies I use to bring ideas to life."
        />

        <div
          role="region"
          aria-label="Skills toolbox"
          className="relative w-full overflow-hidden py-6 select-none"
        >
          <div className="marquee-container">
            <div className="marquee-content">
              {skills.map((skill, index) => (
                <SkillIcon key={`first-${skill.name}-${index}`} skill={skill} />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {skills.map((skill, index) => (
                <SkillIcon
                  key={`second-${skill.name}-${index}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
