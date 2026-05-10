"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight, Swords } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"

const matches = [
  {
    id: "williams-brooks",
    featured: true,
    date: new Date("2026-06-06T19:00:00"),
    dateLabel: "June 6, 2026",
    time: "7:00 PM EST",
    venue: "Madison Square Garden",
    city: "New York, NY",
    weightClass: "Heavyweight",
    rounds: 12,
    belt: "NY State Amateur Title",
    fighter1: {
      name: "Marcus Williams",
      nickname: "The Storm",
      record: "28-1-0",
      image: "/fighter-1.png",
      corner: "NextUp Boxing",
    },
    fighter2: {
      name: "Devon Brooks",
      nickname: "The Bull",
      record: "24-3-0",
      image: "/fighter-2.png",
      corner: "Brooklyn Elite Gym",
    },
  },
  {
    id: "davis-reeves",
    featured: false,
    date: new Date("2026-06-06T18:00:00"),
    dateLabel: "June 6, 2026",
    time: "6:00 PM EST",
    venue: "Madison Square Garden",
    city: "New York, NY",
    weightClass: "Light Heavyweight",
    rounds: 10,
    belt: null,
    fighter1: {
      name: "Jamal Davis",
      nickname: "Iron Jaw",
      record: "25-2-0",
      image: null,
      initials: "JD",
      corner: "NextUp Boxing",
    },
    fighter2: {
      name: "Tommy Reeves",
      nickname: "The Closer",
      record: "20-4-1",
      image: null,
      initials: "TR",
      corner: "Champions Gym NYC",
    },
  },
  {
    id: "mendez-santos",
    featured: false,
    date: new Date("2026-07-12T16:00:00"),
    dateLabel: "July 12, 2026",
    time: "4:00 PM EST",
    venue: "Barclays Center",
    city: "Brooklyn, NY",
    weightClass: "Middleweight",
    rounds: 10,
    belt: null,
    fighter1: {
      name: "Carlos Mendez",
      nickname: "El Relámpago",
      record: "30-1-1",
      image: null,
      initials: "CM",
      corner: "NextUp Boxing",
    },
    fighter2: {
      name: "Rico Santos",
      nickname: "La Cobra",
      record: "22-2-0",
      image: null,
      initials: "RS",
      corner: "Santos Boxing Academy",
    },
  },
]

function CountdownBar({ date }: { date: Date }) {
  const t = useCountdown(date)
  const units = [
    { v: t.days, l: "D" },
    { v: t.hours, l: "H" },
    { v: t.minutes, l: "M" },
    { v: t.seconds, l: "S" },
  ]
  return (
    <div className="flex items-center gap-1">
      {units.map((u, i) => (
        <span key={u.l} className="flex items-center gap-1">
          <span className="tabular-nums font-bold text-[#b8962e] text-sm"
            style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.1rem' }}>
            {String(u.v).padStart(2, "0")}
          </span>
          <span className="text-[9px] font-bold text-[#b8962e]/50 uppercase tracking-wider">{u.l}</span>
          {i < 3 && <span className="text-[#b8962e]/30 font-bold ml-0.5">:</span>}
        </span>
      ))}
    </div>
  )
}

function FighterAvatar({
  fighter, side,
}: {
  fighter: typeof matches[0]["fighter1"]
  side: "left" | "right"
}) {
  return (
    <div className={`flex flex-col items-center text-center ${side === "right" ? "items-center" : "items-center"}`}>
      {/* Photo / initials */}
      <div className="relative mb-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden bg-[#1e2d5e]/8 border border-[#1e2d5e]/10 group-hover:border-[#b8962e]/30 transition-colors">
          {"image" in fighter && fighter.image ? (
            <img
              src={fighter.image}
              alt={fighter.name}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e2d5e] to-[#2a3d7a]">
              <span className="font-bold text-white/40 text-lg"
                style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}>
                {"initials" in fighter ? (fighter as { initials?: string }).initials : ""}
              </span>
            </div>
          )}
        </div>
        {/* Corner badge */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#c5203a] border-2 border-white flex items-center justify-center">
          <span className="text-[6px] font-black text-white leading-none">NU</span>
        </div>
      </div>
      <p className="text-sm font-bold text-[#0d1124] leading-tight">{fighter.name}</p>
      <p className="text-[10px] font-bold text-[#c5203a] tracking-wide">"{fighter.nickname}"</p>
      <p className="text-[10px] text-[#1e2d5e]/45 font-medium mt-0.5">{fighter.record}</p>
    </div>
  )
}

export function UpcomingMatches() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const featured = matches[0]
  const others = matches.slice(1)

  return (
    <section id="upcoming-fights" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
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
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Fight Schedule</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#1e2d5e] uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Upcoming{" "}
              <span style={{ color: '#c5203a' }}>Matches</span>
            </motion.h2>
          </div>
          <motion.a href="#events"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 hover:text-[#c5203a] transition-colors group">
            Full Fight Calendar <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Featured bout — large card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="group relative rounded-sm overflow-hidden border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/20 hover:shadow-2xl hover:shadow-[#1e2d5e]/8 transition-all duration-500 mb-5"
        >
          {/* Top brand bar */}
          <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#b8962e]" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#c5203a]/6 border border-[#c5203a]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5203a] animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c5203a]">Main Event</span>
              </div>
              {featured.belt && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#b8962e]/6 border border-[#b8962e]/15">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b8962e]">🏆 {featured.belt}</span>
                </div>
              )}
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1e2d5e]/35">{featured.weightClass} · {featured.rounds} Rounds</span>
            </div>

            {/* Fighter matchup */}
            <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4 sm:gap-8 mb-8">
              {/* Fighter 1 */}
              <FighterAvatar fighter={featured.fighter1} side="left" />

              {/* VS divider */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-8 bg-[#1e2d5e]/10" />
                <div className="w-10 h-10 rounded-full border-2 border-[#1e2d5e]/10 flex items-center justify-center">
                  <span className="text-[11px] font-black text-[#1e2d5e]/40 uppercase tracking-wider">VS</span>
                </div>
                <div className="w-px h-8 bg-[#1e2d5e]/10" />
              </div>

              {/* Fighter 2 */}
              <FighterAvatar fighter={featured.fighter2} side="right" />
            </div>

            {/* Event details + countdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-6 border-t border-[#1e2d5e]/6">
              <div className="flex flex-wrap gap-5">
                {[
                  { icon: Calendar, text: featured.dateLabel },
                  { icon: Clock, text: featured.time },
                  { icon: MapPin, text: `${featured.venue}, ${featured.city}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[#1e2d5e]/50">
                    <Icon className="w-3.5 h-3.5 text-[#b8962e]" />
                    <span className="text-xs font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {/* Live countdown */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1e2d5e]/30 mb-1">Countdown</p>
                  <CountdownBar date={featured.date} />
                </div>

                <a href="#events"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.18em] text-[11px] rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#c5203a]/25 hover:-translate-y-0.5 group flex-shrink-0">
                  Get Tickets
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Undercard bouts — list rows */}
        <div className="space-y-3">
          {others.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group relative rounded-sm border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/18 hover:bg-[#1e2d5e]/[0.015] transition-all duration-300 cursor-pointer"
            >
              {/* Thin top bar */}
              <div className="h-[2px] bg-gradient-to-r from-[#1e2d5e]/20 via-[#b8962e]/30 to-[#c5203a]/20 group-hover:from-[#1e2d5e]/40 group-hover:via-[#b8962e]/60 group-hover:to-[#c5203a]/40 transition-all duration-300" />

              <div className="flex items-center gap-4 p-5">
                {/* Weight class badge */}
                <div className="hidden sm:flex flex-col items-center justify-center w-20 flex-shrink-0 border-r border-[#1e2d5e]/8 pr-4 mr-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 text-center leading-tight">
                    {match.weightClass}
                  </span>
                  <span className="text-[9px] text-[#1e2d5e]/25 mt-1">{match.rounds}R</span>
                </div>

                {/* Fighter 1 */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-[#1e2d5e]/6">
                    {"image" in match.fighter1 && match.fighter1.image ? (
                      <img src={match.fighter1.image} alt={match.fighter1.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e2d5e] to-[#2a3d7a]">
                        <span className="text-[10px] font-bold text-white/40">
                          {"initials" in match.fighter1 ? (match.fighter1 as { initials?: string }).initials : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0d1124] truncate">{match.fighter1.name}</p>
                    <p className="text-[10px] text-[#1e2d5e]/40">{match.fighter1.record}</p>
                  </div>
                </div>

                {/* VS */}
                <div className="flex-shrink-0 flex items-center">
                  <Swords className="w-4 h-4 text-[#1e2d5e]/20 group-hover:text-[#c5203a]/50 transition-colors" />
                </div>

                {/* Fighter 2 */}
                <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                  <div className="min-w-0 text-right">
                    <p className="text-sm font-bold text-[#0d1124] truncate">{match.fighter2.name}</p>
                    <p className="text-[10px] text-[#1e2d5e]/40">{match.fighter2.record}</p>
                  </div>
                  <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-[#1e2d5e]/6">
                    {"image" in match.fighter2 && match.fighter2.image ? (
                      <img src={match.fighter2.image} alt={match.fighter2.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a3d7a] to-[#1e2d5e]">
                        <span className="text-[10px] font-bold text-white/40">
                          {"initials" in match.fighter2 ? (match.fighter2 as { initials?: string }).initials : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date + venue */}
                <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0 border-l border-[#1e2d5e]/8 pl-5 ml-1">
                  <div className="flex items-center gap-1.5 text-[#1e2d5e]/50">
                    <Calendar className="w-3 h-3 text-[#b8962e]" />
                    <span className="text-[10px] font-medium">{match.dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1e2d5e]/35">
                    <MapPin className="w-3 h-3 text-[#b8962e]/60" />
                    <span className="text-[10px]">{match.venue}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#1e2d5e]/15 group-hover:text-[#c5203a] transition-colors flex-shrink-0 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
