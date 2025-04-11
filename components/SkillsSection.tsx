import React from "react";
import { motion } from "framer-motion";

// Skills data
const skillsData = [
  { id: 1, name: "React" },
  { id: 2, name: "Next.js" },
  { id: 3, name: "TypeScript" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "TailwindCSS" },
  { id: 7, name: "MongoDB" },
  { id: 8, name: "GraphQL" },
  { id: 9, name: "AWS" },
  { id: 10, name: "Docker" },
  { id: 11, name: "Git" },
  { id: 12, name: "Redux" },
  { id: 13, name: "HTML5" },
  { id: 14, name: "CSS3" },
  { id: 15, name: "Python" },
];
const SkillsSection = () => {
  return (
    <motion.div
      className='w-full items-center justify-center'
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, delay: 0.3 },
        },
      }}
    >
      <h2 className='text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
        Skills & Technologies
      </h2>

      <div className='relative overflow-hidden py-6 bg-gray-800/30  backdrop-blur-sm'>
        {/* First row - left to right */}
        <div className='flex relative mb-4'>
          <motion.div
            className='flex whitespace-nowrap gap-12 '
            animate={{
              x: [-1920, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {skillsData
              .slice(0, Math.ceil(skillsData.length / 2))
              .map((skill) => (
                <div
                  key={skill.id}
                  className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700 min-w-[110px]'
                >
                  <span className='text-base font-medium text-blue-400'>
                    {skill.name}
                  </span>
                </div>
              ))}
          </motion.div>

          <motion.div
            className='flex whitespace-nowrap gap-12 px-4 absolute left-full'
            animate={{
              x: [-1920, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {skillsData
              .slice(0, Math.ceil(skillsData.length / 2))
              .map((skill) => (
                <div
                  key={skill.id}
                  className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700 min-w-[110px]'
                >
                  <span className='text-base font-medium text-blue-400'>
                    {skill.name}
                  </span>
                </div>
              ))}
          </motion.div>
        </div>

        {/* Second row - right to left */}
        <div className='flex relative mt-6'>
          <motion.div
            className='flex whitespace-nowrap gap-12 px-4'
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 32,
                ease: "linear",
              },
            }}
          >
            {skillsData.slice(Math.ceil(skillsData.length / 2)).map((skill) => (
              <div
                key={skill.id}
                className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700 min-w-[110px]'
              >
                <span className='text-base font-medium text-blue-400'>
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className='flex whitespace-nowrap gap-12 px-4 absolute left-full'
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 32,
                ease: "linear",
              },
            }}
          >
            {skillsData.slice(Math.ceil(skillsData.length / 2)).map((skill) => (
              <div
                key={skill.id}
                className='inline-flex items-center justify-center px-4 py-2 bg-gray-800 rounded-full border border-gray-700 min-w-[110px]'
              >
                <span className='text-base font-medium text-blue-400'>
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
