import React, { useEffect, useRef } from "react";
import localFont from "next/font/local";

import { animate, createScope } from "animejs";

const myFont = localFont({
  src: "./bueno-regular.otf",
});

const LAYERS = 4;

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    scope.current = createScope({ root: sectionRef }).add(() => {
      // Smooth scroll animation with better easing and reversibility
      const handleScroll = () => {
        if (!sectionRef.current) return;
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress with smoother curve
        const rawProgress = Math.min(Math.max(-rect.top / windowHeight, 0), 1);
        // Use easing function for smoother transition
        const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress); // smoothstep

        // Reversible scaling and opacity
        const scale = 1 + easedProgress * 0.15;
        const opacity = Math.max(1 - easedProgress * 0.8, 0.1);

        animate(section, {
          scale: scale,
          opacity: opacity,
          duration: 100,
          easing: "easeOutQuart",
        });
      };

      // Throttle scroll events for better performance
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", throttledScroll, { passive: true });
      handleScroll(); // Initial call

      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    });

    return () => {
      if (scope.current) {
        scope.current.revert();
      }
    };
  }, []);

  return (
    <section
      id='home'
      ref={sectionRef}
      className={`h-[70vh] mb-48 flex flex-col items-center justify-center relative ${myFont.className}`}
    >
      <div className='absolute w-[400px] h-[200px] md:w-[700px] md:h-[350px] bg-[#a78bfa66] rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-6' />

      {/* Layered text */}
      <div className='relative flex items-center justify-center w-full h-full select-none pointer-events-none'>
        {[...Array(LAYERS)].map((_, index) => (
          <h1
            key={index}
            className={`absolute uppercase text-[250px] outline-[#8082f8] font-bold ${
              index === 0 ? "text-white border-[#8082f8] " : "text-[#8082f8] "
            } text-center mb-4 transition-transform duration-300 ease-out ${
              myFont.className
            }`}
            style={{
              transform: `rotateX(12deg) translateX(${
                index * -3
              }px) translateY(${index * 3}px)`,
              lineHeight: "0.9",
              zIndex: 10 - index,
              textShadow:
                index === 0
                  ? `
          2px 2px 0 #8082f8,
          2px 0 0 #8082f8, 
          -2px 0 0 #8082f8, 
          0 2px 0 #8082f8, 
          0 -2px 0 #8082f8, 
          1px 1px 0 #8082f8, 
          -1px -1px 0 #8082f8, 
          1px -1px 0 #8082f8, 
          -1px 1px 0 #8082f8,
          1px 1px 5px #8082f8
          `
                  : "none",
              WebkitTextStroke: index !== 0 ? "1px #8082f8" : "none",
            }}
          >
            Rangel Koli
          </h1>
        ))}

        <div
          className='absolute w-[400px] h-[200px] md:w-[700px] md:h-[350px] bg-[#a78bfa66] rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          style={{ zIndex: 0 }}
        />

        <h1 className='absolute z-5 pt-3 left-0 uppercase text-[250px] text-white font-bold text-center mb-4 transition-transform duration-300 ease-out'>
          <br />
          <div className='absolute w-screen h-full flex items-center justify-center'>
            {[...Array(LAYERS)].map((_, index) => (
              <h1
                key={index}
                className={`absolute uppercase text-[150px] outline-[#8082f8] font
        bold ${
          index === 0 ? "text-white border-[#8082f8] " : "text-[#8082f8] "
        } text-center mb-4 transition-transform duration-300 ease-out ${
                  myFont.className
                }`}
                style={{
                  transform: `rotateX(12deg) translateX(${
                    index * -3
                  }px) translateY(${index * 3 - 50}px)`,
                  lineHeight: "0.9",
                  zIndex: LAYERS + 1 - index,
                  textShadow:
                    index === 0
                      ? `
        2px 2px 0 #8082f8,
        2px 0 0 #8082f8,
        -2px 0 0 #8082f8,
        0 2px 0 #8082f8,
        0 -2px 0 #8082f8,
        1px 1px 0 #8082f8,
        -1px -1px 0 #8082f8,
        1px -1px 0 #8082f8,
        -1px 1px 0 #8082f8,
        1px 1px 5px #8082f8
        `
                      : "none",
                  WebkitTextStroke: index !== 0 ? "1px #8082f8" : "none",
                }}
              >
                Software Developer
              </h1>
            ))}
          </div>
        </h1>

        {/* SVG overlay */}
        <svg
          className='absolute'
          viewBox='0 0 100 30'
          preserveAspectRatio='none'
          style={{
            width: "80%",
            height: "100%",
            left: "10%",
            top: "0",
            zIndex: LAYERS - 5,
            animation: "rotateUpDown 10s ease-in-out infinite",
          }}
        >
          <path
            d={`
            M 10 15
            A 40 1 0 0 1 90 15
          `}
            fill='none'
            stroke='#9275ff'
            strokeWidth='0.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

        <svg
          className='absolute'
          viewBox='0 0 100 30'
          preserveAspectRatio='none'
          style={{
            width: "80%",
            height: "100%",
            left: "10%",
            top: "0",
            zIndex: 10,
            animation: "rotateUpDown 10s ease-in-out infinite reverse",
          }}
        >
          <path
            d={`
            M 90 15
            A 40 1 0 0 1 10 15
          `}
            fill='none'
            stroke='#9275ff'
            strokeWidth='0.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes rotateUpDown {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
