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
  role?: string;
  period?: string;
  caseStudy?: {
    label: string;
    lead: string;
    context: string;
    role?: string;
    type?: string;
    focus?: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
    contribution: string[];
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: "orange-housing",
    title: "Orange Housing",
    description: "A student and residential rental-listings marketplace for Syracuse, NY. Engineered with Next.js 16 App Router, self-hosted Supabase with Deno Edge Functions, PostgreSQL, Stripe payments, landlord listing management, and automated scraping workflows.",
    image: [
      "/projects/orange-housing/orange-housing-hero.png",
      "/projects/orange-housing/orange-housing-listing-detail.png",
      "/projects/orange-housing/orange-housing-listing-wizard.png",
      "/projects/orange-housing/orange-housing-filters.png",
      "/projects/orange-housing/orange-housing-cart-review.png"
    ],
    category: "Next.js 16, Supabase, Full-Stack Marketplace",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Stripe"],
    github: "https://github.com/rangelkoli/Orange-Housing",
    demo: "https://orangehousing.com",
    role: "Full-Stack Engineer & Architect",
    period: "2026",
    features: [
      "Student & residential rental listings search with bedroom & pricing filters",
      "Self-service landlord management dashboard with multi-step publishing wizard",
      "Stripe payment checkout supporting 30-day listing plans and social boosts",
      "Zero-downtime ETL migration from legacy MySQL to self-hosted Supabase PostgreSQL",
      "Comprehensive Deno Edge Functions for transactional alerts, auth, and admin tools",
      "Robust Playwright E2E testing suite for critical landlord and checkout flows"
    ],
    caseStudy: {
      label: "Full-stack engineering · Syracuse housing marketplace",
      lead: "I engineered Orange Housing as a high-performance rental marketplace connecting Syracuse University students and local residents with verified properties and landlords.",
      context: "Orange Housing serves students, young professionals, and families in Syracuse seeking off-campus housing. Replacing an outdated legacy system, the modern architecture couples Next.js 16 with a self-hosted Supabase backend, Stripe billing, comprehensive landlord listing workflows, and an administrative moderation panel.",
      role: "Full-Stack Engineer & Architect",
      type: "Full-Stack Web Marketplace",
      focus: "Marketplace, Supabase & Stripe",
      sections: [
        {
          title: "Search & Discovery Engine",
          body: "Designed an intuitive search experience with multi-parameter filtering—enabling renters to filter by individual bedroom rates, total rent, student amenities, and neighborhood. Integrated Incremental Static Regeneration (ISR) and optimized queries for sub-second responses."
        },
        {
          title: "Landlord Publishing & Cart",
          body: "Constructed an end-to-end landlord dashboard featuring a multi-step listing creator, image upload and reordering, lease rule configuration, and an order cart that supports Standard listings, Featured placements, and social media promotions."
        },
        {
          title: "Edge Functions & Billing",
          body: "Built Deno 2 Edge Functions integrating Stripe Checkout, handling webhook lifecycle events, automated listing expiration timers, and transactional inquiry notifications sent directly between prospective tenants and landlords."
        },
        {
          title: "Legacy Data Migration",
          body: "Spearheaded the data and media migration pipeline: transferred thousands of legacy MySQL records into a normalized PostgreSQL schema, converted media storage to Supabase Storage, and secured all operations with granular access controls."
        }
      ],
      contribution: [
        "Architected the frontend using Next.js 16 (App Router), React 19, Tailwind CSS v4, and Zustand for state persistence",
        "Configured self-hosted Supabase on a VPS with Deno Edge Functions for auth, listings, and transactional workflows",
        "Engineered Stripe Checkout integration and automated listing tier renewals (Standard and Featured tiers)",
        "Executed legacy ETL scripts in Python and SQL to migrate thousands of active listings, user profiles, and photos",
        "Wrote an extensive Playwright end-to-end testing suite validating landlord onboarding, cart purchases, and admin moderation",
        "Built automated listing scrapers using Python, FastAPI, and Playwright for real-time market inventory aggregation"
      ],
      outcome: "Delivered a production-ready, scalable rental marketplace that modernized the housing search for the Syracuse community, streamlined landlord operations with self-service checkout, and significantly reduced operational overhead."
    }
  },
  {
    slug: "hereafter",
    title: "HereAfter",
    description: "A cross-platform, map-based social app I built with Expo and React Native. Users create location-based drops—notes, photos, videos, and voice notes—then discover, interact with, and save memories tied to real places.",
    image: [
      "/projects/hereafter/HereAfterHero.png",
      "/projects/hereafter/HereAfter1.png",
      "/projects/hereafter/HereAfter4.jpg",
      "/projects/hereafter/HereAfter7.png"
    ],
    video: "/projects/hereafter/hereafter-demo.mov",
    category: "Expo React Native, Mobile Application",
    technologies: ["Expo", "React Native", "TypeScript", "Mapbox", "Supabase", "Zustand"],
    github: "https://github.com/rangelkoli/HereAfter",
    role: "Lead Mobile Engineer",
    period: "2026",
    caseStudy: {
      label: "Mobile engineering · Map-based social product",
      lead: "I built HereAfter as a cross-platform mobile app where the map is the social feed and every memory belongs to a place.",
      context: "HereAfter lets people leave “drops” at real-world locations and discover what friends and nearby communities have shared. A drop can be a note, photo, video, or voice note—with captions, tags, visibility controls, and social actions attached.",
      role: "Lead Mobile Engineer",
      type: "Cross-platform mobile app",
      focus: "Maps, media, and social",
      sections: [
        {
          title: "Map-first discovery",
          body: "The app fetches nearby drops around the user, clusters markers as the camera zooms out, and expands them into individual markers at closer zoom levels. Drops become active when a user is within 100 meters, turning discovery into a real-world interaction."
        },
        {
          title: "A flexible drop system",
          body: "Users can create note, image, video, and audio drops from the map. The composer supports captions, tags, previews, voice recording, audio waveforms, video thumbnails, and visibility settings for Everyone, Friends, Community, or Only Me."
        },
        {
          title: "The social loop",
          body: "Opening a drop leads into the rest of the product: like it, comment on it, save it to My Map, open the creator’s profile, send a friend request, or report content. Notifications deep-link people back to the relevant drop or friend action."
        },
        {
          title: "From first launch to trust",
          body: "The app includes phone and OTP authentication, invite-only access, age verification, usernames, contact invites, community guidelines, location permissions, push notifications, and account controls—so the social experience has a complete product shell around it."
        }
      ],
      contribution: [
        "Built the Expo Router app structure and authenticated navigation states",
        "Implemented the Mapbox experience with location tracking, weather-based map styling, marker clustering, and zoom-aware transitions",
        "Built the drop creation pipeline for notes, images, videos, and voice notes",
        "Handled Supabase Storage uploads, remote media URLs, draft cleanup, retries, thumbnails, and audio waveform data",
        "Implemented likes, comments, saves, friend requests, profiles, blocking, reporting, and post deletion",
        "Built My Map to organize personal, discovered, and saved drops, plus notification deep links and realtime updates"
      ],
      outcome: "The result was a working mobile MVP—not just a set of screens. A user can authenticate, complete onboarding, create a location-based memory, discover drops by moving through the world, interact with people and content, and return to everything they have created or saved."
    }
  },
  {
    slug: "judgifysu",
    title: "Judgify",
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
];
