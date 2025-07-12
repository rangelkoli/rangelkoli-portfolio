"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import gsap from "./gsap"; // Using the project's configured GSAP instance
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileImage from "./profile.jpg"; // Adjust the import path as necessary
gsap.registerPlugin(ScrollTrigger);
import localFont from "next/font/local";

const bueno_regular = localFont({
  src: "./bueno-regular.otf", // Ensure the path is correct relative to your project structure
  display: "swap",
});
const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(textRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (section && image) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%", // Adjusted start position to trigger earlier
          // Adjusted start position to trigger earlier
          end: "bottom bottom",
          scrub: 1,
          markers: false,
        },
      });

      tl.to(image, {
        x: "-50%", // Move to the left of the screen
        y: "100%",
        width: "35vw",
        height: "45vh",
        borderRadius: "20px",
        scale: 1.2,
        opacity: 1,
        ease: "power2.inOut",
        duration: 1.5,
        rotate: 0,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <section
      id='about'
      ref={sectionRef}
      className='h-screen w-screen relative overflow-hidden bg-background'
    >
      <div className='relative w-full h-full flex flex-col justify-between'>
        <div className='relative w-full h-1/2 flex items-center justify-center'>
          <motion.div
            ref={imageRef}
            className='absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-lg overflow-hidden shadow-lg'
            initial={{
              x: "60%",
              y: "-40%",
              scale: 0.5,
              opacity: 0.5,
              rotate: 5,
            }}
          >
            <Image
              src={ProfileImage}
              alt='Background image'
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
            ref={textRef}
            initial='hidden'
            animate={isInView ? "visible" : "hidden"}
            className='relative z-10 max-w-6xl p-4 sm:p-8 text-center'
          >
            {[
              "Hi, I'm Rangel Koli.",
              "I don't just build websites. I architect experiences.",
            ].map((line, index) => (
              <motion.h2
                key={index}
                custom={index}
                variants={textVariants}
                className={`uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-loose text-black font-bold ${bueno_regular.className}`}
                style={{ lineHeight: "1.0" }}
              >
                {line
                  .split(/(Rangel Koli|websites|architect experiences)/i)
                  .map((segment, segmentIndex) => (
                    <motion.span
                      key={segmentIndex}
                      style={{
                        backgroundColor: [
                          "Rangel Koli",
                          "websites",
                          "architect experiences",
                        ].includes(segment.trim())
                          ? "#6b46c1"
                          : "transparent",
                        color: [
                          "Rangel Koli",
                          "websites",
                          "architect experiences",
                        ].includes(segment.trim())
                          ? "#ffffff"
                          : "inherit",
                        padding: [
                          "Rangel Koli",
                          "websites",
                          "architect experiences",
                        ].includes(segment.trim())
                          ? "0 4px"
                          : "0",
                      }}
                    >
                      {segment}
                    </motion.span>
                  ))}
              </motion.h2>
            ))}
          </motion.div>
        </div>
        <div className='relative w-full h-2/3 flex items-center justify-center'>
          <div className='relative z-10 max-w-2xl px-4 pb-4 -mt-5 sm:p-8 text-center ml-auto'>
            <motion.div
              ref={textRef}
              initial='hidden'
              animate={isInView ? "visible" : "hidden"}
              className='relative z-10 max-w-6xl p-4 sm:p-8 text-center'
            >
              {[
                "I thrive on the challenge of translating complex problems into elegant, user-friendly digital solutions.",
                "When I'm not coding, you can find me on the soccer field, where I channel the same passion and teamwork that I bring to my projects.",
              ].map((line, index) => (
                <motion.h2
                  key={index}
                  custom={index}
                  variants={textVariants}
                  className={`uppercase text-xl text-justify sm:text-4xl md:text-3xl lg:text-5xl leading-loose text-black font-bold ${bueno_regular.className}`}
                  style={{ lineHeight: "1.0" }}
                >
                  {line
                    .split(
                      /(challenge|complex problems|elegant|user-friendly|digital solutions|coding|soccer field|passion|teamwork|projects)/i
                    )
                    .map((segment, segmentIndex) => (
                      <motion.span
                        key={segmentIndex}
                        style={{
                          backgroundColor: [
                            "challenge",
                            "complex problems",
                            "elegant",
                            "user-friendly",
                            "digital solutions",
                            "coding",
                            "soccer field",
                            "passion",
                            "teamwork",
                            "projects",
                          ].includes(segment.trim())
                            ? "#6b46c1"
                            : "transparent",
                          color: [
                            "challenge",
                            "complex problems",
                            "elegant",
                            "user-friendly",
                            "digital solutions",
                            "coding",
                            "soccer field",
                            "passion",
                            "teamwork",
                            "projects",
                          ].includes(segment.trim())
                            ? "#ffffff"
                            : "inherit",
                          padding: [
                            "challenge",
                            "complex problems",
                            "elegant",
                            "user-friendly",
                            "digital solutions",
                            "coding",
                            "soccer field",
                            "passion",
                            "teamwork",
                            "projects",
                          ].includes(segment.trim())
                            ? "0 4px"
                            : "0",
                        }}
                      >
                        {segment}
                      </motion.span>
                    ))}
                </motion.h2>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.h2
          custom={2}
          variants={textVariants}
          className={`uppercase text-xl text-center sm:text-4xl md:text-3xl lg:text-5xl leading-loose text-black font-bold mt-8 ${bueno_regular.className}`}
          style={{ lineHeight: "1.0" }}
        >
          {"Let's build websites together"
            .split(/(build|websites|together)/i)
            .map((segment, segmentIndex) => (
              <motion.span
                key={segmentIndex}
                style={{
                  backgroundColor: ["build", "websites", "together"].includes(
                    segment.trim()
                  )
                    ? "#6b46c1"
                    : "transparent",
                  color: ["build", "websites", "together"].includes(
                    segment.trim()
                  )
                    ? "#ffffff"
                    : "inherit",
                  padding: ["build", "websites", "together"].includes(
                    segment.trim()
                  )
                    ? "0 4px"
                    : "0",
                }}
                whileHover={{
                  scale: ["build", "websites", "together"].includes(
                    segment.trim()
                  )
                    ? 1.05
                    : 1,
                  transition: { duration: 0.2 },
                }}
                animate={{
                  y: ["build", "websites", "together"].includes(segment.trim())
                    ? [0, -2, 0]
                    : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: segmentIndex * 0.2,
                }}
              >
                {segment}
              </motion.span>
            ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default AboutSection;

("I'm Rangel Koli, and I don't just build websites. I architect experiences. I thrive on the challenge of translating complex problems into elegant, user-friendly digital solutions. When I'm not coding, you can find me on the soccer field, where I channel the same passion and teamwork that I bring to my projects. Let's create something amazing together.");
