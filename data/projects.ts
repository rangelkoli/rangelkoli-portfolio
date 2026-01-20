export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string[];
  video?: string;
  category: string;
  technologies: string[];
  github?: string;
  demo?: string;
  features?: string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    slug: "hereafter",
    title: "HereAfter",
    description: "Hereafter is a map-based social app where memories take shape in the places you love. Share voice, photos, videos, and notes friends can discover, creating a living community archive built through presence, not performance.",
    image: [],
    video: "/projects/hereafter/hereafter-demo.mov",
    category: "NextJS, Web Application",
    technologies: ["Next.js", "React", "TypeScript"],
    github: "https://github.com/rangelkoli/HereAfter",
    comingSoon: true
  },
  {
    slug: "judgifysu",
    title: "JudgifySU",
    description: "This project streamlines the process of assigning judges to research posters, collecting and displaying poster scores, and generating a final ranking.",
    image: [
      "/projects/judgify/judgify-cover.png",
      "/assets/project-oculus-logo.jpg",
      "/assets/project-oculus-logo.jpg"
    ],
    category: "Next.js, Flask, Python, Full-stack Web Application",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Flask"],
    github: "https://github.com/rangelkoli/JudgifySU",
    demo: "https://judgify-su.vercel.app",
    features: [
      "Automated judge assignment system for research posters",
      "Real-time score collection and display",
      "Comprehensive ranking generation",
      "User-friendly interface for judges and administrators",
      "Secure authentication and data management"
    ]
  },
  {
    slug: "walksafe",
    title: "WalkSafe",
    description: "WalkSafe, your ultimate companion for ensuring the safety of your loved ones while navigating through the city. WalkSafe is a comprehensive mobile application built with React Native, designed to provide real-time tracking, route optimization, and safety alerts to keep you and your family secure at all times.",
    image: [
      "/projects/walksafe/2.jpg",
      "/projects/walksafe/3.jpg",
      "/projects/walksafe/1.gif"
    ],
    video: "/projects/walksafe/walksafe-intro.mp4",
    category: "React Native, Mobile Application",
    technologies: ["React Native", "Node.js", "MongoDB", "Express", "Redux"],
    github: "https://github.com/rangelkoli/WalkSafe",
    demo: "https://walksafe-app.vercel.app",
    features: [
      "Real-time location tracking for family members",
      "Smart route optimization for safer paths",
      "Instant safety alerts and notifications",
      "Emergency contact integration",
      "Crime data visualization and safe zone mapping"
    ]
  },
  {
    slug: "findx",
    title: "FindX",
    description: "FindX is a comprehensive web-based platform that leverages machine learning and facial recognition technology to help locate missing persons. The system provides a dual interface for both citizens and police authorities to collaborate in finding missing individuals.",
    image: [
      "/projects/findx/photo-1.jpg",
      "/projects/findx/photo-2.jpg",
      "/projects/findx/photo-3.jpg"
    ],
    category: "Python, Django, Full-stack Web Application",
    technologies: ["React", "Firebase", "Material UI", "Redux", "TensorFlow"],
    github: "https://github.com/rangelkoli/FindX",
    demo: "https://findx-app.vercel.app",
    features: [
      "Advanced facial recognition using TensorFlow",
      "Dual interface for citizens and police",
      "Real-time missing person database",
      "Machine learning-powered image matching",
      "Collaborative search and reporting system"
    ]
  },
  {
    slug: "anonimo",
    title: "Anonimo",
    description: "Anonimo is a mental health support platform that provides anonymous peer-to-peer support through real-time chat, community forums, and professional resources. The platform prioritizes user privacy while fostering a supportive environment for mental wellness.",
    image: [
      "/projects/anonimo/AnonHome.png",
      "/projects/anonimo/posts.png",
      "/projects/anonimo/realtimechat.png"
    ],
    category: "React, Node.js, Full-stack Web Application",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    github: "https://github.com/rangelkoli/anonimo",
    demo: "https://anonimo-app.vercel.app",
    features: [
      "Anonymous peer-to-peer support chat",
      "Real-time messaging with Socket.io",
      "Community forums and discussion boards",
      "Privacy-first architecture",
      "Mental health resource library"
    ]
  },
]
