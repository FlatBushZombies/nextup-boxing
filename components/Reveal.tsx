"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export type RevealType =
  | "fade-up"       // general content: y↑ + opacity
  | "fade-in"       // pure opacity (images, overlays)
  | "slide-right"   // x← slide entry from right
  | "slide-left"    // x→ slide entry from left (same as slide-jab but gentler)
  | "clip-up"       // fighter card: inset clip from bottom
  | "scale-up"      // media/card: subtle scale + opacity
  | "slide-jab"     // section titles: fast left-side punch-in
  | "text-reveal"   // masked line-by-line reveal — wrap children in overflow:hidden, inner content rises
  | "image-reveal"  // clip-path + scale compound image entrance

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  as?: RevealType
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.65,
  as = "fade-up",
}: RevealProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const delayS = delay / 1000

    const triggerCfg: ScrollTrigger.Vars = {
      trigger: outer,
      start: "top 92%",
      once: true,
    }

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(outer, { opacity: 1, clipPath: "none", x: 0, y: 0, scale: 1 })
        if (inner) gsap.set(inner, { y: 0, scale: 1 })
        return
      }

      switch (as) {

        case "text-reveal":
          // Outer div is the overflow:hidden mask; inner div rises from below
          if (!inner) break
          gsap.fromTo(inner,
            { y: "105%", willChange: "transform" },
            {
              y: "0%",
              duration: duration + 0.2,
              delay: delayS,
              ease: "power4.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(inner, { willChange: "auto" }) },
            }
          )
          break

        case "image-reveal":
          // Clip-path opens from top+bottom toward center; image scales in simultaneously
          if (!inner) break
          gsap.fromTo(outer,
            { clipPath: "inset(8% 0 8% 0)", willChange: "clip-path" },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: duration + 0.25,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          gsap.fromTo(inner,
            { scale: 1.08, willChange: "transform" },
            {
              scale: 1,
              duration: duration + 0.25,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(inner, { willChange: "auto" }) },
            }
          )
          break

        case "clip-up":
          gsap.fromTo(outer,
            { clipPath: "inset(100% 0 0 0)", willChange: "clip-path" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: duration + 0.1,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "slide-jab":
          gsap.fromTo(outer,
            { x: -56, opacity: 0, willChange: "transform, opacity" },
            {
              x: 0,
              opacity: 1,
              duration: duration * 0.6,
              delay: delayS,
              ease: "power4.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "slide-right":
          gsap.fromTo(outer,
            { x: 48, opacity: 0, willChange: "transform, opacity" },
            {
              x: 0,
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "slide-left":
          gsap.fromTo(outer,
            { x: -48, opacity: 0, willChange: "transform, opacity" },
            {
              x: 0,
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "scale-up":
          gsap.fromTo(outer,
            { scale: 0.93, opacity: 0, willChange: "transform, opacity" },
            {
              scale: 1,
              opacity: 1,
              duration: duration + 0.15,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "fade-in":
          gsap.fromTo(outer,
            { opacity: 0, willChange: "opacity" },
            {
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power2.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break

        case "fade-up":
        default:
          gsap.fromTo(outer,
            { y: 44, opacity: 0, willChange: "transform, opacity" },
            {
              y: 0,
              opacity: 1,
              duration: duration + 0.1,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => { gsap.set(outer, { willChange: "auto" }) },
            }
          )
          break
      }
    }, outer)

    return () => ctx.revert()
  }, [as, delay, duration])

  // ── Initial styles — prevent flash before GSAP fires ──────────────
  const outerInit: React.CSSProperties = (() => {
    switch (as) {
      case "clip-up":      return { clipPath: "inset(100% 0 0 0)" }
      case "image-reveal": return { clipPath: "inset(8% 0 8% 0)", overflow: "hidden" }
      case "text-reveal":  return { overflow: "hidden" }
      case "fade-in":
      case "fade-up":
      case "scale-up":
      case "slide-jab":
      case "slide-left":
      case "slide-right":  return { opacity: 0 }
      default:             return { opacity: 0 }
    }
  })()

  const innerInit: React.CSSProperties = (() => {
    switch (as) {
      case "text-reveal":  return { transform: "translateY(105%)", display: "block" }
      case "image-reveal": return { transform: "scale(1.08)", display: "block", width: "100%", height: "100%" }
      default:             return {}
    }
  })()

  // text-reveal and image-reveal need an inner wrapper for the transform target
  const needsInner = as === "text-reveal" || as === "image-reveal"

  return (
    <div ref={outerRef} className={className} style={outerInit}>
      {needsInner ? (
        <div ref={innerRef} style={innerInit}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}
