"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import SectionTitle from "./SectionTitle";
import { techIconMap } from "@/data/techIcons";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLoader } from "@/context/LoaderContext";

// Same as ExperienceSection: text flips to white while the tile is blue.
const onBlue =
  "transition-colors duration-300 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none";

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
  const reduceMotion = useReducedMotion();
  const { phase } = useLoader();
  const listRef = useRef<HTMLOListElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-90px" });
  // Hold the entrance until the loader starts lifting, otherwise it plays unseen.
  const revealed = listInView && phase !== "loading";
  const featuredProjects = projects.filter((project) =>
    ["judgifysu", "walksafe", "findx"].includes(project.slug)
  );

  return (
    <section
      id="projects"
      className="relative flex w-full flex-col bg-seashell px-4 py-10 md:py-14"
    >
      {/* Header Section */}
      <SectionTitle
        title="Projects"
        className="mx-auto mb-0 w-full max-w-7xl"
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
        {/* Columns instead of Experience's rows; same rising-blue hover language. */}
        <ol ref={listRef} className="grid grid-cols-1 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.li
              key={project.slug}
              data-loader-box="project-card"
              // No resting offset: the loader's blueprint boxes measure these cards.
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={revealed && !reduceMotion ? { opacity: 1, y: [20, 0] } : undefined}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15 + index * 0.08,
              }}
              className="border-x border-b border-black/10 dark:border-white/15 md:border-r-0 md:last:border-r"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative isolate flex h-full flex-col overflow-hidden px-3 py-6 focus-visible:outline-none md:px-6 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                />

                <div className="mb-5 flex items-baseline justify-between">
                  <span
                    className={`font-instrument text-[11px] font-semibold tracking-[0.2em] text-[#9A9EAC] tabular-nums dark:text-[#6B6B73] ${onBlue}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-instrument text-xl text-neutral-400 transition duration-300 group-hover:-rotate-45 group-hover:text-white group-focus-visible:-rotate-45 group-focus-visible:text-white motion-reduce:transition-none"
                  >
                    &rarr;
                  </span>
                </div>

                <div
                  data-loader-media="project-preview"
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-200 dark:bg-neutral-900"
                >
                  {project.video ? (
                    <ViewportVideo
                      src={project.video}
                      poster={project.image[0]}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  ) : project.image.length > 0 ? (
                    <Image
                      src={project.image[0]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    />
                  ) : null}
                </div>

                <h3
                  className={`mt-6 font-bricolage font-bold text-[2.4rem] leading-[1.05] tracking-[-0.015em] [font-variation-settings:"opsz"_96] text-black dark:text-[#F4F4F4] sm:text-[2.7rem] ${onBlue}`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mt-4 line-clamp-3 font-instrument text-[15px] leading-7 text-neutral-600 dark:text-neutral-300 ${onBlue}`}
                >
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <ul aria-label="Technologies used" className="-ml-1.5 mt-auto flex flex-wrap items-center gap-1 pt-5">
                    {project.technologies.slice(0, 5).map((tech) => {
                      const TechIcon = techIconMap[tech];

                      return (
                        <li
                          key={tech}
                          title={tech}
                          className="rounded-md p-1.5 font-instrument text-xs text-neutral-500 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:ring-1 group-hover:ring-inset group-hover:ring-white/20 group-focus-visible:bg-white/10 group-focus-visible:text-white group-focus-visible:ring-1 group-focus-visible:ring-inset group-focus-visible:ring-white/20 motion-reduce:transition-none dark:text-neutral-400"
                        >
                          {TechIcon ? (
                            <>
                              <TechIcon className="h-5 w-5" aria-hidden="true" />
                              <span className="sr-only">{tech}</span>
                            </>
                          ) : (
                            tech
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Link>
            </motion.li>
          ))}
        </ol>

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
