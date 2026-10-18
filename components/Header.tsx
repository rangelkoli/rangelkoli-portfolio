"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const jadynMaria = localFont({
  src: "./JadynMaria.otf",
  display: "swap",
});

const navLogo = "/assets/rangel-navbar-logo-transparent.png";

const BrandMark = ({
  className = 'h-10 w-10',
  sizes = '40px',
}: {
  className?: string;
  sizes?: string;
}) => (
  <span className={`relative flex ${className} shrink-0 items-center justify-center overflow-hidden bg-transparent`}>
    <Image
      src={navLogo}
      alt=''
      fill
      sizes={sizes}
      className='object-cover object-center'
      priority
    />
  </span>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const navBackground = isDark ? "#2A2D36" : "#1A1A1A";

  const themeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

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

  // Keep the header aligned with the same frame as the page content.
  const fixedWidth = "min(calc(100% - 2rem), var(--site-max-width))";

  const smoothEase = [0.4, 0, 0.2, 1] as const;
  const morphDuration = 0.5;

  return (
    <>
      {/* Header container */}
      <motion.header
        initial={false}
        data-loader-box="header"
        style={{ backgroundColor: navBackground }}
        animate={{ 
          top: mobileMenuOpen ? 0 : 24,
          y: 0,
          left: mobileMenuOpen ? 0 : "50%",
          x: mobileMenuOpen ? 0 : "-50%",
          width: mobileMenuOpen ? "100vw" : fixedWidth,
          height: mobileMenuOpen ? "100dvh" : 64,
          borderRadius: mobileMenuOpen ? 0 : 24,
          backgroundColor: navBackground,
        }}
        className="fixed z-50 shadow-2xl"
        transition={{ 
          duration: morphDuration,
          ease: smoothEase,
        }}
      >
        {/* Theme-aware navbar surface */}
        <motion.div 
          className="absolute inset-0"
          initial={false}
          animate={{ 
            backgroundColor: navBackground,
            borderRadius: mobileMenuOpen ? 0 : 24 
          }}
          transition={{ duration: 0.4, ease: smoothEase }}
        />

        {/* Content switcher */}
        <AnimatePresence mode="wait" initial={false}>
          {!mobileMenuOpen ? (
            <motion.div 
              key="closed"
              className="relative z-10 flex h-full items-center justify-between p-0 pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Left: Logo contained within the navbar */}
              <Link
                href='/'
                aria-label='Rangel Koli home'
                data-loader-glyph="brand-icon"
                className='relative z-20 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-lg'
              >
                <Image
                  src={navLogo}
                  alt=''
                  fill
                  sizes='64px'
                  className='object-cover object-center'
                  priority
                />
              </Link>

              {/* Center: Logo */}
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0'>
                <Link href='/' className='group flex items-center gap-2'>
                  <span
                    data-loader-glyph="brand-text"
                    className={`text-2xl font-bold tracking-wide text-[var(--nav-item)] ${jadynMaria.className}`}
                  >
                    Rangel
                  </span>
                </Link>
              </div>

              {/* Right: CTA */}
              <div className='ml-auto flex shrink-0 items-center gap-2'>
                <button
                  type='button'
                  data-theme-toggle
                  onClick={(e) => toggleTheme(e)}
                  aria-label={themeLabel}
                  aria-pressed={isDark}
                  title={themeLabel}
                  className='w-10 h-10 rounded-full border border-transparent bg-[var(--nav-item-surface)] flex items-center justify-center text-[var(--nav-item)] hover:bg-[var(--nav-item-surface-hover)] transition-colors relative overflow-hidden'
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex items-center justify-center"
                      >
                        <FiSun size={17} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex items-center justify-center"
                      >
                        <FiMoon size={17} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <motion.button
                  type='button'
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label='Open menu'
                  title='Open menu'
                  className='theme-accent-button w-10 h-10 rounded-full border border-transparent bg-[var(--accent)] flex items-center justify-center text-on-accent transition-colors hover:brightness-105'
                >
                  <HiMenu size={20} aria-hidden='true' />
                </motion.button>
              </div>
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
                className='mb-12 flex w-full items-start justify-between'
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15, ease: smoothEase }}
              >
                <span
                  className={`pt-1 text-2xl font-bold text-[var(--nav-item)] ${jadynMaria.className}`}
                >
                  Rangel
                </span>
                <div className='flex items-center gap-3'>
                  <button
                    type='button'
                    data-theme-toggle
                    onClick={(e) => toggleTheme(e)}
                    aria-label={themeLabel}
                    aria-pressed={isDark}
                    title={themeLabel}
                    className='w-12 h-12 rounded-full border border-transparent bg-[var(--nav-item-surface)] flex items-center justify-center text-[var(--nav-item)] hover:bg-[var(--nav-item-surface-hover)] transition-colors relative overflow-hidden'
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isDark ? (
                        <motion.div
                          key="sun-mobile"
                          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                          animate={{ rotate: 0, scale: 1, opacity: 1 }}
                          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="flex items-center justify-center"
                        >
                          <FiSun size={19} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon-mobile"
                          initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                          animate={{ rotate: 0, scale: 1, opacity: 1 }}
                          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="flex items-center justify-center"
                        >
                          <FiMoon size={19} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, delay: 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className='w-12 h-12 rounded-full border border-transparent bg-[var(--nav-item-surface)] flex items-center justify-center text-[var(--nav-item)] hover:bg-[var(--nav-item-surface-hover)] transition-colors'
                    aria-label='Close menu'
                  >
                    <IoClose size={28} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Menu Links */}
              <nav className='flex-1 flex flex-col justify-center items-center gap-2 text-center'>
                {[
                  { href: "/", label: "Home" },
                  { href: "/projects", label: "Projects" },
                  { href: "/experience", label: "Experience" },
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
                      className='block w-full text-center text-5xl md:text-8xl font-bold uppercase text-[var(--nav-item)] hover:text-[var(--nav-item-hover)] transition-colors font-mango tracking-wide py-2'
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Menu Footer */}
              <motion.div 
                className='text-center text-[var(--nav-item-muted)] text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <p>New York, USA</p>
                <p className='mt-2'>&copy; {new Date().getFullYear()} Rangel Koli</p>
              </motion.div>

              {/* Avatar: anchored low and left so the menu feels like it is speaking out */}
              <motion.div
                className='fixed bottom-0 left-0'
                initial={{ opacity: 0, x: -18, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.35, delay: 0.25, ease: smoothEase }}
              >
                <Link href='/' aria-label='Rangel Koli home' className='block'>
                  <BrandMark
                    className='h-40 w-40 md:h-48 md:w-48'
                    sizes='(min-width: 768px) 12rem, 10rem'
                  />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
