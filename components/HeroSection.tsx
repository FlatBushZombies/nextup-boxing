"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

// No longer used as a numeric delay — entrance is now event-driven via "loader:revealed"
// Kept as a fallback cap (ms) in case the event never fires (e.g. HMR, no loader)
const HERO_DELAY_FALLBACK_MS = 400

const SLIDE_HOLD_MS = 8000
const FIRST_ADVANCE_MS = 5000

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
  const dotsRef       = useRef<HTMLDivElement>(null)
  const flashRef      = useRef<HTMLDivElement>(null)

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0)
  const [dotKey, setDotKey] = useState(0)
  // Mirrors activeSlide — avoids stale closures inside timer callbacks
  const activeSlideRef = useRef<number>(0)

  // Slider: image (base) → video (crossfade in) → image (crossfade out) → …
  useEffect(() => {
    const video = videoRef.current
    const videoLayer = videoLayerRef.current
    if (!video || !videoLayer) return

    // Ensure video layer starts hidden
    gsap.set(videoLayer, { opacity: 0 })

    // Color grade only on desktop
    if (window.innerWidth >= 768) {
      video.style.filter = "contrast(1.12) saturate(1.3) brightness(0.82)"
    }

    let timer: ReturnType<typeof setTimeout>

    const advance = () => {
      const next: 0 | 1 = activeSlideRef.current === 0 ? 1 : 0
      activeSlideRef.current = next
      setActiveSlide(next)
      setDotKey((k) => k + 1)

      if (next === 1) {
        // Fade video IN over the static image
        video.currentTime = 0
        video.play().catch(() => {})
        gsap.to(videoLayer, {
          opacity: 1,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => { timer = setTimeout(advance, SLIDE_HOLD_MS) },
        })
      } else {
        // Fade video OUT — image underneath is always visible
        gsap.to(videoLayer, {
          opacity: 0,
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => { video.pause(); timer = setTimeout(advance, SLIDE_HOLD_MS) },
        })
      }
    }

    timer = setTimeout(advance, FIRST_ADVANCE_MS)

    return () => {
      clearTimeout(timer)
      gsap.killTweensOf(videoLayer)
    }
  }, [])

  // Main GSAP context: entrance, pin, clip-path warp, parallax
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let split1: InstanceType<typeof SplitText> | null = null
    let split2: InstanceType<typeof SplitText> | null = null
    // Held outside the GSAP context so cleanup can removeEventListener
    let entrancePlay: (() => void) | null = null

    // Bell impact: white flash + elastic shake on the hero frame
    const triggerBell = () => {
      if (flashRef.current) {
        gsap.fromTo(flashRef.current, { opacity: 0.1 }, { opacity: 0, duration: 0.3, ease: "power2.out" })
      }
      if (heroFrameRef.current) {
        gsap.fromTo(heroFrameRef.current, { x: 5 }, { x: 0, duration: 0.45, ease: "elastic.out(2.5, 0.35)" })
      }
    }

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [dateRowRef.current, leagueRef.current, badgeRef.current, ctaRef.current, scrollHintRef.current, dotsRef.current],
          { opacity: 1, y: 0 }
        )
        // line1/line2 start opacity:0 in JSX — snap them visible immediately
        gsap.set([line1Ref.current, line2Ref.current], { opacity: 1 })
        return
      }

      // ── 1. Ken Burns — delayed so it plays AS the loader curtain lifts ──
      const img = bgWrapRef.current?.querySelector("img")
      if (img) {
        gsap.fromTo(img,
          { scale: 1.05 },
          { scale: 1.0, duration: 1.6, ease: "power2.out", delay: 0.3 }
        )
      }

      // ── 2. Staggered text entrance — build paused, fire on loader event ──
      const entranceTl = gsap.timeline({ paused: true })

      // Split early so words are hidden before the loader lifts
      if (line1Ref.current && line2Ref.current) {
        // Reveal parent spans (opacity:0 in JSX) so the split words inside them
        // are composited correctly once they animate in
        gsap.set([line1Ref.current, line2Ref.current], { opacity: 1 })
        split1 = new SplitText(line1Ref.current, { type: "words" })
        split2 = new SplitText(line2Ref.current, { type: "words" })
        gsap.set([...split1.words, ...split2.words], { y: 100, opacity: 0 })
      }

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

      if (split1 && split2) {
        entranceTl
          .to(split1.words, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }, ">-0.25")
          .to(split2.words, { y: 0, opacity: 1, duration: 0.32, stagger: 0.015, ease: "expo.out", onComplete: triggerBell }, "-=0.2")
      }

      entranceTl
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
        .fromTo(dotsRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        )

      // Store play fn where cleanup can reach it
      entrancePlay = () => { entranceTl.play() }

      // Scroll parallax — headline drifts up as hero exits viewport
      if (line1Ref.current && !reduced) {
        gsap.fromTo(line1Ref.current,
          { yPercent: 0 },
          {
            yPercent: 100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom center",
              scrub: true,
            },
          }
        )
      }

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
          { opacity: 0.85, ease: "none" },
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
        .to(dotsRef.current,
          { opacity: 0, duration: 0.3 },
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

    // Wire entrance playback outside the GSAP context so we can clean it up
    if (entrancePlay) {
      if (!document.documentElement.classList.contains("is-loading")) {
        // No loader present (dev HMR, fast-refresh, etc.) — small defer for DOM readiness
        setTimeout(entrancePlay, HERO_DELAY_FALLBACK_MS)
      } else {
        window.addEventListener("loader:revealed", entrancePlay, { once: true })
      }
    }

    return () => {
      split1?.revert()
      split2?.revert()
      ctx.revert()
      if (entrancePlay) window.removeEventListener("loader:revealed", entrancePlay)
    }
  }, [])

  return (
    <>
      <style>{`@keyframes dot-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
      <section
        id="hero"
        ref={sectionRef}
        className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#111111] sm:h-[100dvh] sm:min-h-[700px]"
      >
        {/* Visual frame — clip-path warp target; contains all bg layers */}
        <div ref={heroFrameRef} className="pointer-events-none absolute inset-0 z-0">

          {/* Slide 0: BG image layer — extended so parallax + pin zoom never clip */}
          <div
            ref={bgWrapRef}
            className="absolute left-0 right-0"
            style={{ top: "-14%", bottom: "-14%", zIndex: 1 }}
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

          {/* Slide 1: video layer — crossfades in over the image */}
          <div
            ref={videoLayerRef}
            className="absolute inset-0"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-boxers.webp"
              className="absolute inset-0 h-full w-full object-cover"
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
            style={{ opacity: 0, zIndex: 3 }}
          />

          {/* Grid texture */}
          <div className="futuristic-grid absolute inset-0 opacity-20" style={{ zIndex: 4 }} />

          {/* Bell impact flash */}
          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 bg-white"
            style={{ opacity: 0, zIndex: 5 }}
          />
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
                Sept 12th
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

            {/* Headline — per-word SplitText reveal */}
            <h1 className="text-[3.2rem] uppercase leading-[0.95] min-[380px]:text-[3.8rem] sm:text-[5.6rem] md:text-[6rem] lg:text-[76px] font-display">
              <span
                ref={line1Ref}
                data-skew
                className="block"
                style={{ color: "var(--gold-light)", opacity: 0 }}
              >
                Strong Island
              </span>
              <span
                ref={line2Ref}
                data-skew
                className="block"
                style={{ color: "var(--crimson-light)", opacity: 0 }}
              >
                Fight Night 12
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
                Doors 4:30 · Fights 6 PM
              </span>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="relative z-30 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <a
                href="https://strongislandfights.com"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="cta-cinematic cta-primary-c flex min-h-12 w-full sm:w-auto items-center justify-center bg-white px-8 py-3 font-sans text-sm font-medium uppercase tracking-wide text-[#111111]"
              >
                <span className="cta-sweep" />
                <span className="cta-inner">
                  <span className="cta-label cta-label-top">Get Tickets</span>
                  <span className="cta-label cta-label-bot">Get Tickets</span>
                </span>
              </a>
              <a
                href="#livestream"
                data-magnetic
                className="cta-cinematic cta-secondary-c flex min-h-12 w-full sm:w-auto items-center justify-center border border-white/30 bg-transparent px-8 py-3 font-sans text-sm font-medium uppercase tracking-wide text-white"
              >
                <span className="cta-sweep" />
                <span className="cta-inner">
                  <span className="cta-label cta-label-top">Free Livestream</span>
                  <span className="cta-label cta-label-bot">Free Livestream</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Slide indicators — sharp 28×3px bars, active fills gold over hold */}
        <div
          ref={dotsRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-8"
          aria-hidden="true"
        >
          {([0, 1] as const).map((i) => (
            <div key={i} className="relative h-[3px] w-7 overflow-hidden bg-white/25">
              {activeSlide === i && (
                <span
                  key={dotKey}
                  className="absolute inset-0"
                  style={{
                    background: "var(--gold)",
                    transformOrigin: "left",
                    // dotKey===0 is the very first slide-0 fill, which lasts FIRST_ADVANCE_MS
                    animation: `dot-fill ${dotKey === 0 ? FIRST_ADVANCE_MS : SLIDE_HOLD_MS}ms linear forwards`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Scroll hint — fades in after entrance, fades out as pin progresses */}
        <div
          ref={scrollHintRef}
          className="scroll-hint-indicator"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="scroll-hint-line" />
        </div>
      </section>
    </>
  )
}
