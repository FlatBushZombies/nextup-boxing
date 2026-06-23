"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react"

import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Boxers", href: "/boxers" },
  { label: "Events", href: "/events" },
  { label: "Rankings", href: "/rankings" },
  { label: "Champions", href: "/champions" },
  { label: "Stream", href: "/#livestream" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [accountOpen, setAccountOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { member, isLoading, signOut } = useAuth()

  const isHome = pathname === "/" || pathname === ""

  const getHash = (url: string) => {
    const idx = url.indexOf("#")
    return idx !== -1 ? url.substring(idx + 1) : ""
  }

  const getSectionFromHref = (href: string) => {
    const hash = getHash(href)
    if (hash) return hash
    const path = href.split("?")[0].split("#")[0]
    const trimmed = path.replace(/^\/+|\/+$/g, "")
    return trimmed || "hero"
  }

  const normalizePathname = (pathnameValue: string | null) => {
    if (!pathnameValue || pathnameValue === "/") return "hero"
    return pathnameValue.replace(/^\/+|\/+$/g, "") || "hero"
  }

  useEffect(() => {
    setActiveSection(normalizePathname(pathname))
    let scrollTicking = false
    const updateScrollState = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 50)
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
      scrollTicking = false
    }
    const handleScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      window.requestAnimationFrame(updateScrollState)
    }

    const sections = navLinks
      .map((link) => {
        const hash = getHash(link.href)
        return hash ? document.querySelector<HTMLElement>(`#${hash}`) : null
      })
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const nextActive = visibleEntries[0]?.target.id
        if (nextActive) setActiveSection(nextActive)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.35, 0.55] }
    )

    sections.forEach((s) => observer.observe(s))
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const isSolid = scrolled || !isHome
  const shellClass = isSolid
    ? "bg-white border-b border-[#e5e5e5]"
    : "bg-transparent border-b border-transparent"

  const handleSignOut = async () => {
    await signOut()
    setAccountOpen(false)
    router.push("/")
  }

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${shellClass}`}
    >
      {/* Top Accent Line */}
      <div className={`h-[3px] transition-all duration-500 ${isSolid ? "bg-crimson" : "bg-transparent"}`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className={`relative w-full transition-all duration-500 ease-in-out ${scrolled ? "h-14 md:h-16" : "h-20 md:h-24"}`}
        >
          {/* Logo */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className={`absolute z-20 transition-all duration-500 ease-in-out ${
              scrolled ? "left-0 top-1/2 -translate-y-1/2" : "left-1/2 -translate-x-1/2 -top-5 md:-top-7"
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
                  scrolled ? "w-[80px] sm:w-[90px]" : "w-[100px] sm:w-[120px]"
                }`}
                style={isSolid ? undefined : { filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
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
              const isActive = activeSection === linkHash

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveSection(linkHash)}
                  className={`group relative px-2 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 pointer-events-auto font-sans ${
                    isSolid
                      ? "text-[#111111] hover:text-[#707072]"
                      : "text-white drop-shadow-md hover:text-white/80"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-crimson transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
            className={`absolute z-20 flex items-center gap-3 ${
              scrolled ? "right-0 top-1/2 -translate-y-1/2" : "right-0 top-2 sm:top-2.5"
            }`}
          >
            {/* Desktop: Sign In / Account */}
            <div className="hidden xl:flex items-center">
              {!isLoading && member ? (
                <div className="relative">
                  <button
                    onClick={() => setAccountOpen((o) => !o)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] font-sans transition-colors cursor-pointer ${
                      isSolid
                        ? "text-[#111111] hover:text-[#707072]"
                        : "text-white drop-shadow-md hover:text-white/80"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    {member.firstName}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#e5e5e5] shadow-sm"
                      >
                        <Link
                          href="/account/dashboard"
                          onClick={() => setAccountOpen(false)}
                          className="block px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#111111] hover:bg-[#f5f5f5] transition-colors"
                        >
                          My Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#707072] hover:bg-[#f5f5f5] transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 skew-x-[-8deg] bg-[#111111] px-5 py-2.5 text-white shadow-[0_0_0_2px_var(--gold)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a1a] mr-4"
                >
                  <span className="skew-x-[8deg] flex items-center gap-2 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em]">
                    <User className="h-4 w-4" />
                    Sign In
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onPointerDown={(e) => { e.preventDefault(); setMobileOpen((o) => !o) }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMobileOpen((o) => !o) } }}
              className={`rounded-full p-2 transition-colors duration-300 xl:hidden ${
                isSolid ? "text-[#111111] hover:text-[#707072]" : "text-white/90 hover:text-white drop-shadow-md"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#e5e5e5] bg-white xl:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const linkHash = getSectionFromHref(link.href)
                const isActive = activeSection === linkHash
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => { setMobileOpen(false); setActiveSection(linkHash) }}
                    aria-current={isActive ? "page" : undefined}
                    className={`block border-l-2 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 font-sans ${
                      isActive
                        ? "border-crimson bg-[#f5f5f5] text-[#111111]"
                        : "border-transparent text-[#707072] hover:bg-[#f5f5f5] hover:text-[#111111]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {!isLoading && member ? (
                <>
                  <Link
                    href="/account/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 flex w-full items-center gap-2 border border-[#e5e5e5] px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-[#f5f5f5]"
                  >
                    <User className="h-4 w-4" />
                    {member.firstName} — Dashboard
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); handleSignOut() }}
                    className="mt-1 flex w-full items-center gap-2 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#707072] transition-colors hover:bg-[#f5f5f5] cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex w-full justify-center items-center gap-2 bg-[#111111] px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1a1a1a]"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Progress Line */}
      <div className="h-px bg-[#e5e5e5]">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-crimson via-gold to-[#111111]"
          animate={{ scaleX: Math.max(scrollProgress, 0.02) }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </div>
    </nav>
  )
}
