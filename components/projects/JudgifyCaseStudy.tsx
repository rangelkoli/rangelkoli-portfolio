import type { Project } from "@/data/projects";
import CaseStudyShell, { h2, muted, p, secondary } from "./CaseStudyShell";
import JudgifyDraw from "./JudgifyDraw";

const toc = [
  { id: "problem", label: "The problem" },
  { id: "draw", label: "The assignment" },
  { id: "matching", label: "How matching works" },
  { id: "day", label: "On the day" },
  { id: "ranking", label: "Fair ranking" },
];

const rules = [
  { value: "2", label: "judges on every poster", body: "Never one opinion, never three." },
  { value: "≤ 6", label: "posters per judge", body: "Enough to compare, few enough to finish inside the hour." },
  {
    value: "1 or 2",
    label: "the hour a judge is free",
    body: "Odd posters are shown in hour one, even posters in hour two. A judge only gets posters from the hours they marked free.",
  },
  {
    value: "0",
    label: "posters from a judge's own student",
    body: "Matched on advisor name, so no one grades their own lab.",
  },
];

const steps = [
  {
    title: "Read up on every judge",
    body: "A CrewAI agent on Gemini 1.5 Flash searches Google Scholar through Serper for each of the 40 faculty judges and writes a short profile: core areas, key papers, current work.",
  },
  {
    title: "Score every pairing",
    body: "Judge profiles and poster abstracts go through AllenAI SPECTER, a SciBERT model trained on scientific papers, to measure how close they are. Each poster's program is also mapped to a department (MAE, BMCE, CEE or EECS), and the two signals count half each.",
  },
  {
    title: "Solve it in one go",
    body: "PuLP turns every judge–poster pair into a yes/no choice, and the CBC solver picks the set with the highest total score that still obeys all four rules. The result is saved as spreadsheets and pushed to Supabase for the web app.",
  },
];

// Illustrative scores; the method is the one in posterFlaskApp/app.py.
const toughJudge = { name: "Judge A (tough)", raw: [3, 4, 4, 5, 6], z: [-1.33, -0.44, -0.44, 0.66, 1.55], pick: 4 };
const easyJudge = { name: "Judge B (generous)", raw: [7, 8, 8, 9, 9], z: [-1.52, -0.35, -0.35, 1.11, 1.11], pick: 1 };

function Strip({ values, pick, min, max, ticks }: { values: number[]; pick: number; min: number; max: number; ticks: number[] }) {
  const x = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-9 overflow-visible" aria-hidden="true">
      <line x1="0" x2="100" y1="5" y2="5" stroke="var(--border)" vectorEffect="non-scaling-stroke" />
      {ticks.map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1="3.5" y2="6.5" stroke="var(--border)" vectorEffect="non-scaling-stroke" />
      ))}
      {values.map((v, i) => (
        <line
          key={i}
          x1={x(v)}
          x2={x(v)}
          y1={i === pick ? 0 : 2}
          y2={i === pick ? 10 : 8}
          stroke={i === pick ? "#F76900" : "var(--text-muted)"}
          strokeWidth={i === pick ? 4 : 2}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function ScaleLabels({ labels }: { labels: string[] }) {
  return (
    <div className={`flex justify-between text-xs tabular-nums ${muted}`}>
      {labels.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </div>
  );
}

export default function JudgifyCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudyShell
      project={project}
      accent="#F76900"
      subtitle="A web app that decides which professor judges which research poster, then ranks the posters fairly."
      meta={[
        ["Built for", "ECS Challenge, Syracuse University"],
        ["When", "February 2025"],
        ["Team", "Rangel Koli, Suved Ganduri, Saad Shah"],
        ["Stack", project.technologies.join(", ")],
      ]}
      summary={[
        ["Problem", "Matching 40 judges to posters by hand takes hours, and it is easy to send a professor to their own student's poster."],
        ["Solution", "An optimizer that reads each judge's research and each poster's abstract, then builds the best schedule that follows the event's rules."],
        ["Result", "Judges sign in with a code, score on their phone, and the final ranking corrects for tough and generous graders."],
      ]}
      toc={toc}
    >
      {/* 1. The problem */}
      <section className="pt-16" aria-labelledby="problem">
        <h2 id="problem" className={h2}>
          The problem
        </h2>
        <p className={`mt-6 ${p}`}>
          At Syracuse University&apos;s ECS poster challenge, students present research posters and faculty judge
          them. Someone has to decide who judges what. Doing that by hand means juggling four rules at once:
        </p>
        <ol className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {rules.map((r) => (
            <li key={r.label} className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[7rem_1fr] gap-4 py-5">
              <span className="font-instrument text-[40px] leading-none tracking-[-0.03em] tabular-nums whitespace-nowrap">{r.value}</span>
              <div>
                <p className="text-lg font-semibold leading-snug">{r.label}</p>
                <p className={`mt-1 ${p}`}>{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className={`mt-8 ${p}`}>
          And within those rules, every poster should go to the judges who know the most about its topic.
        </p>
      </section>

      {/* 2. The assignment */}
      <section className="pt-16" aria-labelledby="draw">
        <h2 id="draw" className={h2}>
          The assignment
        </h2>
        <p className={`mt-6 mb-8 ${p}`}>
          This is the real result from the sample data in the repo. Each poster on the left is linked to its two
          judges on the right. Hover over, or tab to, any row to follow its lines.
        </p>
        <JudgifyDraw />
      </section>

      {/* 3. How matching works */}
      <section className="pt-16" aria-labelledby="matching">
        <h2 id="matching" className={h2}>
          How matching works
        </h2>
        <p className={`mt-6 ${p}`}>Three steps, run once before the event.</p>
        <ol className="mt-8 space-y-8">
          {steps.map((s, i) => (
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
        <figure className="mt-10 border-l-2 border-[#F76900] pl-5 py-1">
          <figcaption className={`mb-2 text-sm ${muted}`}>What the solver maximises</figcaption>
          <div className="font-mono text-xs sm:text-sm leading-7 overflow-x-auto">
            <p>
              <span className={muted}>maximise</span> Σ c(j,p) · x(j,p)
            </p>
            <p>
              <span className={muted}>where</span> c = 0.5 · cos(judge, abstract) + 0.5 · same department
            </p>
            <p>
              <span className={muted}>and</span> x(j,p) = 1 if judge j gets poster p, else 0
            </p>
          </div>
        </figure>
      </section>

      {/* 4. On the day */}
      <section className="pt-16" aria-labelledby="day">
        <h2 id="day" className={h2}>
          On the day
        </h2>
        <p className={`mt-6 ${p}`}>
          The Next.js app has two sides: one for the organiser running the event, one for the judges walking the
          room.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold">The organiser</h3>
            <ul className={`mt-3 list-disc pl-5 space-y-2 marker:text-[var(--text-muted)] ${p}`}>
              <li>Uploads posters and judges as spreadsheets and runs the matching.</li>
              <li>Checks the result judge by judge.</li>
              <li>Emails every judge a five-character access code.</li>
              <li>Watches scores arrive, exports them, and runs the final ranking.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">The judge</h3>
            <ul className={`mt-3 list-disc pl-5 space-y-2 marker:text-[var(--text-muted)] ${p}`}>
              <li>Signs in with the code. No account, no password.</li>
              <li>Sees only the posters they were given.</li>
              <li>Scores each one from 1 to 10, with notes, and can edit until judging closes.</li>
              <li>Can only read and change their own scores, enforced by row-level security in Supabase.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Fair ranking */}
      <section className="pt-16" aria-labelledby="ranking">
        <h2 id="ranking" className={h2}>
          Fair ranking
        </h2>
        <p className={`mt-6 ${p}`}>
          Some judges grade hard and some grade easy, so raw averages aren&apos;t fair. Judgify compares each score
          with the rest of that judge&apos;s scores instead:
        </p>
        <ol className={`mt-4 list-decimal pl-5 space-y-2 marker:text-[var(--text-muted)] ${p}`}>
          <li>Extreme scores are clipped to the judge&apos;s 5th and 95th percentile.</li>
          <li>
            Each score becomes a z-score: how far above or below that judge&apos;s own average it is. A minimum
            spread of 0.5 stops a judge who gives everyone a 7 from distorting the result.
          </li>
          <li>Each poster&apos;s z-scores are added up and scaled to 0–10.</li>
          <li>A score of 0 means &ldquo;didn&apos;t review&rdquo; and is left out, not counted as bad.</li>
        </ol>

        <figure className="mt-10 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">Why a 6 can beat an 8</figcaption>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className={`text-sm ${muted}`}>Raw score, 1–10</p>
              {[toughJudge, easyJudge].map((jd) => (
                <div key={jd.name} className="mt-4">
                  <p className="text-sm">
                    {jd.name} gives <span className="font-semibold tabular-nums">{jd.raw[jd.pick]}</span>
                  </p>
                  <Strip values={jd.raw} pick={jd.pick} min={1} max={10} ticks={[1, 4, 7, 10]} />
                </div>
              ))}
              <ScaleLabels labels={["1", "4", "7", "10"]} />
            </div>
            <div>
              <p className={`text-sm ${muted}`}>Compared with the judge&apos;s own scores</p>
              {[toughJudge, easyJudge].map((jd) => (
                <div key={jd.name} className="mt-4">
                  <p className="text-sm">
                    {jd.name}:{" "}
                    <span className="font-semibold tabular-nums">
                      z {jd.z[jd.pick] > 0 ? "+" : "−"}
                      {Math.abs(jd.z[jd.pick]).toFixed(2)}
                    </span>
                  </p>
                  <Strip values={jd.z} pick={jd.pick} min={-2} max={2} ticks={[-2, -1, 0, 1, 2]} />
                </div>
              ))}
              <ScaleLabels labels={["−2", "−1", "0", "+1", "+2"]} />
            </div>
          </div>
          <p className={`mt-6 text-sm leading-relaxed ${secondary}`}>
            Judge A&apos;s 6 is the best score A gave all day. Judge B&apos;s 8 is about average for B. After
            normalising, A&apos;s 6 counts for more. Example scores; the method is the one in the repo.
          </p>
        </figure>
      </section>
    </CaseStudyShell>
  );
}
