"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Trophy, ChevronRight } from "lucide-react"

const fighters = [
  {
    rank: 1,
    name: "Marcus Williams",
    nickname: "The Storm",
    division: "Heavyweight",
    record: "28-1-0",
    ko: 22,
    image: "/fighter-1.png",
    age: 24,
    titles: ["NY State Amateur Champion", "USA Boxing Regional Title"],
    highlight: true,
  },
  {
    rank: 2,
    name: "Jamal Davis",
    nickname: "Iron Jaw",
    division: "Light Heavyweight",
    record: "25-2-0",
    ko: 18,
    image: "/fighter-2.png",
    age: 22,
    titles: ["Northeast Amateur Champion"],
    highlight: false,
  },
  {
    rank: 3,
    name: "Carlos Mendez",
    nickname: "El Relámpago",
    division: "Middleweight",
    record: "30-1-1",
    ko: 24,
    initials: "CM",
    age: 26,
    titles: ["2x National Qualifier"],
    highlight: false,
  },
  {
    rank: 4,
    name: "Kenji Tanaka",
    nickname: "Thunder",
    division: "Super Middleweight",
    record: "27-2-0",
    ko: 20,
    initials: "KT",
    age: 23,
    titles: ["NY Golden Gloves Finalist"],
    highlight: false,
  },
]

export function FeaturedFighters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="fighters" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Our Athletes</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#1e2d5e] uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Featured{" "}
              <span style={{ color: '#c5203a' }}>Fighters</span>
            </motion.h2>
          </div>
          <motion.a href="#rankings"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 hover:text-[#c5203a] transition-colors group"
          >
            Full Roster <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Cards — asymmetric grid: featured (large) + 3 standard */}
        <div className="grid lg:grid-cols-[1fr,1fr,1fr,1fr] gap-5">
          {fighters.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`group relative rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                f.highlight
                  ? "hover:shadow-[#c5203a]/15 border border-[#1e2d5e]/8"
                  : "border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/20"
              }`}
            >
              {/* Photo area */}
              <div className={`relative overflow-hidden ${f.highlight ? "h-72 sm:h-80" : "h-56 sm:h-64"} bg-[#1e2d5e]/5`}>
                {"image" in f && f.image ? (
                  <Image src={f.image} alt={f.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="400px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(145deg, #1e2d5e 0%, #2a3d7a 100%)' }}>
                    <span className="font-black text-white/20" style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '4rem',
                    }}>{"initials" in f ? f.initials : ""}</span>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Rank badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  {f.rank === 1 && <Trophy className="w-3 h-3 text-[#b8962e]" />}
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]"
                    style={{ color: f.rank === 1 ? '#b8962e' : 'rgba(255,255,255,0.4)' }}>
                    #{f.rank} Ranked
                  </span>
                </div>
                {/* Highlight bar */}
                {f.highlight && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-[#c5203a]" />
                )}
              </div>

              {/* Info panel */}
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-bold text-[#0d1124] text-base leading-tight">{f.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5203a] mt-0.5">"{f.nickname}"</p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/35 flex-shrink-0 mt-0.5">
                    Age {f.age}
                  </span>
                </div>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#1e2d5e]/50 mb-4">{f.division}</p>

                {/* Stats row */}
                <div className="flex gap-4 pb-4 border-b border-[#1e2d5e]/6 mb-4">
                  <div>
                    <span className="block font-bold text-[#0d1124] text-sm">{f.record}</span>
                    <span className="text-[9px] text-[#1e2d5e]/35 uppercase tracking-wider">W-L-D</span>
                  </div>
                  <div className="w-px bg-[#1e2d5e]/8" />
                  <div>
                    <span className="block font-bold text-[#b8962e] text-sm">{f.ko}</span>
                    <span className="text-[9px] text-[#1e2d5e]/35 uppercase tracking-wider">KOs</span>
                  </div>
                </div>

                {/* Titles */}
                {f.titles.map((t) => (
                  <div key={t} className="flex items-center gap-2 mb-1">
                    <span className="w-1 h-1 rounded-full bg-[#b8962e] flex-shrink-0" />
                    <span className="text-[10px] text-[#1e2d5e]/55">{t}</span>
                  </div>
                ))}

                {/* View profile link */}
                <div className="mt-4 pt-4 border-t border-[#1e2d5e]/6">
                  <a href="#" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 group-hover:text-[#c5203a] transition-colors">
                    View Profile <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
