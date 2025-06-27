"use client";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projectElements = gsap.utils.toArray(".project-card");
    projectElements.forEach((project) => {
      gsap.fromTo(
        project as HTMLElement,
        {
          autoAlpha: 0,
          y: 50,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project as HTMLElement,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section id='projects' className='py-24' ref={projectsRef}>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-[var(--foreground)]'>
            Things I’ve Built
          </h2>
          <p className='text-lg text-[var(--foreground)] mt-4'>
            A selection of my favorite projects.
          </p>
        </div>

        <div className='space-y-28'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='project-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
            >
              {/* Text Content */}
              <div
                className={`lg:col-span-5 text-left ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <p className='text-blue-500 font-semibold text-sm mb-2'>
                  Featured Project
                </p>
                <h3 className='text-3xl font-bold text-[var(--foreground)] mb-4'>
                  {project.title}
                </h3>
                <div className='bg-[var(--background)] p-6 rounded-lg shadow-md mb-6'>
                  <p className='text-[var(--foreground)] leading-relaxed'>
                    {project.description}
                  </p>
                </div>
                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className='bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='flex items-center gap-4'>
                  {project.github && (
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--foreground)] hover:text-blue-500 transition-colors duration-300'
                      aria-label='GitHub Link'
                    >
                      <FiGithub size={24} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-[var(--foreground)] hover:text-blue-500 transition-colors duration-300'
                      aria-label='Live Demo'
                    >
                      <FiExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              {/* Image */}
              <div
                className={`lg:col-span-7 group relative ${
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className='relative rounded-lg overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 ease-in-out'>
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    width={800}
                    height={500}
                    className='w-full h-auto object-cover'
                  />
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
