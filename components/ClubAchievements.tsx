"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, Star, Medal, Award, ChevronRight } from "lucide-react"

const stats = [
  { value: "47", label: "Championship Titles", icon: Trophy },
  { value: "12", label: "Years of Excellence", icon: Star },
  { value: "200+", label: "Active Members", icon: Medal },
  { value: "3", label: "National Champions", icon: Award },
]

const achievements = [
  {
    year: "2025",
    title: "NY State Amateur Championship",
    desc: "Marcus Williams wins heavyweight title — club's 47th championship",
    tier: "gold",
  },
  {
    year: "2025",
    title: "USA Boxing Regionals — 4 Medals",
    desc: "Historic performance: 2 gold, 1 silver, 1 bronze across weight classes",
    tier: "gold",
  },
  {
    year: "2024",
    title: "Northeast Amateur Tournament",
    desc: "Club wins team trophy for third consecutive year",
    tier: "silver",
  },
  {
    year: "2024",
    title: "NY Golden Gloves — 3 Finalists",
    desc: "Tanaka, Mendez, and Brooks all reach championship bouts",
    tier: "silver",
  },
  {
    year: "2023",
    title: "Best Emerging Club Award",
    desc: "USA Boxing recognizes NextUp for athlete development excellence",
    tier: "bronze",
  },
]

const tierColors: Record<string, string> = {
  gold: "#b8962e",
  silver: "#8a9ab0",
  bronze: "#c5203a",
}

export function ClubAchievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="rankings" ref={ref} className="relative py-20 sm:py-28 bg-[#0d1124] overflow-hidden">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Ghost headline watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-white/[0.025] uppercase"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(8rem, 20vw, 18rem)', letterSpacing: '0.02em', lineHeight: 1 }}>
          LEGACY
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-10 bg-[#c5203a]" />
          <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Club Legacy</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white uppercase leading-[0.88] mb-14"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
        >
          Rankings &amp;{" "}
          <span style={{ color: '#b8962e' }}>Achievements</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-20">

          {/* Left: Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="group p-6 border border-white/8 rounded-sm hover:border-[#b8962e]/30 hover:bg-white/3 transition-all duration-300"
                >
                  <s.icon className="w-5 h-5 text-[#b8962e] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-white leading-none mb-2"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Pound-for-pound rankings mini-table */}
            <div className="border border-white/8 rounded-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
                <Trophy className="w-3.5 h-3.5 text-[#b8962e]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                  Club Power Rankings · May 2026
                </span>
              </div>
              {[
                { rank: 1, name: "Marcus Williams", div: "Heavyweight", record: "28-1" },
                { rank: 2, name: "Jamal Davis", div: "Light Heavy", record: "25-2" },
                { rank: 3, name: "Carlos Mendez", div: "Middleweight", record: "30-1-1" },
                { rank: 4, name: "Kenji Tanaka", div: "Super Middle", record: "27-2" },
                { rank: 5, name: "Viktor Petrov", div: "Welterweight", record: "22-3" },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  className="flex items-center gap-4 px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group cursor-pointer"
                >
                  <span className="w-6 text-center font-bold text-[#b8962e]/60 flex-shrink-0"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.2rem' }}>
                    {r.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:text-[#b8962e] transition-colors">{r.name}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-wider">{r.div}</p>
                  </div>
                  <span className="text-xs font-bold text-white/40">{r.record}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#b8962e] transition-colors flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Achievement timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-[#b8962e]/40" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/25">Recent Achievements</span>
            </div>

            <div className="space-y-0">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative flex gap-6 pb-8 last:pb-0 group"
                >
                  {/* Timeline line */}
                  {i < achievements.length - 1 && (
                    <div className="absolute left-[19px] top-8 bottom-0 w-px bg-white/8" />
                  )}

                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm border flex items-center justify-center z-10"
                    style={{ borderColor: `${tierColors[a.tier]}30`, background: `${tierColors[a.tier]}10` }}>
                    <Trophy className="w-4 h-4" style={{ color: tierColors[a.tier] }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-2 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: tierColors[a.tier] }}>
                        {a.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1 leading-tight">{a.title}</h4>
                    <p className="text-xs text-white/35 leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/15 to-transparent" />
    </section>
  )
}
