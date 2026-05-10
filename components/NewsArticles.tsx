"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ChevronRight, Clock } from "lucide-react"

const articles = [
  {
    id: "williams-champion",
    category: "Fighter Profile",
    readTime: "5 min read",
    title: "How Marcus Williams Became the Northeast's Most Feared Heavyweight",
    excerpt: "From a 12-year-old who walked into the gym not knowing how to throw a jab, to a 24-year-old champion who's drawn interest from professional promoters — this is the Marcus Williams story.",
    date: "May 8, 2026",
    image: "/fighter-1.png",
    featured: true,
    author: "Coach Marcus Reed",
  },
  {
    id: "youth-program",
    category: "Club News",
    readTime: "3 min read",
    title: "Our Youth Program Reaches 80 Junior Athletes — A New Club Record",
    excerpt: "As demand for structured youth boxing continues to grow across Brooklyn, NextUp's Junior Development Program has hit a historic milestone.",
    date: "May 5, 2026",
    image: null,
    featured: false,
    author: "NextUp Staff",
  },
  {
    id: "training-secrets",
    category: "Training",
    readTime: "6 min read",
    title: "Inside the Fight Camp: How We Prepare Athletes for Competition",
    excerpt: "A look at the 8-week fight camp methodology that's produced 47 championship-winning athletes over the past decade.",
    date: "April 28, 2026",
    image: null,
    featured: false,
    author: "Coach A. Santos",
  },
  {
    id: "golden-gloves",
    category: "Event Recap",
    readTime: "4 min read",
    title: "Three NextUp Fighters Advance to Golden Gloves Championships",
    excerpt: "Tanaka, Mendez, and Brooks survived grueling preliminary rounds to secure their spots at the prestigious Golden Gloves Championships.",
    date: "April 20, 2026",
    image: "/fighter-2.png",
    featured: false,
    author: "NextUp Staff",
  },
]

const categoryColors: Record<string, string> = {
  "Fighter Profile": "#c5203a",
  "Club News": "#1e2d5e",
  "Training": "#b8962e",
  "Event Recap": "#c5203a",
}

export function NewsArticles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const featured = articles.find(a => a.featured)!
  const others = articles.filter(a => !a.featured)

  return (
    <section id="news" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
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
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">Latest News</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[#1e2d5e] uppercase leading-[0.88]"
              style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              News &amp;{" "}
              <span style={{ color: '#c5203a' }}>Stories</span>
            </motion.h2>
          </div>
          <motion.a href="#"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 hover:text-[#c5203a] transition-colors group">
            All Articles <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Magazine-style editorial grid */}
        <div className="grid lg:grid-cols-[1fr,1fr] gap-6 lg:gap-8">

          {/* Featured article — large */}
          <motion.article
            initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative rounded-sm overflow-hidden border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1e2d5e]/8 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-[#1e2d5e]">
              {featured.image ? (
                <div className="relative w-full h-full">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
              ) : (
                <div className="w-full h-full" style={{ background: 'linear-gradient(145deg, #1e2d5e 0%, #2a3d7a 100%)' }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/70 to-transparent" />
              {/* Category pill */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.25em] text-white"
                style={{ background: categoryColors[featured.category] || "#c5203a" }}>
                {featured.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1e2d5e]/40">{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#1e2d5e]/20" />
                <span className="flex items-center gap-1 text-[9px] text-[#1e2d5e]/35 font-medium">
                  <Clock className="w-3 h-3" />{featured.readTime}
                </span>
              </div>

              <h2 className="font-bold text-[#0d1124] leading-tight mb-3 group-hover:text-[#1e2d5e] transition-colors"
                style={{ fontSize: '1.25rem', lineHeight: '1.35' }}>
                {featured.title}
              </h2>
              <p className="text-sm text-[#1e2d5e]/50 leading-relaxed mb-5" style={{ lineHeight: '1.8' }}>
                {featured.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#1e2d5e]/6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40">{featured.author}</span>
                <a href="#" className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5203a] group-hover:gap-2.5 transition-all">
                  Read Full Story <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
            {/* Red bottom strip on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5203a] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </motion.article>

          {/* Three secondary articles */}
          <div className="flex flex-col gap-4">
            {others.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group flex gap-5 rounded-sm border border-[#1e2d5e]/8 hover:border-[#1e2d5e]/20 hover:bg-[#1e2d5e]/[0.015] transition-all duration-300 p-5 cursor-pointer hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden flex-shrink-0"
                  style={{
                    background: a.image ? undefined : `linear-gradient(145deg, ${categoryColors[a.category] || "#1e2d5e"} 0%, ${categoryColors[a.category] || "#1e2d5e"}cc 100%)`,
                  }}>
                  {a.image && (
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover object-top" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em]"
                      style={{ color: categoryColors[a.category] || "#c5203a" }}>
                      {a.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#1e2d5e]/15" />
                    <span className="text-[9px] text-[#1e2d5e]/30 font-medium flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />{a.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0d1124] leading-tight mb-1 group-hover:text-[#1e2d5e] transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] text-[#1e2d5e]/30">{a.date}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#1e2d5e]/20 group-hover:text-[#c5203a] transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}

            {/* View all — mobile + tertiary */}
            <motion.a href="#"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 p-4 border border-dashed border-[#1e2d5e]/12 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/35 hover:text-[#c5203a] hover:border-[#c5203a]/25 transition-all duration-300 group"
            >
              All News &amp; Articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
