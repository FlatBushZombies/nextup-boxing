"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

import { MagazineCard } from "./magazine-card"

const magazines = [
  {
    coverImage: "/nextupmagcover.jpg",
    issueName: "The Championship",
    issueNumber: "Issue 01",
    releaseDate: "Summer 2026",
  },
]

export function MagazineSection() {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -50])
  const wordOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 0.18, 0.08])
  const featuredIssue = magazines[0]

  return (
    <section
      id="magazine"
      ref={ref}
      className="relative overflow-hidden bg-white px-4 py-20 text-ink sm:px-6 lg:px-8"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,32,58,0.04),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,17,34,0.02)_1px,transparent_1px)] bg-[size:38px_38px] opacity-10" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <span className="section-eyebrow text-accent font-bold">Magazine</span>
            <span className="h-px w-12 bg-accent" />
          </div>

          <h2
            className="text-[clamp(3.2rem,8vw,6rem)] uppercase leading-[0.88] text-ink animate-fade-in font-display"
          >
            Inside The
            <span className="block text-secondary">Fight Issue</span>
          </h2>

          <p className="editorial-body mx-auto mt-5 max-w-2xl text-sm text-slate-600 sm:text-base">
            Long-form reporting, fighter profiles, championship analysis, and the stories that shape
            the sport beyond the final bell. Our magazine is built to feel collectible, informed, and
            rooted in the culture of boxing.
          </p>
        </motion.div>

        <div className="relative mt-20 flex justify-center">
          <motion.div
            style={{ y: cardY }}
            className="relative z-10 w-full max-w-[520px]"
          >
            <MagazineCard {...featuredIssue} />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex items-center justify-center gap-3 px-4 py-1.5 rounded-none border border-secondary/35 bg-secondary/10 backdrop-blur-sm skew-x-[-8deg]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              <span
                className="text-[0.7rem] uppercase tracking-[0.25em] text-ink font-black font-display skew-x-[8deg] block"
              >
                Digital versions dropping soon
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 border border-ink/10 px-6 py-8 bg-slate-50/50 backdrop-blur-sm rounded-none shadow-md">
            <p className="section-eyebrow text-secondary font-black uppercase tracking-widest text-xs">Editorial Release</p>
            <p className="editorial-body max-w-xl text-sm text-slate-700 sm:text-base">
              Be first to read each new issue, from cover features and ringside essays to the sharp
              analysis behind boxing&apos;s biggest moments.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row w-full justify-center mt-2">
              <button className="editorial-button bg-secondary px-8 py-3.5 text-ink font-black tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gold-light skew-x-[-8deg] cursor-pointer">
                <span className="skew-x-[8deg] block font-display text-sm uppercase">Read The Issue</span>
              </button>
              <button className="editorial-button border-2 border-ink bg-white px-8 py-3 text-ink font-black tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary skew-x-[-8deg] cursor-pointer">
                <span className="skew-x-[8deg] block font-display text-sm uppercase">Join The List</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
