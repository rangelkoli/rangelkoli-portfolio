"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLoader, useLoaderProgress } from "@/context/LoaderContext";
import styles from "./Loader.module.css";

const Loader = () => {
  const { phase, completeLoaderExit } = useLoader();
  const progress = useLoaderProgress();
  const prefersReducedMotion = useReducedMotion();
  const mirrorLayerRef = useRef<HTMLDivElement>(null);
  const mirrorNodesRef = useRef(new Map<HTMLElement, HTMLElement>());

  useLayoutEffect(() => {
    const mirrorNodes = mirrorNodesRef.current;

    if (phase === "loaded") {
      mirrorNodes.forEach((mirror) => mirror.remove());
      mirrorNodes.clear();
      return;
    }

    const mirrorLayer = mirrorLayerRef.current;
    if (!mirrorLayer) return;

    let scheduledFrame: number | undefined;
    let cancelled = false;

    // Sweep top-to-bottom so the blueprint draws in reading order.
    const revealDelay = (top: number) =>
      `${(Math.min(Math.max(top / window.innerHeight, 0), 1) * 0.32).toFixed(3)}s`;

    const visibleRect = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const computed = window.getComputedStyle(element);

      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth &&
        computed.display !== "none" &&
        computed.visibility !== "hidden"
      ) {
        return rect;
      }

      return null;
    };

    const textContentRect = (element: HTMLElement) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const rects = range.getClientRects();
      let left = Infinity;
      let top = Infinity;
      let right = -Infinity;
      let bottom = -Infinity;

      for (let index = 0; index < rects.length; index += 1) {
        const rect = rects[index];
        if (rect.width < 1 || rect.height < 1) continue;
        left = Math.min(left, rect.left);
        top = Math.min(top, rect.top);
        right = Math.max(right, rect.right);
        bottom = Math.max(bottom, rect.bottom);
      }

      if (!Number.isFinite(left)) return null;
      return { left, top, width: right - left, height: bottom - top, right };
    };

    const setStyle = (
      element: HTMLElement,
      property: string,
      value: string
    ) => {
      if (element.style.getPropertyValue(property) !== value) {
        element.style.setProperty(property, value);
      }
    };

    const syncPageOutline = () => {
      if (cancelled) return;

      const activeSources = new Set<HTMLElement>();
      const frames = document.querySelectorAll<HTMLElement>(
        "[data-loader-box], [data-loader-media], main img, main video"
      );

      frames.forEach((element) => {
        if (
          (element.tagName === "IMG" || element.tagName === "VIDEO") &&
          element.closest("[data-loader-media]")
        ) {
          return;
        }

        const source =
          element.tagName === "IMG" || element.tagName === "VIDEO"
            ? element.parentElement ?? element
            : element;
        const rect = visibleRect(source);
        if (!rect) return;

        const computed = window.getComputedStyle(source);
        const isMedia =
          source.hasAttribute("data-loader-media") ||
          element.tagName === "IMG" ||
          element.tagName === "VIDEO";
        const frameClass = isMedia
          ? `${styles.mirrorFrame} ${styles.mirrorMedia}`
          : styles.mirrorFrame;
        let frame = mirrorNodes.get(source);

        if (!frame) {
          frame = document.createElement("div");
          frame.className = frameClass;
          frame.setAttribute("aria-hidden", "true");
          frame.style.animationDelay = revealDelay(rect.top);
          mirrorLayer.append(frame);
          mirrorNodes.set(source, frame);
        } else if (frame.className !== frameClass) {
          frame.className = frameClass;
        }

        activeSources.add(source);
        setStyle(frame, "left", `${rect.left}px`);
        setStyle(frame, "top", `${rect.top}px`);
        setStyle(frame, "width", `${rect.width}px`);
        setStyle(frame, "height", `${rect.height}px`);
        setStyle(frame, "border-radius", computed.borderRadius);
      });

      const textElements = document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main p, main span, main a, header span, header a"
      );

      textElements.forEach((source) => {
        const tag = source.tagName.toLowerCase();
        const enclosingAnchor = source.closest("a");
        const simpleAnchor = Boolean(
          enclosingAnchor &&
            !enclosingAnchor.querySelector("div, h1, h2, h3, p, img, video")
        );
        const isInsideTextBlock = Boolean(
          source.parentElement?.closest("h1, h2, h3, p")
        );
        const rect = visibleRect(source);

        if (
          !source.textContent?.trim() ||
          source.closest('[aria-hidden="true"], .sr-only') ||
          source.closest("[data-loader-box], [data-loader-media]") ||
          (tag === "span" && source.children.length > 0) ||
          (tag === "span" && simpleAnchor) ||
          (tag === "a" && source.querySelector("div, h1, h2, h3, p, img, video")) ||
          (tag === "span" && isInsideTextBlock) ||
          !rect
        ) {
          return;
        }

        let frame = mirrorNodes.get(source);

        if (!frame) {
          frame = document.createElement("div");
          frame.className = `${styles.mirrorFrame} ${styles.mirrorText}`;
          frame.setAttribute("aria-hidden", "true");
          frame.style.animationDelay = revealDelay(rect.top);
          mirrorLayer.append(frame);
          mirrorNodes.set(source, frame);
        } else if (
          frame.className !== `${styles.mirrorFrame} ${styles.mirrorText}`
        ) {
          frame.className = `${styles.mirrorFrame} ${styles.mirrorText}`;
        }

        const textRect = textContentRect(source);
        const pad = 4;
        const targetWidth = textRect
          ? Math.max(
              pad * 2,
              Math.min(rect.width, textRect.right - rect.left + pad)
            )
          : rect.width;

        activeSources.add(source);
        setStyle(frame, "left", `${rect.left}px`);
        setStyle(frame, "top", `${rect.top}px`);
        setStyle(frame, "height", `${rect.height}px`);
        setStyle(frame, "width", `${targetWidth}px`);
      });

      const glyphs = document.querySelectorAll<HTMLElement>(
        "header [data-loader-glyph]"
      );

      glyphs.forEach((source) => {
        if (source.closest(`.${styles.mirrorLayer}`)) return;

        const rect = visibleRect(source);
        if (!rect) return;

        const computed = window.getComputedStyle(source);
        let glyph = mirrorNodes.get(source);

        if (!glyph) {
          glyph = source.cloneNode(true) as HTMLElement;
          glyph.classList.add(styles.mirrorGlyph);
          glyph.setAttribute("aria-hidden", "true");
          glyph.removeAttribute("data-loader-glyph");
          glyph.querySelectorAll("[data-loader-glyph]").forEach((element) => {
            element.removeAttribute("data-loader-glyph");
          });
          glyph.removeAttribute("id");
          glyph.removeAttribute("href");
          glyph.removeAttribute("target");
          glyph.removeAttribute("rel");
          glyph.querySelectorAll("[id]").forEach((element) => {
            element.removeAttribute("id");
          });
          glyph.querySelectorAll("a, button, [tabindex]").forEach((element) => {
            element.removeAttribute("href");
            element.removeAttribute("target");
            element.removeAttribute("rel");
            element.removeAttribute("tabindex");
          });
          glyph.style.animationDelay = revealDelay(rect.top);
          mirrorLayer.append(glyph);
          mirrorNodes.set(source, glyph);
        }

        activeSources.add(source);
        setStyle(glyph, "position", "fixed");
        setStyle(
          glyph,
          "display",
          computed.display === "inline" ? "inline-block" : computed.display
        );
        setStyle(glyph, "left", `${rect.left}px`);
        setStyle(glyph, "top", `${rect.top}px`);
        setStyle(glyph, "width", `${rect.width}px`);
        setStyle(glyph, "height", `${rect.height}px`);
        setStyle(glyph, "margin", "0");
        setStyle(glyph, "box-sizing", "border-box");
        setStyle(glyph, "overflow", "hidden");
        setStyle(glyph, "border-radius", computed.borderRadius);
        setStyle(glyph, "font-family", computed.fontFamily);
        setStyle(glyph, "font-size", computed.fontSize);
        setStyle(glyph, "font-weight", computed.fontWeight);
        setStyle(glyph, "font-style", computed.fontStyle);
        setStyle(glyph, "letter-spacing", computed.letterSpacing);
        setStyle(glyph, "line-height", computed.lineHeight);
        setStyle(glyph, "text-align", computed.textAlign);
        setStyle(glyph, "pointer-events", "none");
        setStyle(glyph, "transform", "none");
        setStyle(glyph, "translate", "none");
      });

      mirrorNodes.forEach((mirror, source) => {
        if (!activeSources.has(source)) {
          mirror.remove();
          mirrorNodes.delete(source);
        }
      });
    };

    // Re-measure only when layout can actually move (fonts, media, resize,
    // scroll), coalesced to one pass per frame instead of polling every frame.
    const scheduleSync = () => {
      if (scheduledFrame !== undefined) return;
      scheduledFrame = window.requestAnimationFrame(() => {
        scheduledFrame = undefined;
        syncPageOutline();
      });
    };

    syncPageOutline();
    document.fonts?.ready.then(scheduleSync);

    const resizeObserver = new ResizeObserver(scheduleSync);
    document
      .querySelectorAll("main, header, [data-loader-box], [data-loader-media]")
      .forEach((element) => resizeObserver.observe(element));
    // load/error don't bubble, so listen in the capture phase.
    document.addEventListener("load", scheduleSync, true);
    document.addEventListener("error", scheduleSync, true);
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("scroll", scheduleSync, { passive: true });

    return () => {
      cancelled = true;
      if (scheduledFrame !== undefined) {
        window.cancelAnimationFrame(scheduledFrame);
      }
      resizeObserver.disconnect();
      document.removeEventListener("load", scheduleSync, true);
      document.removeEventListener("error", scheduleSync, true);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("scroll", scheduleSync);
    };
  }, [phase]);

  return (
    <AnimatePresence onExitComplete={completeLoaderExit}>
      {phase === "loading" && (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0.22, 0.8, 0.24, 1],
          }}
          className={styles.loader}
          aria-hidden="true"
        >
          <div className={styles.grid} />
          <div className={styles.guides} />
          <div className={styles.rulerTop} />
          <div className={styles.rulerLeft} />
          <div ref={mirrorLayerRef} className={styles.mirrorLayer} />

          <div className={styles.progressRule} />
          <div className={styles.progressReadout}>{Math.round(progress)}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
