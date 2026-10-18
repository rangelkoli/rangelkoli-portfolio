import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";

// Shared reading layout for bespoke case-study pages (Judgify, WalkSafe).
export const muted = "text-[var(--text-muted)]";
export const secondary = "text-[var(--text-secondary)]";
export const h2 =
  "font-instrument font-normal leading-[1.05] tracking-[-0.03em] text-[36px] md:text-[44px] text-[var(--text-primary)] scroll-mt-32";
export const p = `text-[17px] md:text-lg leading-[1.75] ${secondary}`;

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function Actions({ project, demoLabel }: { project: Project; demoLabel: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-transparent bg-[var(--text-primary)] text-[var(--background)] px-5 py-2.5 rounded-full hover:opacity-85 transition-opacity"
        >
          Read the code <ArrowIcon />
        </Link>
      )}
      {project.demo && (
        <Link
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[var(--text-primary)] px-5 py-2.5 rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--background)] transition-colors"
        >
          {demoLabel} <ArrowIcon />
        </Link>
      )}
    </div>
  );
}

export default function CaseStudyShell({
  project,
  accent,
  badge,
  subtitle,
  meta,
  summary,
  toc,
  demoLabel = "Open the app",
  children,
}: {
  project: Project;
  accent: string;
  badge?: ReactNode;
  subtitle: string;
  meta: Array<[string, string]>;
  summary: Array<[string, string]>;
  toc: Array<{ id: string; label: string }>;
  demoLabel?: string;
  children: ReactNode;
}) {
  return (
    <main className="font-instrument min-h-screen bg-seashell px-5 pt-32 pb-16 md:px-8 text-[var(--text-primary)]">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-10">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 py-1 ${secondary} hover:text-[var(--text-primary)] transition-colors`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">All projects</span>
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
          {/* Contents, desktop only */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-32 text-sm">
              <p className={`mb-3 ${muted}`}>On this page</p>
              <ol className="space-y-2 border-l border-[var(--border)]" style={{ ["--toc-accent" as string]: accent }}>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className={`block -ml-px border-l border-transparent pl-4 py-0.5 ${secondary} hover:text-[var(--text-primary)] hover:border-[var(--toc-accent)] transition-colors`}
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="max-w-3xl">
            <header className="pb-10 border-b border-[var(--border)]">
              {badge}
              <h1 className="font-bricolage font-bold leading-[0.95] tracking-[-0.015em] [font-variation-settings:'opsz'_96] text-[52px] sm:text-[68px] md:text-[84px]">
                {project.title}
              </h1>
              <p className="mt-6 text-xl md:text-[1.7rem] leading-snug text-pretty">{subtitle}</p>
              <div className="mt-7">
                <Actions project={project} demoLabel={demoLabel} />
              </div>
              <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-sm">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className={muted}>{k}</dt>
                    <dd className="mt-1">{v}</dd>
                  </div>
                ))}
              </dl>
            </header>

            {/* Summary for skimmers */}
            <section aria-label="Summary" className="py-10 border-b border-[var(--border)]">
              <dl className="space-y-5">
                {summary.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6">
                    <dt className="font-semibold">{k}</dt>
                    <dd className={p}>{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {children}

            <footer className="mt-20 pt-8 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-6">
              <Link href="/projects" className={`py-2 ${secondary} hover:text-[var(--text-primary)] transition-colors`}>
                ← More projects
              </Link>
              <Actions project={project} demoLabel={demoLabel} />
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
