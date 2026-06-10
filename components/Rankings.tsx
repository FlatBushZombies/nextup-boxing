"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronRight, Trophy } from "lucide-react"

const fighters = [
  {
    rank: 1,
    name: "Marcus 'The Storm' Williams",
    nickname: "The Storm",
    division: "Heavyweight",
    record: "28-1-0",
    ko: 22,
    image: "/fighter-1.png",
    champion: true,
  },
  {
    rank: 2,
    name: "Jamal 'Iron Jaw' Davis",
    nickname: "Iron Jaw",
    division: "Light Heavyweight",
    record: "25-2-0",
    ko: 18,
    image: "/fighter-2.png",
    champion: false,
  },
  {
    rank: 3,
    name: "Carlos 'El Relampago' Mendez",
    nickname: "El Relampago",
    division: "Middleweight",
    record: "30-1-1",
    ko: 24,
    initials: "CM",
    champion: false,
  },
  {
    rank: 4,
    name: "Viktor 'The Machine' Petrov",
    nickname: "The Machine",
    division: "Welterweight",
    record: "22-3-0",
    ko: 15,
    initials: "VP",
    champion: false,
  },
  {
    rank: 5,
    name: "Kenji 'Thunder' Tanaka",
    nickname: "Thunder",
    division: "Super Middleweight",
    record: "27-2-0",
    ko: 20,
    initials: "KT",
    champion: false,
  },
]

export function Rankings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="rankings" ref={ref} className="relative overflow-hidden bg-[#0d1124] text-white py-20 sm:py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="section-eyebrow text-[#c5203a]">Fighter Rankings</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="uppercase leading-[0.88] font-display text-[clamp(3rem, 7vw, 6rem)] text-white"
            >
              Pound For
              <span className="block text-[#c5203a]">Pound</span>
            </motion.h2>
          </div>

          <div className="flex items-end gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-right"
            >
              <p className="editorial-meta mb-1 text-white/40">Last Updated</p>
              <p className="text-xs font-medium text-white/40">May 2026 | Vol. I</p>
            </motion.div>

            <motion.a
              href="#events"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="editorial-button group hidden items-center gap-2 text-white/60 transition-colors hover:text-[#c5203a] sm:inline-flex"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-0 hidden grid-cols-[64px,1fr,120px,80px,80px,48px] gap-4 border-b-2 border-white/10 px-4 pb-3 sm:grid"
        >
          <span className="editorial-meta text-white/40">#</span>
          <span className="editorial-meta text-white/40">Fighter</span>
          <span className="editorial-meta text-white/40">Division</span>
          <span className="editorial-meta text-right text-white/40">Record</span>
          <span className="editorial-meta text-right text-white/40">KOs</span>
          <span />
        </motion.div>

        <div className="divide-y divide-white/10 overflow-hidden rounded-[1.5rem] border border-white/10">
          {fighters.map((fighter, index) => (
            <motion.div
              key={fighter.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
              className={`group relative flex cursor-pointer items-center gap-4 px-4 py-5 transition-all duration-300 hover:bg-white/5 ${
                fighter.champion ? "bg-white/5" : "bg-[#111827]"
              }`}
            >
              {fighter.champion ? (
                <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#b8962e]" />
              ) : null}

              <div className="flex w-16 flex-shrink-0 items-center justify-center">
                <span
                  className="tabular-nums leading-none font-display text-[clamp(2rem,4vw,3rem)]"
                  style={{
                    color: fighter.champion ? "#b8962e" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {fighter.rank}
                </span>
              </div>

              <div className="relative flex-shrink-0">
                <div
                  className={`absolute -inset-0.5 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 ${
                    fighter.champion ? "bg-[#b8962e]/20" : "bg-[#c5203a]/12"
                  }`}
                />
                <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white/10 shadow-sm transition-shadow group-hover:shadow-md sm:h-14 sm:w-14">
                  {"image" in fighter && fighter.image ? (
                    <Image
                      src={fighter.image}
                      alt={fighter.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background: fighter.champion
                          ? "linear-gradient(135deg, #b8962e, #c9a435)"
                          : "linear-gradient(135deg, #1e2d5e, #2a3d7a)",
                      }}
                    >
                      <span className="text-sm font-bold text-white">
                        {"initials" in fighter ? fighter.initials : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[1fr,120px,80px,80px] sm:items-center sm:gap-4">
                <div className="min-w-0">
                  <div className="mb-0.5 flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-[#c5203a] sm:text-[15px]">
                      {fighter.name}
                    </h3>
                    {fighter.champion ? <Trophy className="h-3 w-3 flex-shrink-0 text-[#b8962e]" /> : null}
                  </div>
                  <p className="editorial-meta text-white/40 sm:hidden">{fighter.division}</p>
                </div>

                <p className="hidden text-xs font-medium uppercase tracking-[0.16em] text-white/50 sm:block">
                  {fighter.division}
                </p>

                <div className="hidden text-right sm:block">
                  <span className="text-sm font-semibold text-white">{fighter.record}</span>
                </div>

                <div className="hidden text-right sm:block">
                  <span className="text-sm font-semibold text-[#b8962e]">{fighter.ko}</span>
                </div>
              </div>

              <div className="flex-shrink-0 text-right sm:hidden">
                <span className="text-sm font-semibold text-white">{fighter.record}</span>
                <span className="mt-0.5 block text-[0.65rem] uppercase tracking-[0.18em] text-white/40">
                  W-L-D
                </span>
              </div>

              <ChevronRight className="h-4 w-4 flex-shrink-0 text-white/40 transition-colors group-hover:text-[#c5203a]" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-10 flex items-center justify-center gap-4 border-t border-white/10 pt-8"
        >
          <span className="h-px w-12 bg-[#b8962e]/25" />
          <Trophy className="h-4 w-4 text-[#b8962e]/40" />
          <span className="editorial-meta text-white/30">Official NextUp Rankings | May 2026</span>
          <Trophy className="h-4 w-4 text-[#b8962e]/40" />
          <span className="h-px w-12 bg-[#b8962e]/25" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}
