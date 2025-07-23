import { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "./gsap";

const languages = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Rust", icon: "https://upload.wikimedia.org/wikipedia/commons/2/20/Rustacean-orig-noshadow.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

const frameworks = [
  "React",
  "Next.js",
  "Node.js",
  "GraphQL",
  "Docker",
  "Django",
  "Flask",
  "FastAPI",
];

const databases = [
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
];

const iconMap: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (section && title) {
      gsap.to(title, {
        fontSize: "2rem",
        paddingTop: "1rem",
        paddingBottom: "0rem",
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 20%",
          end: "+=200",
          scrub: 1,
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 flex flex-col items-center">
      <div className='sticky top-0 z-50 bg-transparent px-6 max-w-2xl mx-auto'>
        <h1
          ref={titleRef}
          className='text-6xl font-extrabold uppercase tracking-wider text-center text-[#8082f8] z-50'
        >
          Skills
        </h1>
      </div>
      {/* Languages Row */}
      <div className="flex flex-row items-center justify-center w-full max-w-6xl mt-16 gap-6 px-4">
        <div className="flex-shrink-0 border border-white rounded-md h-32 flex items-center justify-center min-w-[260px] bg-transparent">
          <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center">
            Languages
          </span>
        </div>
        <div className="flex flex-1 flex-row gap-6 overflow-x-auto">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="border border-white rounded-md h-32 min-w-[180px] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 bg-transparent group"
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={lang.icon}
                alt={lang.name + " icon"}
                className="w-12 h-12 mb-2 object-contain transition-transform duration-200 group-hover:scale-110"
                loading="lazy"
              />
              <span className="text-xl font-semibold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center select-none">
                {lang.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Frameworks Row */}
      <div className="flex flex-row items-center justify-center w-full max-w-6xl mt-10 gap-6 px-4">
        <div className="flex-shrink-0 border border-white rounded-md h-32 flex items-center justify-center min-w-[260px] bg-transparent">
          <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center">
            Frameworks
          </span>
        </div>
        <div className="flex flex-1 flex-row gap-6 overflow-x-auto">
          {frameworks.map((skill) => (
            <div
              key={skill}
              className="border border-white rounded-md h-32 min-w-[180px] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 bg-transparent group"
              style={{ backgroundColor: "transparent" }}
            >
              {iconMap[skill] && (
                <img
                  src={iconMap[skill]}
                  alt={skill + " icon"}
                  className="w-12 h-12 mb-2 object-contain transition-transform duration-200 group-hover:scale-110"
                  loading="lazy"
                />
              )}
              <span className="text-xl font-semibold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center select-none">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Databases Row */}
      <div className="flex flex-row items-center justify-center w-full max-w-6xl mt-10 gap-6 px-4">
        <div className="flex-shrink-0 border border-white rounded-md h-32 flex items-center justify-center min-w-[260px] bg-transparent">
          <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center">
            Databases
          </span>
        </div>
        <div className="flex flex-1 flex-row gap-6 overflow-x-auto">
          {databases.map((db) => (
            <div
              key={db.name}
              className="border border-white rounded-md h-32 min-w-[180px] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 bg-transparent group"
              style={{ backgroundColor: "transparent" }}
            >
              <img
                src={db.icon}
                alt={db.name + " icon"}
                className="w-12 h-12 mb-2 object-contain transition-transform duration-200 group-hover:scale-110"
                loading="lazy"
              />
              <span className="text-xl font-semibold tracking-wide bg-gradient-to-r from-[#6b46c1] to-[#8082f8] bg-clip-text text-transparent text-center select-none">
                {db.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
