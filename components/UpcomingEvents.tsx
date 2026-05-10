"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"

const EVENT_DATE = new Date("2026-06-06T19:00:00")

const events = [
  {
    id: "championship-night",
    badge: "Main Event",
    title: "NextUp Championship Night",
    subtitle: "10 Bouts · 20 Fighters · 1 Unforgettable Night",
    date: "June 6, 2026",
    time: "7:00 PM EST",
    venue: "Madison Square Garden",
    price: "$49.99",
    image: "/event-poster.png",
    featured: true,
  },
  {
    id: "golden-gloves",
    badge: "Tournament",
    title: "Brooklyn Golden Gloves",
    subtitle: "Amateur Open · All Weight Classes",
    date: "July 12, 2026",
    time: "4:00 PM EST",
    venue: "Barclays Center",
    price: "Free Entry",
    featured: false,
  },
  {
    id: "youth-showcase",
    badge: "Youth Event",
    title: "Youth Showcase Night",
    subtitle: "Junior Exhibition Bouts",
    date: "August 3, 2026",
    time: "6:00 PM EST",
    venue: "NextUp Gym — Brooklyn",
    price: "Members Free",
    featured: false,
  },
]

export function UpcomingEvents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const timeLeft = useCountdown(EVENT_DATE)
  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ]

  return (
    <section id="events" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
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
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Events</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#1e2d5e] uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Upcoming{" "}
              <span style={{ color: '#c5203a' }}>Fight Nights</span>
            </motion.h2>
          </div>
          <motion.a href="#"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 hover:text-[#c5203a] transition-colors group">
            Full Calendar <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 lg:gap-8">
          {/* Featured event */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-sm overflow-hidden bg-[#0d1124] border border-white/5 group"
          >
            {/* Poster bg */}
            <div className="absolute inset-0">
              <Image src="/event-poster.png" alt="Championship Night" fill className="object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-700" sizes="800px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/98 via-[#0d1124]/80 to-[#0d1124]/50" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-[#c5203a]" />

            <div className="relative z-10 p-8 sm:p-10 flex flex-col min-h-[380px] justify-between">
              {/* Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#c5203a]/10 border border-[#c5203a]/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5203a] animate-pulse" />
                <span className="text-[#c5203a] text-[9px] font-bold uppercase tracking-[0.3em]">Main Event</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-white uppercase leading-[0.88] mb-2"
                  style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
                  NextUp{" "}
                  <span style={{ color: '#b8962e' }}>Championship</span>{" "}
                  Night
                </h3>
                <p className="text-white/40 text-sm mb-6">10 Bouts · 20 Fighters · 1 Unforgettable Night</p>

                {/* Details */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {[{ icon: Calendar, text: "June 6, 2026" }, { icon: Clock, text: "7:00 PM EST" }, { icon: MapPin, text: "Madison Square Garden" }].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-white/50">
                      <Icon className="w-3.5 h-3.5 text-[#b8962e]" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Countdown */}
                <div className="flex gap-4 sm:gap-6 mb-8">
                  {timeUnits.map((u, i) => (
                    <div key={u.label} className="flex items-end gap-1">
                      <div className="text-center">
                        <div className="text-white tabular-nums leading-none"
                          style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                          {u.value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">{u.label}</div>
                      </div>
                      {i < 3 && <span className="text-[#b8962e]/40 mb-2 text-lg font-bold">:</span>}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 px-7 py-3 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.15em] text-sm rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#c5203a]/25">
                    Get Tickets — $49.99
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 px-7 py-3 border border-white/15 hover:border-white/35 text-white font-bold uppercase tracking-[0.15em] text-sm rounded-sm transition-all duration-300 hover:-translate-y-0.5">
                    Fight Card
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other events */}
          <div className="flex flex-col gap-4">
            {events.filter(e => !e.featured).map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="group relative rounded-sm border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/20 hover:bg-[#1e2d5e]/[0.02] transition-all duration-300 p-6 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c5203a] mb-2 block">{ev.badge}</span>
                    <h3 className="font-bold text-[#0d1124] text-base leading-tight mb-1">{ev.title}</h3>
                    <p className="text-xs text-[#1e2d5e]/45 mb-4">{ev.subtitle}</p>
                    <div className="space-y-1.5">
                      {[{ icon: Calendar, text: ev.date }, { icon: Clock, text: ev.time }, { icon: MapPin, text: ev.venue }].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-[#1e2d5e]/50">
                          <Icon className="w-3 h-3 text-[#b8962e]" />
                          <span className="text-xs">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-[#1e2d5e]">{ev.price}</span>
                    <ChevronRight className="w-4 h-4 text-[#1e2d5e]/20 group-hover:text-[#c5203a] transition-colors mt-2 ml-auto" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View all CTA */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 p-4 border border-dashed border-[#1e2d5e]/12 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/35 hover:text-[#c5203a] hover:border-[#c5203a]/25 transition-all duration-300 group"
            >
              View All Events
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
