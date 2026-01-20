"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "@/context/LoaderContext";

const Loader = () => {
  const { isLoading } = useLoader();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[90] bg-seashell pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default Loader;
