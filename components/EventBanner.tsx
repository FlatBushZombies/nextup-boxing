"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"

import { useCountdown } from "@/hooks/use-countdown"

const EVENT_DATE = new Date("2026-06-06T19:00:00")

const fightCard = [
  { fighter1: "Marcus Williams", fighter2: "Devon Brooks", division: "Heavyweight", rounds: 12 },
  { fighter1: "Jamal Davis", fighter2: "Tommy Reeves", division: "Light Heavyweight", rounds: 10 },
  { fighter1: "Carlos Mendez", fighter2: "Rico Santos", division: "Middleweight", rounds: 12 },
]

export function EventBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const timeLeft = useCountdown(EVENT_DATE)

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ]

  return (
    <section id="events" ref={ref} className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[#c5203a]" />
          <span className="section-eyebrow text-[#c5203a]">Next Event</span>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr,390px] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c5203a]/18 bg-[#c5203a]/6 px-4 py-2"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c5203a]" />
              <span className="editorial-meta text-[#c5203a]">Main Event</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6 uppercase leading-[0.88]"
              style={{
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "#1e2d5e",
              }}
            >
              NextUp
              <span className="block text-[#c5203a]">Championship</span>
              <span className="block text-[#0d1124]">Night</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="editorial-body mb-8 max-w-2xl text-[#0d1124]/65"
            >
              A stacked championship card built for a global audience, with title fights, rising
              contenders, and a main-event atmosphere tuned for the biggest stage in the sport.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-wrap gap-5 border-b border-[#1e2d5e]/8 pb-8"
            >
              {[
                { icon: Calendar, text: "June 6, 2026" },
                { icon: Clock, text: "7:00 PM EST" },
                { icon: MapPin, text: "Madison Square Garden" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[#1e2d5e]/62">
                  <Icon className="h-3.5 w-3.5 text-[#b8962e]" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-6 bg-[#b8962e]/40" />
                <span className="editorial-meta text-[#1e2d5e]/46">Countdown to Fight Night</span>
              </div>
              <div className="flex gap-4 sm:gap-6">
                {timeUnits.map((unit, index) => (
                  <div key={unit.label} className="flex items-end gap-1">
                    <div className="text-center">
                      <div
                        className="tabular-nums leading-none text-[#1e2d5e]"
                        style={{
                          fontFamily: "var(--font-bebas), Impact, sans-serif",
                          fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                        }}
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </div>
                      <div className="editorial-meta mt-1 text-[#1e2d5e]/40">{unit.label}</div>
                    </div>
                    {index < 3 ? (
                      <span
                        className="mb-2 text-[#b8962e]/55"
                        style={{ fontFamily: "var(--font-bebas), Impact, sans-serif", fontSize: "1.5rem" }}
                      >
                        :
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#hero"
                className="editorial-button inline-flex items-center justify-center rounded-full bg-[#c5203a] px-8 py-3.5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a01830] hover:shadow-[0_18px_42px_rgba(197,32,58,0.22)]"
              >
                Buy Tickets - $49.99
              </a>
              <a
                href="#rankings"
                className="editorial-button inline-flex items-center justify-center rounded-full border border-[#1e2d5e]/15 bg-white px-8 py-3.5 text-[#1e2d5e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1e2d5e]/30 hover:bg-[#1e2d5e]/[0.03]"
              >
                View Fight Card
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="editorial-surface-light overflow-hidden p-3">
              <div className="relative overflow-hidden rounded-[1.15rem]">
                <Image
                  src="/event-poster.png"
                  alt="NextUp Championship Night Poster"
                  width={390}
                  height={500}
                  className="h-auto w-full"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
              </div>
            </div>

            <div className="editorial-surface-dark overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
                <span className="h-px w-5 bg-[#c5203a]" />
                <span className="editorial-meta text-white/52">Fight Card Preview</span>
              </div>
              {fightCard.map((bout, index) => (
                <div
                  key={index}
                  className="border-b border-white/5 px-5 py-4 transition-colors duration-300 last:border-0 hover:bg-white/[0.03]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{bout.fighter1}</p>
                      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-white/34">
                        vs {bout.fighter2}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#d4ae44]">
                        {bout.division}
                      </p>
                      <p className="mt-1 text-[0.72rem] text-white/34">{bout.rounds} rounds</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/10 to-transparent" />
    </section>
  )
}
