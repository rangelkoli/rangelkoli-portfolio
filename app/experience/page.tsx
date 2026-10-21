import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ExperiencePageClient from "@/components/experience/ExperiencePageClient";
import { experienceItems } from "@/data/experience";

export const metadata: Metadata = {
  title: { absolute: "Experience" },
  description:
    "Software engineering and teaching roles across Syracuse, New York, San Francisco, and Mumbai.",
};

export default function ExperiencePage() {
  return (
    <>
      <main className="min-h-screen bg-seashell px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <SectionTitle
          as="h1"
          title="Experience"
          className="mx-auto mb-0 w-full max-w-7xl"
          description={`${experienceItems.length} roles, newest first.`}
        />
        <ExperiencePageClient />
      </main>
      <Footer />
    </>
  );
}
