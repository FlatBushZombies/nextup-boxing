"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Fights", href: "#events" },
  { label: "Rankings", href: "#rankings" },
  { label: "Live", href: "#livestream" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
      id="main-navbar"
      style={{
        backgroundColor: scrolled ? 'rgba(13, 17, 36, 0.97)' : 'rgba(255, 255, 255, 0.97)',
        borderBottom: scrolled
          ? '1px solid rgba(184, 150, 46, 0.15)'
          : '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: scrolled
          ? '0 4px 30px rgba(0, 0, 0, 0.3)'
          : '0 1px 10px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[3px] transition-all duration-500"
        style={{
          background: scrolled
            ? '#c5203a'
            : 'linear-gradient(90deg, #1e2d5e 0%, #c5203a 50%, #b8962e 100%)',
        }}
      />

      {/* Ticker bar — desktop only */}
      <div
        className="hidden lg:block overflow-hidden transition-all duration-500"
        style={{
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-1.5 flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{ color: scrolled ? 'rgba(184, 150, 46, 0.7)' : 'rgba(30, 45, 94, 0.6)' }}
          >
            Next Up Boxing League
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500"
            style={{ color: scrolled ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
          >
            Fight Night &nbsp;·&nbsp; June 6, 2026 &nbsp;·&nbsp; Madison Square Garden &nbsp;·&nbsp; 7:00 PM EST
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{ color: scrolled ? 'rgba(184, 150, 46, 0.7)' : 'rgba(30, 45, 94, 0.6)' }}
          >
            Vol. I · Est. 2026
          </span>
        </div>
      </div>

      {/* Main nav row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="NextUp Boxing"
              width={120}
              height={60}
              className="w-[90px] sm:w-[110px] h-auto transition-all duration-500 group-hover:scale-105"
              style={{
                filter: scrolled ? 'brightness(1)' : 'brightness(0.15)',
              }}
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 group"
                style={{
                  color: scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled ? '#ffffff' : '#000000'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)'
                }}
              >
                {link.label}
                <span className="absolute bottom-1 left-5 right-5 h-px bg-[#c5203a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#livestream"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: scrolled ? '#c5203a' : '#1e2d5e',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = scrolled ? '#a01830' : '#141f45'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scrolled ? '#c5203a' : '#1e2d5e'
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              Watch Live
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors duration-500"
              style={{ color: scrolled ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              borderTop: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
              backgroundColor: scrolled ? 'rgba(13, 17, 36, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            }}
          >
            <div className="px-4 py-4 space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 text-[11px] font-bold uppercase tracking-[0.25em] rounded transition-colors"
                  style={{
                    color: scrolled ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#livestream"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 mt-3 px-5 py-3 bg-[#c5203a] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>
                Watch Live
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
