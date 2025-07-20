"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const AllProjects: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});

  const nextImage = (projectIndex: number, totalImages: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectIndex]: (prev[projectIndex] || 0 + 1) % totalImages
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectIndex]: prev[projectIndex] === 0 ? totalImages - 1 : (prev[projectIndex] || 0) - 1
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-8 sm:space-y-12">
        {projects.map((project: Project, index: number) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Project details */}
              <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
                <div>
                  <motion.h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div 
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-medium rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + techIndex * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Links */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                      GitHub
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      Live Demo
                    </motion.a>
                  )}
                </motion.div>
              </div>

              {/* Right side - Image carousel */}
              <div className="lg:w-1/2 relative bg-gray-100 order-1 lg:order-2">
                <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[500px]">
                  {project.image.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: (activeImageIndex[index] || 0) === imageIndex ? 1 : 0 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  ))}
                  
                  {/* Carousel controls */}
                  {project.image.length > 1 && (
                    <>
                      <motion.button
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200"
                        onClick={() => prevImage(index, project.image.length)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </motion.button>
                      
                      <motion.button
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200"
                        onClick={() => nextImage(index, project.image.length)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                      </motion.button>

                      {/* Image indicators */}
                      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                        {project.image.map((_, imageIndex) => (
                          <motion.button
                            key={imageIndex}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${
                              (activeImageIndex[index] || 0) === imageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50'
                            }`}
                            onClick={() => setActiveImageIndex(prev => ({
                              ...prev,
                              [index]: imageIndex
                            }))}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllProjects;
