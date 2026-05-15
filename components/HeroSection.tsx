"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Play, Ticket } from "lucide-react"

import { EmailSignup } from "@/components/email-signup"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1])

  const fightResults = [
    { weight: "Heavyweight", date: "May 10", f1: "Joshua", f1Res: "W", f2: "Dubois", f2Res: "L", method: "KO 5" },
    { weight: "Super Middle", date: "Apr 28", f1: "Alvarez", f1Res: "W", f2: "Munguia", f2Res: "L", method: "UD 12" },
    { weight: "Lightweight", date: "Apr 15", f1: "Davis", f1Res: "W", f2: "Martin", f2Res: "L", method: "KO 8" },
    { weight: "Super Bantam", date: "Mar 30", f1: "Inoue", f1Res: "W", f2: "Nery", f2Res: "L", method: "KO 6" },
    { weight: "Heavyweight", date: "Mar 15", f1: "Usyk", f1Res: "W", f2: "Fury", f2Res: "L", method: "SD 12" },
    { weight: "Lightweight", date: "Feb 10", f1: "Lopez", f1Res: "W", f2: "Ortiz", f2Res: "L", method: "UD 12" },
  ]

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1124]"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/hero-boxers.png"
          alt="Two boxers in an intense match"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/97 via-[#0d1124]/72 to-[#0d1124]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-transparent to-[#0d1124]/50" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
        <span
          className="section-eyebrow text-white/25"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Fight Night - June 6, 2026
        </span>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-48 pt-32 sm:px-8 lg:px-16">
        <motion.div style={{ y, opacity }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#c5203a]" />
            <span className="section-eyebrow text-[#c5203a]">Main Event - June 6, 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 uppercase leading-[0.85]"
            style={{
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(5rem, 11vw, 10rem)",
            }}
          >
            <span className="block text-white">Where</span>
            <span className="block text-white">Legends</span>
            <span className="hero-gradient-text block">Are Made</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="editorial-body mb-10 max-w-xl text-base text-white/62 sm:text-lg"
          >
            The most anticipated boxing event of 2026. Ten championship bouts. One unforgettable
            night. Stream it live from anywhere in the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#events"
              className="editorial-button inline-flex items-center justify-center gap-3 rounded-full bg-[#c5203a] px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a01830] hover:shadow-[0_24px_54px_rgba(197,32,58,0.32)]"
            >
              <Ticket className="h-4 w-4" />
              Get Tickets
            </a>
            <a
              href="#livestream"
              className="editorial-button inline-flex items-center justify-center gap-3 rounded-full border border-[#b8962e]/30 bg-white/5 px-8 py-4 text-[#d4ae44] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b8962e]/70 hover:bg-white/[0.08]"
            >
              <div className="relative">
                <Play className="h-4 w-4" />
                <div className="absolute inset-0 animate-ping">
                  <Play className="h-4 w-4 opacity-30" />
                </div>
              </div>
              Watch Trailer
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-2xl"
          >
            <EmailSignup variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 border-t border-white/8 pt-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-[#b8962e]/50" />
              <span className="editorial-meta text-white/30">Event Statistics</span>
            </div>
            <div className="flex gap-10 sm:gap-14">
              {[
                { value: "10", label: "Championship Bouts" },
                { value: "20", label: "Elite Fighters" },
                { value: "4K", label: "Live Stream" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span
                    className="mb-1 block leading-none text-[#d4ae44]"
                    style={{
                      fontFamily: "var(--font-bebas), Impact, sans-serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="editorial-meta text-white/38">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#d9d5cd] bg-[#efeae1] shadow-[0_-10px_30px_rgba(0,0,0,0.16)]">
        <div className="flex h-auto flex-col items-stretch md:h-[92px] md:flex-row">
          <div className="relative shrink-0 overflow-hidden bg-[#c5203a] px-6 py-4 text-white md:w-[220px] md:py-0">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <span className="editorial-meta mb-1 text-white/90">Fight Desk</span>
              <span
                className="text-2xl uppercase leading-none tracking-[0.06em] text-white"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                Results
              </span>
            </div>
            <div className="absolute bottom-0 right-[-20px] top-0 w-10 -skew-x-[20deg] bg-black/10" />
          </div>

          <div
            className="flex flex-1 items-center gap-2 overflow-x-auto p-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style dangerouslySetInnerHTML={{ __html: "::-webkit-scrollbar { display: none; }" }} />

            {fightResults.map((result, index) => (
              <div
                key={index}
                className="relative flex h-[76px] w-[248px] flex-shrink-0 flex-col justify-between rounded-2xl border border-[#0d1124]/6 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(13,17,36,0.06)] transition-colors duration-300 hover:bg-[#faf8f3]"
              >
                <div className="mb-1.5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0d1124]/46">
                  <span className="truncate pr-2 text-[#c5203a]">{result.weight}</span>
                  <span className="shrink-0">{result.date}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex w-full max-w-[150px] flex-col gap-1">
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`truncate text-xs font-semibold uppercase tracking-[0.04em] ${
                          result.f1Res === "W" ? "text-[#0d1124]" : "text-[#0d1124]/35"
                        }`}
                      >
                        {result.f1}
                      </span>
                      {result.f1Res === "W" ? (
                        <span className="ml-2 text-[0.68rem] font-semibold leading-none text-[#c5203a]">
                          W
                        </span>
                      ) : null}
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`truncate text-xs font-semibold uppercase tracking-[0.04em] ${
                          result.f2Res === "W" ? "text-[#0d1124]" : "text-[#0d1124]/35"
                        }`}
                      >
                        {result.f2}
                      </span>
                      {result.f2Res === "W" ? (
                        <span className="ml-2 text-[0.68rem] font-semibold leading-none text-[#c5203a]">
                          W
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-[2px] ml-2 flex-shrink-0 border-l border-[#0d1124]/6 pl-3 text-[0.68rem] font-semibold text-[#0d1124]/42">
                    {result.method}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
