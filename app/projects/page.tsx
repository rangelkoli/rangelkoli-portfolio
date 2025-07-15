"use client";

import React from "react";
import AllProjects from "@/components/AllProjects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div>
      <div className='container mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold text-center mb-12'>All Projects</h1>
        <AllProjects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
