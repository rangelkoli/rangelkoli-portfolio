"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  hasLoaded: boolean;
  progress: number; // 0 to 100
  shouldMoveUp: boolean; // navbar should move to top
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldMoveUp, setShouldMoveUp] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      // Skip loader on subsequent visits in the same session
      setProgress(100);
      setShouldMoveUp(true);
      setIsLoading(false);
      setHasLoaded(true);
    } else {
      // Animate progress from 0 to 100 over 1.5 seconds
      const duration = 1500;
      const startTime = Date.now();
      
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(newProgress);
        
        if (newProgress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          // Immediately move navbar to top
          setShouldMoveUp(true);
          
          // Hide loader after navbar moves
          setTimeout(() => {
            setIsLoading(false);
            setHasLoaded(true);
            sessionStorage.setItem("hasVisited", "true");
          }, 500);
        }
      };
      
      requestAnimationFrame(updateProgress);
    }
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, hasLoaded, progress, shouldMoveUp }}>
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
