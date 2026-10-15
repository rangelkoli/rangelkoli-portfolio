"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import "./globals.css";
import Transition from "../components/Transition";
import Header from "../components/Header";
import Loader from "../components/Loader";
import SmoothScroll from "../components/SmoothScroll";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { LoaderProvider } from "@/context/LoaderContext";
import { ThemeProvider } from "@/context/ThemeContext";

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

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
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
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var storedTheme = window.localStorage.getItem("rangel-portfolio-theme");
                  var theme = storedTheme === "light" || storedTheme === "dark"
                    ? storedTheme
                    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.style.colorScheme = "light";
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${bueno_regular.className} ${mangoGrotesque.variable} ${playfair.variable} ${bricolage.variable} bg-seashell`}>
        <ThemeProvider>
          <LoaderProvider>
            <SmoothScroll />
            <Analytics />
            <Loader />
            <Header />
            <div className="site-shell relative z-10">
              <Transition key={pathname}>{children}</Transition>
            </div>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
