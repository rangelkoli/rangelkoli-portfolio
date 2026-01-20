"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "@/context/LoaderContext";

const jadynMaria = localFont({
  src: "./JadynMaria.otf",
  display: "swap",
});

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { hasLoaded, progress, shouldMoveUp } = useLoader();

  // Handle Responsive Width Logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Fixed width during loading, scroll-responsive after
  const fixedWidth = isMobile ? "90%" : "700px";

  // Smooth easing curve
  const smoothEase = [0.4, 0, 0.2, 1];
  
  // Container morph duration
  const morphDuration = 0.5;

  return (
    <>
      {/* Header container */}
      <motion.header
        initial={{ 
          top: "50%",
          y: "-50%",
          width: fixedWidth,
          height: 64,
          borderRadius: 50,
        }}
        animate={{ 
          top: mobileMenuOpen ? "50vh" : (shouldMoveUp ? 24 : "50%"),
          y: mobileMenuOpen ? "-50vh" : (shouldMoveUp ? 0 : "-50%"),
          width: mobileMenuOpen ? "100vw" : fixedWidth,
          height: mobileMenuOpen ? "100vh" : 64,
          borderRadius: mobileMenuOpen ? 0 : 50,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 overflow-hidden shadow-2xl"
        transition={{ 
          duration: morphDuration,
          ease: smoothEase,
        }}
      >
        {/* Background - starts light gray, becomes dark after loading */}
        <motion.div 
          className="absolute inset-0"
          initial={{ backgroundColor: '#e8e8e8' }}
          animate={{ 
            backgroundColor: mobileMenuOpen ? '#1a1a1a' : (hasLoaded ? '#1a1a1a' : '#e8e8e8'),
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Progress fill - dark color fills from left to right */}
        <motion.div
          className="absolute top-0 left-0 bottom-0 bg-[#1a1a1a]"
          initial={{ width: 0, borderRadius: 50 }}
          animate={{ 
            opacity: mobileMenuOpen ? 0 : 1,
            width: `${progress}%`,
            borderRadius: mobileMenuOpen ? 0 : 50,
          }}
          transition={{ 
            opacity: { duration: 0.2 },
            width: { duration: 0.1, ease: "linear" },
            borderRadius: { duration: morphDuration, ease: smoothEase },
          }}
        />

        {/* Content switcher */}
        <AnimatePresence mode="wait">
          {!mobileMenuOpen ? (
            <motion.div 
              key="closed"
              className="relative z-10 h-full px-2 py-2 pl-6 pr-2 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Left: Menu Trigger */}
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                className='flex items-center gap-2 hover:text-gray-300 transition-colors flex-shrink-0 text-white'
                animate={{ opacity: hasLoaded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiMenuAlt4 size={20} />
                <span className='text-sm font-medium hidden md:block'>Menu</span>
              </motion.button>

              {/* Center: Logo */}
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0'>
                <Link href='/' className='group'>
                  <span
                    className={`text-2xl font-bold tracking-wide text-white ${jadynMaria.className}`}
                  >
                    Rangel
                  </span>
                </Link>
              </div>

              {/* Right: CTA */}
              <motion.div 
                className='flex items-center gap-2 flex-shrink-0'
                animate={{ opacity: hasLoaded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href='/projects'
                  className='bg-[#D1F8EF] text-[#1a1a1a] px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors whitespace-nowrap'
                >
                  My Work
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="open"
              className='container mx-auto px-6 py-8 h-full flex flex-col relative z-10'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Menu Header */}
              <motion.div 
                className='flex justify-between items-center mb-12 w-full'
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15, ease: smoothEase }}
              >
                <span
                  className={`text-2xl font-bold text-white ${jadynMaria.className}`}
                >
                  Rangel
                </span>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors'
                >
                  <IoClose size={28} />
                </motion.button>
              </motion.div>

              {/* Menu Links */}
              <nav className='flex-1 flex flex-col justify-center items-center gap-2 text-center'>
                {[
                  { href: "/", label: "Home" },
                  { href: "/projects", label: "Projects" },
                  { href: "/#about", label: "About" },
                  { href: "/#contact", label: "Contact" },
                ].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.35,
                      delay: 0.2 + (i * 0.05), 
                      ease: smoothEase,
                    }}
                    className="w-full overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className='block w-full text-center text-5xl md:text-8xl font-bold uppercase text-white hover:text-gray-400 transition-colors font-mango tracking-wide py-2'
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Menu Footer */}
              <motion.div 
                className='text-center text-gray-500 text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p>New York, USA</p>
                <p className='mt-2'>&copy; {new Date().getFullYear()} Rangel Koli</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
