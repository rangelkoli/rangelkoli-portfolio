"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const AboutSection = () => {
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-mango font-extrabold uppercase text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] leading-[1.1] text-black"
          >
            HEY. I&apos;M RANGEL. A FULL STACK DEVELOPER BASED IN NEW YORK.
          </motion.h2>
        </div>
      </div>

    </section>
  );
};


export default AboutSection;
