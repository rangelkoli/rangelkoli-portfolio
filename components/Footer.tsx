"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";

const mango = localFont({
  src: "../public/MangoGrotesque/MangoGrotesque-Bold.ttf",
});

const WORDMARK = "rangelkoli";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/rangelkoli" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rangelkoli" },
  { label: "X", href: "https://x.com/rangelkoli" },
];

const linkClass =
  "inline-flex min-h-7 items-center text-[17px] text-[#1A1A1A] transition-colors hover:text-[#0F766E] dark:text-[#F4F5F8] dark:hover:text-[#9FE7D7]";

const Footer = () => {
  const wordRef = useRef<HTMLDivElement>(null);
  // "idle" = visible (no JS / reduced motion), "armed" = waiting below the fold, "in" = risen
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = wordRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="w-screen relative left-1/2 -translate-x-1/2 px-4 mb-4">
      <div
        data-loader-box="footer"
        className="font-[family-name:var(--font-bricolage)] relative overflow-hidden rounded-[32px] bg-white text-[#1A1A1A] dark:bg-[#08090C] dark:text-[#F4F5F8]"
      >
        <div className="mx-auto max-w-[var(--site-max-width)] px-6 pt-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <h2 className="max-w-[16ch] text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[44px]">
                Let&apos;s build something users actually enjoy using.
              </h2>
              <a
                href="mailto:rangelkoli@gmail.com"
                className="group mt-7 inline-flex items-center gap-3 border-b border-[#0F766E]/40 pb-1 text-lg text-[#0F766E] transition-colors hover:border-[#0F766E] dark:border-[#9FE7D7]/40 dark:text-[#9FE7D7] dark:hover:border-[#9FE7D7] md:text-[22px]"
              >
                rangelkoli@gmail.com
                <svg
                  className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-3.5 text-[13px] font-medium text-[#6B6B73] dark:text-[#9A9EAC]">Explore</h3>
                <ul className="grid gap-2.5">
                  {exploreLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3.5 text-[13px] font-medium text-[#6B6B73] dark:text-[#9A9EAC]">Elsewhere</h3>
                <ul className="grid gap-2.5">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mt-14 flex justify-between gap-4 border-t border-black/10 pt-4 text-[13px] text-[#6B6B73] dark:border-white/[0.12] dark:text-[#9A9EAC]">
            <p>Rangel Koli &copy; {year}</p>
            <p>New York, USA</p>
          </div>
        </div>

        {/* Bottom half sits below the card edge on purpose (overflow-hidden crops it) */}
        <div
          ref={wordRef}
          aria-hidden="true"
          className={`${mango.className} pointer-events-auto mt-2 flex select-none justify-center whitespace-nowrap text-[30vw] leading-[0.7] text-[#1A1A1A] dark:text-[#9FE7D7] translate-y-[9vw] md:text-[27vw] md:translate-y-[8vw]`}
        >
          {WORDMARK.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6%] hover:duration-300"
              style={{
                transform: state === "armed" ? "translateY(105%)" : undefined,
                transitionDelay: state === "in" ? `${i * 55}ms` : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
