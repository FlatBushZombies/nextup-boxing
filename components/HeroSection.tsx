"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"

const stats = [
  { value: "200+", label: "Active Members" },
  { value: "15+", label: "Coaches & Staff" },
  { value: "47", label: "Championships Won" },
  { value: "12", label: "Years of Excellence" },
]

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section ref={ref} id="hero" className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-[#0d1124]">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/hero-boxers.png"
          alt="NextUp Boxing Club — developing champions"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Multi-layer overlay for editorial drama */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-[#0d1124]/60 to-[#0d1124]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/80 via-transparent to-transparent" />
      </motion.div>

      {/* Grain texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
        }}
      />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c5203a]" />

      {/* Vertical side label */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b8962e]/30 to-transparent" />
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20"
          style={{ writingMode: 'vertical-rl' }}>
          Est. 2014 · Brooklyn, NY
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b8962e]/30 to-transparent" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 sm:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-[#c5203a]" />
          <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
            NextUp Boxing League · Est. 2014
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase leading-[0.85] mb-6 text-white"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: 'clamp(4.5rem, 12vw, 11rem)',
            }}
          >
            <span className="block">Forging</span>
            <span className="block" style={{
              background: 'linear-gradient(135deg, #c5203a 0%, #b8962e 55%, #d4ae44 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Tomorrow's</span>
            <span className="block">Champions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-white/55 max-w-lg leading-relaxed mb-10"
            style={{ fontSize: '1.05rem', lineHeight: '1.8' }}
          >
            World-class training. Elite coaching. A community built on discipline, 
            respect, and the relentless pursuit of greatness. From first-timers 
            to championship contenders — your journey starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a href="#membership"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5203a]/35 hover:-translate-y-1 group">
              Join the Club
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#programs"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 border border-white/20 hover:border-[#b8962e]/60 text-white/80 hover:text-[#b8962e] font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:-translate-y-1">
              Explore Programs
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-8 sm:gap-14 pt-8 border-t border-white/8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <span className="block text-[#b8962e] leading-none mb-1"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                  {s.value}
                </span>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll CTA */}
      <motion.button onClick={handleScrollDown}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/25 group-hover:text-[#b8962e] transition-colors">
          Scroll to Explore
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-[#b8962e] transition-colors" />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
