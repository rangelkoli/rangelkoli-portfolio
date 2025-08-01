"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "./globals.css";
import Preloader from "../components/Preloader";
import Transition from "../components/Transition";
import Header from "../components/Header";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

const bueno_regular = localFont({
  src: "../components/bueno-regular.otf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Show preloader only on first visit
  const [showPreloader, setShowPreloader] = useState(true);
  useEffect(() => {
    if (showPreloader) {
      const timer = setTimeout(() => setShowPreloader(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  return (
    <html lang='en'>
      <body className={`${bueno_regular.className} bg-white`}>
        <Analytics />
        {showPreloader && <Preloader />}
        <Header />
        <AnimatePresence mode='wait'>
          <Transition key={pathname}>{children}</Transition>
        </AnimatePresence>
      </body>
    </html>
  );
}
