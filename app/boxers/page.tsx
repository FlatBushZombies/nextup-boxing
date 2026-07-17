"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { AnimatedLine } from "@/components/AnimatedLine"
import { ChevronDown, Search, X } from "lucide-react"
import { BookingSection } from "@/components/BookingSection"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Boxers data - World Champions
const worldChampions = [
  {
    id: 1,
    firstName: "Arturo",
    lastName: "Acevedo",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
    weightClass: "Super-Bantamweight",
    titles: "121 SBC CHAMPION",
    record: "23-1-0",
    wins: 23,
    kos: 17,
    losses: 1,
  },
  {
    id: 2,
    firstName: "Bradley",
    lastName: "Belt",
    image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp",
    weightClass: "Cruiserweight",
    titles: "198 ADC CHAMPION",
    record: "26-0-0",
    wins: 26,
    kos: 20,
    losses: 0,
  },
  {
    id: 3,
    firstName: "Jaden",
    lastName: "Harvey",
    image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp",
    weightClass: "Super-Middleweight",
    titles: "165 DAWG CHAMPION",
    record: "22-2-0",
    wins: 22,
    kos: 16,
    losses: 2,
  },
  {
    id: 4,
    firstName: "Kevin",
    lastName: "Torres",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp",
    weightClass: "Super-Middleweight",
    titles: "165 SBC CHAMPION",
    record: "24-1-0",
    wins: 24,
    kos: 18,
    losses: 1,
  },
  {
    id: 5,
    firstName: "Kiamal",
    lastName: "Evelyn",
    image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp",
    weightClass: "Super-Featherweight",
    titles: "132 SBC CHAMPION",
    record: "19-0-0",
    wins: 19,
    kos: 12,
    losses: 0,
  },
  {
    id: 6,
    firstName: "Naijalie",
    lastName: "Rodriguez",
    image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp",
    weightClass: "Women's Light-Flyweight",
    titles: "106 WOMENS SBC CHAMPION",
    record: "18-0-0",
    wins: 18,
    kos: 10,
    losses: 0,
  },
  {
    id: 7,
    firstName: "Reese",
    lastName: "Mistretta",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp",
    weightClass: "Light-Heavyweight",
    titles: "176 SBC CHAMPION",
    record: "25-2-0",
    wins: 25,
    kos: 21,
    losses: 2,
  },
  {
    id: 8,
    firstName: "Xavier",
    lastName: "Wilcher",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
    weightClass: "Cruiserweight",
    titles: "198 SBC CHAMPION",
    record: "28-1-0",
    wins: 28,
    kos: 23,
    losses: 1,
  },
]

const allBoxers = [...worldChampions]

const weightClasses = [
  "All",
  "Heavyweight",
  "Cruiserweight",
  "Light-Heavyweight",
  "Super-Middleweight",
  "Middleweight",
  "Super-Welterweight",
  "Welterweight",
  "Super-Lightweight",
  "Lightweight",
  "Super-Featherweight",
  "Featherweight",
  "Super-Bantamweight",
  "Bantamweight",
  "Super-Flyweight",
  "Flyweight",
]

const sortOptions = ["A-Z", "Z-A", "Record"]

const BOXER_GAP = 16
const AUTO_MS = 4200

function boxerCardWidth() {
  if (typeof window === "undefined") return 200
  if (window.innerWidth < 640)  return 158
  if (window.innerWidth < 1024) return 190
  return 220
}

export default function BoxersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWeight, setSelectedWeight] = useState("All")
  const [sortBy, setSortBy] = useState("A-Z")
  const [showWeightDropdown, setShowWeightDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [active, setActive] = useState(0)
  const [dotKey, setDotKey] = useState(0)

  const trackRef     = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragStartX   = useRef(0)
  const dragging     = useRef(false)
  const didDrag      = useRef(false)

  const filteredBoxers = allBoxers
    .filter((boxer) => {
      const matchesSearch =
        boxer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        boxer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesWeight = selectedWeight === "All" || boxer.weightClass === selectedWeight
      return matchesSearch && matchesWeight
    })
    .sort((a, b) => {
      if (sortBy === "A-Z") return a.lastName.localeCompare(b.lastName)
      if (sortBy === "Z-A") return b.lastName.localeCompare(a.lastName)
      if (sortBy === "Record") return b.wins - a.wins
      return 0
    })

  const N = filteredBoxers.length

  // Reset carousel when filters/sort change
  useEffect(() => {
    setActive(0)
    setDotKey(k => k + 1)
  }, [searchQuery, selectedWeight, sortBy])

  const centerActive = useCallback((instant = false) => {
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const cw      = boxerCardWidth()
    const pitch   = cw + BOXER_GAP
    const targetX = ctr.offsetWidth / 2 - active * pitch - cw / 2
    if (instant) {
      gsap.set(track, { x: targetX })
    } else {
      gsap.to(track, { x: targetX, duration: 0.7, ease: "power3.out", overwrite: true })
    }
  }, [active])

  useEffect(() => { centerActive(false) }, [centerActive])

  // Initial position after layout
  useEffect(() => {
    const raf = requestAnimationFrame(() => centerActive(true))
    return () => cancelAnimationFrame(raf)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Re-center when filtered list changes
  useEffect(() => {
    const raf = requestAnimationFrame(() => centerActive(true))
    return () => cancelAnimationFrame(raf)
  }, [N, centerActive])

  useEffect(() => {
    const handle = () => centerActive(true)
    window.addEventListener("resize", handle, { passive: true })
    return () => window.removeEventListener("resize", handle)
  }, [centerActive])

  // Fade-in on scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    gsap.set(el, { opacity: 0 })
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => gsap.to(el, { opacity: 1, duration: 0.9, ease: "power2.out" }),
    })
  }, [])

  const goTo = useCallback((idx: number) => {
    if (N === 0) return
    const next = ((idx % N) + N) % N
    setActive(next)
    setDotKey(k => k + 1)
  }, [N])

  // Auto-advance
  useEffect(() => {
    if (N === 0) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => goTo(active + 1), AUTO_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, goTo, N])

  // Cursor parallax
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const ref   = sectionRef.current ?? ctr
    const { left, width } = ref.getBoundingClientRect()
    const pct   = (e.clientX - left) / width - 0.5
    const cw    = boxerCardWidth()
    const baseX = ctr.offsetWidth / 2 - active * (cw + BOXER_GAP) - cw / 2
    gsap.to(track, { x: baseX + pct * -36, duration: 1.0, ease: "power2.out", overwrite: "auto" })
  }, [active])

  const onMouseLeave = useCallback(() => { centerActive(false) }, [centerActive])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current   = true
    didDrag.current    = false
    dragStartX.current = e.clientX
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 8) didDrag.current = true
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const cw    = boxerCardWidth()
    const baseX = ctr.offsetWidth / 2 - active * (cw + BOXER_GAP) - cw / 2
    gsap.set(track, { x: baseX + dx })
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 44) {
      goTo(active + (dx > 0 ? -1 : 1))
    } else {
      centerActive(false)
    }
  }

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* Banner Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center bg-[#111111]">
        <div className="absolute inset-0">
          <Image
            src="/boxers/banner-bg.webp"
            alt="Boxing ring atmosphere"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <h1 className="text-6xl md:text-7xl lg:text-[76px] uppercase text-white leading-[0.95] font-display">
            <Reveal as="text-reveal" delay={200}>
              NEXT UP BOXING LEAGUE
            </Reveal>
            <Reveal as="text-reveal" delay={340}>
              CURRENT CHAMPIONS
            </Reveal>
          </h1>
        </div>
      </section>

      {/* World Champions Section */}
      <section className="world-champions relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Vertical Title */}
            <div className="vertical-title lg:w-20 flex-shrink-0">
              <div className="vertical-title-container">
                <h2 className="text-5xl lg:text-7xl uppercase text-outline-white-heavy font-display">
                  NEXT UP BOXING LEAGUE<br />CHAMPIONS
                </h2>
              </div>
            </div>

            {/* Champions Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worldChampions.map((boxer, index) => (
                  <Reveal key={boxer.id} as="clip-up" delay={index * 70}>
                    <ChampionCard boxer={boxer} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Boxers Section — carousel */}
      <section
        ref={sectionRef}
        className="all-boxers py-16 md:py-24 overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <style>{`@keyframes dot-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
              <Reveal as="slide-jab">
                <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-gold font-sans">
                  Rising Stars / Contenders
                </h2>
              </Reveal>
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9e9ea0]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-normal text-[#111111] placeholder-[#9e9ea0] focus:outline-none focus:border-[#707072] transition-colors w-40 rounded-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-[#9e9ea0] hover:text-[#111111]" />
                    </button>
                  )}
                </div>

                {/* Weight Class Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowWeightDropdown(!showWeightDropdown)
                      setShowSortDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors rounded-none"
                  >
                    {selectedWeight === "All" ? "Weight" : selectedWeight}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showWeightDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showWeightDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e5e5e5] z-50 max-h-64 overflow-y-auto">
                      {weightClasses.map((weight) => (
                        <button
                          key={weight}
                          onClick={() => {
                            setSelectedWeight(weight)
                            setShowWeightDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors ${
                            selectedWeight === weight ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#f5f5f5]"
                          }`}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSortDropdown(!showSortDropdown)
                      setShowWeightDropdown(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors rounded-none"
                  >
                    Sort
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-[#e5e5e5] z-50">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option)
                            setShowSortDropdown(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors ${
                            sortBy === option ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#f5f5f5]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <AnimatedLine color="gold" delay={150} />
          </div>
        </div>

        {N === 0 ? (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center py-16">
            <p className="text-[#707072] text-lg">No boxers found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* Full-width carousel track */}
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden"
              style={{ cursor: "grab", userSelect: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              {/* Edge fade masks */}
              <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
              />
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
                style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
              />

              {/* Sliding track */}
              <div
                ref={trackRef}
                className="flex items-stretch py-4"
                style={{ gap: BOXER_GAP, willChange: "transform" }}
              >
                {filteredBoxers.map((boxer, i) => {
                  const isActive = i === active
                  return (
                    <div
                      key={boxer.id}
                      className="boxer-card-mr flex-none"
                      style={{
                        width: "clamp(158px, 18vw, 220px)",
                        aspectRatio: "3/4",
                        opacity: isActive ? 1 : 0.6,
                        outline: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                        transition: "opacity 0.4s ease, outline 0.4s ease",
                      }}
                      onClick={() => { if (!didDrag.current) goTo(i) }}
                    >
                      <div className="image-wrap">
                        <Image
                          src={boxer.image}
                          alt={`${boxer.firstName} ${boxer.lastName}`}
                          fill
                          sizes="(min-width: 1024px) 220px, (min-width: 640px) 190px, 158px"
                          className="object-cover object-top"
                          draggable={false}
                        />
                        <div className="gradient-overlay" />
                      </div>
                      <div className="card-hover-overlay">
                        <span className="card-hover-weight">{boxer.weightClass}</span>
                        <span className="card-hover-record">{boxer.record}</span>
                        <span className="card-hover-kos">{boxer.kos} KOs</span>
                      </div>
                      <div className="card-text">
                        <h2 className="!uppercase !font-bold">{boxer.firstName} {boxer.lastName}</h2>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="mt-6 flex justify-center items-center gap-2">
                {filteredBoxers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Boxer ${i + 1}`}
                    className="relative overflow-hidden bg-[#e0e0e0]"
                    style={{
                      height: 3,
                      width: i === active ? 28 : 14,
                      transition: "width 0.3s ease",
                    }}
                  >
                    {i === active && (
                      <span
                        key={dotKey}
                        className="absolute inset-0 origin-left"
                        style={{
                          background: "var(--gold)",
                          animation: `dot-fill ${AUTO_MS}ms linear forwards`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <BookingSection />
      <Footer />
    </main>
  )
}

interface BoxerData {
  id: number
  firstName: string
  lastName: string
  image: string
  weightClass: string
  titles: string
  record: string
  wins: number
  kos: number
  losses: number
}

function ChampionCard({ boxer }: { boxer: BoxerData }) {
  return (
    <div className="boxer-card-mr aspect-[3/4]">
      <div className="image-wrap">
        <Image
          src={boxer.image}
          alt={`${boxer.firstName} ${boxer.lastName}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="gradient-overlay" />
      </div>
      <div className="card-hover-overlay">
        <span className="card-hover-weight">{boxer.weightClass}</span>
        <span className="card-hover-record">{boxer.record}</span>
        <span className="card-hover-kos">{boxer.kos} KOs</span>
      </div>
      <div className="card-text">
        <h2>{boxer.firstName} {boxer.lastName}</h2>
        <span className="weight-cat champion-badge">{boxer.titles}</span>
      </div>
    </div>
  )
}
