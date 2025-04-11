"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { projects } from "@/data/projects";

import { Source_Code_Pro } from "next/font/google";

const sourceCodepro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const ProjectsSection = () => {
  // Select 3 featured projects for tabs
  const featuredProjects = projects.slice(0, 3);

  // State to track active project tab and progress
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Track the last time we updated for smooth animation
  const lastUpdateTimeRef = useRef(Date.now());
  // Track if we're manually changing tabs
  const manualChangeRef = useRef(false);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Reset image index when changing tabs
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeTab]);

  // Handle progress animation
  useEffect(() => {
    let animationFrameId: number;
    const totalDuration = 5000; // 5 seconds

    const updateProgress = () => {
      const now = Date.now();
      const delta = now - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = now;

      setProgress((prev) => {
        const newProgress = prev + (delta / totalDuration) * 100;

        // If we've reached 100%, we'll reset in the next useEffect
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Start the animation
    lastUpdateTimeRef.current = Date.now();
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]); // Reset animation when tab changes

  // Auto-rotate tabs every 5 seconds based on progress
  useEffect(() => {
    if (progress >= 100 && !manualChangeRef.current) {
      setActiveTab((prevTab) =>
        prevTab === featuredProjects.length - 1 ? 0 : prevTab + 1
      );
      setProgress(0);
    } else if (manualChangeRef.current) {
      manualChangeRef.current = false;
    }
  }, [progress, featuredProjects.length]);

  // Handle manual tab change
  const handleTabChange = (index: number) => {
    manualChangeRef.current = true;
    setActiveTab(index);
    setProgress(0);
  };

  // Image gallery navigation
  const nextImage = () => {
    setCurrentImageIndex(0); // Always 0 since we have just one image
  };

  const prevImage = () => {
    setCurrentImageIndex(0); // Always 0 since we have just one image
  };

  return (
    <motion.section
      id='projects'
      ref={ref}
      className='pb-24 bg-gray-900 text-white'
      initial='hidden'
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.6,
            staggerChildren: 0.3,
          },
        },
      }}
    >
      <div className='flex items-center justify-center w-full max-w-4xl mx-auto mb-10 pt-10'>
        <div className='flex-grow h-[1px] bg-gradient-to-r from-transparent to-blue-500 max-w-xs'></div>
        <h2
          className={`
          text-4xl font-bold text-center text-white mx-6 ${sourceCodepro.className}`}
        >
          Featured Projects
        </h2>
        <div className='flex-grow h-[1px] bg-gradient-to-l from-transparent to-purple-500 max-w-xs'></div>
      </div>
      {/* Tab Navigation - Full Width */}
      <motion.div
        className='w-full '
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
        }}
      >
        <div className='flex w-full'>
          {featuredProjects.map((project, index) => (
            <div key={index} className='flex-1 flex flex-col'>
              <button
                onClick={() => handleTabChange(index)}
                className={`py-4 font-medium transition-all rounded-none w-full ${
                  activeTab === index
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {project.title}
              </button>

              {/* Individual Progress Bar for each tab */}
              <div className='w-full h-1 bg-gray-800'>
                {activeTab === index && (
                  <motion.div
                    className='h-full bg-gradient-to-r from-blue-600 to-purple-600'
                    style={{ width: `${progress}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className=' mx-auto '>
        {/* Full-Size Project Display */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='bg-gray-800 rounded-xl shadow-2xl overflow-hidden'
          >
            {featuredProjects[activeTab] && (
              <div className='flex flex-col lg:flex-row min-h-[600px] w-full z-10'>
                {/* Image Gallery */}
                <div className='lg:w-1/2 relative bg-black'>
                  {/* Main Image Display */}
                  <div className='relative h-80 lg:h-full flex items-center justify-center'>
                    <AnimatePresence mode='wait'>
                      <motion.img
                        key={activeTab}
                        src={featuredProjects[activeTab].image[0]}
                        alt={featuredProjects[activeTab].title}
                        className='h-full w-full object-contain p-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {/* Navigation arrows - styled for dark theme */}
                    <button
                      onClick={prevImage}
                      className='absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white p-2 rounded-full focus:outline-none transition-colors'
                      aria-label='Previous image'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 19l-7-7 7-7'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-900/80 text-white p-2 rounded-full focus:outline-none transition-colors'
                      aria-label='Next image'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Image Gallery Info Bar */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                    <h3 className='text-xl font-bold text-white'>
                      {featuredProjects[activeTab].title}
                    </h3>
                    <p className='text-gray-300 text-sm'>
                      {featuredProjects[activeTab].technologies?.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Project Details */}
                <div className='lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between bg-gray-800 z-0'>
                  <div>
                    <h3 className='text-3xl font-bold mb-4 text-white bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                      {featuredProjects[activeTab].title}
                    </h3>

                    <p className='text-gray-300 mb-8 text-lg leading-relaxed'>
                      {featuredProjects[activeTab].description}
                    </p>

                    {/* Tech Stack */}
                    <div className='mb-8'>
                      <h4 className='text-lg font-semibold mb-3 text-white'>
                        Technologies Used
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {featuredProjects[activeTab].technologies?.map(
                          (tech, i) => (
                            <span
                              key={i}
                              className='bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm border border-gray-600'
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Key Features - if you want to add this section */}
                    <div className='mb-8'>
                      <h4 className='text-lg font-semibold mb-3 text-white'>
                        Key Features
                      </h4>
                      <ul className='space-y-2 pl-5 list-disc text-gray-300'>
                        <li>Responsive design across all devices</li>
                        <li>Interactive user experience</li>
                        <li>Performance optimized</li>
                        {/* Add more features or generate dynamically if available in your data */}
                      </ul>
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className='flex gap-4 mt-auto'>
                    {featuredProjects[activeTab].demo && (
                      <a
                        href={featuredProjects[activeTab].demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-all shadow-md hover:shadow-lg flex-1 text-center'
                      >
                        View Live Demo
                      </a>
                    )}
                    {featuredProjects[activeTab].github && (
                      <a
                        href={featuredProjects[activeTab].github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-all border border-gray-600 flex-1 text-center'
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className='text-center mt-14'
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.6,
                duration: 0.5,
              },
            },
          }}
        >
          <a
            href='https://github.com/yourusername'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-xl'
          >
            <span>View More on GitHub</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
