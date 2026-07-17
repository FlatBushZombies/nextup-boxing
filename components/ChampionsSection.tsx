"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Reveal } from "@/components/Reveal"
import { AnimatedLine } from "@/components/AnimatedLine"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const champions = [
  { firstName: "ARTURO",   lastName: "ACEVEDO",   weightClass: "Super-Bantamweight",      championship: "121 SBC Champion",         image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
  { firstName: "XAVIER",   lastName: "WILCHER",   weightClass: "Cruiserweight",           championship: "198 SBC Champion",         image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
  { firstName: "JADEN",    lastName: "HARVEY",    weightClass: "Super-Middleweight",      championship: "165 DAWG Champion",        image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
  { firstName: "BRADLEY",  lastName: "BELT",      weightClass: "Cruiserweight",           championship: "198 ADC Champion",         image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
  { firstName: "NAIJALIE", lastName: "RODRIGUEZ", weightClass: "Women's Light-Flyweight", championship: "106 Women's SBC Champion", image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp" },
  { firstName: "KEVIN",    lastName: "TORRES",    weightClass: "Super-Middleweight",      championship: "165 SBC Champion",         image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
  { firstName: "KIAMAL",   lastName: "EVELYN",    weightClass: "Super-Featherweight",     championship: "132 SBC Champion",         image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
  { firstName: "REESE",    lastName: "MISTRETTA", weightClass: "Light-Heavyweight",       championship: "176 SBC Champion",         image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
]

const N = champions.length
const AUTO_MS = 4800
const GAP = 20 // px between cards

function cardWidth() {
  if (typeof window === "undefined") return 240
  if (window.innerWidth < 640)  return 178
  if (window.innerWidth < 1024) return 218
  return 258
}

export function ChampionsSection() {
  const [active, setActive] = useState(0)
  const [dotKey, setDotKey] = useState(0)

  const trackRef     = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragStartX   = useRef(0)
  const dragging     = useRef(false)
  const didDrag      = useRef(false)

  // ── Center the active card inside the container ───────────────────
  const centerActive = useCallback((instant = false) => {
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const cw    = cardWidth()
    const pitch = cw + GAP
    const targetX = ctr.offsetWidth / 2 - active * pitch - cw / 2
    if (instant) {
      gsap.set(track, { x: targetX })
    } else {
      gsap.to(track, { x: targetX, duration: 0.7, ease: "power3.out", overwrite: true })
    }
  }, [active])

  // Animate on active change
  useEffect(() => { centerActive(false) }, [centerActive])

  // Instant position on mount (layout not yet measured → use rAF)
  useEffect(() => {
    const raf = requestAnimationFrame(() => centerActive(true))
    return () => cancelAnimationFrame(raf)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Recenter on resize
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

  // ── Navigate ──────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    const next = ((idx % N) + N) % N
    setActive(next)
    setDotKey(k => k + 1)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => goTo(active + 1), AUTO_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, goTo])

  // ── Cursor parallax — nudges the track by ±30 px ─────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const { left, width } = (sectionRef.current ?? ctr).getBoundingClientRect()
    const pct    = (e.clientX - left) / width - 0.5          // −0.5 … 0.5
    const cw     = cardWidth()
    const baseX  = ctr.offsetWidth / 2 - active * (cw + GAP) - cw / 2
    gsap.to(track, { x: baseX + pct * -36, duration: 1.0, ease: "power2.out", overwrite: "auto" })
  }, [active])

  const onMouseLeave = useCallback(() => { centerActive(false) }, [centerActive])

  // ── Drag ──────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current  = true
    didDrag.current   = false
    dragStartX.current = e.clientX
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 8) didDrag.current = true
    // Live drag: shift track with finger
    const track = trackRef.current
    const ctr   = containerRef.current
    if (!track || !ctr) return
    const cw    = cardWidth()
    const baseX = ctr.offsetWidth / 2 - active * (cw + GAP) - cw / 2
    gsap.set(track, { x: baseX + dx })
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 44) {
      goTo(active + (dx > 0 ? -1 : 1))
    } else {
      centerActive(false) // snap back
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-16 md:py-24 w-full overflow-hidden border-t border-[#e5e5e5]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <style>{`@keyframes dot-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

      <Image
        src="/boxer-shadow.png"
        alt=""
        aria-hidden="true"
        width={1149}
        height={1369}
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[120%] w-auto opacity-[0.06] mix-blend-multiply md:block"
      />

      {/* Ghost typography — huge outlined active fighter name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden text-center"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-display block"
          style={{
            fontSize: "clamp(6rem, 22vw, 20rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(184,150,46,0.09)",
            lineHeight: 1,
            userSelect: "none",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            transition: "opacity 0.4s ease",
          }}
        >
          {champions[active].lastName}
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <Reveal as="word-reveal" className="flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-gold font-sans">
              Current Champions
            </h2>
            <Link
              href="/boxers"
              className="hidden sm:inline-flex items-center border border-[#e5e5e5] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#111111] transition-colors hover:border-[#707072] font-sans"
            >
              View All Boxers
            </Link>
          </Reveal>
          <AnimatedLine color="gold" delay={100} className="mt-3" />
        </div>

      </div>

      {/* Full-width carousel — no max-w constraint so cards bleed to edges */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ cursor: "grab", userSelect: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)" }} />

        {/* Sliding track — all cards in one flex row at the same height */}
        <div
          ref={trackRef}
          className="flex items-stretch py-4"
          style={{ gap: GAP, willChange: "transform" }}
        >
          {champions.map((fighter, i) => {
            const isActive = i === active
            return (
              <div
                key={fighter.image}
                className="boxer-card-mr flex-none"
                style={{
                  width: "clamp(178px, 20vw, 258px)",
                  aspectRatio: "3/4",
                  position: "relative",
                  zIndex: isActive ? 2 : 1,
                  filter: isActive ? "saturate(1) brightness(1)" : "saturate(0.2) brightness(0.62)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  outline: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                  transition: "filter 0.5s ease, transform 0.5s ease, outline 0.4s ease",
                }}
                onClick={() => { if (!didDrag.current) goTo(i) }}
              >
                <div className="image-wrap">
                  <Image
                    src={fighter.image}
                    alt={`${fighter.firstName} ${fighter.lastName}`}
                    fill
                    sizes="(min-width: 1024px) 258px, (min-width: 640px) 218px, 178px"
                    className="object-cover object-top"
                    draggable={false}
                  />
                  <div className="gradient-overlay" />
                </div>
                <div className="card-hover-overlay">
                  <span className="card-hover-weight">{fighter.weightClass}</span>
                  <span className="card-hover-record">{fighter.firstName}<br />{fighter.lastName}</span>
                  <span className="card-hover-kos">{fighter.championship}</span>
                </div>
                <div className="card-text">
                  <h2 className="font-sans font-semibold">{fighter.firstName} {fighter.lastName}</h2>
                  <span className="weight-cat champion-badge">{fighter.championship}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {champions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${champions[i].firstName} ${champions[i].lastName}`}
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

        {/* Rising Stars Banner */}
        <Reveal
          as="fade-up"
          className="mt-12 flex flex-col items-center justify-center gap-4 border border-[#e5e5e5] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#707072] font-sans">The next wave of talent</p>
            <p className="mt-1 text-base md:text-lg font-semibold uppercase tracking-wide text-gold font-sans">
              Rising Stars &amp; Contenders
            </p>
          </div>
          <Link
            href="/boxers"
            className="inline-flex items-center bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1a1a1a] font-sans"
          >
            View All Boxers
          </Link>
        </Reveal>

      </div>
    </section>
  )
}
