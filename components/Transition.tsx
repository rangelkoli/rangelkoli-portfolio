"use client";

import { motion, AnimatePresence } from "framer-motion";

const transitionVariants = {
  initial: { y: 40, opacity: 0, scale: 0.98 },
  animate: { y: 0, opacity: 1, scale: 1 },
  exit: { y: -40, opacity: 0, scale: 0.98 },
};

export default function Transition({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={typeof children === "string" ? children : undefined}
        variants={transitionVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 18,
        }}
        style={{ width: "100%" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
