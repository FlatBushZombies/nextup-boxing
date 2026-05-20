"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Menu, X, User } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Fights", href: "#events" },
  { label: "Stream", href: "#livestream" },
  { label: "Rankings", href: "#rankings" },
  { label: "Magazine", href: "#magazine" },
  { label: "Social", href: "#social-wall" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      setScrolled(scrollTop > 50)
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
    }

    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)

        const nextActive = visibleEntries[0]?.target.id

        if (nextActive) {
          setActiveSection(nextActive)
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.55],
      }
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const shellClass = scrolled ? "navbar-editorial text-white" : "bg-transparent text-white"
  const signInClass =
    "editorial-button inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${shellClass}`}
    >
      <div
        className={`h-[3px] transition-all duration-500 ${
          scrolled ? "bg-[#c5203a]" : "bg-transparent"
        }`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="relative flex h-20 flex-row items-center justify-between transition-all duration-500">
          
          {/* Logo */}
          <div className="z-10 flex-shrink-0 transition-all duration-500">
            <a href="#hero" className="group flex items-center">
              <Image
                src="/logo.png"
                alt="NextUp Boxing"
                width={scrolled ? 112 : 160}
                height={scrolled ? 56 : 80}
                className={`h-auto transition-all duration-500 group-hover:scale-[1.03] ${scrolled ? "w-[100px] sm:w-[120px]" : "w-[130px] sm:w-[160px]"}`}
                style={{ filter: "brightness(1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
                priority
              />
            </a>
          </div>

          {/* Nav Links */}
          <div className={`hidden items-center transition-all duration-500 md:flex z-10 ${scrolled ? "gap-6" : "gap-10"}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-white drop-shadow-md hover:text-white/80"
                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#c5203a] transition-transform duration-300 ${
                    activeSection === link.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="z-10 flex flex-shrink-0 items-center gap-3">
            <a href="#signin" className={signInClass}>
              <User className="h-4 w-4" />
              Sign in
            </a>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-full p-2 text-white/90 transition-colors duration-300 hover:text-white md:hidden drop-shadow-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-[#0d1124]/98 md:hidden backdrop-blur-xl"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#signin"
                onClick={() => setMobileOpen(false)}
                className={`${signInClass} mt-3 w-full justify-center`}
              >
                <User className="h-4 w-4" />
                Sign in
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="h-px bg-white/5">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#d4ae44]"
          animate={{ scaleX: Math.max(scrollProgress, 0.02) }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>
    </nav>
  )
}

