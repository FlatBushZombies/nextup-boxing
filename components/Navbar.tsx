"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Fights", href: "#events" },
  { label: "Rankings", href: "#rankings" },
  { label: "Live", href: "#livestream" },
  { label: "Magazine", href: "#magazine" },
  { label: "Social", href: "#social-wall" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shellClass = scrolled ? "navbar-editorial text-white" : "navbar-white text-[#0d1124]"
  const brandTone = scrolled ? "text-[#b8962e]/70" : "text-[#1e2d5e]/65"
  const metaTone = scrolled ? "text-white/35" : "text-[#0d1124]/40"
  const linkTone = scrolled ? "text-white/65 hover:text-white" : "text-[#0d1124]/65 hover:text-[#0d1124]"
  const logoFilter = scrolled ? "brightness(1)" : "brightness(0.5)"
  const ctaClass = scrolled
    ? "bg-[#c5203a] text-white hover:bg-[#a01830] hover:shadow-[0_18px_40px_rgba(197,32,58,0.28)]"
    : "bg-[#1e2d5e] text-white hover:bg-[#141f45] hover:shadow-[0_18px_40px_rgba(30,45,94,0.24)]"

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${shellClass}`}
    >
      <div
        className={`h-[3px] transition-all duration-500 ${
          scrolled ? "bg-[#c5203a]" : "bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#b8962e]"
        }`}
      />

      <div
        className={`hidden overflow-hidden transition-all duration-500 lg:block ${
          scrolled ? "border-b border-white/6" : "border-b border-black/6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2">
          <span className={`section-eyebrow ${brandTone}`}>Next Up Boxing League</span>
          <span className={`text-[0.72rem] font-medium uppercase tracking-[0.2em] ${metaTone}`}>
            Fight Night | June 6, 2026 | Madison Square Garden | 7:00 PM EST
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="group flex items-center">
            <Image
              src="/logo.png"
              alt="NextUp Boxing"
              width={120}
              height={60}
              className="h-auto w-[92px] transition-transform duration-500 group-hover:scale-[1.03] sm:w-[112px]"
              style={{ filter: logoFilter }}
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group relative rounded-full px-5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-all duration-300 ${linkTone}`}
              >
                {link.label}
                <span className="absolute inset-x-5 bottom-1 h-px origin-left scale-x-0 bg-[#c5203a] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#livestream"
              className={`editorial-button hidden items-center gap-2 rounded-full px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${ctaClass}`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Watch Live
            </a>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className={`rounded-full p-2 transition-colors duration-300 md:hidden ${
                scrolled ? "text-white/75 hover:text-white" : "text-[#0d1124]/70 hover:text-[#0d1124]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden border-t md:hidden ${
              scrolled ? "border-white/8 bg-[#0d1124]/98" : "border-black/6 bg-white/98"
            }`}
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${
                    scrolled
                      ? "text-white/70 hover:bg-white/5 hover:text-white"
                      : "text-[#0d1124]/70 hover:bg-[#1e2d5e]/5 hover:text-[#0d1124]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#livestream"
                onClick={() => setMobileOpen(false)}
                className="editorial-button mt-3 flex items-center justify-center gap-2 rounded-full bg-[#c5203a] px-5 py-3 text-white transition-all duration-300 hover:bg-[#a01830]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Watch Live
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
