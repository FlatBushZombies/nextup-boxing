"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Play, Ticket } from "lucide-react"

import { EmailSignup } from "@/components/email-signup"
import { ScrollIndicator } from "@/components/scroll-indicator"

const fightPreview = [
  { division: "Heavyweight", matchup: "Adebayo vs Cole", slot: "Main Event" },
  { division: "Welterweight", matchup: "Mokoena vs Price", slot: "Co-Main" },
  { division: "Featherweight", matchup: "Santos vs Reed", slot: "Feature Bout" },
  { division: "Lightweight", matchup: "King vs Alvarez", slot: "Prospect Clash" },
]

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isSignupFocused, setIsSignupFocused] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.06, 1])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[700px] h-[85vh] flex-col overflow-hidden bg-[#0d1124]"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className="absolute inset-0">
          <Image
            src="/hero-boxers.png"
            alt="Main Event"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1124]/55 via-[#0d1124]/20 to-[#0d1124]/85" />
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pt-16 pb-3 text-center sm:px-8 lg:px-16">
        <motion.div 
          style={{ y, opacity }} 
          className="flex w-full max-w-5xl flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="text-sm font-bold tracking-[0.2em] text-white/80 drop-shadow-md">MAIN EVENT</span>
            <span className="h-1 w-1 rounded-full bg-[#c5203a]" />
            <span className="text-sm font-bold tracking-[0.2em] text-white/80 drop-shadow-md">12 ROUNDS</span>
          </div>

          <h1
            className="mb-4 uppercase leading-[0.88] text-white drop-shadow-2xl"
            style={{
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(4.25rem, 11vw, 9.5rem)",
            }}
          >
            <span className="block text-white" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>ADEBAYO</span>
            <span className="block text-[#c5203a] text-[0.4em] leading-tight my-2 drop-shadow-lg">VS</span>
            <span className="block text-white" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>COLE</span>
          </h1>

          <div className="mt-2 mb-5 flex flex-col items-center justify-center gap-3">
            <span
              className="text-xl font-bold uppercase tracking-widest text-white drop-shadow-lg sm:text-2xl lg:text-3xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              JUNE 6 <span className="mx-2 text-[#c5203a] sm:mx-3">|</span> MADISON SQUARE GARDEN
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="#events"
              className="editorial-button inline-flex items-center justify-center gap-3 bg-[#1e9b46] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#157a35] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,155,70,0.3)] sm:px-10 sm:py-5 sm:text-lg"
            >
              GET TICKETS
            </a>
            <a
              href="#livestream"
              className="editorial-button inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-base font-bold text-[#0d1124] transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] sm:px-10 sm:py-5 sm:text-lg"
            >
              WATCH ON NEXTUP
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
