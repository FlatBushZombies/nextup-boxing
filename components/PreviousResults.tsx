"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronRight, Trophy } from "lucide-react"

type Method = "KO" | "TKO" | "UD" | "SD" | "MD" | "RTD"

const results: {
  id: string
  date: string
  event: string
  venue: string
  weightClass: string
  rounds: number
  winner: { name: string; nickname: string; record: string; image: string | null; initials?: string; club: string }
  loser: { name: string; nickname: string; record: string; image: string | null; initials?: string; club: string }
  method: Method
  round: number
  time: string
  title: boolean
  nextupFighter: "winner" | "loser"
}[] = [
  {
    id: "williams-johnson",
    date: "April 5, 2026",
    event: "NextUp Spring Showdown",
    venue: "Barclays Center, Brooklyn",
    weightClass: "Heavyweight",
    rounds: 12,
    winner: { name: "Marcus Williams", nickname: "The Storm", record: "28-1-0", image: "/fighter-1.png", club: "NextUp Boxing" },
    loser: { name: "Derek Johnson", nickname: "Big D", record: "21-5-0", image: null, initials: "DJ", club: "Harlem Boxing" },
    method: "KO",
    round: 8,
    time: "2:34",
    title: true,
    nextupFighter: "winner",
  },
  {
    id: "davis-kim",
    date: "April 5, 2026",
    event: "NextUp Spring Showdown",
    venue: "Barclays Center, Brooklyn",
    weightClass: "Light Heavyweight",
    rounds: 10,
    winner: { name: "Jamal Davis", nickname: "Iron Jaw", record: "25-2-0", image: null, initials: "JD", club: "NextUp Boxing" },
    loser: { name: "Sean Kim", nickname: "The Tiger", record: "18-4-0", image: null, initials: "SK", club: "Queens Boxing Academy" },
    method: "UD",
    round: 10,
    time: "3:00",
    title: false,
    nextupFighter: "winner",
  },
  {
    id: "tanaka-russo",
    date: "March 14, 2026",
    event: "Brooklyn Fight Night Vol. 3",
    venue: "Aviator Sports, Brooklyn",
    weightClass: "Super Middleweight",
    rounds: 8,
    winner: { name: "Kenji Tanaka", nickname: "Thunder", record: "27-2-0", image: null, initials: "KT", club: "NextUp Boxing" },
    loser: { name: "Luca Russo", nickname: "Italian Stallion", record: "15-3-1", image: null, initials: "LR", club: "Russo Boxing Club" },
    method: "TKO",
    round: 5,
    time: "1:12",
    title: false,
    nextupFighter: "winner",
  },
  {
    id: "mendez-ali",
    date: "March 14, 2026",
    event: "Brooklyn Fight Night Vol. 3",
    venue: "Aviator Sports, Brooklyn",
    weightClass: "Middleweight",
    rounds: 10,
    winner: { name: "Carlos Mendez", nickname: "El Relámpago", record: "30-1-1", image: null, initials: "CM", club: "NextUp Boxing" },
    loser: { name: "Omar Ali", nickname: "The Phantom", record: "19-3-0", image: null, initials: "OA", club: "Ali Boxing Academy" },
    method: "SD",
    round: 10,
    time: "3:00",
    title: false,
    nextupFighter: "winner",
  },
  {
    id: "petrov-chen",
    date: "February 22, 2026",
    event: "NextUp Fight Night",
    venue: "NextUp Gym, Brooklyn",
    weightClass: "Welterweight",
    rounds: 8,
    winner: { name: "Liu Chen", nickname: "The Dragon", record: "14-1-0", image: null, initials: "LC", club: "Flushing Boxing" },
    loser: { name: "Viktor Petrov", nickname: "The Machine", record: "22-3-0", image: null, initials: "VP", club: "NextUp Boxing" },
    method: "MD",
    round: 8,
    time: "3:00",
    title: false,
    nextupFighter: "loser",
  },
]

const methodColors: Record<Method, { bg: string; text: string; label: string }> = {
  KO:  { bg: "#c5203a12", text: "#c5203a", label: "KO" },
  TKO: { bg: "#c5203a0d", text: "#c5203a", label: "TKO" },
  UD:  { bg: "#1e2d5e10", text: "#1e2d5e", label: "Unanimous Decision" },
  SD:  { bg: "#b8962e10", text: "#b8962e", label: "Split Decision" },
  MD:  { bg: "#b8962e10", text: "#b8962e", label: "Majority Decision" },
  RTD: { bg: "#c5203a0d", text: "#c5203a", label: "RTD" },
}

function SmallAvatar({ name, initials, image, isWinner }: { name: string; initials?: string; image: string | null; isWinner: boolean }) {
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm overflow-hidden flex-shrink-0 relative border-2 transition-colors"
      style={{ borderColor: isWinner ? "rgba(184,150,46,0.4)" : "rgba(13,17,36,0.06)" }}>
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full flex items-center justify-center"
          style={{ background: isWinner ? "linear-gradient(135deg,#1e2d5e,#2a3d7a)" : "linear-gradient(135deg,#3a3a4a,#555)" }}>
          <span className="text-[10px] font-bold text-white/50"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}>
            {initials}
          </span>
        </div>
      )}
      {isWinner && (
        <div className="absolute inset-0 ring-1 ring-[#b8962e]/40 rounded-sm pointer-events-none" />
      )}
    </div>
  )
}

export function PreviousResults() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="results" ref={ref} className="relative py-20 sm:py-28 bg-[#0d1124] overflow-hidden">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px', mixBlendMode: 'overlay',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Ghost watermark */}
      <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none overflow-hidden select-none">
        <span className="text-white/[0.02] uppercase"
          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(8rem, 20vw, 16rem)', lineHeight: 1 }}>
          RESULTS
        </span>
      </div>

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
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Fight Results</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Previous{" "}
              <span style={{ color: '#b8962e' }}>Results</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">2025–2026 Season</span>
          </motion.div>
        </div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden sm:grid gap-4 px-5 pb-3 border-b border-white/6 mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/20"
          style={{ gridTemplateColumns: "120px 1fr auto 1fr auto" }}
        >
          <span>Date</span>
          <span>Winner</span>
          <span className="text-center">Result</span>
          <span className="text-right">Defeated</span>
          <span className="w-5" />
        </motion.div>

        {/* Result rows */}
        <div className="divide-y divide-white/5">
          {results.map((r, i) => {
            const mc = methodColors[r.method]
            const isNextupWinner = r.nextupFighter === "winner"
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="group relative flex flex-col sm:grid gap-4 py-5 px-5 hover:bg-white/[0.025] transition-colors cursor-pointer"
                style={{ gridTemplateColumns: "120px 1fr auto 1fr auto" }}
              >
                {/* Title banner for championship wins */}
                {r.title && isNextupWinner && (
                  <div className="absolute top-2 right-14 flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-[#b8962e]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b8962e]">Title Win</span>
                  </div>
                )}

                {/* Date + event — mobile label */}
                <div className="flex sm:flex-col gap-2 sm:gap-1 sm:justify-center">
                  <span className="text-[10px] font-bold text-white/50">{r.date}</span>
                  <span className="text-[9px] text-white/25 hidden sm:block leading-tight">{r.event}</span>
                </div>

                {/* Winner */}
                <div className="flex items-center gap-3">
                  <SmallAvatar name={r.winner.name} initials={r.winner.initials} image={r.winner.image} isWinner={true} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-white truncate group-hover:text-[#b8962e] transition-colors">
                        {r.winner.name}
                      </p>
                      {r.nextupFighter === "winner" && (
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#b8962e]/60 border border-[#b8962e]/20 px-1.5 py-0.5 rounded-sm flex-shrink-0">
                          NU
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-white/30">"{r.winner.nickname}"</p>
                    <p className="text-[10px] font-medium text-[#b8962e]/70 mt-0.5">{r.winner.record}</p>
                  </div>
                </div>

                {/* Method badge */}
                <div className="flex flex-col items-center justify-center gap-1.5 my-auto">
                  <div className="px-3 py-1.5 rounded-sm text-center"
                    style={{ background: mc.bg, border: `1px solid ${mc.text}20` }}>
                    <span className="text-[11px] font-black uppercase tracking-wider block" style={{ color: mc.text }}>
                      {r.method}
                    </span>
                    <span className="text-[9px] text-white/25 block">
                      R{r.round} · {r.time}
                    </span>
                  </div>
                  <span className="text-[8px] text-white/20 uppercase tracking-wider hidden sm:block text-center">
                    {r.weightClass}
                  </span>
                </div>

                {/* Loser */}
                <div className="flex items-center gap-3 sm:justify-end">
                  <div className="min-w-0 sm:text-right">
                    <div className="flex items-center gap-2 mb-0.5 sm:justify-end">
                      {r.nextupFighter === "loser" && (
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#c5203a]/50 border border-[#c5203a]/15 px-1.5 py-0.5 rounded-sm flex-shrink-0">
                          NU
                        </span>
                      )}
                      <p className="text-sm font-bold text-white/50 truncate">{r.loser.name}</p>
                    </div>
                    <p className="text-[9px] text-white/20">"{r.loser.nickname}"</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{r.loser.record}</p>
                  </div>
                  <SmallAvatar name={r.loser.name} initials={r.loser.initials} image={r.loser.image} isWinner={false} />
                </div>

                <ChevronRight className="hidden sm:block w-4 h-4 text-white/10 group-hover:text-[#b8962e] transition-colors flex-shrink-0 self-center ml-auto" />
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-white/6"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#b8962e]/30" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
              NU = NextUp Boxing Club Fighter
            </span>
          </div>
          <a href="#"
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/10 hover:border-[#b8962e]/35 text-white/40 hover:text-[#b8962e] font-bold uppercase tracking-[0.18em] text-[11px] rounded-sm transition-all duration-300 group">
            View Full Archive
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/15 to-transparent" />
    </section>
  )
}
