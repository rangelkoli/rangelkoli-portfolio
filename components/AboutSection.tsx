"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#F4F4F4] text-[#1a1a1a]">
      
      {/* --- HEADER SECTION: Large "ABOUT" title like Projects --- */}
      <div className="px-4 pt-20 md:pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mango font-extrabold uppercase text-[22vw] leading-[0.85] text-black"
        >
          ABOUT
        </motion.h1>
      </div>

      {/* --- CONTENT SECTION: Bio text --- */}
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-mango font-extrabold uppercase text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] leading-[1.1] text-black"
          >
            HEY. I&apos;M RANGEL. A FULL STACK DEVELOPER BASED IN NEW YORK.
          </motion.h2>
        </div>
      </div>

    </section>
  );
};


export default AboutSection;

const Card = ({ clip }: { clip: any; index: number }) => {
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
      className="group relative h-[50vh] w-[75vw] md:w-[60vh] md:h-[60vh] overflow-hidden rounded-[30px] bg-neutral-200 shrink-0 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {clip.video && (
        <video
          ref={videoRef}
          src={clip.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      
      {/* Animated Sound Icon - Shows on hover */}
      <div className={`absolute top-6 right-6 z-30 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          {/* Sound Wave Icon */}
          <div className="flex items-center gap-[3px]">
            <motion.div 
              className="w-[3px] bg-white rounded-full"
              animate={isHovered ? { 
                height: [8, 16, 8],
              } : { height: 8 }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="w-[3px] bg-white rounded-full"
              animate={isHovered ? { 
                height: [16, 8, 16],
              } : { height: 12 }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            />
            <motion.div 
              className="w-[3px] bg-white rounded-full"
              animate={isHovered ? { 
                height: [10, 18, 10],
              } : { height: 10 }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            <motion.div 
              className="w-[3px] bg-white rounded-full"
              animate={isHovered ? { 
                height: [14, 6, 14],
              } : { height: 8 }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </div>
        </div>
      </div>

      {/* Gradient for text readability - Only shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
        <p className="uppercase tracking-widest text-xs font-bold text-white/90 mb-2">
          {clip.subtitle}
        </p>
        <p className="font-mango text-5xl uppercase text-white leading-none">
          {clip.title}
        </p>
      </div>
    </div>
  );
};
