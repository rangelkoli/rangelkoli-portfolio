"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DiniSurface from "./DiniSurface";
import { motion } from "framer-motion"; // You'll need to install framer-motion

interface AnimatedHeaderProps {
  showReel?: boolean;
  onReelToggle?: () => void;
}

const AnimatedHeader = ({ showReel, onReelToggle }: AnimatedHeaderProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const headings = [
    "Web Developer",
    "UI/UX Designer",
    "Tech Enthusiast",
    "Open Source Contributor",
  ];

  useEffect(() => {
    // Text cycling
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % headings.length);
    }, 3000);

    return () => {
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section className='relative min-h-[100vh] w-full overflow-hidden pt-24 snap-start bg-gradient-to-b from-gray-900/70 to-black'>
      {/* Dini Surface Background with enhanced visual settings */}
      <div className='absolute inset-0 z-0'>
        <DiniSurface
          showControls={false}
          className='w-full h-full'
          rotationSpeed={0.0035}
          isBackground={true}
        />
      </div>

      {/* Enhanced gradient overlay with more depth */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-1'></div>

      {/* Accent color elements */}
      <div className='absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-70'></div>
      <div className='absolute top-0 right-0 w-1/3 h-1 bg-gradient-to-l from-purple-500 to-blue-500 opacity-70'></div>

      {/* Content with highest z-index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 px-8 py-20 flex flex-col items-center max-w-4xl mx-auto'
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='text-sm font-medium text-blue-400 mb-2 tracking-wider uppercase text-center'
        >
          Hello World, I am
        </motion.span>

        <h1 className='text-5xl sm:text-6xl font-bold mb-6 text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]'>
          <div className='h-[142px] overflow-hidden w-full'>
            <div className='cycle-text relative w-full text-center'>
              {headings.map((heading, index) => (
                <span
                  key={index}
                  className={`inline-block transform transition-all duration-700 ease-in-out ${
                    currentTextIndex === index
                      ? "translate-y-0 opacity-100"
                      : index < currentTextIndex ||
                        (currentTextIndex === 0 &&
                          index === headings.length - 1)
                      ? "translate-y-[-100%] opacity-0"
                      : "translate-y-[100%] opacity-0"
                  } ${index !== 0 ? "absolute top-0 left-0 w-full" : ""}`}
                >
                  {heading}
                </span>
              ))}
            </div>
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='text-lg sm:text-xl mb-10 text-center'
        >
          <p className='max-w-lg text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mx-auto'>
            Unleashing creative solutions through code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className='flex flex-row items-center justify-center mt-4'
        >
          <Image
            src='/assets/icons/tech-stack.svg'
            alt='Tech stack icons'
            width={200}
            height={40}
            className='mb-8 hover:scale-105 transition-transform duration-300'
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className='mt-4 relative flex justify-center w-full'
        >
          <button
            onClick={onReelToggle}
            className='group relative flex items-center justify-center px-8 py-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:scale-105'
          >
            <span className='relative z-10 mr-2 font-medium'>Play Reel</span>
            <span className='relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors'>
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='text-white'
              >
                <path d='M8 5V19L19 12L8 5Z' fill='currentColor' />
              </svg>
            </span>
            <span className='absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className='absolute left-6 bottom-10 hidden lg:block'
      >
        <div className='flex flex-col items-center'>
          <div className='w-[1px] h-32 bg-gradient-to-b from-transparent via-gray-400 to-gray-300 mb-4'></div>
          <div className='rotate-90 text-xs tracking-widest mb-8 text-gray-300 font-light'>
            SCROLL
          </div>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className='absolute right-6 bottom-10 hidden lg:flex flex-col items-end'
      >
        <div className='flex space-x-5 mb-4'>
          <motion.a
            href='https://github.com/rangelkoli'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200'
            aria-label='GitHub'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </motion.a>
          <motion.a
            href='https://linkedin.com/in/rangelkoli'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200'
            aria-label='LinkedIn'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
            </svg>
          </motion.a>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='relative w-full h-full'>
          <div className='absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-gray-400/30'></div>
          <div className='absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-gray-400/30'></div>
          <div className='absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-gray-400/30'></div>
          <div className='absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-gray-400/30'></div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeader;
