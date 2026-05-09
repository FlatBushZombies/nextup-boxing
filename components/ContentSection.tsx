"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Play, Trophy, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Play,
    title: "HD Livestream",
    description: "Crystal clear 4K streaming with multiple camera angles",
  },
  {
    icon: Trophy,
    title: "Championship Bouts",
    description: "Watch rising stars compete for glory in the ring",
  },
  {
    icon: Users,
    title: "Exclusive Access",
    description: "Behind-the-scenes content and fighter interviews",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live stats, scores, and instant notifications",
  },
]

export function ContentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section 
      id="content" 
      className="relative bg-background py-12 sm:py-16"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-widest mb-2">
            What You Get
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-primary">
            PREMIUM EXPERIENCE
          </h2>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
              className="glass-strong rounded-xl p-4 sm:p-6 text-center group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mx-auto mb-3 group-hover:from-secondary/30 group-hover:to-secondary/10 transition-colors">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-primary mb-1">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </section>
  )
}
