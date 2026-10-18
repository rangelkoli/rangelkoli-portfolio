"use client";

import { useState } from "react";

// Real solver output from JudgifySU (posters_with_judges_specter.csv), 8-poster sample.
const posters = [
  { n: 1, title: "Flexible tactile sensors", dept: "EECS" },
  { n: 2, title: "Parallel sensing in metaverses", dept: "EECS" },
  { n: 3, title: "Smart-city IoT security", dept: "CEE" },
  { n: 4, title: "Free-space quantum comms", dept: "EECS" },
  { n: 5, title: "Smart drug-delivery materials", dept: "BMCE" },
  { n: 6, title: "Smart fibers for energy", dept: "MAE" },
  { n: 7, title: "Lead-free double perovskites", dept: "CEE" },
  { n: 8, title: "Semiconductor process data", dept: "BMCE" },
];

const judges = [
  "Nadeem Ghani",
  "Chikukuri Monhan",
  "Qinru Qiu",
  "Senem Velipasalar",
  "Elizabeth Carter",
  "Svetoslava Todorova",
  "C.Y. Roger Chen",
  "Jason Pollack",
  "Shikha Nangia",
  "Yaoying Wu",
  "Bing Dong",
  "Wanliang Shan",
  "Ruth Chen",
  "Mary Beth Monroe",
  "Ashok Sangani",
];

// [poster index, judge index]
const edges: Array<[number, number]> = [
  [0, 0], [0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7],
  [4, 8], [4, 9], [5, 10], [5, 11], [6, 4], [6, 12], [7, 13], [7, 14],
];
// Monroe advises poster 5's author: the pairing the solver is forbidden to make.
const conflict: [number, number] = [4, 13];

const py = (i: number) => ((i + 0.5) / posters.length) * 100;
const jy = (j: number) => ((j + 0.5) / judges.length) * 100;
const curve = ([p, j]: [number, number]) =>
  `M0 ${py(p)} C50 ${py(p)} 50 ${jy(j)} 100 ${jy(j)}`;

type Focus = { side: "p" | "j"; i: number } | null;

export default function JudgifyDraw() {
  const [focus, setFocus] = useState<Focus>(null);
  const hit = ([p, j]: [number, number]) =>
    focus ? (focus.side === "p" ? focus.i === p : focus.i === j) : false;
  const on = (side: "p" | "j", i: number) => ({
    onMouseEnter: () => setFocus({ side, i }),
    onMouseLeave: () => setFocus(null),
    onFocus: () => setFocus({ side, i }),
    onBlur: () => setFocus(null),
  });
  const linked = (side: "p" | "j", i: number) =>
    !!focus &&
    (focus.side === side
      ? focus.i === i
      : edges.some(([p, j]) => (side === "p" ? p === i && hit([p, j]) : j === i && hit([p, j]))));

  return (
    <figure className="jd-draw" data-focus={focus ? "" : undefined}>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(2.5rem,0.8fr)_minmax(0,1fr)] h-[36rem] md:h-[38rem]">
        <ol className="grid grid-rows-[repeat(8,1fr)] border-y border-[var(--border)]" aria-label="Posters">
          {posters.map((p, i) => (
            <li
              key={p.n}
              tabIndex={0}
              {...on("p", i)}
              className="jd-row flex items-center gap-2 md:gap-3 border-b border-[var(--border)] last:border-b-0 pr-2 outline-none focus-visible:ring-2 focus-visible:ring-[#F76900]"
              data-on={linked("p", i) ? "" : undefined}
            >
              <span className="font-mango text-3xl md:text-4xl leading-none tabular-nums w-7 md:w-9 shrink-0">
                {String(p.n).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-[13px] md:text-sm leading-tight">
                <span className="block text-[var(--text-primary)]">{p.title}</span>
                <span className="block text-[var(--text-muted)] text-xs">{p.dept}</span>
              </span>
            </li>
          ))}
        </ol>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="jd-lines w-full h-full overflow-visible" aria-hidden="true">
          {edges.map((e) => (
            <path key={e.join("-")} d={curve(e)} className="jd-edge" data-on={hit(e) ? "" : undefined} />
          ))}
          <path d={curve(conflict)} className="jd-conflict" />
        </svg>

        <ol className="grid grid-rows-[repeat(15,1fr)] border-y border-[var(--border)]" aria-label="Judges">
          {judges.map((name, j) => (
            <li
              key={name}
              tabIndex={0}
              {...on("j", j)}
              className="jd-row flex items-center gap-2 pl-2 border-b border-[var(--border)] last:border-b-0 text-[13px] md:text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[#F76900] whitespace-nowrap overflow-hidden text-ellipsis"
              data-on={linked("j", j) ? "" : undefined}
            >
              <span className="min-w-0 truncate">{name}</span>
              {j === conflict[1] && (
                <span className="ml-auto shrink-0 text-xs text-[var(--text-muted)]" title="Advisor of poster 05">
                  ✕ 05
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-4 text-sm text-[var(--text-secondary)] max-w-xl">
        The solver&apos;s real draw for the 8-poster sample in the repo: 40 judges available, 15 used. The
        dashed line is the pairing the rules forbid: Mary Beth Monroe advises poster 05&apos;s author, so she
        judges 08 instead.
      </figcaption>
    </figure>
  );
}
