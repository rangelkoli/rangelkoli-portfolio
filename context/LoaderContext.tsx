"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LoaderPhase = "loading" | "exiting" | "loaded";

interface LoaderContextType {
  phase: LoaderPhase;
  progress: number;
  completeLoaderExit: () => void;
  // Keeps the loader up until the returned release() is called.
  holdLoader: () => () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const PROGRESS_DURATION_MS = 1500;
const COMPLETE_HOLD_MS = 350;
const HELD_PROGRESS = 0.9;
// ponytail: never trap the page behind a slow API or stuck media
const MAX_HOLD_MS = 8000;

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [progress, setProgress] = useState(0);
  const holdsRef = useRef(0);

  useEffect(() => {
    let animationFrame: number | undefined;
    let completionTimer: number | undefined;
    let cancelled = false;
    const firstFrameAt = window.performance.now();
    let startedAt = firstFrameAt;

    const updateProgress = (now: number) => {
      if (cancelled) return;

      const held =
        holdsRef.current > 0 && now - firstFrameAt < MAX_HOLD_MS;
      // While held, park at 90% by sliding the start time forward.
      if (held && now - startedAt > HELD_PROGRESS * PROGRESS_DURATION_MS) {
        startedAt = now - HELD_PROGRESS * PROGRESS_DURATION_MS;
      }

      const fraction = Math.min((now - startedAt) / PROGRESS_DURATION_MS, 1);
      setProgress(fraction * 100);

      if (fraction < 1) {
        animationFrame = window.requestAnimationFrame(updateProgress);
        return;
      }

      completionTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("exiting");
      }, COMPLETE_HOLD_MS);
    };

    animationFrame = window.requestAnimationFrame(updateProgress);

    return () => {
      cancelled = true;
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (completionTimer !== undefined) {
        window.clearTimeout(completionTimer);
      }
    };
  }, []);

  const completeLoaderExit = useCallback(() => {
    setPhase("loaded");
  }, []);

  const holdLoader = useCallback(() => {
    holdsRef.current += 1;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      holdsRef.current -= 1;
    };
  }, []);

  // Hold for media in the first viewport so the loader reveals a finished page.
  useEffect(() => {
    const media = document.querySelectorAll<HTMLImageElement | HTMLVideoElement>(
      "img, video"
    );
    const releases = Array.from(media, (element) => {
      const rect = element.getBoundingClientRect();
      const onScreen =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth;
      if (!onScreen) return undefined;

      const isImage = element instanceof HTMLImageElement;
      const ready = isImage
        ? element.complete
        : // preload="none" videos won't fetch until played, so don't wait on them
          element.readyState >= 2 ||
          (element.preload === "none" && !element.autoplay);
      if (ready) return undefined;

      const release = holdLoader();
      element.addEventListener(isImage ? "load" : "loadeddata", release, {
        once: true,
      });
      element.addEventListener("error", release, { once: true });
      return release;
    });

    return () => releases.forEach((release) => release?.());
  }, [holdLoader]);

  return (
    <LoaderContext.Provider
      value={{ phase, progress, completeLoaderExit, holdLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
