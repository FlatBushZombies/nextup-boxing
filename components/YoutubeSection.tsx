"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play,  ArrowUpRight, Eye, Clock } from "lucide-react"

// ─── Static video data — replace youtubeId with your actual video IDs ─────────
const CHANNEL_URL = "https://www.youtube.com/@NextUpBoxing"

const videos = [
  {
    youtubeId: "YlrPaRyKB3I", // Replace with your actual featured video ID
    title: "NextUp Championship Night — Full Event Replay",
    duration: "2:14:33",
    views: "124K views",
    date: "2 weeks ago",
    label: "FULL REPLAY",
    featured: true,
    description:
      "Relive every second of NextUp's most anticipated championship night. Ten elite bouts, twenty hungry fighters, one unforgettable evening at Madison Square Garden.",
  },
  {
    youtubeId: "3JZ_D3ELwOQ", // Replace with your actual video ID
    title: "Fighter Spotlight: The Road to the Championship",
    duration: "8:47",
    views: "47K views",
    date: "3 weeks ago",
    label: "SPOTLIGHT",
    featured: false,
    description: "",
  },
  {
    youtubeId: "dQw4w9WgXcQ", // Replace with your actual video ID
    title: "Best Knockouts of the Season — Round by Round",
    duration: "12:21",
    views: "89K views",
    date: "1 month ago",
    label: "HIGHLIGHTS",
    featured: false,
    description: "",
  },
  {
    youtubeId: "hY7m5jjJ9mM", // Replace with your actual video ID
    title: "Pre-Fight Press Conference — June Fight Night",
    duration: "31:04",
    views: "22K views",
    date: "5 days ago",
    label: "PRESS",
    featured: false,
    description: "",
  },
]

// Label pill colours
const labelColors: Record<string, string> = {
  "FULL REPLAY": "#c5203a",
  SPOTLIGHT: "#b8962e",
  HIGHLIGHTS: "#1e2d5e",
  PRESS: "#2a3d7a",
}

// ─── Thumbnail helper — public YouTube CDN, no API key needed ─────────────────
function ytThumb(id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

function ytUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

// ─── Featured Video Card ──────────────────────────────────────────────────────
function FeaturedCard({ video, index }: { video: (typeof videos)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={ytUrl(video.youtubeId)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08 }}
      className="group relative block overflow-hidden rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d1124]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ytThumb(video.youtubeId, "maxresdefault")}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // Fall back to hqdefault if maxresdefault 404s
            const target = e.currentTarget as HTMLImageElement
            if (!target.src.includes("hqdefault")) {
              target.src = ytThumb(video.youtubeId, "hqdefault")
            }
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/90 via-[#0d1124]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/30 to-transparent" />

        {/* Play button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 0.3s" }}
        >
          <div
            className="relative flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: "5rem",
              height: "5rem",
              background: hovered ? "#c5203a" : "rgba(197,32,58,0.85)",
              boxShadow: hovered
                ? "0 0 60px rgba(197,32,58,0.6), 0 0 120px rgba(197,32,58,0.25)"
                : "0 0 30px rgba(197,32,58,0.3)",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Play
              className="text-white ml-1"
              fill="white"
              style={{ width: "1.75rem", height: "1.75rem" }}
            />
          </div>
        </div>

        {/* Label badge */}
        <div
          className="absolute top-4 left-4 px-2.5 py-1 rounded-sm"
          style={{ background: labelColors[video.label] ?? "#c5203a" }}
        >
          <span className="text-white text-[9px] font-bold uppercase tracking-[0.25em]">
            {video.label}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute bottom-4 right-4 px-2 py-0.5 rounded-sm bg-black/70">
          <span className="text-white text-[11px] font-mono font-semibold">{video.duration}</span>
        </div>
      </div>

      {/* Info below */}
      <div className="mt-5 px-1">
        {/* Gold top rule on hover */}
        <div
          className="h-[2px] bg-[#b8962e] mb-4 transition-all duration-500 origin-left"
          style={{
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        <h3
          className="text-white leading-tight mb-3 group-hover:text-[#b8962e] transition-colors duration-300"
          style={{
            fontFamily: "var(--font-bebas), Impact, sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "0.02em",
          }}
        >
          {video.title}
        </h3>

        {video.description && (
          <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-lg">{video.description}</p>
        )}

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-white/35 uppercase tracking-[0.15em]">
            <Eye style={{ width: "0.75rem", height: "0.75rem" }} />
            {video.views}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="flex items-center gap-1.5 text-[11px] text-white/35 uppercase tracking-[0.15em]">
            <Clock style={{ width: "0.75rem", height: "0.75rem" }} />
            {video.date}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

// ─── Small Video Card ─────────────────────────────────────────────────────────
function SmallCard({ video, index }: { video: (typeof videos)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={ytUrl(video.youtubeId)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="group flex gap-4 items-start py-4 border-b border-white/6 last:border-0 hover:border-[#b8962e]/20 transition-colors duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 overflow-hidden rounded-sm bg-[#0d1124]" style={{ width: "9rem", aspectRatio: "16/9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ytThumb(video.youtubeId, "hqdefault")}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0d1124]/30 group-hover:bg-[#0d1124]/10 transition-colors duration-300" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: "2rem",
              height: "2rem",
              background: hovered ? "#c5203a" : "rgba(197,32,58,0.7)",
              transform: hovered ? "scale(1.15)" : "scale(1)",
            }}
          >
            <Play className="text-white ml-px" fill="white" style={{ width: "0.6rem", height: "0.6rem" }} />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-px rounded-sm bg-black/80">
          <span className="text-white text-[9px] font-mono font-semibold">{video.duration}</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pt-0.5">
        {/* Label */}
        <div
          className="inline-block px-1.5 py-px rounded-sm mb-2"
          style={{ background: labelColors[video.label] ?? "#c5203a" }}
        >
          <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em]">{video.label}</span>
        </div>

        <h4
          className="text-white/90 text-sm font-semibold leading-snug mb-2 group-hover:text-[#b8962e] transition-colors duration-300 line-clamp-2"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          {video.title}
        </h4>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.1em]">{video.views}</span>
          <span className="text-[10px] text-white/20">·</span>
          <span className="text-[10px] text-white/30 uppercase tracking-[0.1em]">{video.date}</span>
        </div>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        className="flex-shrink-0 mt-1 text-white/20 group-hover:text-[#b8962e] transition-colors duration-300"
        style={{ width: "1rem", height: "1rem" }}
      />
    </motion.a>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function YoutubeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const featured = videos.find((v) => v.featured)!
  const sidePicks = videos.filter((v) => !v.featured)

  return (
    <section
      id="youtube"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "#080c18" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(197,32,58,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      {/* Top editorial gradient rule */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#b8962e]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
                Watch & Subscribe
              </span>
            </div>

            {/* Headline */}
            <div className="flex items-center gap-4">
              <h2
                className="uppercase text-white leading-none"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "0.03em",
                }}
              >
                YouTube Channel
              </h2>
              {/* YouTube logo accent */}
              <div
                className="flex items-center justify-center rounded-sm flex-shrink-0"
                style={{ background: "#FF0000", width: "2.5rem", height: "1.75rem" }}
              >
                
              </div>
            </div>
          </div>

          {/* Subscribe CTA */}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-sm font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
            style={{
              background: "#FF0000",
              color: "#fff",
              boxShadow: "0 0 0 rgba(255,0,0,0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,0,0,0.35)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(255,0,0,0)"
            }}
          >
            
            Subscribe
          </a>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 origin-left"
        />

        {/* ── Video grid: 1 featured + 3 side cards ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 xl:gap-16">
          {/* Featured */}
          <FeaturedCard video={featured} index={0} />

          {/* Side picks */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-6 bg-[#b8962e]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                More Videos
              </span>
            </motion.div>

            <div className="flex flex-col divide-y divide-white/0">
              {sidePicks.map((video, i) => (
                <SmallCard key={video.youtubeId} video={video} index={i} />
              ))}
            </div>

            {/* View all CTA */}
            <motion.a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="group mt-6 flex items-center justify-center gap-2 py-3 border border-white/8 hover:border-[#b8962e]/35 rounded-sm text-white/40 hover:text-[#b8962e] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
            >
              View All Videos
              <ArrowUpRight
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ width: "0.8rem", height: "0.8rem" }}
              />
            </motion.a>
          </div>
        </div>

        {/* ── Bottom subscriber count strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-8 sm:gap-12">
            {[
              { value: "48K+", label: "Subscribers" },
              { value: "120+", label: "Videos" },
              { value: "2.4M+", label: "Total Views" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                className="text-center sm:text-left"
              >
                <div
                  className="text-[#b8962e] leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-bebas), Impact, sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white/30 hover:text-[#b8962e] text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300"
          >
            @NextUpBoxing
            <ArrowUpRight
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ width: "0.75rem", height: "0.75rem" }}
            />
          </a>
        </motion.div>
      </div>

      {/* Bottom editorial rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/20 to-transparent" />
    </section>
  )
}
