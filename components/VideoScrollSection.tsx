"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Circle fully masked at bottom — nothing visible
const MASK_HIDDEN = "radial-gradient(circle at 50% 120%, #000 0%, transparent 0%)"
// Spotlight centered, black core = visible, transparent edges = dark frame
const MASK_VISIBLE = "radial-gradient(circle at 50% 50%, #000 62%, transparent 100%)"

export function VideoScrollSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const textRevealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    // Set mask hidden state before first paint to prevent flash
    if (textRevealRef.current) {
      gsap.set(textRevealRef.current, {
        WebkitMaskImage: MASK_HIDDEN,
        maskImage: MASK_HIDDEN,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
      })
    }

    if (reduced) {
      // Reduced motion: show text immediately, no scroll animation
      gsap.set(textRevealRef.current, {
        WebkitMaskImage: "none",
        maskImage: "none",
      })
      return
    }

    // Apply cinematic color grade on desktop only (GPU-expensive on mobile)
    if (!isMobile && videoRef.current) {
      videoRef.current.style.filter = "contrast(1.1) saturate(1.22) brightness(0.78)"
    }

    const ctx = gsap.context(() => {
      const video     = videoRef.current
      const section   = sectionRef.current
      const textReveal = textRevealRef.current
      if (!video || !section || !textReveal) return

      // Timeline pinned for 180% of viewport height
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Radial spotlight reveal at 50% scroll mark (timeline position 2 of 4)
      tl.to(textReveal, {
        WebkitMaskImage: MASK_VISIBLE,
        maskImage: MASK_VISIBLE,
        duration: 2,
        ease: "power2.inOut",
      }, 2)

      // Drive video currentTime via scroll — GTA VI pattern
      // Added once video metadata is ready so we have the real duration
      const addVideoScrub = () => {
        if (!video.duration || isNaN(video.duration)) return
        tl.to(video, {
          currentTime: video.duration,
          duration: 4,
          ease: "none",
        }, 0)
      }

      // readyState ≥ 1 = HAVE_METADATA
      if (video.readyState >= 1) {
        addVideoScrub()
      } else {
        video.addEventListener("loadedmetadata", addVideoScrub, { once: true })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-[#111111]"
    >
      {/* Scroll-scrubbed video — no autoplay, GSAP drives currentTime */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        src="/videos/hero.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Layered overlays for depth and legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#111111]/70 via-transparent to-[#111111]/25" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(17,17,17,0.58) 100%)" }}
      />

      {/* Text block — hidden behind CSS radial mask, spotlight reveals on scroll */}
      <div
        ref={textRevealRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
      >
        <div className="text-center px-4 max-w-5xl mx-auto">
          {/* Label */}
          <p
            className="font-sans uppercase tracking-[0.45em] mb-6 sm:mb-8"
            style={{ fontSize: "clamp(8px, 1.8vw, 11px)", color: "var(--gold)" }}
          >
            Next Up Boxing League Presents
          </p>

          {/* Headline — Bebas Neue, matching site font-display */}
          <h2
            className="font-display uppercase leading-[0.88]"
            aria-label="Where Champions Are Forged"
          >
            <span
              className="block"
              style={{ fontSize: "clamp(3.5rem, 10.8vw, 9.5rem)", color: "var(--gold-light)" }}
            >
              Where
            </span>
            <span
              className="block"
              style={{ fontSize: "clamp(3.5rem, 10.8vw, 9.5rem)", color: "var(--gold-light)" }}
            >
              Champions
            </span>
            <span
              className="block"
              style={{ fontSize: "clamp(2.8rem, 8.4vw, 7.5rem)", color: "rgba(255,255,255,0.92)" }}
            >
              Are Forged
            </span>
          </h2>

          {/* Divider + event detail */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-6">
            <span className="block h-px bg-white/25" style={{ width: "clamp(24px, 4vw, 56px)" }} />
            <p
              className="font-sans uppercase tracking-[0.38em]"
              style={{ fontSize: "clamp(8px, 1.6vw, 11px)", color: "rgba(255,255,255,0.42)" }}
            >
              Strong Island · Fight Night 11 · June 6th
            </p>
            <span className="block h-px bg-white/25" style={{ width: "clamp(24px, 4vw, 56px)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
