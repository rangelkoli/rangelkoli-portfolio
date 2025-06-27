"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
      },
    });

    tl.to("#bar", { scaleY: 1.2, duration: 1, ease: "power4.inOut" })
      .to("#bar", { x: 350, duration: 1.2, ease: "power4.inOut" }, "-=0.5")
      .to(
        "#textone",
        {
          clipPath: "polygon(0 0, 92% 0, 85% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=1.2"
      )
      .to("#texttwo", { opacity: 1, duration: 0.2 }, "-=0.6")
      .to("#bar", { x: 0, duration: 1.2, ease: "power4.inOut" })
      .to(
        "#textone",
        {
          clipPath: "polygon(0 0, 15% 0, 8% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=1.2"
      )
      .to("#textone h1", { opacity: 0, duration: 0.2 }, "-=0.6")
      .to("#bar", { x: 350, duration: 1.2, ease: "power4.inOut" })
      .to(
        "#textone",
        {
          clipPath: "polygon(0 0, 92% 0, 85% 100%, 0% 100%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=1.2"
      )
      .to("#bar", { scaleY: 0.2, duration: 1, ease: "power4.inOut" }, "-=0.5");
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className='preloaderOverlay min-h-screen flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-slate-900 via-gray-900 to-black'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute rounded-full opacity-20 animate-pulse bg-white'
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className='relative w-full max-w-5xl h-96 overflow-hidden mx-auto'>
        <div
          id='bar'
          className='absolute top-1/2 left-1/2 w-4 h-96 z-10'
          style={{
            transform:
              "translateY(-50%) translateX(-50%) rotateZ(15deg) scaleY(0.2)",
            transformOrigin: "center",
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
        >
          <div className='w-full h-40 rounded-full transition-all duration-500 relative overflow-hidden bg-gradient-to-b from-white via-gray-100 to-white shadow-lg shadow-white/20'>
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent' />
          </div>
        </div>

        <div
          id='textone'
          className='absolute w-full h-full flex items-center justify-center transition-all duration-[1.2s] ease-out bg-gradient-to-br from-slate-900 via-gray-900 to-black'
          style={{
            clipPath: "polygon(0 0, 15% 0, 8% 100%, 0% 100%)",
            zIndex: 6,
          }}
        >
          <h1
            className='text-9xl font-black italic tracking-wider relative transition-all duration-500 select-none text-white'
            style={{
              fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              perspective: "1000px",
              transformStyle: "preserve-3d",
              textShadow:
                "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)",
            }}
          >
            RANGEL
            <div
              className='absolute w-full h-32 left-0 opacity-40 pointer-events-none blur-sm'
              style={{
                background:
                  "radial-gradient(ellipse, #ffffff 20%, transparent 70%)",
                transform: "translateY(120px) rotateX(-75deg) scale(1.2)",
                transformOrigin: "center top",
              }}
            />
          </h1>
        </div>

        <div
          id='texttwo'
          className='absolute w-full h-full flex items-center justify-center transition-all duration-500 opacity-0'
          style={{
            clipPath: "polygon(0 0, 92% 0, 85% 100%, 0% 100%)",
            zIndex: 4,
          }}
        >
          <h1
            className='text-9xl font-black italic tracking-wider relative transition-all duration-500 select-none text-white'
            style={{
              fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              perspective: "1000px",
              transformStyle: "preserve-3d",
              textShadow:
                "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)",
            }}
          >
            KOLI
            <div
              className='absolute w-full h-32 left-0 opacity-40 pointer-events-none blur-sm'
              style={{
                background:
                  "radial-gradient(ellipse, #ffffff 20%, transparent 70%)",
                transform: "translateY(120px) rotateX(-75deg) scale(1.2)",
                transformOrigin: "center top",
              }}
            />
          </h1>
        </div>
      </div>

      <div className='fixed top-8 left-8 w-16 h-16 border-l-2 border-t-2 opacity-20 transition-colors duration-500 border-white' />
      <div className='fixed top-8 right-8 w-16 h-16 border-r-2 border-t-2 opacity-20 transition-colors duration-500 border-white' />
      <div className='fixed bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 opacity-20 transition-colors duration-500 border-white' />
      <div className='fixed bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 opacity-20 transition-colors duration-500 border-white' />
    </div>
  );
}
