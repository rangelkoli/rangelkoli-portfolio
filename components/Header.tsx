"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check user's preferred color scheme
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.getItem("darkMode") === "true" ||
        (!localStorage.getItem("darkMode") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
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
    <header className='header-section'>
      <nav className='nav'>
        <div
          className='logo'
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          <Link href='/'>
            <span className='logo'>Rangel</span>
          </Link>
        </div>
        <ul className='mr-auto hidden md:flex space-x-4 '>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`relative px-1 py-2 font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400 
                ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-800 "
                }
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 
                after:transition-all after:duration-300 hover:after:w-full`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='btn md:hidden'
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='mobile-menu'>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
