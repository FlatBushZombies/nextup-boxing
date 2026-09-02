"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArenaCanvas } from "@/components/ArenaCanvas"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const MASK_HIDDEN  = "radial-gradient(circle at 50% 120%, #000 0%, transparent 0%)"
const MASK_VISIBLE = "radial-gradient(circle at 50% 50%, #000 62%, transparent 100%)"
const BAR_H = "12.5%"

export function VideoScrollSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const textRevealRef = useRef<HTMLDivElement>(null)
  const labelRef      = useRef<HTMLParagraphElement>(null)
  const word1Ref      = useRef<HTMLSpanElement>(null)
  const word2Ref      = useRef<HTMLSpanElement>(null)
  const word3Ref      = useRef<HTMLSpanElement>(null)
  const subtitleRef   = useRef<HTMLDivElement>(null)
  const barTopRef     = useRef<HTMLDivElement>(null)
  const barBotRef     = useRef<HTMLDivElement>(null)
  const chromaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (textRevealRef.current) {
      gsap.set(textRevealRef.current, {
        WebkitMaskImage: MASK_HIDDEN,
        maskImage:       MASK_HIDDEN,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat:       "no-repeat",
        WebkitMaskSize:   "100% 100%",
        maskSize:         "100% 100%",
      })
    }

    gsap.set(
      [labelRef.current, word1Ref.current, word2Ref.current, word3Ref.current, subtitleRef.current],
      { opacity: 0, y: 22 }
    )

    if (reduced) {
      gsap.set(textRevealRef.current, { WebkitMaskImage: "none", maskImage: "none" })
      gsap.set(
        [labelRef.current, word1Ref.current, word2Ref.current, word3Ref.current, subtitleRef.current],
        { opacity: 1, y: 0 }
      )
      return
    }

    // Bars start off-screen and glide in when the section pins
    gsap.set(barTopRef.current, { y: "-100%" })
    gsap.set(barBotRef.current, { y:  "100%" })

    const ctx = gsap.context(() => {
      const section    = sectionRef.current
      const textReveal = textRevealRef.current
      if (!section || !textReveal) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start:   "top top",
          end:     "+=45%",
          scrub:   0.35,
          pin:     true,
          anticipatePin: 1,
          onEnter: () => {
            // One-shot chroma aberration flash — fires once, not scrubbed
            if (chromaRef.current) {
              gsap.fromTo(
                chromaRef.current,
                { opacity: 0.75 },
                { opacity: 0, duration: 0.55, ease: "power2.out" }
              )
            }
          },
        },
      })

      // Letterbox bars glide in at start of pin.
      // ease: "none" throughout — this timeline is scrub-driven, so its own
      // scrub value already provides the smoothing; a non-linear ease inside
      // a scrubbed tween fights the scrub and makes progress lag then jump
      // to catch up with the scrollbar instead of tracking it directly.
      tl.to(barTopRef.current, { y: "0%", duration: 0.45, ease: "none" }, 0)
      tl.to(barBotRef.current, { y: "0%", duration: 0.45, ease: "none" }, 0)

      // Spotlight mask expands from below center — starts right as the bars
      // land instead of leaving a dead scroll gap before anything else moves
      tl.to(textReveal, {
        WebkitMaskImage: MASK_VISIBLE,
        maskImage:       MASK_VISIBLE,
        duration: 1.3,
        ease: "none",
      }, 0.5)

      // Words rise inside the spotlight
      tl.to(labelRef.current,    { opacity: 1, y: 0, duration: 0.5, ease: "none" }, 0.6)
      tl.to(word1Ref.current,    { opacity: 1, y: 0, duration: 0.55, ease: "none" }, 0.8)
      tl.to(word2Ref.current,    { opacity: 1, y: 0, duration: 0.55, ease: "none" }, 1.0)
      tl.to(word3Ref.current,    { opacity: 1, y: 0, duration: 0.55, ease: "none" }, 1.2)
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "none" }, 1.4)
    }, sectionRef)

    return () => { ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-[#111111]"
    >
      {/* Living arena canvas — always-on particle system */}
      <ArenaCanvas className="absolute inset-0" />

      {/* Ambient vignettes */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#111111]/70 via-transparent to-[#111111]/25" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(17,17,17,0.58) 100%)" }}
      />

      {/* Chromatic aberration — screen-blended diagonal color split, fires once on entry */}
      <div
        ref={chromaRef}
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          opacity: 0,
          background: "linear-gradient(108deg, rgba(255,30,30,0.32) 0%, transparent 36%, rgba(30,80,255,0.32) 100%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Cinematic letterbox — top */}
      <div
        ref={barTopRef}
        className="pointer-events-none absolute top-0 left-0 right-0 z-[25] bg-[#111111]"
        style={{ height: BAR_H }}
      />

      {/* Cinematic letterbox — bottom */}
      <div
        ref={barBotRef}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[25] bg-[#111111]"
        style={{ height: BAR_H }}
      />

      {/* Text block — spotlight mask + scrub-driven word stagger */}
      <div
        ref={textRevealRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
      >
        <div className="text-center px-4 max-w-5xl mx-auto">
          <p
            ref={labelRef}
            className="font-sans uppercase tracking-[0.45em] mb-6 sm:mb-8"
            style={{ fontSize: "clamp(8px, 1.8vw, 11px)", color: "var(--gold)" }}
          >
            Next Up Boxing League Presents
          </p>

          <h2
            className="font-display uppercase leading-[0.88]"
            aria-label="Where Champions Are Forged"
          >
            <span
              ref={word1Ref}
              className="block"
              style={{ fontSize: "clamp(3.5rem, 10.8vw, 9.5rem)", color: "var(--gold-light)" }}
            >
              Where
            </span>
            <span
              ref={word2Ref}
              className="block"
              style={{ fontSize: "clamp(3.5rem, 10.8vw, 9.5rem)", color: "var(--gold-light)" }}
            >
              Champions
            </span>
            <span
              ref={word3Ref}
              className="block"
              style={{ fontSize: "clamp(2.8rem, 8.4vw, 7.5rem)", color: "rgba(255,255,255,0.92)" }}
            >
              Are Forged
            </span>
          </h2>

          <div ref={subtitleRef} className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-6">
            <span className="block h-px bg-white/25" style={{ width: "clamp(24px, 4vw, 56px)" }} />
            <p
              className="font-sans uppercase tracking-[0.38em]"
              style={{ fontSize: "clamp(8px, 1.6vw, 11px)", color: "rgba(255,255,255,0.42)" }}
            >
              Strong Island · Fight Night 12 · Sept 12th
            </p>
            <span className="block h-px bg-white/25" style={{ width: "clamp(24px, 4vw, 56px)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
