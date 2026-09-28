"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import SectionTitle from "./SectionTitle";
import { FaNodeJs, FaReact } from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiFirebase,
  SiFlask,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

const techIconMap: Record<string, IconType | undefined> = {
  "Next.js": SiNextdotjs,
  React: FaReact,
  "React Native": FaReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Flask: SiFlask,
  "Node.js": FaNodeJs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Redux: SiRedux,
  Firebase: SiFirebase,
  "Material UI": SiMui,
  TensorFlow: SiTensorflow,
};

function ViewportVideo({ src, poster, className }: { src: string; poster?: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    if (!("IntersectionObserver" in window)) {
      void video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden="true"
      className={className}
    />
  );
}

export default function ProjectsSection() {
  const featuredProjects = projects.filter((project) =>
    ["judgifysu", "walksafe", "findx"].includes(project.slug)
  );

  return (
    <section
      id="projects"
      className="relative flex w-full flex-col bg-seashell px-4 py-16 md:py-24"
    >
      {/* Header Section */}
      <SectionTitle
        title="Projects"
        accentWord={null}
        as="h2"
        align="left"
        size="lg"
        className="mb-10 md:mb-14"
        action={
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm text-sm font-instrument font-medium text-neutral-800 dark:text-neutral-200 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 shadow-xs"
          >
            <span>View all projects</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        }
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-neutral-300/80 dark:bg-neutral-700 md:block"
        />
        <div className="relative z-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              data-loader-box="project-card"
              className="group flex h-full w-full flex-col rounded-[28px] border border-black/[0.07] bg-white/80 p-3 shadow-[0_8px_30px_rgba(30,25,20,0.04)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-black/[0.12] hover:shadow-[0_20px_55px_rgba(30,25,20,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 motion-reduce:transition-none dark:border-white/[0.09] dark:bg-[#1f2025] dark:hover:border-white/[0.16] dark:hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)] dark:focus-visible:ring-white"
            >
              <div
                data-loader-media="project-preview"
                className="relative isolate mb-1 aspect-[16/10] w-full overflow-hidden rounded-[21px] bg-neutral-100 dark:bg-neutral-900"
              >
                {project.video ? (
                  <ViewportVideo
                    src={project.video}
                    poster={project.image[0]}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                ) : project.image.length > 0 ? (
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
                    <Image
                      src={project.image[0]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
                  <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1.5 font-instrument text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")} <span className="text-white/55">/</span> Featured
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black motion-reduce:transition-none">
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 sm:pt-6">
                <div className="mb-3">
                  <p className="mb-2 line-clamp-1 font-playfair text-sm italic text-neutral-500 dark:text-neutral-400">
                    {project.category}
                  </p>
                  <h3 className="font-mango text-4xl uppercase leading-[0.95] tracking-tight text-black dark:text-[#F4F4F4] sm:text-[2.7rem]">
                    {project.title}
                  </h3>
                </div>

                <p className="line-clamp-3 font-instrument text-[15px] leading-6 text-neutral-600 dark:text-neutral-300 sm:text-base">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.technologies.slice(0, 4).map((tech) => {
                      const TechIcon = techIconMap[tech];

                      return (
                        <span
                          key={tech}
                          title={TechIcon ? tech : undefined}
                          className="inline-flex items-center justify-center rounded-full border border-black/[0.06] bg-[#F4F4F4] px-3 py-1.5 font-instrument text-[11px] font-medium text-neutral-600 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-neutral-300"
                        >
                          {TechIcon ? (
                            <>
                              <TechIcon className="h-4 w-4" aria-hidden="true" />
                              <span className="sr-only">{tech}</span>
                            </>
                          ) : (
                            tech
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-sm font-instrument font-medium text-neutral-800 dark:text-neutral-200"
          >
            <span>View all projects</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
