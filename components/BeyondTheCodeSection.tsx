"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BeyondTheCodeSection.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clips = [
  { video: "/soccer-clip-1.mp4" },
  { video: "/soccer-clip-2.mp4" },
  { video: "/soccer-clip-3.mp4" },
  { video: "/soccer-clip-4.mp4" },
];

interface VideoCardProps {
  video: string;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div
      className="beyond-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Gradient overlay */}
      <div className="beyond-card-overlay" />

      {/* Sound indicator */}
      <div className="beyond-sound-indicator">
        <div className="beyond-sound-bars">
          <motion.div
            className="beyond-sound-bar"
            animate={
              isHovered
                ? { height: [8, 16, 8] }
                : { height: 8 }
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="beyond-sound-bar"
            animate={
              isHovered
                ? { height: [16, 8, 16] }
                : { height: 12 }
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />
          <motion.div
            className="beyond-sound-bar"
            animate={
              isHovered
                ? { height: [10, 18, 10] }
                : { height: 10 }
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="beyond-sound-bar"
            animate={
              isHovered
                ? { height: [14, 6, 14] }
                : { height: 8 }
            }
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const BeyondTheCodeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Calculate the scroll distance needed
    const getScrollAmount = () => {
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(containerWidth - viewportWidth + 100); // Extra padding
    };

    // Create the horizontal scroll animation
    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update active dot based on progress
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * clips.length),
            clips.length - 1
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="beyond-section bg-[#F4F4F4]">
      <div className="beyond-sticky">
        {/* Header */}
        <div className="beyond-header">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-mango font-extrabold uppercase text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] text-black"
          >
            Beyond the Code
          </motion.h2>
        </div>

        {/* Cards wrapper */}
        <div className="beyond-cards-wrapper">
          <div ref={containerRef} className="beyond-cards-container">
            {clips.map((clip, index) => (
              <VideoCard key={index} video={clip.video} />
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default BeyondTheCodeSection;
