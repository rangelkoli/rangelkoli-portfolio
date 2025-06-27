"use client";
import React, { useEffect, useRef } from "react";
import { skills } from "../data/skills";
import gsap from "./gsap"; // Import the configured gsap instance
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SkillsSection.css";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const skillCards = section.querySelectorAll(".skill-card");

    gsap.fromTo(
      skillCards,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Start animation when 80% of the section is in view
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id='skills' className='skills-section-revamped' ref={sectionRef}>
      <div className='skills-container'>
        <h2 className='skills-title'>What I Do</h2>
        <div className='skills-grid'>
          {skills.map((skill, index) => (
            <div key={index} className='skill-card'>
              <div className='skill-name'>{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
