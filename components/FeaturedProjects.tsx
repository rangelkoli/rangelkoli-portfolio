import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  // For each project, store an array of refs for its images
  const imageRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0); // State for current project index

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || projects.length === 0) return;

    // Use gsap.context for better cleanup and scope management
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();

      gsap.set(section, { backgroundColor: "#fff5ee" });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${projects.length * 1000}vh`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * projects.length),
              projects.length - 1
            );
            setCurrentProjectIndex((prevIndex) => {
              if (newIndex !== prevIndex) {
                return newIndex;
              }
              return prevIndex;
            });
          },
        },
      });

      // Gradual color change from header to featured projects
      gsap.to(section, {
        backgroundColor: "#f0f8ff", // AliceBlue
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      projectRefs.current.forEach((el) => {
        if (el) gsap.set(el, { scale: 0.8, opacity: 0, display: "none" });
      });
      imageRefs.current.forEach((imgArr) => {
        imgArr?.forEach((img) => {
          if (img) gsap.set(img, { opacity: 0, scale: 0.7, display: "none" });
        });
      });

      projects.forEach((project, index) => {
        const projectContent = projectRefs.current[index];
        const projectImages = imageRefs.current[index] || [];
        if (!projectContent || !projectImages.length) return;

        const projectSceneDuration = 2;
        masterTl.addLabel(`project${index}Start`, index * projectSceneDuration);

        masterTl.to(
          projectContent,
          {
            scale: 1,
            opacity: 1,
            display: "block",
            duration: projectSceneDuration * 0.5,
            ease: "power2.out",
          },
          `project${index}Start`
        );

        // Animate all images for this project in
        projectImages.forEach((img, imgIdx) => {
          masterTl.to(
            img,
            {
              opacity: 1,
              scale: 1,
              display: "block",
              duration: projectSceneDuration * 0.5,
              ease: "power2.out",
            },
            `project${index}Start+=${imgIdx * 0.1}`
          );
        });

        // Animate out
        if (index < projects.length - 1) {
          masterTl.to(
            projectContent,
            {
              scale: 0.8,
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );
          projectImages.forEach((img, imgIdx) => {
            masterTl.to(
              img,
              {
                opacity: 0,
                scale: 0.7,
                display: "none",
                duration: projectSceneDuration * 0.5,
                ease: "power2.in",
              },
              `project${index}Start+=${
                projectSceneDuration * 0.5 + imgIdx * 0.1
              }`
            );
          });
        } else {
          masterTl.to(
            projectContent,
            {
              scale: 0.8,
              opacity: 0,
              display: "none",
              duration: projectSceneDuration * 0.5,
              ease: "power2.in",
            },
            `project${index}Start+=${projectSceneDuration * 0.5}`
          );
          projectImages.forEach((img, imgIdx) => {
            masterTl.to(
              img,
              {
                opacity: 0,
                scale: 0.7,
                display: "none",
                duration: projectSceneDuration * 0.5,
                ease: "power2.in",
              },
              `project${index}Start+=${
                projectSceneDuration * 0.5 + imgIdx * 0.1
              }`
            );
          });
        }
      });
    }, section);
    return () => ctx.revert();
  }, []);

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
      {/* Images around the text, absolutely positioned */}
      {projects.map((project, pIdx) => {
        // Layout: 1 image right center, 2 images left (top and bottom)
        // Use larger images
        // Unique image positions for each project
        const imagePositionsSets = [
          // Project 1
          [
            {
              left: "calc(75vw)",
              top: "50vh",
              width: 400,
              height: 300,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.25), 0 2px 8px 0 rgba(0,0,0,0.18)",
            },
            {
              left: "calc(25vw)",
              top: "22vh",
              width: 320,
              height: 200,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
            {
              left: "calc(25vw)",
              top: "78vh",
              width: 320,
              height: 200,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
          ],
          // Project 2
          [
            {
              left: "calc(50vw + 180px)",
              top: "20vh",
              width: 340,
              height: 220,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
            {
              left: "calc(80vw)",
              top: "70vh",
              width: 400,
              height: 300,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.25), 0 2px 8px 0 rgba(0,0,0,0.18)",
            },
            {
              left: "calc(20vw)",
              top: "60vh",
              width: 320,
              height: 200,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
          ],
          // Project 3
          [
            {
              left: "calc(70vw)",
              top: "30vh",
              width: 380,
              height: 260,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.25), 0 2px 8px 0 rgba(0,0,0,0.18)",
            },
            {
              left: "calc(30vw)",
              top: "80vh",
              width: 340,
              height: 220,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
            {
              left: "calc(20vw)",
              top: "30vh",
              width: 320,
              height: 200,
              boxShadow:
                "0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.15)",
            },
          ],
        ];
        const imagePositions =
          imagePositionsSets[pIdx % imagePositionsSets.length];
        // Responsive adjustments for mobile/tablet
        const getResponsivePos = (pos: {
          left: string;
          top: string;
          width: number;
          height: number;
          boxShadow: string;
          borderRadius?: string;
          overflow?: string;
          idx?: number;
        }) => {
          if (typeof window !== "undefined") {
            const isMobile = window.innerWidth < 640;
            const isTablet =
              window.innerWidth >= 640 && window.innerWidth < 1024;
            if (isMobile) {
              // Only two images: one above, one below text
              if (pos.idx === 0) {
                return {
                  left: "50vw",
                  top: "22vh",
                  width: 110,
                  height: 80,
                  boxShadow: pos.boxShadow,
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                };
              } else if (pos.idx === 1) {
                return {
                  left: "50vw",
                  top: "78vh",
                  width: 110,
                  height: 80,
                  boxShadow: pos.boxShadow,
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                };
              } else {
                // Hide any additional images
                return {
                  left: "-9999px",
                  top: "-9999px",
                  width: 0,
                  height: 0,
                  boxShadow: "none",
                  borderRadius: "1.2rem",
                  overflow: "hidden",
                };
              }
            } else if (isTablet) {
              // Slightly smaller and closer to center
              return {
                left: pos.left.replace(/vw/g, "vw").replace(/vh/g, "vh"),
                top: pos.top.replace(/vw/g, "vw").replace(/vh/g, "vh"),
                width: Math.round(pos.width * 0.7),
                height: Math.round(pos.height * 0.7),
                boxShadow: pos.boxShadow,
                borderRadius: "1.2rem",
                overflow: "hidden",
              };
            }
          }
          // Desktop default
          return pos;
        };
        return (
          <React.Fragment key={pIdx}>
            {project.image.slice(0, 3).map((imgSrc, imgIdx) => {
              // Add idx for responsive
              const pos = getResponsivePos({
                ...imagePositions[imgIdx],
                idx: imgIdx,
              });
              // Hide images with width 0 (for mobile extra images)
              if (pos.width === 0 || pos.height === 0) return null;
              return (
                <div
                  key={imgIdx}
                  ref={(el) => {
                    if (!imageRefs.current[pIdx]) imageRefs.current[pIdx] = [];
                    imageRefs.current[pIdx][imgIdx] = el;
                  }}
                  className='fixed md:absolute'
                  style={{
                    left: pos.left,
                    top: pos.top,
                    width: pos.width,
                    height: pos.height,
                    transform: "translate(-50%, -50%)",
                    zIndex: 5,
                    pointerEvents: "none",
                    borderRadius: pos.borderRadius,
                    overflow: pos.overflow,
                    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                  }}
                >
                  <Image
                    src={imgSrc}
                    alt={project.title}
                    width={pos.width}
                    height={pos.height}
                    className='object-contain'
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              );
            })}
            {/* Centered text content, justified */}
            <div
              key={pIdx + "-text"}
              ref={(el) => {
                projectRefs.current[pIdx] = el;
              }}
              className='absolute left-1/2 top-1/2 w-full max-w-2xl px-6 flex flex-col items-center justify-center'
              style={{
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                pointerEvents: "auto",
              }}
            >
              <h2 className='text-5xl font-extrabold uppercase tracking-wider mb-4 text-black drop-shadow-lg text-center'>
                {project.title}
              </h2>
              <div className='text-xl font-bold uppercase tracking-wider leading-loose text-black text-justify'>
                {project.description}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default FeaturedProjects;
