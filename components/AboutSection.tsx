"use client";

import SectionTitle from "./SectionTitle";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#F4F4F4] text-[#1a1a1a]">
      
      {/* --- HEADER SECTION: Large "ABOUT" title like Projects --- */}
      <div className="px-4 pt-12 md:pt-16">
        <SectionTitle title="About" as="h1" className="mb-0" />
      </div>

      {/* --- CONTENT SECTION: Bio text --- */}
      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 
            className="font-mango font-extrabold text-[6vw] md:text-[5vw] lg:text-[4vw] leading-[1.1] text-black text-balance"
          >
            Hey. I&apos;m Rangel. A Full Stack Developer Based in New York. I've built everything from end-to-end web platforms to AI-powered applications, working across the entire stack with JavaScript, Python, and modern frameworks. Open to freelance projects and full-time opportunities where I can make a meaningful impact.
          </h2>
        </div>
      </div>

    </section>
  );
};


export default AboutSection;
