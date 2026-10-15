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

  useEffect(() => {
    const preferredTheme = readPreferredTheme();
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

  const toggleTheme = useCallback(
    (event?: React.MouseEvent | MouseEvent) => {
      const nextTheme = theme === "light" ? "dark" : "light";
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

        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = (document as unknown as {
          startViewTransition: (callback: () => void) => {
            ready: Promise<void>;
          };
        }).startViewTransition(() => {
          applyTheme(nextTheme);
          setTheme(nextTheme);
        });

        transition.ready
          .then(() => {
            root.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 550,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          })
          .catch(() => {
            // If animation fails or is canceled, state is already applied.
          });

        return;
      }

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
    [theme]
  );

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
