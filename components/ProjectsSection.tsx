"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Mouse position with spring animation for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      id="projects" 
      className="px-4 py-20 bg-seashell overflow-hidden relative"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      {/* Custom Cursor */}
      <motion.div
        className="hidden md:flex pointer-events-none fixed z-50 w-24 h-24 rounded-full bg-black items-center justify-center"
        style={{
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <span className="text-white text-xs font-bold uppercase tracking-wider">View</span>
      </motion.div>

      {/* Header Section */}
      <div className="relative mb-20 md:mb-32">
        <div className="flex items-center justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-playfair italic text-3xl md:text-5xl text-gray-500 block mb-2"
            >
              Featured
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mango font-extrabold uppercase text-[22vw] leading-[0.85] text-black"
            >
              PROJECTS
            </motion.h1>
          </div>
         
          {/* Badge - vertically centered with text */}
          <div className="hidden md:block flex-shrink-0">
            <Link href="/projects" className="block relative w-32 h-32 md:w-40 md:h-40 group cursor-pointer">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full text-black"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full bg-black rounded-full p-2">
                  <path
                    id="curve"
                    d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
                    fill="transparent"
                  />
                  <text className="text-[13px] font-bold uppercase tracking-widest fill-white">
                    <textPath xlinkHref="#curve">
                      View All Projects • View All Projects •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white w-8 h-8 md:w-12 md:h-12"
                >
                  <path d="M12 2C13.1 5.3 15.3 7.7 18 9C15.3 10.3 13.1 12.7 12 16C10.9 12.7 8.7 10.3 6 9C8.7 7.7 10.9 5.3 12 2Z" fill="currentColor"/>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Grid with Vertical Center Line */}
      <div className="relative">
        {/* Vertical Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {projects.slice(0, 4).map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="group block w-full bg-white/50 backdrop-blur-sm p-4 rounded-3xl cursor-none transition-all duration-300 hover:bg-white"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Image/Video Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl mb-6">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : project.image.length > 0 ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : null}
            </div>

            {/* Content Container */}
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <h2 className="font-mango text-4xl md:text-5xl text-black uppercase leading-none">
                  {project.title}
                </h2>
                <p className="font-playfair italic text-lg text-gray-500 md:text-right">
                  {project.category}
                </p>
              </div>
              
              <p className="text-gray-800 text-base md:text-lg leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
