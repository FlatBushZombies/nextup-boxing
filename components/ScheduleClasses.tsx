"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const classes = [
  { day: "Mon", time: "07:00", title: "Morning Conditioning", type: "fitness", level: "All Levels", trainer: "Coach Reed", spots: 8 },
  { day: "Mon", time: "16:00", title: "Youth Development", type: "youth", level: "Ages 8–17", trainer: "Coach Santos", spots: 4 },
  { day: "Mon", time: "19:00", title: "Amateur Training", type: "amateur", level: "Advanced", trainer: "Coach Reed", spots: 12 },
  { day: "Tue", time: "06:30", title: "Strength & Conditioning", type: "fitness", level: "Intermediate+", trainer: "Coach Malik", spots: 6 },
  { day: "Tue", time: "17:00", title: "Technique Clinic", type: "amateur", level: "Intermediate", trainer: "Coach Reed", spots: 10 },
  { day: "Tue", time: "19:30", title: "Fitness Boxing", type: "fitness", level: "All Levels", trainer: "Coach Santos", spots: 15 },
  { day: "Wed", time: "07:00", title: "Morning Conditioning", type: "fitness", level: "All Levels", trainer: "Coach Reed", spots: 8 },
  { day: "Wed", time: "16:00", title: "Youth Development", type: "youth", level: "Ages 8–17", trainer: "Coach Santos", spots: 4 },
  { day: "Wed", time: "19:00", title: "Sparring Session", type: "amateur", level: "Advanced", trainer: "Coach Reed", spots: 8 },
  { day: "Thu", time: "06:30", title: "Strength & Conditioning", type: "fitness", level: "Intermediate+", trainer: "Coach Malik", spots: 6 },
  { day: "Thu", time: "18:00", title: "Fitness Boxing", type: "fitness", level: "All Levels", trainer: "Coach Santos", spots: 15 },
  { day: "Fri", time: "07:00", title: "Morning Conditioning", type: "fitness", level: "All Levels", trainer: "Coach Reed", spots: 8 },
  { day: "Fri", time: "16:00", title: "Youth Development", type: "youth", level: "Ages 8–17", trainer: "Coach Santos", spots: 4 },
  { day: "Fri", time: "19:00", title: "Competition Prep", type: "amateur", level: "Advanced", trainer: "Coach Reed", spots: 10 },
  { day: "Sat", time: "09:00", title: "Open Gym & Sparring", type: "amateur", level: "Members Only", trainer: "Staff", spots: 20 },
  { day: "Sat", time: "11:00", title: "Youth Saturday Clinic", type: "youth", level: "Ages 8–17", trainer: "Coach Santos", spots: 6 },
  { day: "Sat", time: "14:00", title: "Fitness Boxing", type: "fitness", level: "All Levels", trainer: "Coach Malik", spots: 15 },
  { day: "Sun", time: "10:00", title: "Recovery & Technique", type: "fitness", level: "All Levels", trainer: "Coach Reed", spots: 12 },
]

const typeStyles: Record<string, { bg: string; border: string; label: string; dot: string }> = {
  youth: { bg: "#1e2d5e10", border: "#1e2d5e25", label: "Youth", dot: "#1e2d5e" },
  amateur: { bg: "#c5203a10", border: "#c5203a25", label: "Competition", dot: "#c5203a" },
  fitness: { bg: "#b8962e10", border: "#b8962e25", label: "Fitness", dot: "#b8962e" },
}

export function ScheduleClasses() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="schedule" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
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
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Weekly Schedule</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#1e2d5e] uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Classes &amp;{" "}
              <span style={{ color: '#c5203a' }}>Schedule</span>
            </motion.h2>
          </div>

          {/* Legend */}
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="flex gap-4 flex-wrap">
            {Object.entries(typeStyles).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: v.dot }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/45">{v.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Day columns — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="grid grid-cols-7 gap-3 min-w-[900px]">
            {days.map((day, di) => {
              const dayClasses = classes.filter(c => c.day === day)
              const isWeekend = day === "Sat" || day === "Sun"
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + di * 0.06 }}
                >
                  {/* Day header */}
                  <div className={`text-center py-3 mb-3 rounded-sm border ${
                    isWeekend
                      ? "bg-[#1e2d5e]/5 border-[#1e2d5e]/15"
                      : "bg-[#0d1124] border-[#0d1124]"
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                      isWeekend ? "text-[#1e2d5e]/60" : "text-white"
                    }`}>{day}</span>
                  </div>

                  {/* Class slots */}
                  <div className="space-y-2">
                    {dayClasses.map((cls, ci) => {
                      const style = typeStyles[cls.type]
                      return (
                        <div
                          key={`${cls.day}-${ci}`}
                          className="rounded-sm border p-2.5 cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 group"
                          style={{ background: style.bg, borderColor: style.border }}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.dot }} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: style.dot }}>
                              {cls.time}
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-[#0d1124] leading-tight mb-1">{cls.title}</p>
                          <p className="text-[9px] text-[#1e2d5e]/40 truncate">{cls.trainer}</p>
                          <div className="mt-1.5 text-[9px] text-[#1e2d5e]/30">
                            {cls.spots} spots
                          </div>
                        </div>
                      )
                    })}
                    {dayClasses.length === 0 && (
                      <div className="rounded-sm border border-dashed border-[#1e2d5e]/8 p-3 text-center">
                        <span className="text-[9px] text-[#1e2d5e]/20 uppercase tracking-wider">Rest Day</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-10 border-t border-[#1e2d5e]/8"
        >
          <div>
            <p className="text-sm font-bold text-[#0d1124] mb-0.5">Reserve your spot today</p>
            <p className="text-xs text-[#1e2d5e]/45">Walk-ins welcome. Members get priority booking.</p>
          </div>
          <a href="#membership"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#c5203a]/20 hover:-translate-y-0.5 group flex-shrink-0">
            Book a Class
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
