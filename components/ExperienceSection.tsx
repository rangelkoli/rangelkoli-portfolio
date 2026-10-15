"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { techIconMap } from "@/data/techIcons";
import SectionTitle from "./SectionTitle";

// Resume details; slugged entries pull title, copy, tech, and screenshots from their project page.
const experienceEntries: Array<{
  slug?: string;
  title?: string;
  description?: string;
  technologies?: string[];
  role: string;
  period: string;
  location: string;
}> = [
  {
    slug: "orange-housing",
    role: "Software Engineer",
    period: "Jan 2026 – Present",
    location: "Syracuse, NY",
  },
  {
    slug: "hereafter",
    role: "Founding Software Engineer",
    period: "Aug 2025 – Dec 2025",
    location: "New York, NY",
  },
  {
    title: "Delet",
    role: "Software Developer",
    period: "Jun 2024 – Aug 2024",
    location: "San Francisco, CA",
    description:
      "Migrated a legacy website to a React Native app, cutting latency 25%, and built real-time video streaming on AWS EC2 & S3 for 10,000+ concurrent users.",
    technologies: ["React Native", "AWS"],
  },
];

// Applied to every text element so it flips to white while its row is blue.
const onBlue =
  "transition-colors duration-300 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none";

export default function ExperienceSection() {
  const reduceMotion = useReducedMotion();
  const experiences = experienceEntries.map((entry) => {
    const project = projects.find((p) => p.slug === entry.slug);
    return {
      key: entry.slug ?? entry.title!,
      href: project && `/projects/${project.slug}`,
      title: project?.title ?? entry.title!,
      description: project
        ? (project.caseStudy?.lead ?? project.description)
        : entry.description!,
      technologies: project?.technologies ?? entry.technologies ?? [],
      images: project?.image ?? [],
      role: entry.role,
      period: entry.period,
      location: entry.location,
    };
  });

  return (
    <section
      id="experience"
      className="w-full bg-[#F4F4F4] px-4 py-10 dark:bg-neutral-950 md:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="Experience"
          description="Roles where I’ve helped take ambitious ideas from architecture to launch."
          className="mb-0"
        />

        <ol>
          {experiences.map((experience, index) => {
            const hasImages = experience.images.length > 0;
            const row = (
              <>
                {/* Blue fill that rises from the row's bottom edge. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                />
                <span
                  className={`font-instrument text-[11px] font-semibold tracking-[0.2em] text-[#9A9EAC] tabular-nums dark:text-[#6B6B73] ${onBlue}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10">
                  <div>
                    <h3
                      className={`font-bricolage font-bold text-[2.4rem] leading-[1.05] tracking-[-0.015em] [font-variation-settings:"opsz"_96] text-black dark:text-[#F4F4F4] sm:text-[3rem] lg:text-[3.6rem] ${onBlue}`}
                    >
                      {experience.title}
                    </h3>
                    <p
                      className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 font-instrument text-[13px] font-medium uppercase tracking-[0.14em] text-[#6B6B73] dark:text-[#9A9EAC] ${onBlue}`}
                    >
                      <span className="text-neutral-900 group-hover:text-white group-focus-visible:text-white dark:text-neutral-100">
                        {experience.role}
                      </span>
                      <span className="tabular-nums">{experience.period}</span>
                      <span>{experience.location}</span>
                    </p>
                    <ul
                      aria-label="Technologies used"
                      className="-ml-1.5 mt-3 flex flex-wrap items-center gap-1"
                    >
                      {experience.technologies.map((technology) => {
                        const TechIcon = techIconMap[technology];

                        return (
                          <li
                            key={technology}
                            title={technology}
                            className="rounded-md p-1.5 font-instrument text-xs text-neutral-500 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:ring-1 group-hover:ring-inset group-hover:ring-white/20 group-focus-visible:bg-white/10 group-focus-visible:text-white group-focus-visible:ring-1 group-focus-visible:ring-inset group-focus-visible:ring-white/20 motion-reduce:transition-none dark:text-neutral-400"
                          >
                            {TechIcon ? (
                              <>
                                <TechIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">{technology}</span>
                              </>
                            ) : (
                              technology
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="relative mt-4 md:mt-1">
                    <div
                      className={`transition-opacity duration-300 motion-reduce:transition-none ${
                        hasImages
                          ? "md:group-hover:opacity-0 md:group-focus-visible:opacity-0"
                          : ""
                      }`}
                    >
                      <p
                        className={`max-w-[56ch] font-instrument text-[15px] leading-7 text-neutral-600 dark:text-neutral-300 ${onBlue}`}
                      >
                        {experience.description}
                      </p>
                    </div>

                    {hasImages && (
                      /* Screenshot strip that takes the description's place while hovered. */
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 hidden translate-y-4 overflow-hidden opacity-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none md:block"
                      >
                        <div className="flex h-full w-max animate-[experience-strip_18s_linear_infinite] gap-3 [animation-play-state:paused] group-hover:[animation-play-state:running] motion-reduce:animate-none">
                          {[...experience.images, ...experience.images].map(
                            (src, imageIndex) => (
                              <div
                                key={`${src}-${imageIndex}`}
                                className="relative aspect-[16/10] h-full shrink-0 overflow-hidden rounded-sm bg-blue-700"
                              >
                                <Image
                                  src={src}
                                  alt=""
                                  fill
                                  sizes="240px"
                                  className="object-cover object-top"
                                />
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className={`${experience.href ? "" : "invisible"} font-instrument text-xl text-neutral-400 transition duration-300 group-hover:-rotate-45 group-hover:text-white group-focus-visible:-rotate-45 group-focus-visible:text-white motion-reduce:transition-none`}
                >
                  &rarr;
                </span>
              </>
            );
            const rowClass =
              "group relative isolate flex items-baseline gap-6 overflow-hidden px-3 py-6 focus-visible:outline-none md:px-5 md:py-8";

            return (
              <motion.li
                key={experience.key}
                data-loader-box="experience-card"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                {experience.href ? (
                  <Link href={experience.href} className={rowClass}>
                    {row}
                  </Link>
                ) : (
                  <div className={rowClass}>{row}</div>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
