"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Countdown } from "./Countdown"
import { EmailSignup } from "./email-signup"

// Event date: June 6, 2026
const EVENT_DATE = new Date("2026-06-06T19:00:00")

export function SplashSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Image
              src="/logo.png"
              alt="Next Up Boxing League"
              width={200}
              height={120}
              className="w-36 sm:w-44 h-auto"
              priority
            />
          </motion.div>
          
          {/* Main heading - elegant and simple */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-primary tracking-tight mb-2"
          >
            The Future of
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight mb-8"
          >
            Boxing
          </motion.p>

          {/* Date badge - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8"
          >
            <span className="w-8 h-px bg-border" />
            <span>June 6, 2026</span>
            <span className="w-8 h-px bg-border" />
          </motion.div>

          {/* Countdown - compact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Countdown targetDate={EVENT_DATE} />
          </motion.div>

          {/* Email Signup - inline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full"
          >
            <EmailSignup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
