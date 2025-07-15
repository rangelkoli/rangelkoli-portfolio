"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";

const buenoRegular = localFont({
  src: "./bueno-regular.otf",
  display: "swap",
});

const jadynMaria = localFont({
  src: "./JadynMaria.otf",
  display: "swap",
});

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check user's preferred color scheme

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

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle anchor links on the same page
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL without reloading the page
        window.history.pushState(null, "", href);

        // Close mobile menu if open
        setMobileMenuOpen(false);
      }
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`${
        buenoRegular.className
      } fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#fff5ee]/90  border-b" : "bg-[#fff5ee]"
      }`}
    >
      <nav className='w-full px-6 sm:px-8 lg:px-12 xl:px-16 justify-between flex'>
        <div className='flex items-center justify-between h-12 md:h-12 w-full'>
          {/* Logo - Left Side */}
          <div className='flex items-center'>
            <Link href='/' className='group flex items-center space-x-2'>
              <span
                className={`text-2xl md:text-3xl lg:text-4xl font-bold text-black transform transition-transform duration-200 group-hover:scale-105 ${jadynMaria.className}`}
              >
                Rangel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className='hidden md:flex items-center space-x-6 lg:space-x-8 z-51'>
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`relative px-3 py-2 text-base lg:text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 
                ${
                  pathname === link.href
                    ? "text-[#8082f8]"
                    : "text-black hover:text-gray-700"
                }
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black
                after:transition-all after:duration-300 hover:after:w-full
                ${pathname === link.href ? "" : ""}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Right Side */}
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-gray-200/80 focus:outline-none focus:ring-2 focus:ring-gray-400'
              aria-label='Toggle menu'
            >
              <div className='relative w-6 h-6'>
                <span
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-45 translate-y-0"
                      : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
                    mobileMenuOpen
                      ? "-rotate-45 translate-y-0"
                      : "translate-y-2"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-[#fff5ee]/95 text-black shadow-lg border-b border-gray-200/20 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className='px-6 py-8 space-y-6'>
          {navLinks.map((link, index) => (
            <div
              key={link.href}
              className={`transform transition-all duration-300 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              <Link
                href={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href);
                  setMobileMenuOpen(false);
                }}
                className={`block px-6 py-4 rounded-xl text-xl font-medium transition-all duration-200 transform hover:scale-105 hover:translate-x-2
                ${
                  pathname === link.href
                    ? "text-[#8082f8] bg-gray-200/50"
                    : "text-black hover:text-gray-700 hover:bg-gray-100/50"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/10 -z-10'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
