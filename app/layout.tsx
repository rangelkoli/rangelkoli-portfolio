'use client'

import { AnimatePresence } from 'framer-motion'
import { Geist, Geist_Mono } from 'next/font/google'
import { usePathname } from 'next/navigation'
import './globals.css'
import Preloader from '../components/Preloader'
import Transition from '../components/Transition'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white `}>
        <Preloader />
        <AnimatePresence mode="wait">
          <Transition key={pathname}>{children}</Transition>
        </AnimatePresence>
      </body>
    </html>
  )
}
