"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock, Star, Users, Dumbbell } from "lucide-react"

const programs = [
  {
    id: "youth",
    tag: "Ages 8–17",
    title: "Youth Boxing",
    subtitle: "Junior Development Program",
    description: "A structured, safe environment where young athletes learn the fundamentals of boxing, build confidence, and develop discipline that extends beyond the gym.",
    features: ["Mon / Wed / Fri · 4–6 PM", "Beginner to Intermediate", "USA Boxing Safety Standards", "Character & Leadership Focus"],
    icon: Star,
    price: "$120",
    period: "/month",
    dark: false,
    accent: "#c5203a",
  },
  {
    id: "amateur",
    tag: "Competitive Track",
    title: "Amateur Competition",
    subtitle: "Elite Amateur Program",
    description: "For dedicated athletes pursuing regional, national, and international amateur competitions. Full sparring, strength & conditioning, and fight camp preparation.",
    features: ["6 Days/Week · Full Access", "Competition & Fight Prep", "Strength & Conditioning", "Nutrition Guidance"],
    icon: Dumbbell,
    price: "$200",
    period: "/month",
    dark: true,
    accent: "#b8962e",
  },
  {
    id: "fitness",
    tag: "All Levels",
    title: "Fitness Boxing",
    subtitle: "Boxing-Based Fitness",
    description: "Get in the best shape of your life using boxing training methods. No competitive pressure — just incredible workouts, technique, and community.",
    features: ["Flexible Schedule", "Bag Work & Mitts", "Cardio & Core Training", "No Experience Required"],
    icon: Users,
    price: "$95",
    period: "/month",
    dark: false,
    accent: "#c5203a",
  },
  {
    id: "personal",
    tag: "1-on-1",
    title: "Personal Coaching",
    subtitle: "Private Training Sessions",
    description: "One-on-one sessions with our elite coaching staff. Customized training plans, focused technique work, and accelerated development.",
    features: ["Flexible Scheduling", "Certified Head Coaches", "Custom Training Plan", "Video Analysis Included"],
    icon: Clock,
    price: "$80",
    period: "/session",
    dark: false,
    accent: "#1e2d5e",
  },
]

export function TrainingPrograms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="programs" ref={ref} className="relative py-20 sm:py-28 bg-[#0d1124] overflow-hidden">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
        }}
      />

      {/* Brand gradient top rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Training Programs</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Find Your{" "}
              <span style={{ color: '#b8962e' }}>Path</span>
            </motion.h2>
          </div>
          <motion.a
            href="#membership" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 hover:text-[#b8962e] transition-colors group"
          >
            View All Programs
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Program cards — 2×2 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className={`group relative rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                prog.dark
                  ? "bg-[#1e2d5e] border border-[#b8962e]/20 hover:border-[#b8962e]/50"
                  : "bg-white/4 border border-white/8 hover:border-white/20 hover:bg-white/6"
              }`}
            >
              {/* Top accent bar */}
              <div className="h-[3px] w-full" style={{ background: prog.accent }} />

              <div className="p-6 sm:p-7 flex flex-col h-full">
                {/* Tag + icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]"
                    style={{ color: prog.accent }}>
                    {prog.tag}
                  </span>
                  <div className="w-9 h-9 rounded-sm border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: `${prog.accent}30`, background: `${prog.accent}10` }}>
                    <prog.icon className="w-4 h-4" style={{ color: prog.accent }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white uppercase leading-[0.9] mb-1"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.9rem' }}>
                  {prog.title}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 mb-4">
                  {prog.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-white/45 leading-relaxed mb-6 flex-1" style={{ lineHeight: '1.75' }}>
                  {prog.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: prog.accent }} />
                      <span className="text-[10px] text-white/45 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-end justify-between pt-5 border-t border-white/8">
                  <div>
                    <span className="font-bold text-white" style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.6rem',
                    }}>
                      {prog.price}
                    </span>
                    <span className="text-[10px] text-white/30 font-medium ml-1">{prog.period}</span>
                  </div>
                  <a href="#membership"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group-hover:text-white"
                    style={{ color: prog.accent }}>
                    Enroll
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/15 to-transparent" />
    </section>
  )
}
