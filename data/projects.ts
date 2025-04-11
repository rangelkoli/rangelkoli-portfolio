export interface Project {
  title: string;
  description: string;
  image: string[];
  technologies: string[];
  github?: string;
  demo?: string;

}


export const projects: Project[] = [
  {
    title: "JudgifySU",
    description: "This project streamlines the process of assigning judges to research posters, collecting and displaying poster scores, and generating a final ranking. ",
    image: [
        "/assets/projects/judgify.jpg",
        "/assets/projects/judgify2.jpg",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS, Flask", ""],
    github: "https://github.com/rangelkoli/JudgifySU",


  },
  {
    title: "WalkSafe",
    description: "WalkSafe, your ultimate companion for ensuring the safety of your loved ones while navigating through the city. WalkSafe is a comprehensive mobile applicationbuilt with React Native, designed to provide real-time tracking, route optimization, and safety alerts to keep you and your family secure at all times.",
    image: [
        "/assets/projects/judgify.jpg",
        "/assets/projects/judgify2.jpg",
    ],    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    github: "https://github.com/yourusername/ecommerce",


  },
  {
    title: "FindX",
    description: "A productivity application for managing tasks, projects, and deadlines with team collaboration.",
    image: [
        "/assets/projects/judgify.jpg",
        "/assets/projects/judgify2.jpg",
    ],    technologies: ["React", "Firebase", "Material UI", "Redux"],
    github: "https://github.com/yourusername/taskmanager",
  },
]
