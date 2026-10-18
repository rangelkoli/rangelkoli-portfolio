"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
};

const THEME_STORAGE_KEY = "rangel-portfolio-theme";
const THEME_TRANSITION_DURATION_MS = 500;
const WAVE_DURATION_MS = 550;
const MIN_WAVE_DURATION_MS = 200;
const MAX_QUEUED_WAVES = 4;

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

const readStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

const readDocumentTheme = (): Theme | null => {
  if (typeof document === "undefined") return null;

  const documentTheme = document.documentElement.dataset.theme ?? null;
  return isTheme(documentTheme) ? documentTheme : null;
};

const readPreferredTheme = (): Theme => {
  const storedTheme = readStoredTheme();
  if (storedTheme) return storedTheme;

  const documentTheme = readDocumentTheme();
  if (documentTheme) return documentTheme;

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);
  const transitionTimeout = useRef<number | NodeJS.Timeout | null>(null);
  // Source of truth for rapid toggles; state lags behind async view transitions.
  const themeRef = useRef<Theme>("light");
  const activeTransition = useRef<unknown>(null);
  const waveQueue = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const preferredTheme = readPreferredTheme();
    themeRef.current = preferredTheme;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read must wait until after hydration
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    applyTheme(theme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme changes still work when storage is unavailable.
    }
  }, [isReady, theme]);

  // Waves play one after another: starting a view transition while another is
  // still animating crashes some Chromium builds (Electron 44 / Chrome 152).
  const playNextWave = useCallback(function playWave() {
    const point = waveQueue.current.shift();
    if (!point) {
      activeTransition.current = null;
      return;
    }

    const nextTheme = themeRef.current === "light" ? "dark" : "light";
    themeRef.current = nextTheme;

    const { x, y } = point;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    // Speed up while clicks are queued so spamming keeps pace.
    const duration = Math.max(
      MIN_WAVE_DURATION_MS,
      WAVE_DURATION_MS / (1 + waveQueue.current.length)
    );

    const transition = (document as unknown as {
      startViewTransition: (callback: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    }).startViewTransition(() => {
      applyTheme(nextTheme);
      setTheme(nextTheme);
    });

    activeTransition.current = transition;

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // If animation fails or is canceled, state is already applied.
      });

    transition.finished.then(playWave, playWave);
  }, []);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | MouseEvent) => {
      const root = document.documentElement;

      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
        transitionTimeout.current = null;
      }

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Use modern View Transitions API if supported and motion is not reduced
      const hasViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        !prefersReducedMotion;

      if (hasViewTransition) {
        root.classList.remove("theme-transitioning");

        let x = window.innerWidth / 2;
        let y = 0;

        if (
          event &&
          event.clientX !== undefined &&
          event.clientY !== undefined &&
          (event.clientX !== 0 || event.clientY !== 0)
        ) {
          x = event.clientX;
          y = event.clientY;
        } else {
          const toggleBtn = document.querySelector<HTMLElement>(
            'button[aria-label*="theme" i], button[title*="theme" i]'
          );
          if (toggleBtn) {
            const rect = toggleBtn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
          }
        }

        // ponytail: clicks beyond the cap are dropped so the queue never lags far behind.
        if (waveQueue.current.length < MAX_QUEUED_WAVES) {
          waveQueue.current.push({ x, y });
        }
        if (!activeTransition.current) playNextWave();
        return;
      }

      const nextTheme = themeRef.current === "light" ? "dark" : "light";
      themeRef.current = nextTheme;

      // Smooth CSS transition fallback
      if (prefersReducedMotion) {
        root.classList.remove("theme-transitioning");
      } else {
        root.classList.add("theme-transitioning");
        transitionTimeout.current = window.setTimeout(() => {
          root.classList.remove("theme-transitioning");
          transitionTimeout.current = null;
        }, THEME_TRANSITION_DURATION_MS);
      }

      applyTheme(nextTheme);
      setTheme(nextTheme);
    },
    [playNextWave]
  );

  // During a view transition the browser hit-tests every click to <html>,
  // so clicks on the toggle are routed back here by position.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!activeTransition.current || event.target !== document.documentElement) return;

      const hitToggle = Array.from(
        document.querySelectorAll<HTMLElement>("[data-theme-toggle]")
      ).some((toggle) => {
        const rect = toggle.getBoundingClientRect();
        return (
          rect.width > 0 &&
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        );
      });

      if (hitToggle) toggleTheme(event);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [toggleTheme]);

  useEffect(
    () => () => {
      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
        document.documentElement.classList.remove("theme-transitioning");
      }
    },
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
}
