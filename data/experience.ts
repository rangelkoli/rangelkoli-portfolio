export interface TelemetryMetric {
  label: string;
  beforeLabel: string;
  afterLabel: string;
  beforePct: number;
  afterPct: number;
  headlineDelta: string;
  subLabel: string;
}

export interface ArchitectureNode {
  stage: string;
  detail: string;
  metric: string;
}

export interface ExperienceItem {
  id: string;
  index: string;
  company: string;
  shortName: string;
  role: string;
  type: string;
  period: string;
  yearRange: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  caseStudyHref?: string;
  liveHref?: string;
  githubHref?: string;
  images: string[];
  video?: string;
  mediaCaption: string;
  telemetry: TelemetryMetric;
  architectureNodes: ArchitectureNode[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  coursework: string[];
}

export interface HonorItem {
  award: string;
  event: string;
  date: string;
  projectTitle: string;
  projectHref: string;
  summary: string;
}

export const experienceItems: ExperienceItem[] = [
  {
    id: "orange-housing",
    index: "01",
    company: "OrangeHousing.com LLC",
    shortName: "Orange Housing",
    role: "Software Engineer",
    type: "Full-time",
    period: "Jan 2026 – Present",
    yearRange: "2026",
    location: "Syracuse, NY",
    summary:
      "Architected and migrated the Syracuse off-campus rental marketplace to Next.js 16, React 19, TypeScript, and self-hosted Supabase with Deno 2 Edge Functions and Stripe Checkout.",
    highlights: [
      "Migrated the legacy multi-tenant platform to Next.js 16 (App Router), React 19, TypeScript, and normalized PostgreSQL on self-hosted Supabase with zero downtime.",
      "Replaced redundant client polling with React Query, GraphQL/REST contracts, and real-time Supabase subscriptions, cutting UI query latency from 35.8ms to 5.6ms (-84%).",
      "Shipped Deno 2 Edge Functions for Stripe Checkout (30-day listing plans and social boosts), automated expiration timers, and landlord inquiry alerts.",
      "Added Playwright end-to-end test suites and feature-flag rollouts across landlord onboarding and checkout, cutting user-reported defects by 60%.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
    ],
    caseStudyHref: "/projects/orange-housing",
    liveHref: "https://orangehousing.com",
    githubHref: "https://github.com/rangelkoli/Orange-Housing",
    images: [
      "/projects/orange-housing/orange-housing-hero.png",
      "/projects/orange-housing/orange-housing-listing-detail.png",
      "/projects/orange-housing/orange-housing-listing-wizard.png",
      "/projects/orange-housing/orange-housing-filters.png",
    ],
    mediaCaption:
      "Orange Housing search engine, multi-parameter rent filters, and self-service landlord listing wizard.",
    telemetry: {
      label: "Client query latency (React Query + Supabase realtime vs legacy polling)",
      beforeLabel: "35.8ms legacy poll",
      afterLabel: "5.6ms realtime query",
      beforePct: 100,
      afterPct: 16,
      headlineDelta: "35.8ms → 5.6ms",
      subLabel: "84% reduction in UI query latency · 60% fewer reported defects",
    },
    architectureNodes: [
      {
        stage: "Next.js 16 + ISR",
        detail: "Bedroom, rent, and neighborhood filters",
        metric: "5.6ms query",
      },
      {
        stage: "Deno 2 Edge + Stripe",
        detail: "30-day plans, boosts, webhook renewals",
        metric: "Zero-downtime ETL",
      },
      {
        stage: "Playwright E2E",
        detail: "Landlord wizard & cart verification",
        metric: "-60% defects",
      },
    ],
  },
  {
    id: "hereafter",
    index: "02",
    company: "HereAfter Inc.",
    shortName: "HereAfter",
    role: "Founding Software Engineer",
    type: "Full-time",
    period: "Aug 2025 – Dec 2025",
    yearRange: "2025",
    location: "New York, NY",
    summary:
      "Owned the cross-platform Expo + React Native map social app and Next.js marketing platform from a mid-project pivot through production beta launch.",
    highlights: [
      "Assumed sole technical ownership of the mobile product during a mid-project pivot and rebuilt the Expo Router, React Native, and TypeScript codebase into a production beta.",
      "Engineered the Mapbox discovery engine with 100-meter proximity drop activation, zoom-aware marker clustering, and weather-reactive map styling.",
      "Built the multi-format drop creation pipeline for notes, photos, videos, and audio waveforms backed by Zustand state, Supabase Edge Functions, and Storage retry queues.",
      "Launched the company website in Next.js with Airtable workflows and GSAP motion (+40% visitor engagement in 6 weeks) while closing moderation edge cases (-60% reported issues, +35% retention).",
    ],
    technologies: [
      "Expo",
      "React Native",
      "Next.js",
      "TypeScript",
      "Mapbox",
      "Supabase",
    ],
    caseStudyHref: "/projects/hereafter",
    githubHref: "https://github.com/rangelkoli/HereAfter",
    images: [
      "/projects/hereafter/HereAfterHero.png",
      "/projects/hereafter/HereAfter1.png",
      "/projects/hereafter/HereAfter7.png",
    ],
    video: "/projects/hereafter/hereafter-demo.mov",
    mediaCaption:
      "HereAfter live Mapbox social feed, 100m radius geofence trigger, and multi-format memory composer.",
    telemetry: {
      label: "Six-week visitor engagement & beta retention after full-stack rebuild",
      beforeLabel: "1.00x pre-rebuild baseline",
      afterLabel: "1.40x visitor engagement",
      beforePct: 68,
      afterPct: 96,
      headlineDelta: "+40% engagement",
      subLabel: "35% higher beta user retention · 100m GPS activation radius",
    },
    architectureNodes: [
      {
        stage: "Expo + Mapbox GL",
        detail: "Clustered pins & 100m geofence trigger",
        metric: "4 media types",
      },
      {
        stage: "Supabase Edge + Storage",
        detail: "Waveform metadata, OTP auth, retries",
        metric: "+35% retention",
      },
      {
        stage: "Next.js + Airtable",
        detail: "Marketing launch site & telemetry",
        metric: "+40% engagement",
      },
    ],
  },
  {
    id: "delet",
    index: "03",
    company: "Delet",
    shortName: "Delet",
    role: "Software Engineer Intern",
    type: "Internship",
    period: "Jun 2024 – Aug 2024",
    yearRange: "2024",
    location: "San Francisco, CA",
    summary:
      "Migrated legacy web workflows into a production React Native + TypeScript mobile app and engineered low-latency AWS EC2/S3 video streaming for smart-home operations.",
    highlights: [
      "Spearheaded migration of legacy web views into a cross-platform React Native and TypeScript architecture, redesigning API contracts to cut request latency by 25% and lift engagement by 8%.",
      "Engineered a real-time video streaming and smart-device communication module on AWS EC2 and S3, slashing media load times by 40% and raising customer satisfaction scores by 18%.",
      "Built automated Playwright and Jest test suites inside CI/CD release pipelines, shortening deployment cycles by 15% and lifting first-quarter retention by 12%.",
    ],
    technologies: ["React Native", "React", "TypeScript", "Node.js"],
    images: [],
    mediaCaption:
      "Delet mobile migration & AWS EC2/S3 real-time video streaming pipeline.",
    telemetry: {
      label: "Media stream load time & API contract latency after React Native + AWS rebuild",
      beforeLabel: "1.00x legacy web stream",
      afterLabel: "0.60x AWS EC2/S3 stream",
      beforePct: 100,
      afterPct: 60,
      headlineDelta: "-40% stream load",
      subLabel: "25% lower API latency · 18% higher customer satisfaction",
    },
    architectureNodes: [
      {
        stage: "React Native + TS",
        detail: "Cross-platform mobile client & typed REST contracts",
        metric: "-25% API latency",
      },
      {
        stage: "AWS EC2 & S3 Media",
        detail: "Real-time device video relay & segment caching",
        metric: "-40% stream load",
      },
      {
        stage: "Playwright + Jest CI",
        detail: "Automated regression & release gating",
        metric: "-15% deploy cycle",
      },
    ],
  },
  {
    id: "grip",
    index: "04",
    company: "GRIP – The Sparks Foundation",
    shortName: "GRIP Foundation",
    role: "Software Engineer Intern",
    type: "Internship",
    period: "Mar 2022 – May 2022",
    yearRange: "2022",
    location: "Mumbai, India",
    summary:
      "Built a React charity donation platform with Stripe Checkout integration, A/B-tested checkout flows, and accessible responsive interfaces.",
    highlights: [
      "Built a React donation platform with Stripe Checkout integration and A/B-tested payment funnels, cutting cart abandonment by 25% and lifting completed online donations by 9%.",
      "Redesigned the responsive layout and keyboard/screen-reader accessibility across mobile and desktop viewports, growing average session duration by 16% across 520+ new monthly donors.",
    ],
    technologies: ["React", "Stripe", "Tailwind CSS"],
    images: [],
    mediaCaption:
      "GRIP Stripe donation funnel & responsive accessibility architecture.",
    telemetry: {
      label: "Donor checkout cart abandonment after Stripe funnel simplification",
      beforeLabel: "1.00x baseline checkout drop-off",
      afterLabel: "0.75x A/B-tested Stripe flow",
      beforePct: 100,
      afterPct: 75,
      headlineDelta: "-25% abandonment",
      subLabel: "16% longer session duration · 9% increase in completed donations",
    },
    architectureNodes: [
      {
        stage: "React Donor UI",
        detail: "Responsive WCAG-compliant campaign & amount selector",
        metric: "+16% session time",
      },
      {
        stage: "A/B Funnel Experiment",
        detail: "Single-screen donor details vs multi-step form",
        metric: "-25% abandonment",
      },
      {
        stage: "Stripe Checkout",
        detail: "Webhook receipt confirmation & recurring pledge flow",
        metric: "+9% donations",
      },
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    institution: "Syracuse University",
    degree: "Master of Science in Computer Science",
    period: "Aug 2023 – May 2025",
    location: "Syracuse, NY",
    gpa: "GPA 3.85 / 4.0",
    coursework: [
      "Design & Analysis of Algorithms",
      "Database Management Systems",
      "Principles of Operating Systems",
      "Assured Programming & Formal Methods",
      "Intro to Machine Learning",
      "Intro to Artificial Intelligence",
    ],
  },
  {
    institution: "Mumbai University",
    degree: "Bachelor of Engineering in Information Technology",
    period: "Aug 2019 – May 2023",
    location: "Mumbai, India",
    gpa: "GPA 3.80 / 4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
      "Software Testing & Quality Assurance",
      "Web & Mobile Application Development",
    ],
  },
];

export const honorItems: HonorItem[] = [
  {
    award: "1st Place Winner",
    event: "CuseHacks 2024 · Syracuse University",
    date: "March 2024",
    projectTitle: "WalkSafe",
    projectHref: "/projects/walksafe",
    summary:
      "Built a React Native and Flask safety app that scores 8,346 Syracuse police reports by incident severity and reroutes walking paths around high-risk blocks.",
  },
  {
    award: "1st Place Winner",
    event: "National Engineering Hackathon",
    date: "March 2023",
    projectTitle: "AgroBasket",
    projectHref: "/projects/agrobasket",
    summary:
      "Built a direct farmer-to-customer produce marketplace in Python and Django with separate farmer inventory and live cart reconciliation.",
  },
];
