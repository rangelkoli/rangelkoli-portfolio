"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Transition from "../components/Transition";
import Header from "../components/Header";
import Loader from "../components/Loader";
import SmoothScroll from "../components/SmoothScroll";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { LoaderProvider } from "@/context/LoaderContext";

const bueno_regular = localFont({
  src: "../components/bueno-regular.otf",
});

const mangoGrotesque = localFont({
  src: [
    {
      path: "../public/MangoGrotesque/MangoGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/MangoGrotesque/MangoGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/MangoGrotesque/MangoGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/MangoGrotesque/MangoGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/MangoGrotesque/MangoGrotesque-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/MangoGrotesque/MangoGrotesque-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mango",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang='en'>
      <body className={`${bueno_regular.className} ${mangoGrotesque.variable} ${playfair.variable} bg-seashell`}>
        <LoaderProvider>
          <SmoothScroll />
          <Analytics />
          <Loader />
          <Header />
          <AnimatePresence mode='wait'>
            <Transition key={pathname}>{children}</Transition>
          </AnimatePresence>
        </LoaderProvider>
      </body>
    </html>
  );
}
