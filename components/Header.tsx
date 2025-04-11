"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/public/assets/logo.png";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check user's preferred color scheme
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.getItem("darkMode") === "true" ||
        (!localStorage.getItem("darkMode") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newDarkMode.toString());
      document.documentElement.classList.toggle("dark", newDarkMode);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-white dark:bg-gray-900 shadow-md"
          : "bg-transparent py-4"
      } ${darkMode ? "dark" : ""}`}
    >
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <Link href='/' className='flex items-center'>
          <Image
            src={Logo}
            alt='Logo'
            width={100}
            height={100}
            className='mr-2 transition-transform hover:scale-105'
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-1 py-2 font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400 
                ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-200"
                }
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 
                after:transition-all after:duration-300 hover:after:w-full
              `}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className='p-2 ml-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FiSun className='w-5 h-5 text-yellow-400' />
            ) : (
              <FiMoon className='w-5 h-5 text-gray-700' />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className='flex items-center md:hidden'>
          <button
            onClick={toggleDarkMode}
            className='p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FiSun className='w-5 h-5 text-yellow-400' />
            ) : (
              <FiMoon className='w-5 h-5 text-gray-700' />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? (
              <FiX className='w-6 h-6 text-gray-800 dark:text-white' />
            ) : (
              <FiMenu className='w-6 h-6 text-gray-800 dark:text-white' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-4 transition-all duration-300 ease-in-out'>
          <nav className='flex flex-col space-y-4'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-2 py-2 ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-800 dark:text-gray-200"
                } hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
