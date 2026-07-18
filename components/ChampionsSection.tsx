"use client"

import { useEffect, useRef, useState } from "react"
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
const looped = [...champions, ...champions, ...champions]
const GAP = 20
const LOOP_SECONDS = 20 // full set scrolls past in 20 s

function cardWidth() {
  if (typeof window === "undefined") return 240
  if (window.innerWidth < 640)  return 178
  if (window.innerWidth < 1024) return 218
  return 258
}

export function ChampionsSection() {
  const [active, setActive] = useState(Math.floor(N / 2))

  const trackRef       = useRef<HTMLDivElement>(null)
  const containerRef   = useRef<HTMLDivElement>(null)
  const phaseRef       = useRef(0.5)           // 0–1 position within one full set
  const isHoveredRef   = useRef(false)
  const dragging       = useRef(false)
  const didDrag        = useRef(false)
  const dragStartX     = useRef(0)
  const dragStartPhase = useRef(0)
  const lastActiveRef  = useRef(Math.floor(N / 2))

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

  // Continuous loop driven by gsap.ticker
  useEffect(() => {
    const SPEED = 1 / (LOOP_SECONDS * 60) // phase per frame

    const tick = () => {
      const track = trackRef.current
      const ctr   = containerRef.current
      if (!track || !ctr) return

      if (!isHoveredRef.current && !dragging.current) {
        phaseRef.current = (phaseRef.current + SPEED) % 1
      }

      const cw    = cardWidth()
      const pitch = cw + GAP
      const total = N * pitch
      // x when phase=0: the first card of the middle set (index N) is centered
      const baseX = ctr.offsetWidth / 2 - N * pitch - cw / 2
      gsap.set(track, { x: baseX - phaseRef.current * total })

      // Which original card is closest to center?
      const ci = Math.round(((phaseRef.current * N) % N + N) % N)
      if (ci !== lastActiveRef.current) {
        lastActiveRef.current = ci
        setActive(ci)
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  const onMouseEnter = () => { isHoveredRef.current = true }
  const onMouseLeave = () => { isHoveredRef.current = false }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current       = true
    didDrag.current        = false
    dragStartX.current     = e.clientX
    dragStartPhase.current = phaseRef.current
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = dragStartX.current - e.clientX        // positive = drag left = advance
    if (Math.abs(dx) > 6) didDrag.current = true
    const total = N * (cardWidth() + GAP)
    phaseRef.current = ((dragStartPhase.current + dx / total) % 1 + 1) % 1
  }

  const onPointerUp = () => { dragging.current = false }

  return (
    <section
      className="relative bg-white py-16 md:py-24 w-full overflow-hidden border-t border-[#e5e5e5]"
    >
      <Image
        src="/boxer-shadow.png"
        alt=""
        aria-hidden="true"
        width={1149}
        height={1369}
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[120%] w-auto opacity-[0.06] mix-blend-multiply md:block"
      />

      {/* Ghost typography — huge outlined name of the card nearest center */}
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

      {/* Full-width continuous carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ cursor: "grab", userSelect: "none" }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.95), transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95), transparent)" }} />

        <div
          ref={trackRef}
          className="flex items-stretch py-4"
          style={{ gap: GAP, willChange: "transform" }}
        >
          {looped.map((fighter, i) => {
            const isActive = i % N === active
            return (
              <div
                key={`${fighter.image}-${i}`}
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
                onClick={() => {
                  if (!didDrag.current) {
                    phaseRef.current = (i % N) / N
                  }
                }}
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
