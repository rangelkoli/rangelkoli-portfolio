import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionTitle from "./SectionTitle";

export default function ExperienceSection() {
  const experienceSlugs = ["orange-housing", "hereafter"];
  const experiences = experienceSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="w-full bg-[#F4F4F4] px-4 py-16 dark:bg-neutral-950 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="Experience"
          eyebrow="Selected work"
          description="Roles where I’ve helped take ambitious ideas from architecture to launch."
          align="left"
          size="lg"
          className="mb-10 md:mb-14"
        />

        <div className="space-y-6 md:space-y-8">
          {experiences.map((experience, index) => (
            <article
              key={experience.slug}
              className="group"
            >
              <div
                data-loader-box="experience-card"
                className="grid gap-0 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/80 p-3 shadow-[0_10px_35px_rgba(30,25,20,0.045)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-black/[0.13] hover:shadow-[0_22px_55px_rgba(30,25,20,0.1)] focus-within:border-black/[0.2] motion-reduce:transition-none dark:border-white/[0.09] dark:bg-[#1f2025] dark:hover:border-white/[0.17] dark:hover:shadow-[0_22px_55px_rgba(0,0,0,0.3)] md:grid-cols-[0.94fr_1.06fr] md:rounded-[32px]"
              >
                <Link
                  href={`/projects/${experience.slug}`}
                  data-loader-media="experience-preview"
                  className="group/media relative block aspect-[16/10] overflow-hidden rounded-[20px] bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black dark:bg-neutral-900 dark:focus-visible:ring-white md:aspect-auto md:min-h-[390px] md:rounded-[23px]"
                  aria-label={`View ${experience.title} case study`}
                >
                  <Image
                    src={experience.image[0]}
                    alt={`${experience.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover/media:scale-[1.04] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
                  />
                  <div className="pointer-events-none absolute right-4 top-4 sm:right-5 sm:top-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-md transition-[background-color,color,border-color] duration-300 group-hover/media:border-white group-hover/media:bg-white group-hover/media:text-black motion-reduce:transition-none">
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>

                <div className="flex min-w-0 flex-col px-4 pb-4 pt-7 sm:px-7 sm:pb-6 sm:pt-8 md:px-9 md:py-8 lg:px-12 lg:py-10">
                  <div className="mb-8 flex items-center gap-4 font-instrument text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 md:mb-auto">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-neutral-300 dark:bg-neutral-600" />
                    <span>{experience.caseStudy?.type ?? experience.category}</span>
                    {experience.period && <span className="ml-auto tabular-nums">{experience.period}</span>}
                  </div>

                  {experience.role && (
                    <p className="mb-2 font-instrument text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300">
                      {experience.role}
                    </p>
                  )}

                  <h3 className="font-mango text-5xl uppercase leading-[0.95] tracking-tight text-black dark:text-[#F4F4F4] sm:text-6xl">
                    {experience.title}
                  </h3>

                  <p className="mt-5 max-w-[52ch] font-instrument text-[15px] leading-7 text-neutral-600 dark:text-neutral-300 sm:text-base">
                    {experience.caseStudy?.lead ?? experience.description}
                  </p>

                  <ul aria-label="Technologies used" className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                    {experience.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="font-instrument text-xs text-neutral-500 before:mr-1.5 before:text-neutral-300 before:content-['·'] dark:text-neutral-400 dark:before:text-neutral-600"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/projects/${experience.slug}`}
                    className="group/link mt-7 inline-flex w-fit items-center gap-3 border-b border-neutral-300 pb-1 font-instrument text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 dark:border-neutral-600 dark:text-white dark:hover:border-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 md:mt-auto md:pt-7"
                  >
                    View case study
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:transition-none">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
