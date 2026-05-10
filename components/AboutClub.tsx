"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight, Award, Users, Target } from "lucide-react"

const pillars = [
  { icon: Target, label: "Elite Technique", desc: "Olympic-standard training methodology refined over 12 years" },
  { icon: Award, label: "Championship Pedigree", desc: "47 regional and national titles across all weight classes" },
  { icon: Users, label: "Community First", desc: "A brotherhood and sisterhood that extends beyond the gym floor" },
]

export function AboutClub() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="h-px w-10 bg-[#c5203a]" />
          <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Our Story</span>
        </motion.div>

        {/* Main editorial grid */}
        <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-20 items-start">

          {/* Left: Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-[#1e2d5e]/10">
              <Image
                src="/hero-bg.png"
                alt="NextUp Boxing Club training floor"
                width={700} height={520}
                className="w-full h-auto object-cover"
              />
              {/* Overlay caption bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d1124]/90 to-transparent px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b8962e] mb-1">Brooklyn, New York</p>
                <p className="text-white text-sm font-medium">Our flagship gym — where legends are forged</p>
              </div>
              {/* Brand gradient bottom strip */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-[#1e2d5e] text-white p-6 rounded-sm shadow-2xl w-44"
            >
              <div className="text-[#b8962e] mb-1" style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '3rem', lineHeight: 1,
              }}>
                #1
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Ranked Club<br />in the Northeast
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Editorial text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-4 lg:pt-8"
          >
            <h2
              className="uppercase leading-[0.88] text-[#1e2d5e] mb-6"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              Built on Sweat,{" "}
              <span style={{ color: '#c5203a' }}>Sacrifice</span>{" "}
              &amp; Skill
            </h2>

            <div className="space-y-5 text-[#1e2d5e]/60 leading-relaxed mb-8"
              style={{ fontSize: '0.95rem', lineHeight: '1.85' }}>
              <p>
                Founded in 2014 in the heart of Brooklyn, NextUp Boxing League was built 
                on a singular belief: that every athlete, regardless of background, deserves 
                access to world-class boxing education.
              </p>
              <p>
                Under the guidance of our coaching staff — including former professional 
                champions and USA Boxing-certified trainers — we've developed over 200 
                active members into disciplined athletes and confident individuals.
              </p>
              <p className="font-medium text-[#1e2d5e]/80">
                From youth beginners to seasoned amateur competitors, we forge champions 
                in the gym and leaders in life.
              </p>
            </div>

            {/* Pull quote */}
            <div className="border-l-[3px] border-[#c5203a] pl-5 mb-8">
              <p className="text-[#1e2d5e] font-medium italic" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                "The ring teaches you more about yourself than any classroom ever could. 
                That's the NextUp promise."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b8962e] mt-2">
                — Coach Marcus Reed, Head Trainer
              </p>
            </div>

            {/* CTA */}
            <a href="#membership"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#1e2d5e] hover:bg-[#0d1124] text-white font-bold uppercase tracking-[0.18em] text-sm rounded-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#1e2d5e]/20 hover:-translate-y-0.5 group">
              Our Coaches &amp; Staff
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Three pillars */}
            <div className="mt-10 pt-8 border-t border-[#1e2d5e]/8 space-y-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-9 h-9 rounded-sm border border-[#1e2d5e]/12 flex items-center justify-center flex-shrink-0 group-hover:border-[#b8962e]/40 group-hover:bg-[#b8962e]/5 transition-all duration-300">
                    <p.icon className="w-4 h-4 text-[#b8962e]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0d1124] mb-0.5">{p.label}</p>
                    <p className="text-xs text-[#1e2d5e]/45 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
