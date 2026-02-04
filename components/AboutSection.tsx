"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const bioRef = React.useRef(null);
  const isBioInView = useInView(bioRef, { once: true });

  return (
    <section className="w-full bg-[#F4F4F4] text-[#1a1a1a]">
      
      {/* --- HEADER SECTION: Large "ABOUT" title like Projects --- */}
      <div className="px-4 pt-20 md:pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mango font-extrabold uppercase text-[22vw] leading-[0.85] text-black"
        >
          ABOUT
        </motion.h1>
      </div>

      {/* --- CONTENT SECTION: Bio text --- */}
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            ref={bioRef}
            initial={{ filter: "blur(20px)", opacity: 0 }}
            animate={isBioInView ? { filter: "blur(0px)", opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mango font-extrabold text-[6vw] md:text-[5vw] lg:text-[4vw] leading-[1.1] text-black text-balance"
          >
            Hey. I&apos;m Rangel. A Full Stack Developer Based in New York. I've built everything from end-to-end web platforms to AI-powered applications, working across the entire stack with JavaScript, Python, and modern frameworks. Open to freelance projects and full-time opportunities where I can make a meaningful impact.
          </motion.h2>
        </div>
      </div>

    </section>
  );
};


export default AboutSection;
