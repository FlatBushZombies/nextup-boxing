"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const MASK_HIDDEN = "radial-gradient(circle at 50% 120%, #000 0%, transparent 0%)"
const MASK_VISIBLE = "radial-gradient(circle at 50% 50%, #000 62%, transparent 100%)"

export function VideoScrollSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const textRevealRef = useRef<HTMLDivElement>(null)
  const labelRef      = useRef<HTMLParagraphElement>(null)
  const word1Ref      = useRef<HTMLSpanElement>(null)
  const word2Ref      = useRef<HTMLSpanElement>(null)
  const word3Ref      = useRef<HTMLSpanElement>(null)
  const subtitleRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

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

    // Set words to invisible before reveal
    gsap.set([labelRef.current, word1Ref.current, word2Ref.current, word3Ref.current, subtitleRef.current], {
      opacity: 0,
      y: 22,
    })

    if (reduced) {
      gsap.set(textRevealRef.current, { WebkitMaskImage: "none", maskImage: "none" })
      gsap.set([labelRef.current, word1Ref.current, word2Ref.current, word3Ref.current, subtitleRef.current], {
        opacity: 1, y: 0,
      })
      return
    }

    if (!isMobile && videoRef.current) {
      videoRef.current.style.filter = "contrast(1.1) saturate(1.22) brightness(0.78)"
    }

    let observer: IntersectionObserver | null = null

    const ctx = gsap.context(() => {
      const video      = videoRef.current
      const section    = sectionRef.current
      const textReveal = textRevealRef.current
      if (!video || !section || !textReveal) return

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

      // Spotlight mask expands from bottom-center
      tl.to(textReveal, {
        WebkitMaskImage: MASK_VISIBLE,
        maskImage: MASK_VISIBLE,
        duration: 2,
        ease: "power2.inOut",
      }, 2)

      // Per-word stagger INSIDE the spotlight — words rise as the mask opens
      tl.to(labelRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.85)
      tl.to(word1Ref.current,  { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 2.05)
      tl.to(word2Ref.current,  { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 2.25)
      tl.to(word3Ref.current,  { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 2.45)
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.65)

      // GTA VI pattern — scroll drives video currentTime
      const addVideoScrub = () => {
        if (!video.duration || isNaN(video.duration)) return
        tl.to(video, { currentTime: video.duration, duration: 4, ease: "none" }, 0)
      }

      if (video.readyState >= 1) {
        addVideoScrub()
      } else {
        video.addEventListener("loadedmetadata", addVideoScrub, { once: true })
      }
    }, sectionRef)

    // Defer metadata load until section is ~2 viewports away
    const video = videoRef.current
    const section = sectionRef.current
    if (video && section) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            video.preload = "metadata"
            video.load()
            observer?.disconnect()
            observer = null
          }
        },
        { rootMargin: "200% 0px" }
      )
      observer.observe(section)
    }

    return () => {
      observer?.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-[#111111]"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        src="/videos/hero.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#111111]/70 via-transparent to-[#111111]/25" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(17,17,17,0.58) 100%)" }}
      />

      {/* Text block — spotlight mask + per-word scrub stagger */}
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
