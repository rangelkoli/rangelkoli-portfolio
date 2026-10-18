import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ExperiencePageClient from "@/components/experience/ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience | Rangel Koli",
  description:
    "Four software engineering roles across Syracuse, New York, San Francisco, and Mumbai, paired with production benchmarks and system architecture.",
};

export default function ExperiencePage() {
  return (
    <>
      <main className="font-instrument min-h-screen bg-[#F4F4F4] px-4 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32 dark:bg-[#1A1A1A]">
        <ExperiencePageClient />
      </main>
      <Footer />
    </>
  );
}
