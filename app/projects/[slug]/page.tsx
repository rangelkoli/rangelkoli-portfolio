import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/data/projects";
import TechStackBadges from "@/components/TechStackBadges";

function CaseStudyPage({ project }: { project: Project }) {
  const caseStudy = project.caseStudy;

  if (!caseStudy) return null;

  return (
    <main className="min-h-screen bg-seashell px-4 py-8 md:px-8 md:py-14 text-black">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-12 md:mb-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Projects</span>
          </Link>
        </nav>

        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-end mb-16 md:mb-24"
        >
          <div className="lg:col-span-8">
            <p className="font-playfair italic text-xl md:text-2xl text-gray-500 mb-5">
              {caseStudy.label}
            </p>
            <h1 className="font-mango font-extrabold uppercase text-[19vw] md:text-[13vw] lg:text-[10rem] leading-[0.8] text-black mb-8">
              {project.title}
            </h1>
            <p className="max-w-3xl text-2xl md:text-4xl leading-tight text-gray-800 text-pretty">
              {caseStudy.lead}
            </p>
          </div>

          <aside className="lg:col-span-4 lg:pb-2">
            <div className="border-t border-gray-300 pt-5 grid grid-cols-2 gap-y-6 text-sm">
              <div>
                <p className="uppercase tracking-[0.18em] text-gray-500 mb-1">Role</p>
                <p className="text-lg text-black">{caseStudy.role || project.role || "Engineer"}</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.18em] text-gray-500 mb-1">Type</p>
                <p className="text-lg text-black">{caseStudy.type || "Web Application"}</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.18em] text-gray-500 mb-1">Focus</p>
                <p className="text-lg text-black">{caseStudy.focus || "Full-stack Engineering"}</p>
              </div>
              <div>
                <p className="uppercase tracking-[0.18em] text-gray-500 mb-1">Stack</p>
                <p className="text-lg text-black">{project.technologies.join(", ")}</p>
              </div>
            </div>
          </aside>
        </header>

        <div
          className="relative aspect-[16/7] rounded-[2rem] overflow-hidden bg-white shadow-xl mb-16 md:mb-24"
        >
          {project.image[0] ? (
            <Image
              src={project.image[0]}
              alt={`${project.title} overview preview`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          ) : project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
              aria-label={`${project.title} product demo`}
            />
          ) : null}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-24 md:mb-36">
          <div className="lg:col-span-4">
            <p className="font-playfair italic text-2xl text-gray-500">The product</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-2xl md:text-4xl leading-tight text-gray-800 text-pretty">
              {caseStudy.context}
            </p>
          </div>
        </section>

        {project.video && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-24 md:mb-36">
            <div className="lg:col-span-4">
              <p className="font-playfair italic text-2xl text-gray-500">Prototype walkthrough</p>
              <h2 className="font-mango text-5xl md:text-7xl uppercase leading-none text-black mt-4">
                In motion
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="relative rounded-[2rem] overflow-hidden bg-black shadow-xl aspect-[16/9] max-h-[640px]">
                <video
                  src={project.video}
                  preload="none"
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                  aria-label={`${project.title} video prototype walkthrough`}
                />
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-24 md:mb-36">
          <div className="lg:col-span-4">
            <p className="font-playfair italic text-2xl text-gray-500">Core architecture</p>
            <h2 className="font-mango text-5xl md:text-7xl uppercase leading-none text-black mt-4">
              System design
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {caseStudy.sections.map((section, index) => (
                <div key={section.title} className="border-t border-gray-300 pt-6">
                  <span className="font-mango text-3xl text-gray-400 block mb-4">
                    0{index + 1}
                  </span>
                  <h3 className="font-mango text-3xl md:text-4xl uppercase leading-none text-black mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {project.image.length > 1 && (
          <section className="mb-24 md:mb-36">
            <div className="mb-8 md:mb-12">
              <p className="font-playfair italic text-2xl text-gray-500">Product visuals</p>
              <h2 className="font-mango text-5xl md:text-7xl uppercase leading-none text-black mt-2">
                Interface & details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.image.slice(1).map((image, index) => (
                <figure
                  key={image}
                  className="relative min-h-[260px] md:min-h-[360px] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm"
                >
                  <Image
                    src={image}
                    alt={`${project.title} interface view ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-24 md:mb-36">
          <div className="lg:col-span-4">
            <p className="font-playfair italic text-2xl text-gray-500">My contribution</p>
            <h2 className="font-mango text-5xl md:text-7xl uppercase leading-none text-black mt-4">
              In the build
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-gray-300 border-y border-gray-300">
              {caseStudy.contribution.map((item, index) => (
                <li key={item} className="flex items-start gap-5 py-5 md:py-7">
                  <span className="font-mango text-2xl text-gray-400">0{index + 1}</span>
                  <span className="text-xl md:text-2xl leading-tight text-gray-800 text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-black text-white rounded-[2rem] p-8 md:p-16 lg:p-20 mb-20 md:mb-28">
          <p className="font-playfair italic text-2xl text-gray-400 mb-6">The result</p>
          <p className="max-w-5xl text-3xl md:text-5xl leading-tight text-pretty">{caseStudy.outcome}</p>
          <div className="flex flex-wrap gap-3 mt-10">
            {project.technologies.map((technology) => (
              <span key={technology} className="px-4 py-2 rounded-full border border-white/25 text-sm text-gray-300">
                {technology}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/projects" className="font-playfair italic text-xl text-gray-600 hover:text-black transition-colors">
            ← More projects
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-black bg-white text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
              >
                <span>Live Demo</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <span>View the code</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  if (project.caseStudy) {
    return <CaseStudyPage project={project} />;
  }

  if (project.comingSoon) {
    return (
      <main className="min-h-screen bg-seashell px-4 py-8 md:px-8 md:py-14 text-black flex flex-col justify-between">
        <div className="max-w-4xl mx-auto w-full">
          <nav className="mb-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Projects</span>
            </Link>
          </nav>

          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold tracking-wide uppercase mb-4">
              Case study in progress
            </span>
            <h1 className="font-mango font-extrabold uppercase text-5xl md:text-7xl text-black mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </header>

          <div className="border-t border-gray-200 pt-8 mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              Technologies
            </h2>
            <TechStackBadges technologies={project.technologies} />
          </div>

          <p className="text-gray-500 text-sm">
            Full case study, metrics, and architecture deep-dive coming soon.
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full pt-12 border-t border-gray-200 mt-12 flex items-center justify-between">
          <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            ← Back to all projects
          </Link>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-black hover:underline"
            >
              View repository →
            </Link>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-seashell px-4 py-8 md:px-8 md:py-14 text-black">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Projects</span>
          </Link>
        </nav>

        <header className="mb-12">
          <p className="font-playfair italic text-lg text-gray-500 mb-2">
            {project.category}
          </p>
          <h1 className="font-mango font-extrabold uppercase text-5xl md:text-7xl text-black mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <span>View on GitHub</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 rounded-full text-sm font-medium text-gray-800 hover:border-black transition-colors"
              >
                <span>Live Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </Link>
            )}
          </div>
        </header>

        {project.image.length > 0 && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-12 shadow-md">
            <Image
              src={project.image[0]}
              alt={`${project.title} screenshot`}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {project.features && project.features.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mb-12">
            <h2 className="font-mango text-3xl uppercase text-black mb-6">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="font-mango text-lg text-gray-400">0{i + 1}</span>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-gray-200 pt-10 mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Technologies Used
          </h2>
          <TechStackBadges technologies={project.technologies} />
        </section>

        <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
          <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            ← Back to all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
