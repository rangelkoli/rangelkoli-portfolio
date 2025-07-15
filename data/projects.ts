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
        "/assets/project-oculus-logo.jpg",
        "/assets/project-oculus-logo.jpg",
        "/assets/project-oculus-logo.jpg"


    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS, Flask", ""],
    github: "https://github.com/rangelkoli/JudgifySU",


  },
  {
    title: "WalkSafe",
    description: "WalkSafe, your ultimate companion for ensuring the safety of your loved ones while navigating through the city. WalkSafe is a comprehensive mobile applicationbuilt with React Native, designed to provide real-time tracking, route optimization, and safety alerts to keep you and your family secure at all times.",
    image: [
        "/projects/walksafe/2.jpg",
        "/projects/walksafe/3.jpg",
        "/projects/walksafe/1.gif"
    ],    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    github: "https://github.com/yourusername/ecommerce",


  },
  {
    title: "FindX",
    description: "FindX is a comprehensive web-based platform that leverages machine learning and facial recognition technology to help locate missing persons. The system provides a dual interface for both citizens and police authorities to collaborate in finding missing individuals.",
    image: [
        "/projects/findx/photo-1.jpg",
        "/projects/findx/photo-2.jpg",
        "/projects/findx/photo-3.jpg"
    ],    technologies: ["React", "Firebase", "Material UI", "Redux"],
    github: "https://github.com/yourusername/taskmanager",
  },
]
