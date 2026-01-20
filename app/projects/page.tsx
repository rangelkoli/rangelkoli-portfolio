"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
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
};

// RevealText Component - Smooth clip-path reveal from center to outer
interface RevealTextProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({
  children,
  direction = "left",
  delay = 0,
  duration = 1,
  className = "",
}) => {
  const initialClip = direction === "left" 
    ? "inset(-10% 100% -10% 0)"
    : "inset(-10% 0 -10% 100%)";
  
  const finalClip = "inset(-10% 0 -10% 0)";

  return (
    <motion.div
      initial={{ clipPath: initialClip }}
      animate={{ clipPath: finalClip }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {children}
    </motion.div>
  );
};


  const ProjectsPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
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
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        {/* Background gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Header with split text reveal */}
        <div className="relative mb-12">
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-playfair italic text-3xl md:text-5xl text-gray-500 block mb-4 text-center"
          >
            Explore my
          </motion.span>

          {/* Main Title */}
          <RevealText direction="left" delay={0.2} duration={1}>
            <h1 className="font-mango font-extrabold text-[18vw] md:text-[14vw] leading-[0.85] text-black uppercase text-center">
              Projects
            </h1>
          </RevealText>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto text-center mt-8 px-4 font-light"
          >
            A curated collection of my work spanning web applications, mobile apps, and innovative solutions.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div 
          className="flex justify-center gap-12 md:gap-24 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <motion.span 
              className="font-mango text-5xl md:text-7xl text-black block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {projects.length}
            </motion.span>
            <span className="font-playfair italic text-gray-500 text-lg">Projects</span>
          </div>
          <div className="text-center">
            <motion.span 
              className="font-mango text-5xl md:text-7xl text-black block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            </motion.span>
            <span className="font-playfair italic text-gray-500 text-lg">Technologies</span>
          </div>
          <div className="text-center">
            <motion.span 
              className="font-mango text-5xl md:text-7xl text-black block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              100%
            </motion.span>
            <span className="font-playfair italic text-gray-500 text-lg">Passion</span>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <section className="relative px-4 md:px-8 pb-20">
        {/* Vertical Center Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 z-0"></div>

        {/* Projects List */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {projects.map((project: Project, index: number) => (
              <motion.div
                key={project.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut" }
                  }
                }}
              >
                {/* Image Side */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`relative group cursor-none ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setHoveredProject(project.title);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setHoveredProject(null);
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
                  <motion.span 
                    className="font-mango text-8xl md:text-9xl text-gray-200 block leading-none"
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.span>

                  {/* Title */}
                  <motion.h2 
                    className="font-mango text-5xl md:text-7xl lg:text-8xl text-black uppercase leading-none -mt-8 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    {project.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p 
                    className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div 
                    className={`flex flex-wrap gap-3 mb-8 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
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
                  </motion.div>

                  {/* Links */}
                  <motion.div 
                    className={`flex gap-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
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
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-mango text-[40vw] text-black">*</span>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.span 
            className="font-playfair italic text-2xl md:text-3xl text-gray-500 block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Interested in working together?
          </motion.span>
          <motion.h2 
            className="font-mango text-6xl md:text-8xl lg:text-9xl text-black uppercase leading-none mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let&apos;s Talk
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="mailto:rangelkoli@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full text-xl font-medium hover:bg-gray-900 transition-colors duration-300 group"
            >
              <span>Get in Touch</span>
              <FiArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectsPage;
