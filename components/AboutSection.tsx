"use client";
import { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";

// Sample education data - replace with your own information
const educationData = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Syracuse University",
    location: "Syracuse, NY",
    duration: "2023 - 2025",
    description: "Specialized in Artificial Intelligence and Machine Learning",
  },
  {
    id: 2,
    degree: "Bachelor of Engineering in Information Technology",
    institution: "St.Frances Institute of Technology",
    location: "Mumbai, India",
    duration: "2019 - 2023",
    description:
      "Graduated with honors. Research focus on web technologies and distributed systems.",
  },
];

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

const AboutSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Start animations when section comes into view
  if (isInView) {
    controls.start("visible");
  }

  return (
    <section
      id='about'
      className='py-28 bg-gradient-to-b from-gray-900 to-gray-950 text-white relative'
    >
      {/* Background Decorative Elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl'></div>
        <div className='absolute top-1/2 -right-40 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          ref={ref}
          initial='hidden'
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                duration: 0.6,
              },
            },
          }}
          className='flex flex-col lg:flex-row gap-16 items-center'
        >
          {/* Bio Section */}
          <motion.div
            className='lg:w-1/2'
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <h2 className='text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight'>
              About Me
            </h2>

            <div className='prose prose-lg prose-invert'>
              <p className='mb-5 text-gray-300 text-lg leading-relaxed'>
                Hello! I'm a passionate software developer with a keen interest
                in building elegant, user-friendly web applications. My journey
                in technology began during my undergraduate studies, and I've
                been hooked ever since.
              </p>

              <p className='mb-5 text-gray-300 text-lg leading-relaxed'>
                I specialize in frontend development with React and Next.js, but
                I'm also experienced with backend technologies. My approach
                combines clean code principles with creative problem-solving to
                deliver exceptional user experiences.
              </p>

              <p className='mb-6 text-gray-300 text-lg leading-relaxed'>
                When I'm not coding, you'll find me exploring new hiking trails,
                experimenting with photography, or contributing to open-source
                projects. I'm always eager to learn new technologies and
                techniques to expand my skillset.
              </p>
            </div>

            <div className='flex flex-wrap gap-5 mt-10'>
              <a
                href='#contact'
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] transform'
              >
                Get In Touch
              </a>
              <a
                href='/resume.pdf'
                target='_blank'
                className='bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg hover:translate-y-[-2px] transform'
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className='lg:w-1/2 flex justify-center'
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            <div className='relative w-72 h-72 md:w-96 md:h-96 overflow-hidden rounded-2xl border-4 border-gray-800 shadow-[0_0_25px_rgba(59,130,246,0.2)] group'>
              {/* Replace with your own image */}
              <Image
                src='/profile-image.jpg'
                alt='Profile'
                fill
                style={{ objectFit: "cover" }}
                className='group-hover:scale-105 transition-transform duration-700 ease-in-out'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          className='mt-32'
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4 },
            },
          }}
        >
          <h2 className='text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
            Education
          </h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {educationData.map((item) => (
              <motion.div
                key={item.id}
                className='bg-gray-800/80 p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] transform backdrop-blur-sm'
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <h3 className='text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors'>
                  {item.degree}
                </h3>
                <h4 className='text-xl font-medium text-blue-400 mb-4'>
                  {item.institution}
                </h4>

                <div className='flex items-center gap-2 text-sm text-gray-400 mb-5 px-4 py-1.5 rounded-full bg-gray-900/50 w-fit'>
                  <span>{item.location}</span>
                  <span>•</span>
                  <span className='font-medium'>{item.duration}</span>
                </div>

                <p className='text-gray-300 leading-relaxed'>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
