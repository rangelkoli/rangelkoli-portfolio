"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
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

const AllProjects: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<{
    [key: number]: number;
  }>({});

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
    <motion.div
      className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    >
      <div className='space-y-8 sm:space-y-12'>
        {projects.map((project: Project, index: number) => (
          <motion.div
            key={index}
            className='bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300'
            whileHover={{
              y: -4,
              transition: { duration: 0.3 },
            }}
          >
            <div className='flex flex-col lg:flex-row'>
              {/* Left side - Project details */}
              <div className='flex-1 p-6 sm:p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1'>
                <div>
                  <h3
                    className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6'
                  >
                    {project.title}
                  </h3>

                  <p
                    className='text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-5 sm:mb-8 text-justify'
                  >
                    {project.description}
                  </p>

                  <div
                    className='mb-7 sm:mb-10'
                  >
                    <h4 className='text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 uppercase tracking-wide'>
                      Tech Stack
                    </h4>
                    <div className='flex flex-wrap gap-3 sm:gap-4'>
                      {project.technologies
                        .filter((tech) => tech.trim())
                        .map((tech, techIndex) => {
                          const IconComponent = techIconMap[tech];
                          return (
                            <motion.div
                              key={techIndex}
                              className='flex items-center gap-2 px-4 sm:px-5 py-2 bg-blue-100 text-blue-800 text-base sm:text-lg font-semibold rounded-full shadow-sm'
                              whileHover={{ scale: 1.05 }}
                            >
                              {IconComponent &&
                                React.createElement(IconComponent, {
                                  className: "w-5 h-5",
                                })}
                              <span>{tech}</span>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  {project.features && (
                    <div
                      className='mb-6 sm:mb-8'
                    >
                      <h4 className='text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide'>
                        Key Features
                      </h4>
                      <ul className='grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600'>
                        {project.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='flex items-center gap-2 text-sm sm:text-base'
                          >
                            <span className='w-1.5 h-1.5 bg-blue-600 rounded-full'></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Project Links */}
                <div
                  className='flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-gray-100'
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub className='w-5 h-5' />
                      <span>Code</span>
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink className='w-5 h-5' />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Right side - Image Carousel */}
              <div className='flex-1 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-gray-50 order-1 lg:order-2'>
                {project.image.length > 0 ? (
                  <>
                    <div
                      className='relative w-full h-full'
                    >
                      <Image
                        src={
                          project.image[activeImageIndex[index] || 0] ||
                          project.image[0]
                        }
                        alt={`${project.title} screenshot`}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>

                    {/* Carousel navigation buttons */}
                    {project.image.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            prevImage(index, project.image.length)
                          }
                          className='absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors shadow-lg backdrop-blur-sm'
                          aria-label='Previous image'
                        >
                          <FiChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
                        </button>
                        <button
                          onClick={() =>
                            nextImage(index, project.image.length)
                          }
                          className='absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors shadow-lg backdrop-blur-sm'
                          aria-label='Next image'
                        >
                          <FiChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
                        </button>

                        {/* Image indicators */}
                        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                          {project.image.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() =>
                                setActiveImageIndex((prev) => ({
                                  ...prev,
                                  [index]: imgIndex,
                                }))
                              }
                              className={`w-2 h-2 rounded-full transition-all ${
                                (activeImageIndex[index] || 0) === imgIndex
                                  ? "bg-blue-600 w-4"
                                  : "bg-white/60 hover:bg-white"
                              }`}
                              aria-label={`Go to image ${imgIndex + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-400'>
                    <span>No preview available</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllProjects;
