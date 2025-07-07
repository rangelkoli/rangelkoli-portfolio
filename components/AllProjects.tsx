import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import "./AllProjects.css";

gsap.registerPlugin(ScrollTrigger);

const AllProjects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projectElements = Array.from(
      projectsRef.current?.children || []
    ) as HTMLElement[];

    projectElements.forEach((project) => {
      gsap.fromTo(
        project,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className='all-projects-section'>
      <div ref={projectsRef} className='projects-grid'>
        {projects.map((project: Project, index: number) => (
          <div key={index} className='project-card'>
            <div className='project-image-container'>
              <Image
                src={project.image[0]}
                alt={project.title}
                layout='fill'
                className='project-image'
              />
            </div>
            <div className='project-content'>
              <h3 className='project-title'>{project.title}</h3>
              <p className='project-description'>{project.description}</p>
              <div className='project-tech'>
                {project.technologies.map((tech, i) => (
                  <span key={i} className='tech-tag'>
                    {tech}
                  </span>
                ))}
              </div>
              <div className='project-links'>
                {project.github && (
                  <Link href={project.github} passHref>
                    GitHub
                  </Link>
                )}
                {project.demo && (
                  <Link href={project.demo} passHref>
                    Demo
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProjects;
