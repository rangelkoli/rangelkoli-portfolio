import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]); // Ref for each image container

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // State for current project index

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || projects.length === 0) return;

    // Use gsap.context for better cleanup and scope management
    const ctx = gsap.context(() => {
      // Clear any existing ScrollTriggers and timelines to prevent duplicates on re-renders
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();

      // Set initial background color
      gsap.set(section, { backgroundColor: "#fff5e" }); // SeaShell white background

      // Create a master timeline for all project transitions
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${projects.length * 1000}vh`, // Increased to 1000vh for more scroll time per project
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * projects.length),
              projects.length - 1
            );
            // Use the functional update form of setState to ensure we always get the latest state
            setCurrentProjectIndex((prevIndex) => {
              if (newIndex !== prevIndex) {
                return newIndex;
              }
              return prevIndex;
            });
          },
        },
      });

      // Background color change over the entire pinned section
      gsap.to(section, {
        backgroundColor: "#fff5ee", // Seashell background
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${projects.length * 200}vh`, // Match master timeline end
          scrub: true,
        },
      });

      // Initialize all project content and images to hidden
      projectRefs.current.forEach((el) => {
        if (el) gsap.set(el, { y: "100%", opacity: 0, display: "none" });
      });
      imageRefs.current.forEach((el) => {
        if (el) gsap.set(el, { x: "100%", opacity: 0, display: "none" }); // Start off-screen right
      });

      // Loop through projects to create individual animations within the master timeline
      projects.forEach((project, index) => {
        const projectContent = projectRefs.current[index];
        const projectImage = imageRefs.current[index];
        if (!projectContent || !projectImage) return;

        // Define the duration for each project's "scene" in the master timeline
        const projectSceneDuration = 2; // Increased to 2 for more screen time

        // Add a label for the start of each project's scene
        masterTl.addLabel(`project${index}Start`, index * projectSceneDuration);

        // Animate current project content in
        masterTl.to(
          projectContent,
          {
            y: "0%",
            opacity: 1,
            display: "block",
            duration: projectSceneDuration * 0.5, // Takes half the scene duration to come in
            ease: "power2.out",
          },
          `project${index}Start`
        );

        // Animate current project image in
        masterTl.to(
          projectImage,
          {
            x: "0%",
            opacity: 1,
            display: "block",
            duration: projectSceneDuration * 0.5,
            ease: "power2.out",
          },
          `project${index}Start`
        ); // Image and text come in together

        // Keyword highlighting within each project's description
        const words =
          projectContent.querySelectorAll<HTMLElement>(".project-word");
        if (words.length > 0) {
          masterTl.fromTo(
            words,
            { opacity: 0.3 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              duration: projectSceneDuration * 0.5, // Highlight over half the scene duration
            },
            `project${index}Start` // Start highlighting when project content comes in
          );
        }

        // Animate current project content out
        if (index < projects.length - 1) {
          masterTl.to(
            projectContent,
            {
              y: "-100%",
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );

          // Animate current project image out
          masterTl.to(
            projectImage,
            {
              x: "-100%",
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );
        } else {
          // For the last project, ensure content and image fade out completely
          masterTl.to(
            projectContent,
            {
              y: "-100%",
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );
          masterTl.to(
            projectImage,
            {
              x: "-100%",
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );
        }
      });
    }, section); // Scope the context to the sectionRef.current element

    // Cleanup function for gsap.context
    return () => ctx.revert();
  }, []); // Empty dependency array for the main useEffect

  if (projects.length === 0) {
    return (
      <section
        className='w-full min-h-screen flex items-center justify-center'
        style={{ backgroundColor: "#fff5ee" }} // Seashell background
      >
        <p className='text-black'>No projects to display.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className='w-full min-h-screen flex items-center justify-center relative overflow-hidden left-0 top-0'
      style={{ backgroundColor: "#fff5ee" }}
    >
      <div className='sticky h-screen w-full flex items-center justify-center left-0 top-0'>
        <div className='container mx-auto flex flex-col md:flex-row items-center'>
          {/* All Images rendered here, animated by GSAP */}
          <div className='md:w-1/2 pr-4 flex justify-center items-center relative h-full'>
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  imageRefs.current[index] = el;
                }}
                className='absolute w-full h-auto max-w-md'
              >
                <Image
                  src={projects[currentProjectIndex]?.image[0]}
                  alt={projects[currentProjectIndex]?.title}
                  width={500}
                  height={300}
                  layout='responsive'
                  className='rounded-lg shadow-lg'
                />
              </div>
            ))}
          </div>
          {/* Text on the right with scroll effect */}
          <div className='md:w-1/2 pl-4 relative h-full flex items-center'>
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  projectRefs.current[index] = el;
                }}
                className='absolute w-full'
              >
                <h2 className='text-5xl font-extrabold uppercase tracking-wider mb-4 text-black'>
                  {project.title}
                </h2>
                <div className='text-xl font-bold uppercase tracking-wider leading-loose text-black text-justify'>
                  {project.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
