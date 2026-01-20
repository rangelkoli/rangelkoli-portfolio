"use client";

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Coming Soon Page
  if (project.comingSoon) {
    return (
      <div className="min-h-dvh bg-seashell flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Back Button */}
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 mb-12 text-gray-600 hover:text-black transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="font-mango font-extrabold uppercase text-8xl md:text-[12rem] leading-none text-black mb-8 text-balance">
              {project.title}
            </h1>
            
            {project.video && (
              <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden mb-12 bg-gray-100">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-white p-12 md:p-16 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="mb-8">
                <svg 
                  width="80" 
                  height="80" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mx-auto mb-6 text-black"
                  aria-hidden="true"
                >
                  <path d="M12 2C13.1 5.3 15.3 7.7 18 9C15.3 10.3 13.1 12.7 12 16C10.9 12.7 8.7 10.3 6 9C8.7 7.7 10.9 5.3 12 2Z" fill="currentColor"/>
                </svg>
              </div>
              
              <h2 className="font-playfair italic text-5xl md:text-6xl text-gray-800 mb-6 text-balance">
                Coming Soon
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
                This project is currently under development. Check back soon for detailed information, screenshots, and more.
              </p>

              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium focus:ring-2 focus:ring-offset-2 focus:ring-black outline-none"
                >
                  View on GitHub
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Full Project Page
  return (
    <div className="min-h-dvh bg-seashell">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Navigation */}
        <nav className="mb-12 md:mb-20">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="font-medium">Back to Projects</span>
          </Link>
        </nav>

        {/* Project Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm">
             <span className="font-playfair italic text-lg text-gray-800">
              {project.category}
            </span>
          </div>
          <h1 className="font-mango font-extrabold uppercase text-7xl md:text-8xl lg:text-[10rem] leading-[0.85] text-black mb-6 text-balance">
            {project.title}
          </h1>
        </motion.header>

        {/* Project Media (Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-20 md:mb-32"
        >
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white shadow-xl">
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
              <Image
                src={project.image[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : null}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-32">
          {/* Left Column: Description & Features */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-mango text-4xl md:text-5xl uppercase mb-8 text-black">
              About the Project
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12 text-pretty font-light">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="mt-16">
                <h3 className="font-mango text-3xl md:text-4xl uppercase mb-8 text-black">
                  Key Features
                </h3>
                <ul className="space-y-6">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 mt-1.5 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </div>
                      <span className="text-lg md:text-xl text-gray-700 text-pretty group-hover:text-black transition-colors">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right Column: Meta & Links */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm sticky top-8">
              <div className="mb-10">
                <h3 className="font-mango text-3xl uppercase mb-6 text-black">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-800 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-black text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium text-lg"
                  >
                    <span>View on GitHub</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Link>
                )}
                {project.demo && (
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-white text-black px-6 py-4 rounded-full hover:bg-gray-50 transition-colors font-medium text-lg border-2 border-gray-200"
                  >
                    <span>Live Demo</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        {project.image.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="pb-20"
          >
            <h3 className="font-mango text-4xl md:text-6xl uppercase mb-12 text-black text-center md:text-left">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.image.slice(1).map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100 shadow-md group"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
