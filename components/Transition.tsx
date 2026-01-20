"use client";

import { motion, AnimatePresence } from "framer-motion";

const transitionVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
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
          damping: 20,
        }}
        style={{ width: "100%" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
