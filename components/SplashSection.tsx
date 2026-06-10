"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Countdown } from "./Countdown"
import { EmailSignup } from "./email-signup"
import { ChevronDown } from "lucide-react"

const EVENT_DATE = new Date("2026-06-06T19:00:00")

export function SplashSection() {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Subtle noise grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px',
        opacity: 0.8,
      }} />

      {/* Top crimson rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c5203a]" />

      {/* Subtle diagonal background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-40 w-[600px] h-[700px] opacity-[0.03]"
          style={{
            background: `linear-gradient(135deg, #1e2d5e 0%, #b8962e 100%)`,
            transform: 'rotate(-15deg)',
            borderRadius: '60px',
          }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[500px] opacity-[0.03]"
          style={{
            background: `linear-gradient(45deg, #c5203a 0%, #1e2d5e 100%)`,
            transform: 'rotate(10deg)',
            borderRadius: '40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Editorial vol/issue badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-[#1e2d5e]/20" />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#1e2d5e]/50">
              Vol. I &nbsp;·&nbsp; Est. 2026 &nbsp;·&nbsp; Fight Night
            </span>
            <span className="h-px w-12 bg-[#1e2d5e]/20" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
              alt="Next Up Boxing League"
              width={220}
              height={130}
              className="w-40 sm:w-52 h-auto"
              priority
            />
          </motion.div>

          {/* Magazine-style headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mb-2"
          >
            <h1
              className="font-display text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight text-[#1e2d5e] uppercase"
            >
              The Future
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-6"
          >
            <span
              className="font-display text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight uppercase"
              style={{
                color: '#c5203a',
              }}
            >
              Is Now
            </span>
          </motion.div>

          {/* Rule + date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-4 mb-8 w-full max-w-sm"
          >
            <span className="flex-1 h-px bg-[#1e2d5e]/15" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#1e2d5e]/60 whitespace-nowrap">
              June 6, 2026 · Madison Square Garden
            </span>
            <span className="flex-1 h-px bg-[#1e2d5e]/15" />
          </motion.div>

          {/* Countdown — typographic data row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-9"
          >
            <Countdown targetDate={EVENT_DATE} />
          </motion.div>

          {/* Email Signup */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="w-full max-w-md"
          >
            <EmailSignup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll to enter"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/40 group-hover:text-[#c5203a] transition-colors duration-300">
          Scroll to Enter
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="scroll-glow-indicator"
        >
          <ChevronDown className="w-5 h-5 text-[#1e2d5e]/30 group-hover:text-[#c5203a] transition-colors duration-300" />
        </motion.div>
      </motion.button>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/10 to-transparent" />
    </section>
  )
}
