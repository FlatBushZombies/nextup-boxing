"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const sponsors = [
  "Nike", "Everlast", "ESPN", "Gatorade", "Under Armour",
  "Showtime", "Riddell", "Title Boxing", "Adidas", "DAZN",
]

// Duplicate for seamless loop
const track1 = [...sponsors, ...sponsors]
const track2 = [...sponsors].reverse().concat([...sponsors].reverse())

export function SponsorsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-0">
      {/* Top brand gradient rule */}
      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 py-8"
      >
        <span className="h-px w-16 bg-[#b8962e]/25" />
        <span className="section-eyebrow text-white">Official Partners &amp; Sponsors</span>
        <span className="h-px w-16 bg-[#b8962e]/25" />
      </motion.div>

      {/* Ticker Row 1 — LTR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative overflow-hidden mb-4"
      >
        <div className="marquee-track">
          {track1.map((name, i) => (
            <div
              key={`t1-${i}`}
              className="flex-shrink-0 flex items-center mx-10 sm:mx-14"
            >
              <span
                className="font-black uppercase text-white hover:text-[#b8962e] transition-colors duration-500 cursor-default select-none"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                  letterSpacing: '0.08em',
                }}
              >
                {name}
              </span>
              <span className="ml-10 sm:ml-14 w-1 h-1 rounded-full bg-[#b8962e]/25 flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ticker Row 2 — RTL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden mb-8"
      >
        <div className="marquee-track-reverse">
          {track2.map((name, i) => (
            <div
              key={`t2-${i}`}
              className="flex-shrink-0 flex items-center mx-10 sm:mx-14"
            >
              <span
                className="font-black uppercase text-white hover:text-[#c5203a] transition-colors duration-500 cursor-default select-none"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)',
                  letterSpacing: '0.1em',
                }}
              >
                {name}
              </span>
              <span className="ml-10 sm:ml-14 w-1 h-1 rounded-full bg-[#c5203a]/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  )
}
