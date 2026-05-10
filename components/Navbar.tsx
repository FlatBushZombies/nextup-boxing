"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Menu, X, Search, ChevronDown, Play
} from "lucide-react"

const navGroups = [
  {
    label: "Club",
    href: "#about",
    children: ["About Us", "Our Story", "Coaches & Staff", "Careers"],
  },
  {
    label: "Programs",
    href: "#programs",
    children: ["Youth Boxing", "Amateur Competition", "Fitness Boxing", "Personal Coaching"],
  },
  {
    label: "Rankings",
    href: "#rankings",
    children: null,
  },
  {
    label: "Schedule",
    href: "#schedule",
    children: ["Class Timetable", "Book a Session", "Private Lessons"],
  },
  {
    label: "Events",
    href: "#events",
    children: ["Upcoming Fights", "Previous Results", "Fight Calendar"],
  },
  {
    label: "News",
    href: "#news",
    children: ["Latest Articles", "Fighter Profiles", "Event Recaps"],
  },
]



export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" id="main-navbar">

        {/* ── Row 1: Top Strip ─────────────────────────────────── */}
        <div
          className="relative overflow-hidden transition-all duration-500"
          style={{
            height: scrolled ? 0 : undefined,
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? "none" : "auto",
            background: "#0d1124",
            borderBottom: "1px solid rgba(184,150,46,0.12)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
            {/* Left: subscription CTA */}
            <a
              href="#membership"
              className="hidden sm:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8962e] hover:text-white transition-colors"
            >
              <span className="h-px w-4 bg-[#b8962e]" />
              Subscribe — Join the Club
            </a>
            <span className="sm:hidden text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8962e]/60">
              NextUp Boxing League · Est. 2014
            </span>

            {/* Right: socials + watch live */}
            <div className="flex items-center gap-4">
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <a
                href="#livestream"
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5203a] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c5203a]" />
                </span>
                Watch Live
              </a>
            </div>
          </div>
        </div>

        {/* ── Row 2: Main Navigation Bar ───────────────────────── */}
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(13,17,36,0.98)"
              : "rgba(255,255,255,1)",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(184,150,46,0.12)"
              : "1px solid rgba(13,17,36,0.08)",
            boxShadow: scrolled
              ? "0 4px 30px rgba(0,0,0,0.35)"
              : "0 2px 12px rgba(13,17,36,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6 h-[60px] sm:h-[68px]">

              {/* Left nav links — desktop */}
              <nav className="hidden lg:flex items-center gap-0">
                {navGroups.slice(0, 3).map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    scrolled={scrolled}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ))}
              </nav>

              {/* Center: Logo */}
              <a href="#" className="flex-shrink-0 group" aria-label="NextUp Boxing">
                <Image
                  src="/logo.png"
                  alt="NextUp Boxing League"
                  width={140} height={70}
                  className="h-auto w-[100px] sm:w-[120px] transition-all duration-300 group-hover:scale-105"
                  style={{
                    filter: scrolled
                      ? "brightness(1)"
                      : "none",
                  }}
                />
              </a>

              {/* Right nav links — desktop */}
              <div className="hidden lg:flex items-center gap-0">
                {navGroups.slice(3).map((item) => (
                  <NavItem
                    key={item.label}
                    item={item}
                    scrolled={scrolled}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ))}

                {/* Search */}
                <button
                  onClick={() => setSearchOpen(v => !v)}
                  className="ml-2 p-2 transition-colors"
                  style={{ color: scrolled ? "rgba(255,255,255,0.5)" : "rgba(13,17,36,0.5)" }}
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Watch Live CTA */}
                <a
                  href="#livestream"
                  className="ml-3 inline-flex items-center gap-2 px-5 py-2 rounded-sm font-bold uppercase tracking-[0.18em] text-[11px] text-white bg-[#c5203a] hover:bg-[#a01830] transition-all duration-300 hover:shadow-lg hover:shadow-[#c5203a]/30 hover:-translate-y-0.5"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  Watch Live
                </a>
              </div>

              {/* Mobile: search + toggle */}
              <div className="lg:hidden flex items-center gap-2">
                <a href="#livestream"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.18em] text-white bg-[#c5203a]">
                  <Play className="w-3 h-3" fill="white" />
                  Live
                </a>
                <button
                  onClick={() => setMobileOpen(v => !v)}
                  className="p-2 transition-colors"
                  style={{ color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(13,17,36,0.7)" }}
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 3: Crimson bottom rule ───────────────────────── */}
        {!scrolled && (
          <div className="h-[2px] bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#b8962e]" />
        )}

        {/* ── Search Bar ───────────────────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-b border-white/10"
              style={{ background: "#0d1124" }}
            >
              <div className="max-w-7xl mx-auto px-8 py-4">
                <div className="flex items-center gap-4 border border-white/12 rounded-sm px-5 py-3">
                  <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search fighters, events, articles…"
                    className="flex-1 bg-transparent text-white placeholder:text-white/25 text-sm font-medium outline-none"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/30 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Mobile Menu ───────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/8"
              style={{ background: "#0d1124" }}
            >
              <div className="max-w-7xl mx-auto px-4 py-5 space-y-0.5">
                {navGroups.map((item) => (
                  <a key={item.label} href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/55 hover:text-white hover:bg-white/5 rounded-sm transition-colors">
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5 text-white/20" />}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/8 flex gap-3">
                  <a href="#membership" onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center py-3 bg-[#1e2d5e] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
                    Join the Club
                  </a>
                  <a href="#livestream" onClick={() => setMobileOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#c5203a] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
                    <Play className="w-3.5 h-3.5" fill="white" /> Watch Live
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to push content below fixed navbar */}
      <div style={{ height: scrolled ? 68 : "auto" }} />
    </>
  )
}

/* ── Sub-component: individual nav item with dropdown ── */
function NavItem({
  item, scrolled, activeDropdown, setActiveDropdown,
}: {
  item: typeof navGroups[0]
  scrolled: boolean
  activeDropdown: string | null
  setActiveDropdown: (v: string | null) => void
}) {
  const isActive = activeDropdown === item.label
  const textColor = scrolled ? "rgba(255,255,255,0.65)" : "rgba(13,17,36,0.70)"
  const hoverColor = scrolled ? "#ffffff" : "#0d1124"

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setActiveDropdown(item.label)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <a
        href={item.href}
        className="flex items-center gap-1 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 group"
        style={{ color: isActive ? (scrolled ? "#ffffff" : "#0d1124") : textColor }}
      >
        {item.label}
        {item.children && (
          <ChevronDown
            className="w-3 h-3 transition-transform duration-200"
            style={{ transform: isActive ? "rotate(180deg)" : "none" }}
          />
        )}
        {/* Underline indicator */}
        <span
          className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#c5203a] transition-all duration-200"
          style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
        />
      </a>

      {/* Dropdown */}
      {item.children && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 min-w-[180px] py-2 rounded-sm shadow-2xl shadow-black/30 border border-white/8 z-50"
              style={{ background: "#0d1124" }}
            >
              {item.children.map((child) => (
                <a
                  key={child}
                  href="#"
                  className="block px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {child}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
