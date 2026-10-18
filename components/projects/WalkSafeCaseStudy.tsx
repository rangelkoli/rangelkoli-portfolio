import Image from "next/image";
import type { Project } from "@/data/projects";
import CaseStudyShell, { h2, muted, p, secondary } from "./CaseStudyShell";

const accent = "#16A34A";

const toc = [
  { id: "demo", label: "See it working" },
  { id: "problem", label: "The problem" },
  { id: "data", label: "Mapping the risk" },
  { id: "routing", label: "Safer routes" },
  { id: "family", label: "Family and check-in" },
  { id: "alerts", label: "Crime alerts" },
];

// Real counts and weights from backend/allCrimeData.csv and backend/EDA.ipynb.
const crimeTypes = [
  { type: "Simple assault", count: 2582, weight: 5 },
  { type: "Criminal mischief", count: 2321, weight: 5 },
  { type: "Offence against family", count: 1225, weight: 5 },
  { type: "Larceny", count: 535, weight: 2 },
  { type: "Dangerous weapons", count: 484, weight: 10 },
  { type: "Drug possession", count: 211, weight: 10 },
  { type: "Burglary", count: 199, weight: 10 },
  { type: "Vehicle theft", count: 121, weight: 2 },
  { type: "Kidnapping", count: 33, weight: 50 },
];
const maxCount = crimeTypes[0].count;

const tiers = [
  { label: "Low", count: "6,688", body: "reports at lightly scored addresses" },
  { label: "Medium", count: "1,172", body: "reports at the hotspots routing avoids" },
  { label: "High", count: "486", body: "reports at the highest-scoring addresses" },
];

const routeSteps = [
  {
    title: "Ask for the normal walk",
    body: "The Flask backend asks the Google Directions API for a walking route from where you are to where you're going.",
  },
  {
    title: "Find the hotspots on the way",
    body: "It decodes the route's polyline and checks which medium-risk crime locations fall inside it, using a point-in-polygon test.",
  },
  {
    title: "Swap them for safer stops",
    body: "Each hotspot is replaced by the nearest of 20 hand-picked safer waypoints around Syracuse, capped at 25 because that's Google's waypoint limit.",
  },
  {
    title: "Route again and compare",
    body: "Google re-plans the walk through those waypoints. The app draws both lines, the fastest and the safer one, so you can choose.",
  },
];

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mt-8">
      <Image
        src={src}
        alt={alt}
        width={1080}
        height={720}
        sizes="(max-width: 768px) 100vw, 768px"
        unoptimized={src.endsWith(".gif")}
        className="w-full h-auto rounded-2xl border border-[var(--border)]"
      />
      <figcaption className={`mt-3 text-sm ${secondary}`}>{caption}</figcaption>
    </figure>
  );
}

export default function WalkSafeCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudyShell
      project={project}
      accent={accent}
      demoLabel="Watch the demo"
      badge={
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--text-primary)] px-3.5 py-1.5 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
          </svg>
          1st place, CuseHacks 2024
        </p>
      }
      subtitle="A safety app for walking around Syracuse. It routes you around crime hotspots, shows your family on a live map, and tells them when you get home."
      meta={[
        ["Data", "8,346 Syracuse police reports"],
        ["When", "March 2024"],
        ["Platform", "iOS and Android, built with Expo"],
        ["Stack", project.technologies.join(", ")],
      ]}
      summary={[
        ["Problem", "Map apps find the fastest walk home. They don't know which blocks have the most reported crime."],
        ["Solution", "A mobile app that scores 8,346 Syracuse police reports by severity and reroutes walks around the worst spots, with live family tracking on top."],
        ["Result", "Won 1st place at CuseHacks 2024, Syracuse University's hackathon."],
      ]}
      toc={toc}
    >
      {/* Demo */}
      <section className="pt-16" aria-labelledby="demo">
        <h2 id="demo" className={h2}>
          See it working
        </h2>
        <p className={`mt-6 mb-8 ${p}`}>An 18-second walkthrough of the app.</p>
        <video
          src={project.video}
          controls
          muted
          playsInline
          preload="metadata"
          className="w-full aspect-video rounded-2xl border border-[var(--border)] bg-black"
          aria-label="WalkSafe demo video"
        />
      </section>

      {/* Problem */}
      <section className="pt-16" aria-labelledby="problem">
        <h2 id="problem" className={h2}>
          The problem
        </h2>
        <p className={`mt-6 ${p}`}>
          Students walk around Syracuse at all hours, often alone. Google Maps will give them the shortest walk, but
          it has no idea which streets have the most reported crime, and nobody at home knows when they arrive.
        </p>
        <p className={`mt-4 ${p}`}>WalkSafe tackles both in one app:</p>
        <ul className={`mt-4 list-disc pl-5 space-y-2 marker:text-[var(--text-muted)] ${p}`}>
          <li>a crime heatmap and a safer walking route,</li>
          <li>a live map of friends and family,</li>
          <li>an automatic &ldquo;I&apos;m home&rdquo; notification,</li>
          <li>crime alerts reported by other users.</li>
        </ul>
      </section>

      {/* Data */}
      <section className="pt-16" aria-labelledby="data">
        <h2 id="data" className={h2}>
          Mapping the risk
        </h2>
        <p className={`mt-6 ${p}`}>
          The backend starts from 8,346 incident reports from the Syracuse Police Department&apos;s open crime data.
          Not every report is equally worrying, so each type of crime gets a weight, from 2 for larceny up to 50 for
          kidnapping. Every address is scored by adding up the weights of everything reported there.
        </p>

        <figure className="mt-8 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">Reports by type, and the weight each one carries</figcaption>
          <div className={`mt-5 grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] md:grid-cols-[11rem_minmax(0,1fr)_4rem_4rem] gap-x-3 text-xs ${muted}`}>
            <span>Type</span>
            <span className="hidden md:block" />
            <span className="text-right">Reports</span>
            <span className="text-right">Weight</span>
          </div>
          <ul className="mt-2 space-y-2.5">
            {crimeTypes.map((c) => (
              <li
                key={c.type}
                className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] md:grid-cols-[11rem_minmax(0,1fr)_4rem_4rem] items-center gap-x-3 text-sm"
              >
                <span className="truncate">{c.type}</span>
                <span className="hidden md:block h-2 rounded-full bg-[var(--border)]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${(c.count / maxCount) * 100}%`, background: accent }}
                  />
                </span>
                <span className="text-right tabular-nums">{c.count.toLocaleString("en-US")}</span>
                <span className="text-right tabular-nums font-semibold">{c.weight}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-5 text-sm ${secondary}`}>Nine of the 24 crime types in the data.</p>
        </figure>

        <p className={`mt-8 ${p}`}>
          The scored reports are split into three tiers, which the app draws as layered heatmaps:
        </p>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-[var(--border)] py-6">
          {tiers.map((t) => (
            <div key={t.label}>
              <dt className={`text-sm ${muted}`}>{t.label}</dt>
              <dd>
                <span className="block text-[32px] md:text-[40px] leading-none tracking-[-0.03em] tabular-nums">
                  {t.count}
                </span>
                <span className={`mt-2 block text-sm leading-snug ${secondary}`}>{t.body}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Routing */}
      <section className="pt-16" aria-labelledby="routing">
        <h2 id="routing" className={h2}>
          Safer routes
        </h2>
        <p className={`mt-6 ${p}`}>Type a destination and WalkSafe plans the walk in four steps.</p>
        <ol className="mt-8 space-y-8">
          {routeSteps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--text-primary)] text-sm tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                <p className={`mt-2 ${p}`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <Shot
          src="/projects/walksafe/1.gif"
          alt="WalkSafe map of downtown Syracuse with crime heatmap dots while a destination is typed"
          caption="Searching for a destination over the crime heatmap."
        />
      </section>

      {/* Family */}
      <section className="pt-16" aria-labelledby="family">
        <h2 id="family" className={h2}>
          Family and check-in
        </h2>
        <p className={`mt-6 ${p}`}>
          While the app is open, each phone sends its location to Supabase every 5 seconds, and the map refreshes
          family members and alerts every 10 seconds. Family members show up as avatars on the same map.
        </p>
        <p className={`mt-4 ${p}`}>
          Turn on check-in and you never have to text &ldquo;home safe&rdquo;. Once you&apos;re within 100 metres of
          your saved home location, your family gets a push notification: &ldquo;Hemant has reached home&rdquo;.
        </p>
        <Shot
          src="/projects/walksafe/2.jpg"
          alt="Two phone screens: a 'has reached home' notification over the heatmap, and a family member's avatar on the Syracuse University map"
          caption="Left: the check-in notification. Right: a family member on the live map."
        />
      </section>

      {/* Alerts */}
      <section className="pt-16" aria-labelledby="alerts">
        <h2 id="alerts" className={h2}>
          Crime alerts
        </h2>
        <p className={`mt-6 ${p}`}>
          Police data only covers what has already been filed. For what&apos;s happening right now, anyone can report an incident (larceny, assault,
          vandalism, theft or other) at their current location. It appears on everyone&apos;s map with a warning
          marker and how long ago it was reported.
        </p>
        <Shot
          src="/projects/walksafe/3.jpg"
          alt="Two phone screens: the report form with incident types, and an 'assault, less than a minute ago' marker on the map"
          caption="Reporting an incident, and how it shows up for everyone else."
        />
      </section>
    </CaseStudyShell>
  );
}
