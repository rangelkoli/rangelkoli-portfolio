"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import {
  educationItems,
  experienceItems,
  honorItems,
  type ExperienceItem,
} from "@/data/experience";
import { techIconMap } from "@/data/techIcons";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:focus-visible:outline-[#60A5FA]";

function TelemetryStripChart({
  beforePct,
  afterPct,
  id,
}: {
  beforePct: number;
  afterPct: number;
  id: string;
}) {
  const bWidth = Math.max(8, Math.min(100, beforePct)) * 5.2;
  const aWidth = Math.max(8, Math.min(100, afterPct)) * 5.2;
  const hatchId = `hatch-${id}`;

  return (
    <svg
      viewBox="0 0 560 64"
      role="img"
      aria-label={`Telemetry strip chart comparing ${beforePct}% baseline against ${afterPct}% shipped benchmark`}
      className="mt-2.5 h-[64px] w-full overflow-visible"
    >
      <defs>
        <pattern
          id={hatchId}
          width="6"
          height="6"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="6"
            className="stroke-black/35 dark:stroke-white/40"
            strokeWidth="2"
          />
        </pattern>
      </defs>

      {/* Outer calibration rails */}
      <line
        x1="0"
        y1="2"
        x2="540"
        y2="2"
        className="stroke-black/20 dark:stroke-white/20"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="62"
        x2="540"
        y2="62"
        className="stroke-black/20 dark:stroke-white/20"
        strokeWidth="1"
      />

      {/* 10% major scale ticks and 5% minor ticks */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => {
        const x = step * 52;
        return (
          <g key={step}>
            <line
              x1={x}
              y1="2"
              x2={x}
              y2="62"
              className="stroke-black/10 dark:stroke-white/10"
              strokeDasharray="2 3"
              strokeWidth="1"
            />
            <line
              x1={x}
              y1="2"
              x2={x}
              y2="7"
              className="stroke-black/35 dark:stroke-white/35"
              strokeWidth="1.25"
            />
            <line
              x1={x}
              y1="57"
              x2={x}
              y2="62"
              className="stroke-black/35 dark:stroke-white/35"
              strokeWidth="1.25"
            />
          </g>
        );
      })}

      {/* Track 1: Baseline (Before) hatched bar + reference pin */}
      <rect
        x="0"
        y="12"
        width={bWidth}
        height="14"
        fill={`url(#${hatchId})`}
        className="stroke-black/40 dark:stroke-white/45"
        strokeWidth="1"
      />
      <circle
        cx={bWidth}
        cy="19"
        r="3.5"
        className="fill-[#52525B] dark:fill-[#A1A1AA]"
      />

      {/* Track 2: Shipped production bar + leading pulse marker */}
      <rect
        x="0"
        y="36"
        width={aWidth}
        height="16"
        className="fill-[#2563EB] dark:fill-[#60A5FA]"
      />
      <rect
        x={Math.max(0, aWidth - 3)}
        y="33"
        width="3"
        height="22"
        className="fill-[#1A1A1A] dark:fill-white"
      />

      {/* Delta connector vector between baseline and shipped */}
      <line
        x1={bWidth}
        y1="19"
        x2={aWidth}
        y2="44"
        className="stroke-[#2563EB] dark:stroke-[#60A5FA]"
        strokeDasharray="3 2"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SystemTopologySchematic({ role }: { role: ExperienceItem }) {
  return (
    <div className="mt-4 border border-black/15 bg-[#F8F9FA] p-4 sm:p-5 dark:border-white/20 dark:bg-[#0E1015]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/10 pb-3 dark:border-white/15">
        <p className="font-instrument text-[13px] font-semibold text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
          System topology · 3-stage production pipeline
        </p>
        <p className="font-instrument text-[13px] text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
          {role.shortName} · {role.yearRange}
        </p>
      </div>

      {/* Vector signal path & node topology (<80px height per SVG for crisp rendering) */}
      <svg
        viewBox="0 0 600 72"
        role="img"
        aria-label={`${role.company} three-stage system architecture signal diagram`}
        className="mt-3 h-[68px] w-full"
      >
        {/* Background blueprint grid lines */}
        {[14, 36, 58].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="600"
            y2={y}
            className="stroke-black/8 dark:stroke-white/8"
            strokeWidth="1"
          />
        ))}
        {[60, 180, 300, 420, 540].map((x) => (
          <line
            key={x}
            x1={x}
            y1="4"
            x2={x}
            y2="68"
            className="stroke-black/8 dark:stroke-white/8"
            strokeDasharray="2 3"
            strokeWidth="1"
          />
        ))}

        {/* Baseline legacy latency wave (dashed) */}
        <path
          d="M 20 54 Q 90 18, 160 50 T 300 46 T 440 52 T 580 48"
          fill="none"
          className="stroke-black/25 dark:stroke-white/25"
          strokeDasharray="4 4"
          strokeWidth="1.5"
        />

        {/* Shipped low-latency signal path (solid electric blue) */}
        <path
          d="M 20 36 C 110 36, 140 22, 210 22 C 280 22, 320 36, 390 36 C 460 36, 500 20, 580 20"
          fill="none"
          className="stroke-[#2563EB] dark:stroke-[#60A5FA]"
          strokeWidth="2.5"
        />

        {/* Directional signal connectors */}
        <line
          x1="96"
          y1="36"
          x2="264"
          y2="36"
          className="stroke-[#1A1A1A] dark:stroke-[#F4F5F8]"
          strokeWidth="1.5"
        />
        <polygon
          points="264,36 255,31 255,41"
          className="fill-[#1A1A1A] dark:fill-[#F4F5F8]"
        />
        <line
          x1="336"
          y1="36"
          x2="504"
          y2="36"
          className="stroke-[#1A1A1A] dark:stroke-[#F4F5F8]"
          strokeWidth="1.5"
        />
        <polygon
          points="504,36 495,31 495,41"
          className="fill-[#1A1A1A] dark:fill-[#F4F5F8]"
        />

        {/* 3 architectural stage nodes */}
        {[60, 300, 540].map((cx, i) => (
          <g key={cx}>
            <rect
              x={cx - 36}
              y="18"
              width="72"
              height="36"
              className="fill-white stroke-[#2563EB] dark:fill-[#14161C] dark:stroke-[#60A5FA]"
              strokeWidth="2"
            />
            <circle
              cx={cx - 18}
              cy="36"
              r="4"
              className="fill-[#2563EB] dark:fill-[#60A5FA]"
            />
            <line
              x1={cx - 8}
              y1="32"
              x2={cx + 22}
              y2="32"
              className="stroke-[#1A1A1A] dark:stroke-[#F4F5F8]"
              strokeWidth="2"
            />
            <line
              x1={cx - 8}
              y1="40"
              x2={cx + 14 + i * 3}
              y2="40"
              className="stroke-[#2563EB] dark:stroke-[#60A5FA]"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>

      {/* Hairline-divided 3-stage specification table (no nested card borders) */}
      <div className="mt-3 grid grid-cols-1 divide-y divide-black/15 border-t border-black/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-white/20 dark:border-white/20">
        {role.architectureNodes.map((node, idx) => (
          <div
            key={node.stage}
            className="pt-3 sm:px-3.5 sm:pt-3 first:sm:pl-0 last:sm:pr-0"
          >
            <p className="font-instrument text-[13px] font-semibold text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
              0{idx + 1} · {node.metric}
            </p>
            <h3 className="mt-1 font-bricolage text-lg font-bold leading-[1.3] text-[#1A1A1A] [overflow-wrap:anywhere] dark:text-[#F4F5F8]">
              {node.stage}
            </h3>
            <p className="mt-1 font-instrument text-base leading-[1.5] text-[#3F3F46] dark:text-[#D1D3DC]">
              {node.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 border-t border-black/10 pt-2.5 font-instrument text-base leading-[1.5] text-[#3F3F46] dark:border-white/15 dark:text-[#D1D3DC]">
        {role.mediaCaption}
      </p>
    </div>
  );
}

function StageArtifact({
  role,
  activeImageIndex,
  onSelectImage,
  hasSwitched,
}: {
  role: ExperienceItem;
  activeImageIndex: number;
  onSelectImage: (idx: number) => void;
  hasSwitched: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hasImages = role.images.length > 0;
  const safeIdx = hasImages ? activeImageIndex % role.images.length : 0;
  const showVideo = Boolean(role.video) && safeIdx === 0;

  return (
    <div
      data-exp-stage={role.id}
      className="border border-black/15 bg-white p-4 sm:p-6 dark:border-white/20 dark:bg-[#14161C]"
    >
      <motion.div
        key={role.id}
        initial={
          hasSwitched && !reduceMotion
            ? { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.35 }
            : false
        }
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top stage header */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-black/15 pb-3.5 dark:border-white/20">
          <div className="min-w-0">
            <p className="font-instrument text-[13px] font-medium text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
              {role.index} · {role.period} · {role.location}
            </p>
            <h2 className="mt-0.5 font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#1A1A1A] [overflow-wrap:anywhere] dark:text-[#F4F5F8]">
              {role.company} · {role.role}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {role.caseStudyHref ? (
              <Link
                href={role.caseStudyHref}
                className={`inline-flex items-center gap-1.5 border border-black/15 bg-[#F4F4F4] px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:bg-[#2563EB] hover:text-white dark:border-white/20 dark:bg-[#1E212A] dark:text-[#F4F5F8] dark:hover:bg-[#2563EB] ${focusRing}`}
              >
                <span>Case study</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              </Link>
            ) : null}
            {role.liveHref ? (
              <a
                href={role.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 border border-[#2563EB] bg-[#2563EB] px-3 py-1.5 font-instrument text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#1D4ED8] ${focusRing}`}
              >
                <span>Live product</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              </a>
            ) : null}
            {role.githubHref ? (
              <a
                href={role.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${role.company} GitHub repository`}
                className={`inline-flex items-center gap-1.5 border border-black/15 bg-[#F4F4F4] px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:bg-black hover:text-white dark:border-white/20 dark:bg-[#1E212A] dark:text-[#F4F5F8] dark:hover:bg-white dark:hover:text-[#1A1A1A] ${focusRing}`}
              >
                <FiGithub aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span>Source</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Main visual artifact: production screenshots/video OR custom SVG system schematic */}
        {hasImages ? (
          <div className="mt-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/15 bg-[#ECECEE] dark:border-white/20 dark:bg-[#08090C]">
              {showVideo ? (
                <video
                  key={role.video}
                  src={role.video}
                  poster={role.images[0]}
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={role.mediaCaption}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <Image
                  src={role.images[safeIdx]}
                  alt={`${role.company} production screen ${safeIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  priority
                  className="object-cover object-top transition-opacity duration-300"
                />
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-instrument text-base leading-[1.5] text-[#3F3F46] dark:text-[#D1D3DC]">
                {role.mediaCaption}
              </p>
              {role.images.length > 1 ? (
                <div
                  role="group"
                  aria-label={`${role.company} production views`}
                  className="flex flex-wrap items-center gap-1.5"
                >
                  {role.images.map((imgSrc, idx) => {
                    const isCurrent = idx === safeIdx;
                    const label =
                      idx === 0 && role.video
                        ? "Live video"
                        : `Screen ${idx + 1}`;
                    return (
                      <button
                        key={imgSrc}
                        type="button"
                        onClick={() => onSelectImage(idx)}
                        aria-pressed={isCurrent}
                        className={`border px-2.5 py-1 font-instrument text-[13px] font-medium tabular-nums transition-colors duration-200 ${focusRing} ${
                          isCurrent
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-black/15 bg-[#F4F4F4] text-[#1A1A1A] hover:border-[#2563EB] dark:border-white/20 dark:bg-[#1E212A] dark:text-[#F4F5F8]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <SystemTopologySchematic role={role} />
        )}

        {/* Flight-test SVG telemetry strip chart (no nested card borders) */}
        <div className="mt-4 border-t border-black/15 pt-4 dark:border-white/20">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-instrument text-base font-medium leading-[1.5] text-[#1A1A1A] dark:text-[#F4F5F8]">
              {role.telemetry.label}
            </p>
            <p className="font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
              {role.telemetry.headlineDelta}
            </p>
          </div>

          <TelemetryStripChart
            beforePct={role.telemetry.beforePct}
            afterPct={role.telemetry.afterPct}
            id={role.id}
          />

          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-instrument text-[13px] tabular-nums">
            <span className="text-[#52525B] dark:text-[#A1A1AA]">
              Baseline: {role.telemetry.beforeLabel}
            </span>
            <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">
              Shipped: {role.telemetry.afterLabel}
            </span>
            <span className="text-[#3F3F46] dark:text-[#D1D3DC]">
              {role.telemetry.subLabel}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperiencePageClient() {
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [hasSwitched, setHasSwitched] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeRole = experienceItems[selectedRoleIdx] ?? experienceItems[0];

  const handleSelectRole = (idx: number) => {
    if (idx !== selectedRoleIdx) {
      setHasSwitched(true);
    }
    setSelectedRoleIdx(idx);
    setSelectedImageIdx(0);
  };

  const handleInspectOnStage = (idx: number) => {
    setHasSwitched(true);
    setSelectedRoleIdx(idx);
    setSelectedImageIdx(0);
    const matrixEl = document.getElementById("matrix");
    matrixEl?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Unified First-Screen Header + Career Matrix & Live Evidence Stage */}
      <section
        id="matrix"
        aria-labelledby="experience-heading"
        className="border-b border-black/15 pb-12 md:pb-16 dark:border-white/20"
      >
        {/* Single unified header band: Title + headline KPIs + primary actions */}
        <div className="flex flex-col gap-5 border-b border-black/15 pb-5 lg:flex-row lg:items-end lg:justify-between dark:border-white/20">
          <div>
            <h1
              id="experience-heading"
              className="font-instrument text-[52px] font-normal leading-[0.9] tracking-[-0.035em] text-[#1A1A1A] sm:text-[68px] md:text-[84px] dark:text-[#F4F5F8]"
            >
              Experience
            </h1>
            <p className="mt-3 max-w-[54ch] font-instrument text-base leading-[1.55] text-[#3F3F46] md:text-lg dark:text-[#D1D3DC]">
              Four engineering roles shipping production web and mobile systems,
              paired with live artifacts and measured latency deltas.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <dl className="flex flex-wrap items-center gap-x-5 gap-y-1 font-instrument text-[13px] tabular-nums">
              <div className="flex items-baseline gap-1.5">
                <dt className="text-[#52525B] dark:text-[#A1A1AA]">Scope:</dt>
                <dd className="font-semibold text-[#1A1A1A] dark:text-[#F4F5F8]">
                  4 roles · 2022–Present
                </dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="text-[#52525B] dark:text-[#A1A1AA]">Latency:</dt>
                <dd className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">
                  35.8ms → 5.6ms (-84%)
                </dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt className="text-[#52525B] dark:text-[#A1A1AA]">Degree:</dt>
                <dd className="font-semibold text-[#1A1A1A] dark:text-[#F4F5F8]">
                  M.S. CS · Syracuse 3.85
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className={`inline-flex items-center gap-1.5 border border-[#2563EB] bg-[#2563EB] px-3.5 py-1.5 font-instrument text-base font-medium text-white transition-colors duration-200 hover:bg-[#1D4ED8] ${focusRing}`}
              >
                <span>Get in touch</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              </a>
              <Link
                href="/projects"
                className={`inline-flex items-center gap-1.5 border border-black/15 bg-white px-3.5 py-1.5 font-instrument text-base font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#2563EB] dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] ${focusRing}`}
              >
                <span>View all projects</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 12-column Asymmetric Split: 5-col Tenure Track Selector + 7-col Live Evidence Stage */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-instrument text-[13px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
                Select a tenure track to inspect live telemetry
              </p>
              <a
                href="#roles"
                className={`font-instrument text-[13px] font-medium text-[#2563EB] underline underline-offset-4 dark:text-[#60A5FA] ${focusRing}`}
              >
                Full dossiers ↓
              </a>
            </div>

            {/* Compact 2x2 grid on tablet (sm:grid-cols-2), vertical rail on desktop (lg:grid-cols-1) */}
            <div
              role="group"
              aria-label="Engineering roles"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-2.5"
            >
              {experienceItems.map((item, idx) => {
                const isSelected = idx === selectedRoleIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-exp-track={item.id}
                    aria-pressed={isSelected}
                    onClick={() => handleSelectRole(idx)}
                    className={`group relative isolate w-full overflow-hidden border px-3.5 py-2.5 text-left transition-colors duration-300 sm:p-3.5 lg:p-4 ${focusRing} ${
                      isSelected
                        ? "border-[#2563EB] bg-[#2563EB] text-white"
                        : "border-black/15 bg-white text-[#1A1A1A] hover:border-[#2563EB] hover:text-white dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] dark:hover:border-[#2563EB]"
                    }`}
                  >
                    {/* Rising bottom-edge #2563EB blue fill choreography */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 -z-10 bg-[#2563EB] transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isSelected
                          ? "translate-y-0"
                          : "translate-y-full group-hover:translate-y-0"
                      }`}
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span
                        className={`font-instrument text-[13px] font-semibold tabular-nums transition-colors duration-300 ${
                          isSelected
                            ? "text-white"
                            : "text-[#52525B] group-hover:text-white dark:text-[#A1A1AA]"
                        }`}
                      >
                        {item.index} · {item.period}
                      </span>
                      <span
                        className={`border px-2 py-0.5 font-instrument text-[13px] font-semibold tabular-nums transition-colors duration-300 ${
                          isSelected
                            ? "border-white/40 bg-[#1E40AF] text-white"
                            : "border-black/15 bg-[#F4F4F4] text-[#2563EB] group-hover:border-white/40 group-hover:bg-[#1E40AF] group-hover:text-white dark:border-white/20 dark:bg-[#1E212A] dark:text-[#60A5FA]"
                        }`}
                      >
                        {item.telemetry.headlineDelta}
                      </span>
                    </div>

                    <p
                      className={`mt-1 font-bricolage text-[22px] font-bold leading-[1.2] [overflow-wrap:anywhere] transition-colors duration-300 ${
                        isSelected
                          ? "text-white"
                          : "text-[#1A1A1A] group-hover:text-white dark:text-[#F4F5F8]"
                      }`}
                    >
                      {item.company}
                    </p>

                    <p
                      className={`mt-0.5 font-instrument text-base leading-[1.45] transition-colors duration-300 ${
                        isSelected
                          ? "text-white"
                          : "text-[#3F3F46] group-hover:text-white dark:text-[#D1D3DC]"
                      }`}
                    >
                      {item.role} · {item.location}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <StageArtifact
              role={activeRole}
              activeImageIndex={selectedImageIdx}
              onSelectImage={setSelectedImageIdx}
              hasSwitched={hasSwitched}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Complete Role Dossiers */}
      <section
        id="roles"
        aria-labelledby="dossiers-heading"
        className="border-b border-black/15 py-14 md:py-20 dark:border-white/20"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-black/15 pb-8 md:flex-row md:items-end dark:border-white/20">
          <div>
            <p className="font-instrument text-[13px] font-medium text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
              Chronological engineering record · 01 to 04
            </p>
            <h2
              id="dossiers-heading"
              className="mt-1 font-bricolage text-[28px] font-bold leading-[1.05] tracking-[-0.025em] text-[#1A1A1A] md:text-[44px] dark:text-[#F4F5F8]"
            >
              Shipped systems & role dossiers
            </h2>
          </div>
          <p className="max-w-[46ch] font-instrument text-base leading-[1.6] text-[#3F3F46] dark:text-[#D1D3DC]">
            Every position below includes the exact stack, architecture stages,
            and measured production outcomes delivered in that tenure.
          </p>
        </div>

        <div className="divide-y divide-black/15 dark:divide-white/20">
          {experienceItems.map((item, idx) => (
            <article
              key={item.id}
              id={`role-${item.id}`}
              className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              {/* Left 4 columns: Role metadata, hairline benchmark readout, stack, links */}
              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
                    {item.index}
                  </span>
                  <span className="font-instrument text-[13px] font-medium text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-2 font-bricolage text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-[#1A1A1A] [overflow-wrap:anywhere] md:text-[44px] dark:text-[#F4F5F8]">
                  {item.company}
                </h3>

                <p className="mt-2 font-instrument text-lg font-semibold leading-[1.45] text-[#1A1A1A] dark:text-[#F4F5F8]">
                  {item.role}
                </p>
                <p className="font-instrument text-[13px] text-[#52525B] dark:text-[#A1A1AA]">
                  {item.type} · {item.location}
                </p>

                {/* Hairline benchmark callout (no heavy boxed card wrapper) */}
                <div className="mt-5 border-y border-black/15 py-3.5 dark:border-white/20">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-instrument text-[13px] text-[#52525B] dark:text-[#A1A1AA]">
                      Primary benchmark
                    </span>
                    <span className="font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
                      {item.telemetry.headlineDelta}
                    </span>
                  </div>
                  <p className="mt-1 font-instrument text-base leading-[1.5] text-[#3F3F46] dark:text-[#D1D3DC]">
                    {item.telemetry.subLabel}
                  </p>
                </div>

                {/* Stack icons + names */}
                <ul
                  aria-label={`${item.company} technology stack`}
                  className="mt-5 flex flex-wrap gap-1.5"
                >
                  {item.technologies.map((tech) => {
                    const Icon = techIconMap[tech];
                    return (
                      <li
                        key={tech}
                        className="inline-flex items-center gap-1.5 border border-black/15 bg-white px-2.5 py-1 font-instrument text-[13px] font-medium text-[#1A1A1A] dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8]"
                      >
                        {Icon ? (
                          <Icon
                            aria-hidden="true"
                            className="h-3.5 w-3.5 shrink-0 text-[#2563EB] dark:text-[#60A5FA]"
                          />
                        ) : null}
                        <span>{tech}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Direct proof links + Inspect on stage trigger */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleInspectOnStage(idx)}
                    className={`inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] dark:hover:bg-[#2563EB] ${focusRing}`}
                  >
                    <span>Inspect on stage ↑</span>
                  </button>
                  {item.caseStudyHref ? (
                    <Link
                      href={item.caseStudyHref}
                      className={`inline-flex items-center gap-1.5 border border-[#2563EB] bg-[#2563EB] px-3 py-1.5 font-instrument text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#1D4ED8] ${focusRing}`}
                    >
                      <span>Read case study</span>
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                    </Link>
                  ) : null}
                  {item.liveHref ? (
                    <a
                      href={item.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-black/40 dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] ${focusRing}`}
                    >
                      <span>Visit live site</span>
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                    </a>
                  ) : null}
                  {item.githubHref ? (
                    <a
                      href={item.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-black/40 dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] ${focusRing}`}
                    >
                      <FiGithub
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                      <span>GitHub</span>
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Right 8 columns: Summary, numbered engineering highlights, hairline architecture ledger, and visual strip */}
              <div className="md:col-span-8">
                <p className="max-w-[66ch] font-instrument text-lg font-medium leading-[1.45] text-[#1A1A1A] dark:text-[#F4F5F8]">
                  {item.summary}
                </p>

                {/* Numbered engineering contributions */}
                <ol className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/15 dark:border-white/15">
                  {item.highlights.map((bullet, bIdx) => (
                    <li
                      key={bullet}
                      className="grid grid-cols-[2.25rem_1fr] items-baseline gap-3 py-3.5"
                    >
                      <span className="font-instrument text-[13px] font-semibold text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
                        0{bIdx + 1}
                      </span>
                      <p className="max-w-[68ch] font-instrument text-[17px] leading-[1.55] text-[#3F3F46] dark:text-[#D1D3DC]">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ol>

                {/* 3-node architecture & impact ledger: hairline divided instead of 3 separate boxes */}
                <div className="mt-6 grid grid-cols-1 divide-y divide-black/15 border-b border-black/15 pb-4 lg:grid-cols-3 lg:divide-x lg:divide-y-0 dark:divide-white/20 dark:border-white/20">
                  {item.architectureNodes.map((node) => (
                    <div
                      key={node.stage}
                      className="py-3 lg:px-4 lg:py-1 first:lg:pl-0 last:lg:pr-0"
                    >
                      <p className="font-instrument text-[13px] font-semibold text-[#2563EB] tabular-nums dark:text-[#60A5FA]">
                        {node.metric}
                      </p>
                      <h4 className="mt-1 font-bricolage text-lg font-bold leading-[1.3] text-[#1A1A1A] [overflow-wrap:anywhere] dark:text-[#F4F5F8]">
                        {node.stage}
                      </h4>
                      <p className="mt-1 font-instrument text-base leading-[1.5] text-[#52525B] dark:text-[#A1A1AA]">
                        {node.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Production thumbnail strip when role has shipped screen captures */}
                {item.images.length > 0 ? (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {item.images.slice(0, 2).map((src, imgIdx) => (
                      <div
                        key={src}
                        className="relative aspect-[16/10] overflow-hidden border border-black/15 bg-white dark:border-white/20 dark:bg-[#14161C]"
                      >
                        <Image
                          src={src}
                          alt={`${item.company} interface screen ${imgIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 36vw"
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: Academic Foundation & Hackathon Honors */}
      <section
        id="education"
        aria-labelledby="academic-heading"
        className="pt-14 md:pt-20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Degrees column (7 cols) */}
          <div className="lg:col-span-7">
            <p className="font-instrument text-[13px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
              Academic credentials
            </p>
            <h2
              id="academic-heading"
              className="mt-1 font-bricolage text-[28px] font-bold leading-[1.05] tracking-[-0.025em] text-[#1A1A1A] md:text-[44px] dark:text-[#F4F5F8]"
            >
              Education
            </h2>

            <div className="mt-6 divide-y divide-black/15 border-t border-black/15 dark:divide-white/20 dark:border-white/20">
              {educationItems.map((edu) => (
                <article key={edu.institution} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-instrument text-[13px] font-medium text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
                      {edu.period} · {edu.location}
                    </span>
                    <span className="border border-black/15 bg-white px-2.5 py-0.5 font-instrument text-[13px] font-semibold text-[#2563EB] tabular-nums dark:border-white/20 dark:bg-[#14161C] dark:text-[#60A5FA]">
                      {edu.gpa}
                    </span>
                  </div>

                  <h3 className="mt-2 font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#1A1A1A] dark:text-[#F4F5F8]">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 font-instrument text-lg font-medium leading-[1.45] text-[#3F3F46] dark:text-[#D1D3DC]">
                    {edu.degree}
                  </p>

                  <ul
                    aria-label={`${edu.institution} graduate and core coursework`}
                    className="mt-4 flex flex-wrap gap-1.5"
                  >
                    {edu.coursework.map((course) => (
                      <li
                        key={course}
                        className="border border-black/10 bg-white px-2.5 py-1 font-instrument text-[13px] text-[#3F3F46] dark:border-white/15 dark:bg-[#14161C] dark:text-[#D1D3DC]"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Hackathon wins & honors column (5 cols) */}
          <div className="lg:col-span-5">
            <p className="font-instrument text-[13px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
              Competitive engineering
            </p>
            <h2 className="mt-1 font-bricolage text-[28px] font-bold leading-[1.05] tracking-[-0.025em] text-[#1A1A1A] md:text-[44px] dark:text-[#F4F5F8]">
              Hackathon wins
            </h2>

            <div className="mt-6 divide-y divide-black/15 border-t border-black/15 dark:divide-white/20 dark:border-white/20">
              {honorItems.map((honor) => (
                <article key={honor.projectTitle} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="border border-[#2563EB] bg-[#2563EB] px-2.5 py-0.5 font-instrument text-[13px] font-semibold text-white">
                      {honor.award}
                    </span>
                    <span className="font-instrument text-[13px] text-[#52525B] tabular-nums dark:text-[#A1A1AA]">
                      {honor.date}
                    </span>
                  </div>

                  <p className="mt-2.5 font-instrument text-[13px] font-medium text-[#52525B] dark:text-[#A1A1AA]">
                    {honor.event}
                  </p>

                  <h3 className="mt-1 font-bricolage text-2xl font-bold leading-[1.2] tracking-[-0.015em] text-[#1A1A1A] dark:text-[#F4F5F8]">
                    {honor.projectTitle}
                  </h3>

                  <p className="mt-2 font-instrument text-base leading-[1.6] text-[#3F3F46] dark:text-[#D1D3DC]">
                    {honor.summary}
                  </p>

                  <div className="mt-4">
                    <Link
                      href={honor.projectHref}
                      className={`inline-flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1.5 font-instrument text-[13px] font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white dark:border-white/20 dark:bg-[#14161C] dark:text-[#F4F5F8] dark:hover:bg-[#2563EB] ${focusRing}`}
                    >
                      <span>View {honor.projectTitle} case study</span>
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
