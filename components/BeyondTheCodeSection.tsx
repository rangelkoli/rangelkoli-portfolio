"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import SectionTitle from "./SectionTitle";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

interface VideoCardProps {
  src: string;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  progress: MotionValue<number>;
  speed?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
  src,
  isAudioActive,
  onToggleAudio,
  progress,
  speed = 30,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Each card's video drifts at its own rate -> visible inner parallax
  const y = useTransform(progress, [0, 1], [speed, -speed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioActive;
      if (isAudioActive) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isAudioActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) {
      void video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      onClick={onToggleAudio}
      data-loader-media="video-card"
      className="group relative w-full aspect-[9/16] rounded-[32px] md:rounded-[40px] overflow-hidden bg-neutral-950 border border-white/20 shadow-2xl cursor-pointer select-none transition-transform duration-500 hover:scale-[1.01]"
    >
      {/* Oversized video so y-shift never shows gaps */}
      <motion.video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        style={{ y }}
        className="w-full h-[120%] -mt-[10%] object-cover will-change-transform"
      />

      {/* Subtle border shine on hover */}
      <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />

      {/* Minimal Speaker Icon Button (No text) */}
      <div className="absolute bottom-5 right-5 z-10">
        <div
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:text-white transition-all shadow-lg"
          aria-label={isAudioActive ? "Mute" : "Unmute"}
        >
          {isAudioActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5A2.25 2.25 0 002.25 9.75v4.5a2.25 2.25 0 002.25 2.25h1.94l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.54 5.46a.75.75 0 011.06 0 9.75 9.75 0 010 13.08.75.75 0 01-1.06-1.06 8.25 8.25 0 000-10.96.75.75 0 010-1.06zM15.89 8.11a.75.75 0 011.06 0 6 6 0 010 7.78.75.75 0 11-1.06-1.06 4.5 4.5 0 000-5.66.75.75 0 010-1.06z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white/60"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.5A2.25 2.25 0 002.25 9.75v4.5a2.25 2.25 0 002.25 2.25h1.94l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM17.28 9.22a.75.75 0 10-1.06 1.06L17.94 12l-1.72 1.72a.75.75 0 101.06 1.06L19 13.06l1.72 1.72a.75.75 0 101.06-1.06L20.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L19 10.94l-1.72-1.72z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const BeyondTheCodeSection = () => {
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smoothed progress = buttery lag, feels like real parallax
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  // Columns move OPPOSITE directions with big range -> impossible to miss
  const yLeft = useTransform(smooth, [0, 1], [90, -90]);
  const yRight = useTransform(smooth, [0, 1], [-90, 90]);

  const toggleAudio = (index: number) => {
    setActiveAudioIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F4F4F4] text-[#1a1a1a] px-4 py-16 md:py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionTitle title="After Hours" align="left" size="lg" />

        <div className="mx-auto max-w-5xl">
          {/* --- ASYMMETRICAL 2-COLUMN STAGGERED GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              style={isMobile ? undefined : { y: yLeft }}
              className="flex flex-col gap-6 md:gap-8 will-change-transform"
            >
              <VideoCard
                src="/soccer-clip-1.mp4"
                isAudioActive={activeAudioIndex === 0}
                onToggleAudio={() => toggleAudio(0)}
                progress={smooth}
                speed={34}
              />
              <VideoCard
                src="/soccer-clip-2.mp4"
                isAudioActive={activeAudioIndex === 1}
                onToggleAudio={() => toggleAudio(1)}
                progress={smooth}
                speed={20}
              />
            </motion.div>

            {/* RIGHT COLUMN (staggered down) */}
            <motion.div
              style={isMobile ? undefined : { y: yRight }}
              className="flex flex-col gap-6 md:gap-8 md:pt-28 lg:pt-36 will-change-transform"
            >
              <VideoCard
                src="/soccer-clip-3.mp4"
                isAudioActive={activeAudioIndex === 2}
                onToggleAudio={() => toggleAudio(2)}
                progress={smooth}
                speed={28}
              />
              <VideoCard
                src="/soccer-clip-4.mp4"
                isAudioActive={activeAudioIndex === 3}
                onToggleAudio={() => toggleAudio(3)}
                progress={smooth}
                speed={40}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondTheCodeSection;
