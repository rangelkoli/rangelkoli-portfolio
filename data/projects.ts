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
    description: "This project streamlines the process of assigning judges to research posters, collecting and displaying poster scores, and generating a final ranking.",
    image: [
        "/assets/project-oculus-logo.jpg",
        "/assets/project-oculus-logo.jpg",
        "/assets/project-oculus-logo.jpg"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flask"],
    github: "https://github.com/rangelkoli/JudgifySU",
    demo: "https://judgify-su.vercel.app"
  },
  {
    title: "WalkSafe",
    description: "WalkSafe, your ultimate companion for ensuring the safety of your loved ones while navigating through the city. WalkSafe is a comprehensive mobile application built with React Native, designed to provide real-time tracking, route optimization, and safety alerts to keep you and your family secure at all times.",
    image: [
        "/projects/walksafe/2.jpg",
        "/projects/walksafe/3.jpg",
        "/projects/walksafe/1.gif"
    ],
    technologies: ["React Native", "Node.js", "MongoDB", "Express", "Redux"],
    github: "https://github.com/rangelkoli/walksafe",
    demo: "https://walksafe-app.vercel.app"
  },
  {
    title: "FindX",
    description: "FindX is a comprehensive web-based platform that leverages machine learning and facial recognition technology to help locate missing persons. The system provides a dual interface for both citizens and police authorities to collaborate in finding missing individuals.",
    image: [
        "/projects/findx/photo-1.jpg",
        "/projects/findx/photo-2.jpg",
        "/projects/findx/photo-3.jpg"
    ],
    technologies: ["React", "Firebase", "Material UI", "Redux", "TensorFlow"],
    github: "https://github.com/rangelkoli/findx",
    demo: "https://findx-app.vercel.app"
  },
  {
    title: "Anonimo",
    description: "Anonimo is a mental health support platform that provides anonymous peer-to-peer support through real-time chat, community forums, and professional resources. The platform prioritizes user privacy while fostering a supportive environment for mental wellness.",
    image: [
        "/projects/anonimo/AnonHome.png",
        "/projects/anonimo/posts.png",
        "/projects/anonimo/realtimechat.png"
    ],
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    github: "https://github.com/rangelkoli/anonimo",
    demo: "https://anonimo-app.vercel.app"
  },
]
