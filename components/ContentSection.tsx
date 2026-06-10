"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Play, Trophy, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Play,
    title: "HD Livestream",
    description: "Crystal clear 4K streaming with multiple camera angles and zero-lag delivery",
  },
  {
    icon: Trophy,
    title: "Championship Bouts",
    description: "Watch rising stars compete for glory in ten elite championship bouts",
  },
  {
    icon: Users,
    title: "Exclusive Access",
    description: "Behind-the-scenes content, fighter interviews, and locker room access",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live stats, round-by-round scoring, and instant push notifications",
  },
]

export function ContentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="content" className="relative bg-white py-16 sm:py-20 overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
                What You Get
              </span>
            </div>
            <h2
              className="uppercase leading-[0.9] text-[#1e2d5e] font-heading font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-tight"
            >
              Premium Experience
            </h2>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1e2d5e]/8 rounded-sm overflow-hidden">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className={`group relative p-6 sm:p-8 hover:bg-[#1e2d5e]/[0.025] transition-colors duration-300 ${
                index < 3 ? "border-r border-[#1e2d5e]/8" : ""
              } ${index < 4 ? "sm:border-b-0" : ""}`}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center mb-5 rounded-sm border border-[#1e2d5e]/10 group-hover:border-[#b8962e]/40 group-hover:bg-[#b8962e]/5 transition-all duration-300"
              >
                <feature.icon className="w-4.5 h-4.5 text-[#b8962e] group-hover:scale-110 transition-transform duration-300"
                  style={{ width: '1.1rem', height: '1.1rem' }}
                />
              </div>

              {/* Gold rule on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#b8962e] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <h3 className="text-sm font-bold text-[#0d1124] mb-2 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-xs text-[#1e2d5e]/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/10 to-transparent" />
    </section>
  )
}
