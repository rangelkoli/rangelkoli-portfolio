import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ProjectIndex from "@/components/projects/ProjectIndex";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: "Projects" },
  description:
    "Web and mobile apps I've built, from a Syracuse rental marketplace to a hackathon-winning safety app.",
};

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen bg-seashell px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <SectionTitle
          as="h1"
          title="Projects"
          className="mx-auto mb-0 w-full max-w-7xl"
          description={`${projects.length} things I've built, newest first. Each one opens a write-up of how it works.`}
        />
        <ProjectIndex />
      </main>
      <Footer />
    </>
  );
}
