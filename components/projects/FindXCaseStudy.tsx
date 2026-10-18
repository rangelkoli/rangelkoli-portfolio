import Image from "next/image";
import type { Project } from "@/data/projects";
import CaseStudyShell, { h2, muted, p, secondary } from "./CaseStudyShell";

const accent = "#2563EB";

const toc = [
  { id: "problem", label: "The problem" },
  { id: "scan", label: "How a scan works" },
  { id: "match", label: "What counts as a match" },
  { id: "station", label: "Finding the station" },
  { id: "police", label: "The police portal" },
];

const scanSteps = [
  {
    title: "Upload a photo",
    body: "A citizen who thinks they've seen a missing person uploads a picture. The browser sends their location along with it.",
  },
  {
    title: "Find the face",
    body: "MTCNN, a face detector, finds and crops the face. If there is no clear face, the scan stops and says so instead of guessing.",
  },
  {
    title: "Compare it",
    body: "DeepFace turns the face into a VGG-Face embedding and measures its cosine distance to every registered missing person's photo. Those embeddings are computed once and cached, so a scan doesn't redo them.",
  },
  {
    title: "Alert the police",
    body: "If the closest face is near enough, FindX notifies two stations: the one nearest the sighting and the one that registered the case.",
  },
];

// Station coordinates from citizens/views.py.
const stations = [
  { name: "Gorai", lat: 19.2308612, lng: 72.8284978 },
  { name: "Charkop", lat: 19.2162378, lng: 72.8209725 },
  { name: "Kandivali", lat: 19.2101851, lng: 72.8507246 },
  { name: "Borivali", lat: 19.2297932, lng: 72.8560621 },
];
const sighting = { lat: 19.2135, lng: 72.8275 }; // illustrative

const bounds = { minLat: 19.205, maxLat: 19.236, minLng: 72.815, maxLng: 72.862 };
const sx = (lng: number) => ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
const sy = (lat: number) => ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 60;

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
const distances = stations.map((s) => ({ ...s, km: haversineKm(sighting, s) }));
const nearest = distances.reduce((a, b) => (b.km < a.km ? b : a));

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mt-8">
      <Image
        src={src}
        alt={alt}
        width={1904}
        height={890}
        sizes="(max-width: 768px) 100vw, 768px"
        className="w-full h-auto rounded-2xl border border-[var(--border)]"
      />
      <figcaption className={`mt-3 text-sm ${secondary}`}>{caption}</figcaption>
    </figure>
  );
}

export default function FindXCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudyShell
      project={project}
      accent={accent}
      subtitle="A web app that checks a photo against registered missing-person cases and, on a match, alerts the nearest police station."
      meta={[
        ["When", "November 2023"],
        ["Area", "Four police stations in north-west Mumbai"],
        ["Type", "Django web app with face recognition"],
        ["Stack", project.technologies.join(", ")],
      ]}
      summary={[
        ["Problem", "Someone who spots a missing person usually can't tell if they really are missing, or which police station to call."],
        ["Solution", "Upload a photo. FindX compares the face with every registered case and routes a match to the right station automatically."],
        ["Result", "A working citizen app and police portal: case registration, face matching, station alerts, messaging and PDF case reports."],
      ]}
      toc={toc}
    >
      {/* Problem */}
      <section className="pt-16" aria-labelledby="problem">
        <h2 id="problem" className={h2}>
          The problem
        </h2>
        <p className={`mt-6 ${p}`}>
          Missing-person posters depend on someone recognising a face and then knowing what to do about it. A passer-by
          rarely knows whether the person in front of them is actually on a list, and even if they are sure, the case
          belongs to one station while the sighting is near another.
        </p>
        <p className={`mt-4 ${p}`}>
          FindX splits the work into two sides. Citizens get one job: take a photo. Police register cases and receive
          the alerts.
        </p>
      </section>

      {/* Scan */}
      <section className="pt-16" aria-labelledby="scan">
        <h2 id="scan" className={h2}>
          How a scan works
        </h2>
        <ol className="mt-8 space-y-8">
          {scanSteps.map((s, i) => (
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
          src="/projects/findx/photo-2.jpg"
          alt="FindX upload page with an 'Upload the Image' file picker and a Submit button"
          caption="Step 1: the upload page."
        />
        <Shot
          src="/projects/findx/matchFound.jpg"
          alt="FindX result page reading 'Notification sent! Match found, cosine value 5.55e-16, nearest police station: Charkop'"
          caption="Step 4: a match, its cosine distance, and the station that was alerted."
        />
      </section>

      {/* Match threshold */}
      <section className="pt-16" aria-labelledby="match">
        <h2 id="match" className={h2}>
          What counts as a match
        </h2>
        <p className={`mt-6 ${p}`}>
          Cosine distance runs from 0, the same face, upwards as faces differ. FindX only calls it a match below 0.3.
          Anything above is reported as no match. A false alarm would send police after the wrong person, which is
          why the cut-off is strict.
        </p>
        <figure className="mt-8 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">Cosine distance between two faces</figcaption>
          <div className="relative mt-10 h-14">
            <div className="absolute inset-x-0 top-6 h-2 rounded-full bg-[var(--border)]" />
            <div className="absolute left-0 top-6 h-2 rounded-l-full" style={{ width: "30%", background: accent }} />
            <div className="absolute top-2 h-10 border-l-2 border-[var(--text-primary)]" style={{ left: "30%" }} />
            <span className="absolute -top-4 text-sm font-semibold -translate-x-1/2" style={{ left: "30%" }}>
              0.3
            </span>
          </div>
          <div className={`flex justify-between text-xs tabular-nums ${muted}`}>
            <span>0, same face</span>
            <span>1.0, very different</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
            <p>
              <span className="font-semibold">Match.</span>{" "}
              <span className={secondary}>Notify the nearest station and the case&apos;s station.</span>
            </p>
            <p>
              <span className="font-semibold">No match.</span>{" "}
              <span className={secondary}>Tell the citizen, notify no one.</span>
            </p>
          </div>
        </figure>
      </section>

      {/* Nearest station */}
      <section className="pt-16" aria-labelledby="station">
        <h2 id="station" className={h2}>
          Finding the station
        </h2>
        <p className={`mt-6 ${p}`}>
          The prototype covers four stations in north-west Mumbai: Gorai, Charkop, Kandivali and Borivali. FindX uses
          the haversine formula to measure the straight-line distance from the sighting to each one and picks the
          closest.
        </p>
        <figure className="mt-8 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">The four stations, at their real coordinates</figcaption>
          <svg viewBox="-8 -6 116 72" className="mt-4 w-full h-auto" role="img" aria-label="Map of the four police stations with an example sighting linked to the nearest, Charkop">
            {distances.map((s) => (
              <line
                key={s.name}
                x1={sx(sighting.lng)}
                y1={sy(sighting.lat)}
                x2={sx(s.lng)}
                y2={sy(s.lat)}
                stroke={s.name === nearest.name ? accent : "var(--border)"}
                strokeWidth={s.name === nearest.name ? 0.8 : 0.4}
                strokeDasharray={s.name === nearest.name ? undefined : "1.5 1.5"}
              />
            ))}
            {stations.map((s) => (
              <g key={s.name}>
                <rect x={sx(s.lng) - 1.4} y={sy(s.lat) - 1.4} width="2.8" height="2.8" fill="var(--text-primary)" />
                <text x={sx(s.lng)} y={sy(s.lat) - 3.4} textAnchor="middle" fontSize="4.2" fill="var(--text-primary)">
                  {s.name}
                </text>
              </g>
            ))}
            <circle cx={sx(sighting.lng)} cy={sy(sighting.lat)} r="1.8" fill={accent} />
            <text x={sx(sighting.lng)} y={sy(sighting.lat) + 5.5} textAnchor="middle" fontSize="3.8" fill="var(--text-secondary)">
              Sighting
            </text>
          </svg>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {distances.map((s) => (
              <li key={s.name}>
                <span className={s.name === nearest.name ? "font-semibold" : secondary}>{s.name}</span>{" "}
                <span className={`tabular-nums ${muted}`}>{s.km.toFixed(1)} km</span>
              </li>
            ))}
          </ul>
          <p className={`mt-4 text-sm ${secondary}`}>Station positions from the code; the sighting is an example.</p>
        </figure>
      </section>

      {/* Police portal */}
      <section className="pt-16" aria-labelledby="police">
        <h2 id="police" className={h2}>
          The police portal
        </h2>
        <p className={`mt-6 ${p}`}>Each station signs in to its own account and gets:</p>
        <dl className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {[
            [
              "Case registration",
              "A detailed form: name, age, height, last known location, hair, skin tone, eye colour, clothing, physique, any dispute or suspect, a reward, a government ID document and the photo that gets matched against.",
            ],
            ["Case dashboard", "Every case with its status, which the station moves between Active, Resolved and Closed."],
            ["Notifications", "Matches sent to this station, either because the sighting was nearby or because it owns the case."],
            ["Station messages", "A simple message thread between stations about a case."],
            ["PDF reports", "A printable case report generated from the record with xhtml2pdf."],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-5">
              <dt className="font-semibold">{k}</dt>
              <dd className={p}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-6 ${p}`}>
          On the citizen side, the home page lists open cases, and Google Translate is built in so the app works in
          more than one language.
        </p>
      </section>
    </CaseStudyShell>
  );
}
