"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export type RevealType =
  | "fade-up"    // general content: y↑ + opacity
  | "fade-in"    // pure opacity (images, overlays)
  | "slide-right"// x← slide (was slide-right, now left→right entry)
  | "clip-up"    // fighter card: inset clip from bottom — signature boxing reveal
  | "slide-jab"  // section titles: fast left-side punch-in

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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const delayS = delay / 1000

    const triggerCfg: ScrollTrigger.Vars = {
      trigger: el,
      start: "top 92%",
      once: true,
    }

    const ctx = gsap.context(() => {
      switch (as) {
        case "clip-up":
          // Fighter rising from below — sharp inset clip that opens upward
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0 0 0)", willChange: "clip-path" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: duration + 0.1,
              delay: delayS,
              ease: "power3.out",
              scrollTrigger: triggerCfg,
              onComplete: () => gsap.set(el, { willChange: "auto" }),
            }
          )
          break

        case "slide-jab":
          // Fast punch-in from the left — section title entry
          gsap.fromTo(
            el,
            { x: -56, opacity: 0, willChange: "transform, opacity" },
            {
              x: 0,
              opacity: 1,
              duration: duration * 0.6,
              delay: delayS,
              ease: "power4.out",
              scrollTrigger: triggerCfg,
              onComplete: () => gsap.set(el, { willChange: "auto" }),
            }
          )
          break

        case "slide-right":
          gsap.fromTo(
            el,
            { x: 44, opacity: 0, willChange: "transform, opacity" },
            {
              x: 0,
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power2.out",
              scrollTrigger: triggerCfg,
              onComplete: () => gsap.set(el, { willChange: "auto" }),
            }
          )
          break

        case "fade-in":
          gsap.fromTo(
            el,
            { opacity: 0, willChange: "opacity" },
            {
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power2.out",
              scrollTrigger: triggerCfg,
              onComplete: () => gsap.set(el, { willChange: "auto" }),
            }
          )
          break

        case "fade-up":
        default:
          gsap.fromTo(
            el,
            { y: 28, opacity: 0, willChange: "transform, opacity" },
            {
              y: 0,
              opacity: 1,
              duration,
              delay: delayS,
              ease: "power2.out",
              scrollTrigger: triggerCfg,
              onComplete: () => gsap.set(el, { willChange: "auto" }),
            }
          )
          break
      }
    }, el)

    return () => ctx.revert()
  }, [as, delay, duration])

  // Start invisible so there's no flash before GSAP sets the initial state
  const initStyle: React.CSSProperties =
    as === "clip-up"
      ? { clipPath: "inset(100% 0 0 0)" }
      : { opacity: 0 }

  return (
    <div ref={ref} className={className} style={initStyle}>
      {children}
    </div>
  )
}
