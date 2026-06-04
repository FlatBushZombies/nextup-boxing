"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TiLocationArrow } from "react-icons/ti"
import { Menu, X, User } from "lucide-react"

import { PremiumModal } from "@/components/PremiumModal"

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Boxers", href: "/boxers" },
  { label: "Stream", href: "/#youtube" },
  { label: "Rankings", href: "/rankings" },
  { label: "Social", href: "/#social-wall" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [premiumOpen, setPremiumOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/" || pathname === ""

  const getHash = (url: string) => {
    const idx = url.indexOf("#")
    return idx !== -1 ? url.substring(idx + 1) : ""
  }

  const getSectionFromHref = (href: string) => {
    const hash = getHash(href)

    if (hash) {
      return hash
    }

    const path = href.split("?")[0].split("#")[0]
    const trimmed = path.replace(/^\/+|\/+$/g, "")

    return trimmed || "hero"
  }

  const normalizePathname = (pathnameValue: string | null) => {
    if (!pathnameValue || pathnameValue === "/") {
      return "hero"
    }

    const trimmed = pathnameValue.replace(/^\/+|\/+$/g, "")
    return trimmed || "hero"
  }

  useEffect(() => {
    setActiveSection(normalizePathname(pathname))
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      setScrolled(scrollTop > 50)
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
    }

    const sections = navLinks
      .map((link) => {
        const hash = getHash(link.href)
        return hash
          ? document.querySelector<HTMLElement>(`#${hash}`)
          : null
      })
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio
          )

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
  }, [pathname])

  const isSolid = scrolled || !isHome

  const shellClass = isSolid
    ? "navbar-editorial text-white shadow-lg"
    : "bg-transparent text-white"

  const signInClass =
    "editorial-button items-center gap-2 rounded-full bg-white px-5 py-2.5 text-black shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b8962e] hover:text-black"

  const toggleMobileMenu = () => {
    setMobileOpen((open) => !open)
  }

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${shellClass}`}
    >
      {/* Top Accent Line */}
      <div
        className={`h-[3px] transition-all duration-500 ${
          isSolid ? "bg-[#0d1124]" : "bg-transparent"
        }`}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className={`relative w-full transition-all duration-500 ease-in-out ${
            scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
          }`}
        >
          {/* Logo */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className={`absolute z-20 transition-all duration-500 ease-in-out ${
              scrolled
                ? "left-0 top-1/2 -translate-y-1/2"
                : "left-1/2 -translate-x-1/2 -top-5 md:-top-7"
            }`}
          >
            <Link href="/#hero" className="group flex items-center">
              <Image
                src="/logo.png"
                alt="NextUp Boxing"
                width={160}
                height={80}
                priority
                className={`h-auto transition-all duration-500 ease-in-out group-hover:scale-[1.03] ${
                  scrolled
                    ? "w-[80px] sm:w-[90px]"
                    : "w-[100px] sm:w-[120px]"
                }`}
                style={{
                  filter:
                    "brightness(1) drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                }}
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className={`hidden xl:flex absolute items-center transition-all duration-500 ease-in-out z-30 pointer-events-auto ${
              scrolled
                ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 lg:gap-8"
                : "left-1/2 bottom-2 -translate-x-1/2 gap-8"
            }`}
          >
            {navLinks.map((link) => {
              const linkHash = getSectionFromHref(link.href)

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={
                    activeSection === linkHash ? "page" : undefined
                  }
                  onClick={() => {
                    setActiveSection(linkHash)
                  }}
                  className="group relative px-2 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-white drop-shadow-md hover:text-white/80 pointer-events-auto"
                >
                  {link.label}

                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#c5203a] transition-transform duration-300 ${
                      activeSection === linkHash
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            })}
          </motion.div>

          {/* Right Actions */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className={`absolute z-20 ${
              scrolled
                ? "right-0 top-1/2 -translate-y-1/2"
                : "right-0 top-2 sm:top-2.5"
            }`}
          >
            {/* Desktop Sign In ONLY */}
            <button
              onClick={() => setPremiumOpen(true)}
              className={`${signInClass} hidden xl:inline-flex mr-4 cursor-pointer`}
            >
              free livestream access
              <TiLocationArrow size={24} />
            </button>

            {/* Mobile + Tablet Hamburger ONLY */}
            <button
              onPointerDown={(event) => {
                event.preventDefault()
                toggleMobileMenu()
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  toggleMobileMenu()
                }
              }}
              className="rounded-full p-2 text-white/90 transition-colors duration-300 hover:text-white xl:hidden drop-shadow-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-[#0d1124]/98 xl:hidden backdrop-blur-xl"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const linkHash = getSectionFromHref(link.href)

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMobileOpen(false)
                      setActiveSection(linkHash)
                    }}
                    aria-current={
                      activeSection === linkHash ? "page" : undefined
                    }
                    className={`block rounded-xl px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      activeSection === linkHash
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Sign In inside dropdown */}
              <button
                onClick={() => {
                  setMobileOpen(false)
                  setPremiumOpen(true)
                }}
                className={`${signInClass} mt-3 flex w-full justify-center cursor-pointer`}
              >
                <User className="h-4 w-4" />
                free livestream access
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Bottom Progress Line */}
      <div className="h-px bg-white/5">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#d4ae44]"
          animate={{ scaleX: Math.max(scrollProgress, 0.02) }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>

      {/* Premium Sign-in Modal */}
      <PremiumModal isOpen={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </nav>
  )
}
