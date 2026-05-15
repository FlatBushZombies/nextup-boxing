"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Play } from "lucide-react"

const factoids = [
  { label: "4K Ultra HD", detail: "Crystal clear" },
  { label: "Zero Latency", detail: "< 1 sec delay" },
  { label: "50+ Countries", detail: "Global access" },
  { label: "Multi-Angle", detail: "6 camera feeds" },
]

export function LiveStreamPromo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="livestream"
      ref={ref}
      className="relative overflow-hidden bg-[#0d1124] py-20 sm:py-28"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
          opacity: 0.7,
        }}
      />

      <div className="absolute inset-0">
        <Image
          src="/broadcast-scene.png"
          alt="Live broadcast production"
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/98 via-[#0d1124]/85 to-[#0d1124]/60" />
      </div>

      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="section-eyebrow text-[#c5203a]">Live Streaming</span>
            </motion.div>

            <div className="relative mb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.1 }}
                className="pointer-events-none absolute -left-2 -top-4 select-none"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(6rem, 18vw, 14rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(184, 150, 46, 0.06)",
                  lineHeight: 1,
                }}
              >
                LIVE
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mb-6 uppercase leading-[0.88]"
              style={{
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
              }}
            >
              <span className="block text-white">Never Miss</span>
              <span className="block bg-gradient-to-r from-[#c5203a] to-[#d4ae44] bg-clip-text text-transparent">
                A Moment
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="editorial-body mb-10 max-w-lg text-[0.98rem] text-white/56"
            >
              Stream every fight in crystal-clear 4K from any device, anywhere in the world.
              Multi-angle cameras, instant replays, and expert commentary bring you ringside for
              every punch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-10 grid grid-cols-2 gap-3"
            >
              {factoids.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.07 }}
                  className="editorial-surface-dark rounded-[1.2rem] px-4 py-4 transition-colors duration-300 hover:border-[#b8962e]/30"
                >
                  <div
                    className="mb-1 font-semibold text-[#d4ae44]"
                    style={{
                      fontFamily: "var(--font-bebas), Impact, sans-serif",
                      fontSize: "1.3rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {fact.label}
                  </div>
                  <div className="editorial-meta text-white/34">{fact.detail}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#hero"
                className="editorial-button inline-flex items-center justify-center gap-2 rounded-full bg-[#c5203a] px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a01830] hover:shadow-[0_24px_54px_rgba(197,32,58,0.3)]"
              >
                Subscribe Now - $9.99/mo
              </a>
              <a
                href="#youtube"
                className="editorial-button group inline-flex items-center justify-center gap-2 rounded-full border border-[#b8962e]/25 bg-white/5 px-8 py-4 text-[#d4ae44] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8962e]/60 hover:bg-white/[0.08]"
              >
                <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                Watch Preview
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[#c5203a]/10 via-[#b8962e]/5 to-transparent blur-3xl" />

            <div className="editorial-surface-dark relative overflow-hidden p-3">
              <div className="relative overflow-hidden rounded-[1.2rem]">
                <Image
                  src="/broadcast-scene.png"
                  alt="Live streaming broadcast"
                  width={700}
                  height={400}
                  className="h-auto w-full"
                />

                <div className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-[#0d1124]/28 transition-colors hover:bg-[#0d1124]/14">
                  <div
                    className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-[#c5203a]/92 shadow-[0_24px_60px_rgba(197,32,58,0.45)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="ml-1 h-7 w-7 text-white" fill="white" />
                  </div>
                </div>

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#c5203a] px-4 py-2 shadow-lg">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  <span className="editorial-meta text-white">Live</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d1124]/95 to-transparent px-5 pb-4 pt-12">
                  <p className="editorial-meta text-[#d4ae44]">NextUp Championship Night</p>
                  <p className="mt-1 text-[0.74rem] text-white/38">
                    June 6, 2026 | Madison Square Garden | 7PM EST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
