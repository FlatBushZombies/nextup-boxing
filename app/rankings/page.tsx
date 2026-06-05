"use client"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Trophy, ShieldAlert, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function RankingsPage() {
  // Mock blurred rankings to create an amazing design placeholder
  const mockRankings = [
    { rank: "C", name: "Arturo Acevedo", division: "Super-Bantamweight", record: "23-1-0" },
    { rank: "1", name: "Bradley Belt", division: "Cruiserweight", record: "26-0-0" },
    { rank: "2", name: "Xavier Wilcher", division: "Cruiserweight", record: "28-1-0" },
    { rank: "3", name: "Kevin Torres", division: "Super-Middleweight", record: "24-1-0" },
    { rank: "4", name: "Jaden Harvey", division: "Super-Middleweight", record: "22-2-0" },
  ]

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#05070f] text-white">
      <Navbar />

      {/* Main Content Container */}
      <section className="relative min-h-[90vh] pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
        {/* Glow & Grid Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 futuristic-grid opacity-10" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c5203a]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#b8962e]/10 rounded-full blur-[100px]" />
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c5203a] via-transparent to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Trophy Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center w-16 h-16 rounded-full border border-[#b8962e]/40 bg-[#0d1124]/60 backdrop-blur-md shadow-[0_0_20px_rgba(184,150,46,0.15)]"
          >
            <Trophy className="w-8 h-8 text-[#b8962e]" />
          </motion.div>

          {/* Section Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-bold uppercase tracking-[0.35em] text-[#c5203a]"
          >
            Official Next Up Boxing League
          </motion.span>

          {/* Title and Coming Soon Badge */}
          <div className="relative mt-2 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-6xl sm:text-8xl font-black uppercase tracking-tight text-white leading-none"
              style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
            >
              Fighter Rankings
            </motion.h1>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute -top-3 -right-2 rotate-[12deg] bg-[#b8962e] text-[#05070f] font-black uppercase text-xs tracking-widest px-3 py-1.5 shadow-lg rounded-sm sm:-top-5 sm:-right-8"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              COMING SOON
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-xl text-white/70 text-sm sm:text-base leading-relaxed tracking-wide mb-12"
          >
            We are currently compiling the official bout records, division statuses, and championship weights. Standings are locked until after the <span className="text-white font-semibold">Strong Island Fight Night 11</span> event. Check back for live updates.
          </motion.p>

          {/* Premium Blurred Mock Rankings Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative w-full max-w-2xl bg-[#0d1124]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-[2px] shadow-2xl mb-12 overflow-hidden"
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-[#05070f]/40 backdrop-blur-[6px] z-20 flex flex-col items-center justify-center p-4">
              <ShieldAlert className="w-10 h-10 text-[#b8962e]/80 mb-3 animate-pulse" />
              <h3 className="text-lg font-bold uppercase tracking-[0.15em] text-white" style={{ fontFamily: "var(--font-oswald)" }}>
                Standings Locked
              </h3>
              <p className="text-xs text-white/50 mt-1 max-w-xs">
                Official records will release on Sunday, June 7th.
              </p>
            </div>

            {/* Mock Table Content (Blurred) */}
            <div className="opacity-25 z-10 pointer-events-none">
              <div className="grid grid-cols-[50px,1fr,150px,100px] border-b border-white/10 pb-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">#</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Fighter</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Division</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 text-right">Record</span>
              </div>
              <div className="divide-y divide-white/5">
                {mockRankings.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[50px,1fr,150px,100px] py-4 text-left items-center">
                    <span className="text-lg font-bold text-[#b8962e]" style={{ fontFamily: "var(--font-bebas)" }}>{item.rank}</span>
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{item.division}</span>
                    <span className="text-sm font-bold text-white text-right font-mono">{item.record}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/"
              className="group relative flex items-center gap-2 border-2 border-white/20 hover:border-white bg-transparent px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              BACK TO HOME
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
