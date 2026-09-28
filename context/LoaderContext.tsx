"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type LoaderPhase = "loading" | "exiting" | "loaded";

interface LoaderContextType {
  phase: LoaderPhase;
  progress: number;
  completeLoaderExit: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const PROGRESS_DURATION_MS = 1500;
const COMPLETE_HOLD_MS = 350;

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number | undefined;
    let completionTimer: number | undefined;
    let cancelled = false;
    const startedAt = window.performance.now();

    const updateProgress = (now: number) => {
      if (cancelled) return;

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

  return (
    <LoaderContext.Provider value={{ phase, progress, completeLoaderExit }}>
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
