"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const CLIPS = [
  "/soccer-clip-1.mp4",
  "/soccer-clip-2.mp4",
  "/soccer-clip-3.mp4",
  "/soccer-clip-4.mp4",
];

function ClipVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <video
      ref={videoRef}
      src={src}
      preload="none"
      muted
      loop
      playsInline
      aria-hidden="true"
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
    />
  );
}

const BeyondTheCodeSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#F4F4F4] px-4 py-10 text-[#1a1a1a] md:py-14">
      <SectionTitle title="After Hours" align="left" className="mx-auto mb-0 w-full max-w-7xl" />

      {/* Same hairline box grid as ProjectsSection, one row of four. */}
      <ol className="mx-auto grid w-full max-w-7xl grid-cols-2 md:grid-cols-4">
        {CLIPS.map((src, index) => (
          <motion.li
            key={src}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : index * 0.08,
            }}
            className="group border-b border-l border-black/10 last:border-r even:border-r md:even:border-r-0 md:last:border-r"
          >
            <div
              data-loader-media="video-card"
              className="relative aspect-[9/16] w-full overflow-hidden bg-neutral-200"
            >
              <ClipVideo src={src} />
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};

export default BeyondTheCodeSection;
