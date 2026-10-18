"use client";

import { SiPython, SiReact, SiTypescript } from "react-icons/si";
import GithubContributions from "./GithubContributions";

const stackIcon = "inline-block align-[-0.125em] mx-0.5";

const HeroSection = () => {
  return (
    <section
      id="about"
      className="w-full flex flex-col px-4 pt-36 sm:pt-44 md:pt-52 lg:pt-56 pb-0"
    >
      <div className="w-full">
        {/* Heading + Bio (constrained) */}
        <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1 className="font-instrument font-normal text-[32px] sm:text-[38px] md:text-[44px] leading-[1.25] tracking-[-0.02em] text-[#1A1A1A] dark:text-[#F4F4F4]">
          I&apos;m Rangel, a software developer <br className="hidden sm:inline" />
          based in New York.
        </h1>

        {/* Bio Paragraph */}
        <p className="mt-6 font-instrument font-normal text-[16px] sm:text-[18px] leading-[1.65] tracking-[-0.01em] text-[#6B6B69] dark:text-[#9E9E9C] max-w-2xl">
          I build web and mobile apps end to end, from the UI down to the database. I care about interfaces that feel fast and backends that stay boring under load. Mostly in{" "}
          <SiTypescript className={stackIcon} color="#3178C6" role="img" aria-label="TypeScript" />{" "}
          <SiReact className={stackIcon} color="#61DAFB" role="img" aria-label="React" />{" "}
          <SiPython className={stackIcon} color="#3776AB" role="img" aria-label="Python" />. Open to freelance work and full-time roles.
        </p>
        </div>

        {/* GitHub Contributions Activity (full width) */}
        <GithubContributions />
      </div>
    </section>
  );
};

export default HeroSection;
