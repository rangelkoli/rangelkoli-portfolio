"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFlask,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiFirebase,
  SiMui,
  SiTensorflow,
  SiSocketdotio,
  SiSupabase,
  SiPostgresql,
  SiStripe,
} from "react-icons/si";

const techIconMap: { [key: string]: React.ElementType } = {
  "Next.js": SiNextdotjs,
  React: FaReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Flask: SiFlask,
  "React Native": FaReact,
  "Node.js": FaNodeJs,
  MongoDB: SiMongodb,
  Express: SiExpress,
  Redux: SiRedux,
  Firebase: SiFirebase,
  "Material UI": SiMui,
  TensorFlow: SiTensorflow,
  "Socket.io": SiSocketdotio,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Stripe: SiStripe,
};

  const ProjectsPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});
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

  const nextImage = (projectIndex: number, totalImages: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] === 0
          ? totalImages - 1
          : (prev[projectIndex] || 0) - 1,
    }));
  };

  return (
    <main 
      className="min-h-screen bg-seashell overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={sectionRef as React.RefObject<HTMLElement>}
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

      {/* Hero Section */}
      <section className="relative pt-16 pb-8 px-4 md:px-8">
        {/* Background gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Header with split text reveal */}
        <div className="relative mb-12">
          <SectionTitle
            title="All Projects"
            eyebrow="Archive"
            description="A curated collection of my work spanning web applications, mobile apps, and innovative solutions."
            align="center"
            as="h1"
          />
        </div>

        {/* Stats Bar */}
        <div 
          className="flex justify-center gap-12 md:gap-24 mb-8"
        >
          <div className="text-center">
            <span 
              className="font-mango text-5xl md:text-7xl text-black block"
            >
              {projects.length}
            </span>
            <span className="font-playfair italic text-gray-500 text-lg">Projects</span>
          </div>
          <div className="text-center">
            <span 
              className="font-mango text-5xl md:text-7xl text-black block"
            >
              {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            </span>
            <span className="font-playfair italic text-gray-500 text-lg">Technologies</span>
          </div>
          <div className="text-center">
            <span 
              className="font-mango text-5xl md:text-7xl text-black block"
            >
              100%
            </span>
            <span className="font-playfair italic text-gray-500 text-lg">Passion</span>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="relative px-4 md:px-8 pb-10">
        {/* Vertical Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 z-0"></div>

        {/* Projects List */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div 
            className="space-y-4"
          >
            {projects.map((project: Project, index: number) => (
              <div
                key={project.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Image Side */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`relative group cursor-none ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  onMouseEnter={() => {
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                    {project.image.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: (activeImageIndex[index] || 0) === imageIndex ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${imageIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </motion.div>
                    ))}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Carousel Controls */}
                    {project.image.length > 1 && (
                      <>
                        <motion.button
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(index, project.image.length);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiChevronLeft className="w-5 h-5 text-gray-700" />
                        </motion.button>

                        <motion.button
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(index, project.image.length);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiChevronRight className="w-5 h-5 text-gray-700" />
                        </motion.button>

                        {/* Image Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.image.map((_, imageIndex) => (
                            <button
                              key={imageIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                (activeImageIndex[index] || 0) === imageIndex
                                  ? "bg-white w-6"
                                  : "bg-white/50 hover:bg-white/80"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImageIndex((prev) => ({
                                  ...prev,
                                  [index]: imageIndex,
                                }));
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gray-200 rounded-2xl -z-10"></div>
                </Link>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                  {/* Project Number */}
                  <span 
                    className="font-mango text-8xl md:text-9xl text-gray-200 block leading-none"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h2 
                    className="font-mango text-5xl md:text-7xl lg:text-8xl text-black uppercase leading-none -mt-8 mb-6"
                  >
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p 
                    className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div 
                    className={`flex flex-wrap gap-3 mb-8 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}
                  >
                    {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => {
                      const IconComponent = techIconMap[tech];
                      return (
                        <motion.div
                          key={techIndex}
                          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {IconComponent && React.createElement(IconComponent, { className: "w-4 h-4 text-gray-700" })}
                          <span className="text-sm font-medium text-gray-700">{tech}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div 
                    className={`flex gap-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/btn flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors duration-300"
                    >
                      <span>View Details</span>
                      <FiArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiGithub className="w-5 h-5" />
                        <span>GitHub</span>
                        <FiArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-gray-300 rounded-full font-medium hover:border-black transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                        <FiArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-mango text-[40vw] text-black">*</span>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <SectionTitle
            title="Say Hello"
            eyebrow="Contact"
            align="center"
          />
          <div>
            <Link 
              href="mailto:rangelkoli@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full text-xl font-medium hover:bg-gray-900 transition-colors duration-300 group"
            >
              <span>Get in Touch</span>
              <FiArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectsPage;
