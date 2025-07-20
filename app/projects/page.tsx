"use client";

import React from "react";
import AllProjects from "@/components/AllProjects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-seashell">
      <Header />
      <div className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4'>
            My Projects
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4'>
            Explore my latest work and creative solutions
          </p>
        </motion.div>
        <AllProjects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
