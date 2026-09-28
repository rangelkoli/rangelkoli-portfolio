"use client";
import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrame: number | undefined;

    function raf(time: number) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    function updateVisibility() {
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
      if (!document.hidden) animationFrame = requestAnimationFrame(raf);
    }

    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
