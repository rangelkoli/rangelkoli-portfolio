import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./ProjectsSection.css";
import { projects } from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let swiper: unknown;
    const colors = [
      "#F5F5DC", // seashell (default)
      "#E8F4FD", // light blue
      "#FFF2E8", // light orange
      "#F0F8FF", // alice blue
    ];

    // Background color change animation
    const backgroundTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(sectionRef.current, {
          backgroundColor: gsap.utils.interpolate(
            colors[0],
            colors[1],
            progress
          ),
          duration: 0.3,
        });
      },
    });

    // Text highlighting effect
    const textTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Animate title highlighting
        gsap.to(titleRef.current, {
          color: gsap.utils.interpolate("#6B7280", "#1F2937", progress),
          scale: gsap.utils.interpolate(1, 1.05, progress),
          duration: 0.3,
        });

        // Animate subtitle highlighting
        gsap.to(subtitleRef.current, {
          color: gsap.utils.interpolate("#9CA3AF", "#374151", progress),
          duration: 0.3,
        });
      },
    }); // Carousel scroll sync with project-based color changes
    const carouselTrigger = ScrollTrigger.create({
      trigger: ".carousel-wrapper",
      start: "top top",
      end: "+=2000",
      scrub: 1.5,
      onUpdate: (self) => {
        if (!swiper) {
          swiper = (document.querySelector(".swiper") as { swiper?: unknown })
            ?.swiper;
        }

        if (
          swiper &&
          typeof swiper === "object" &&
          swiper !== null &&
          "wrapperEl" in swiper &&
          "width" in swiper
        ) {
          const s = swiper as { wrapperEl: HTMLElement; width: number };
          const progress = self.progress;

          // Calculate which project is currently active
          const projectIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );

          // Change background color based on current project
          gsap.to(sectionRef.current, {
            backgroundColor: colors[projectIndex % colors.length],
            duration: 0.5,
          });

          // Highlight current project card
          const projectCards = document.querySelectorAll(".project-card");
          projectCards.forEach((card, index) => {
            const isActive = index === projectIndex;
            gsap.to(card, {
              scale: isActive ? 1.05 : 1,
              y: isActive ? -10 : 0,
              boxShadow: isActive
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
            });

            // Animate project title and description
            const title = card.querySelector(".project-title");
            const description = card.querySelector(".project-description");
            const links = card.querySelectorAll(".project-link");

            if (title) {
              gsap.to(title, {
                textShadow: isActive ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
                duration: 0.3,
              });
            }

            if (description) {
              gsap.to(description, {
                opacity: isActive ? 1 : 0.8,
                duration: 0.3,
              });
            }

            links.forEach((link) => {
              gsap.to(link, {
                scale: isActive ? 1.05 : 1,
                duration: 0.3,
              });
            });
          });

          if (progress === 0) {
            gsap.to(s.wrapperEl, {
              transform: `translate3d(0px, 0, 0)`,
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            const movement = -progress * (s.width * 0.8);
            gsap.to(s.wrapperEl, {
              transform: `translate3d(${movement}px, 0, 0)`,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      },
    });

    return () => {
      backgroundTrigger.kill();
      textTrigger.kill();
      carouselTrigger.kill();
    };
  }, []);

  return (
    <div
      id='projects'
      className='w-full h-[300vh] transition-colors duration-500 ease-out'
      style={{ backgroundColor: "#F5F5DC" }}
      ref={sectionRef}
    >
      <div className='sticky top-0 h-screen flex items-center justify-center'>
        {/* Scroll indicator */}
        <div className='scroll-indicator'>
          {projects.map((_, index) => (
            <div key={index} className={`scroll-dot project-dot-${index}`} />
          ))}
        </div>

        <div className='carousel-wrapper w-full px-2 sm:px-4 md:px-8'>
          <div className='text-center mb-8 md:mb-12'>
            <h2
              ref={titleRef}
              className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4 transition-all duration-300 ease-out'
            >
              Featured Projects
            </h2>
            <p
              ref={subtitleRef}
              className='text-gray-600 text-base sm:text-lg transition-all duration-300 ease-out'
            >
              Scroll to explore my latest projects.
            </p>
          </div>
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.6,
              momentumVelocityRatio: 1,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 1.3,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 48,
              },
            }}
            className='swiper !overflow-visible'
          >
            {projects.map((project, idx) => (
              <SwiperSlide key={idx} className='!h-auto px-2 sm:px-4'>
                <div
                  className='project-card group relative bg-white shadow-lg hover:shadow-2xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square mx-auto transition-all duration-500 ease-out transform hover:-translate-y-2'
                  data-project-index={idx}
                >
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110'
                  />
                  <div className='absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1f2020]/80 to-transparent backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out p-3 sm:p-4 md:p-6 flex flex-col justify-end'>
                    <h3 className='project-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white transition-all duration-300'>
                      {project.title}
                    </h3>
                    <p className='project-description text-white/90 leading-relaxed text-sm sm:text-base md:text-lg transition-all duration-300'>
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description}
                    </p>
                    <div className='mt-4 md:mt-8 flex gap-2 md:gap-4 flex-wrap'>
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='project-link inline-flex items-center text-white font-medium bg-blue-600 hover:bg-blue-700 px-3 py-2 md:px-5 md:py-3 transition-all duration-300 text-sm md:text-lg rounded transform hover:scale-105'
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='project-link inline-flex items-center text-white font-medium bg-green-600 hover:bg-green-700 px-3 py-2 md:px-5 md:py-3 transition-all duration-300 text-sm md:text-lg rounded transform hover:scale-105'
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
