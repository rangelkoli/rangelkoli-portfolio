import React, { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";

const Preloader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(1);

  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 1), 12); // ~1.2s total
    } else {
      // Animate out with scroll-to-top effect
      if (loaderRef.current) {
        loaderRef.current.classList.add(styles.scrollUp);
      }
      frame = window.setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.classList.add(styles.hide);
        }
      }, 1000); // match CSS transition duration
    }
    return () => clearTimeout(frame);
  }, [progress]);

  return (
    <div ref={loaderRef} className={styles.preloader}>
      <span
        className={styles.brand}
        style={{
          fontFamily: "bueno, 'Montserrat', 'Segoe UI', Arial, sans-serif",
        }}
      >
        <b>RANGEL KOLI</b>
      </span>
      <span className={styles.progress}>{progress}%</span>
      {/* Font-face is now handled in CSS, no need to inject here */}
    </div>
  );
};

export default Preloader;
