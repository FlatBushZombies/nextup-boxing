"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Matches PageLoader total (1700ms) + cinematic slide-exit (650ms)
const HERO_DELAY = 2.1

export function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const heroFrameRef  = useRef<HTMLDivElement>(null)
  const bgWrapRef     = useRef<HTMLDivElement>(null)
  const videoLayerRef = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const pinOverlayRef = useRef<HTMLDivElement>(null)
  const dateRowRef    = useRef<HTMLDivElement>(null)
  const leagueRef     = useRef<HTMLSpanElement>(null)
  const line1Ref      = useRef<HTMLSpanElement>(null)
  const line2Ref      = useRef<HTMLSpanElement>(null)
  const badgeRef      = useRef<HTMLDivElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  // Auto-cycle: image → video → image → … with GSAP crossfade
  useEffect(() => {
    const video = videoRef.current
    const layer = videoLayerRef.current
    if (!video || !layer) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let timer: ReturnType<typeof setTimeout>

    const fadeTo = (showVideo: boolean) => {
      if (showVideo) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
      gsap.to(layer, {
        opacity: showVideo ? 1 : 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (!showVideo) video.pause()
          timer = setTimeout(() => fadeTo(!showVideo), 8000)
        },
      })
    }

    // First video transition fires after entrance animation settles
    timer = setTimeout(() => fadeTo(true), 5000)

    return () => {
      clearTimeout(timer)
      gsap.killTweensOf(layer)
    }
  }, [])

  // Main GSAP context: entrance, pin, clip-path warp, parallax
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [dateRowRef.current, leagueRef.current, badgeRef.current, ctaRef.current, scrollHintRef.current],
          { opacity: 1, y: 0 }
        )
        gsap.set([line1Ref.current, line2Ref.current], { y: "0%" })
        return
      }

      // ── 1. Reverse Ken Burns — image settles in as loader exits ─────
      const img = bgWrapRef.current?.querySelector("img")
      if (img) {
        gsap.fromTo(img,
          { scale: 1.08 },
          { scale: 1.0, duration: 2.4, ease: "power2.out" }
        )
      }

      // ── 2. Staggered text entrance — fires as loader curtain clears ──
      const entranceTl = gsap.timeline({ delay: HERO_DELAY })
      entranceTl
        .fromTo(dateRowRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }
        )
        .fromTo(leagueRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
          "-=0.38"
        )
        .fromTo(line1Ref.current,
          { y: "102%" },
          { y: "0%", duration: 0.9, ease: "power4.out" },
          "-=0.25"
        )
        .fromTo(line2Ref.current,
          { y: "102%" },
          { y: "0%", duration: 0.9, ease: "power4.out" },
          "-=0.72"
        )
        .fromTo(badgeRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
          "-=0.42"
        )
        .fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
          "-=0.35"
        )
        .fromTo(scrollHintRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.1"
        )

      // ── 3. Section pin — hero holds while scroll-driven effects play ─
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: "+=75%",
          anticipatePin: 1,
        },
      })
      pinTl
        .fromTo(pinOverlayRef.current,
          { opacity: 0 },
          { opacity: 0.28, ease: "none" },
          0
        )
        .fromTo(bgWrapRef.current,
          { scale: 1 },
          { scale: 1.04, ease: "none" },
          0
        )
        .to(scrollHintRef.current,
          { opacity: 0, y: -14, ease: "power2.in", duration: 0.3 },
          0.5
        )

      // ── 4. Clip-path polygon warp — Zentry-inspired, boxing sharp ───
      const frame = heroFrameRef.current
      if (frame) {
        // End state: aggressive diagonal cut — no rounded corners
        gsap.set(frame, {
          clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 95%)",
        })
        gsap.from(frame, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=75%",
            scrub: 1.5,
          },
        })
      }

      // ── 5. Post-pin parallax — fires after pin releases ─────────────
      if (bgWrapRef.current) {
        gsap.to(bgWrapRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#111111] sm:h-[100dvh] sm:min-h-[700px]"
    >
      {/* Visual frame — clip-path warp target; contains all bg layers */}
      <div ref={heroFrameRef} className="pointer-events-none absolute inset-0 z-0">

        {/* BG image layer — extended so parallax + pin zoom never clip */}
        <div
          ref={bgWrapRef}
          className="absolute left-0 right-0"
          style={{ top: "-14%", bottom: "-14%" }}
        >
          <Image
            src="/hero-boxers.webp"
            alt="Main event fighters"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "center 20%" }}
            className="object-contain object-top sm:object-cover sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-[#111111]/20" />
        </div>

        {/* Video layer — opacity-0, crossfades in on auto-cycle */}
        <div
          ref={videoLayerRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "contrast(1.12) saturate(1.3) brightness(0.82)" }}
          />
          {/* Gradient keeps headline legible over video */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-[#111111]/15" />
          {/* Radial vignette for cinematic depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(17,17,17,0.65) 100%)",
            }}
          />
        </div>

        {/* Scroll-driven darkening overlay */}
        <div
          ref={pinOverlayRef}
          className="absolute inset-0 bg-[#111111]"
          style={{ opacity: 0 }}
        />

        {/* Grid texture */}
        <div className="futuristic-grid absolute inset-0 opacity-20" />
      </div>

      {/* Main content — sits above frame, not subject to clip-path */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-4 pb-8 pt-28 sm:block sm:h-full sm:min-h-0 sm:px-8 sm:pb-0 sm:pt-0 lg:px-16">
        <div className="relative z-30 flex w-full max-w-[calc(100vw-2rem)] flex-col items-start gap-3 text-left sm:absolute sm:inset-x-auto sm:left-[6%] sm:bottom-10 sm:w-auto sm:max-w-[36rem] sm:gap-5 md:left-[7%] md:max-w-[40rem] lg:left-[8%] lg:bottom-16 xl:left-[9%]">

          {/* Date row */}
          <div ref={dateRowRef} style={{ opacity: 0 }} className="flex items-center gap-3">
            <span className="inline-flex items-center bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#111111]">
              Sat
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
              June 6th
            </span>
          </div>

          {/* League name */}
          <span
            ref={leagueRef}
            style={{ opacity: 0 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-white/70"
          >
            Next Up Boxing League
          </span>

          {/* Headline — each line masked independently */}
          <h1 className="text-[3.2rem] uppercase leading-[0.95] min-[380px]:text-[3.8rem] sm:text-[5.6rem] md:text-[6rem] lg:text-[76px] font-display">
            <span className="block overflow-hidden pb-1">
              <span
                ref={line1Ref}
                style={{ display: "block", transform: "translateY(102%)", color: "var(--gold-light)" }}
              >
                Strong Island
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span
                ref={line2Ref}
                style={{ display: "block", transform: "translateY(102%)", color: "var(--crimson-light)" }}
              >
                Fight Night 11
              </span>
            </span>
          </h1>

          {/* Time badge */}
          <div
            ref={badgeRef}
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2"
          >
            <span className="pulse-glow h-2 w-2 rounded-full bg-white" />
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
              5 PM Sharp
            </span>
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ opacity: 0 }}
            className="relative z-30 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center bg-white px-8 py-3 text-center text-sm font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-gold hover:text-[#111111]"
            >
              Get Tickets
            </a>
            <a
              href="#livestream"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center border border-white/30 bg-transparent px-8 py-3 text-center text-sm font-medium uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              Free Livestream
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint — fades in after entrance, fades out as pin progresses */}
      <div
        ref={scrollHintRef}
        className="scroll-hint-indicator"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="scroll-hint-label">Scroll</span>
        <div className="scroll-hint-line" />
      </div>
    </section>
  )
}
