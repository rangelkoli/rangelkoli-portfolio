"use client";
import React, { useEffect, useRef } from "react";
import { skills } from "../data/skills";
import gsap from "./gsap"; // Import the configured gsap instance
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SkillsSection.css";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section) return;

    const skillCards = section.querySelectorAll(".skill-card");

    // Animate title size on scroll
    if (title) {
      gsap.to(title, {
        fontSize: "2.5rem", // Smaller size
        paddingTop: "1rem",
        paddingBottom: "1rem",
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200",
          scrub: 1,
        },
      });
    }

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
    <section className='relative'>
      {/* Sticky Title */}
      <div className='sticky top-0 z-50 bg-transparent py-8 px-6'>
        <h1
          ref={titleRef}
          className='text-6xl font-extrabold uppercase tracking-wider text-center text-black z-50'
        >
          Skills
        </h1>
      </div>

      {/* Main Content Section */}
      <section id='skills' className='skills-section-revamped' ref={sectionRef}>
        <div className='skills-container'>
          <div className='skills-grid'>
            {skills.map((skill, index) => (
              <div key={index} className='skill-card'>
                <div className='skill-name'>{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default SkillsSection;
