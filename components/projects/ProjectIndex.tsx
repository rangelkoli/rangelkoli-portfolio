"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { listedProjects as projects, type Project } from "@/data/projects";
import { techIconMap } from "@/data/techIcons";

// Same rule as the homepage cards: text flips to white while the row is blue.
const onBlue =
  "transition-colors duration-300 group-hover:text-white group-focus-within:text-white motion-reduce:transition-none";

const kind = (p: Project) => (/mobile/i.test(p.category) ? "Mobile app" : "Web app");
const year = (p: Project) => p.period?.match(/\d{4}/)?.[0];

function Media({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  const reduceMotion = useReducedMotion();
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.image[0]}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    );
  }
  if (project.image[0]) {
    return (
      <Image
        src={project.image[0]}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    );
  }
  // ponytail: no honest screenshot yet, so the name is the picture.
  return (
    <div className="flex h-full w-full items-end bg-blue-600 p-6">
      <span className="font-bricolage text-3xl font-bold [overflow-wrap:anywhere] sm:text-4xl lg:text-5xl leading-none tracking-[-0.02em] text-white [font-variation-settings:'opsz'_96]">
        {project.title}
      </span>
    </div>
  );
}

export default function ProjectIndex() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 md:grid-cols-12 md:gap-10 lg:gap-16">
      <ol className="md:col-span-7">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="group relative isolate border-b border-black/10 dark:border-white/15"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-within:scale-y-100 motion-reduce:transition-none"
            />

            <div className="grid grid-cols-[1fr_auto] gap-x-3 px-2 py-6 md:grid-cols-[3rem_1fr_auto] md:px-4 md:py-7">
              <span
                className={`hidden pt-2 font-instrument text-[12px] md:block font-semibold tracking-[0.2em] text-[#6B6B73] tabular-nums dark:text-[#9A9EAC] ${onBlue}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <p
                  className={`font-instrument text-[12px] font-medium uppercase tracking-[0.16em] text-[#6B6B73] dark:text-[#9A9EAC] ${onBlue}`}
                >
                  {kind(project)}
                  {year(project) ? ` · ${year(project)}` : ""}
                </p>
                <h2
                  className={`mt-1.5 font-bricolage text-[2rem] font-bold [overflow-wrap:anywhere] leading-[1.05] tracking-[-0.015em] [font-variation-settings:'opsz'_96] text-black sm:text-[2.6rem] dark:text-[#F4F4F4] ${onBlue}`}
                >
                  {/* Stretched link: the whole row opens the case study. */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {project.title}
                  </Link>
                </h2>

                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-sm bg-neutral-200 md:hidden dark:bg-neutral-900">
                  <Media project={project} sizes="100vw" priority={index === 0} />
                </div>

                <p
                  className={`mt-4 line-clamp-3 max-w-[56ch] font-instrument text-[15px] leading-7 text-neutral-600 md:hidden dark:text-neutral-300 ${onBlue}`}
                >
                  {project.description}
                </p>

                <ul aria-label="Technologies used" className="-ml-1.5 mt-4 flex flex-wrap items-center gap-1">
                  {project.technologies.slice(0, 6).map((tech) => {
                    const TechIcon = techIconMap[tech];
                    return (
                      <li
                        key={tech}
                        title={tech}
                        className={`rounded-md p-1.5 font-instrument text-xs text-neutral-500 dark:text-neutral-400 ${onBlue}`}
                      >
                        {TechIcon ? (
                          <>
                            <TechIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                            <span className="sr-only">{tech}</span>
                          </>
                        ) : (
                          tech
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Sits above the stretched link so these stay separately clickable. */}
              <div className="relative z-10 flex flex-col items-end gap-1 pt-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source on GitHub`}
                    className={`grid h-10 w-10 place-items-center rounded-full text-neutral-500 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white dark:text-neutral-400 ${onBlue}`}
                  >
                    <FiGithub className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live`}
                    className={`grid h-10 w-10 place-items-center rounded-full text-neutral-500 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white dark:text-neutral-400 ${onBlue}`}
                  >
                    <FiArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop preview follows the row under the pointer or keyboard focus. */}
      <aside aria-hidden="true" className="hidden md:col-span-5 md:block">
        <div className="sticky top-32 pt-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200 dark:bg-neutral-900">
            <div key={current.slug} className="project-wipe absolute inset-0">
              <Media project={current} sizes="40vw" priority />
            </div>
          </div>
          <div className="mt-5 flex items-start justify-between gap-6">
            <p className="line-clamp-4 max-w-[46ch] font-instrument text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">
              {current.description}
            </p>
            <span className="shrink-0 font-instrument text-[12px] font-semibold tracking-[0.2em] text-[#6B6B73] tabular-nums dark:text-[#9A9EAC]">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
