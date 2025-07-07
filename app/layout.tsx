"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Preloader from "../components/Preloader";
import Transition from "../components/Transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white `}>
        {showPreloader && <Preloader />}
        <AnimatePresence mode='wait'>
          <Transition key={pathname}>{children}</Transition>
        </AnimatePresence>
      </body>
    </html>
  );
}
