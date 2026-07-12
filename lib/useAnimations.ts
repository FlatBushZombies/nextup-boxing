"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ── useScrollReveal ────────────────────────────────────────────────────────────
// Generic single-element scroll-triggered reveal. Returns a ref to attach to your element.

type ScrollRevealOptions = {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  ease?: string
  delay?: number
  start?: string
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 44,
    x = 0,
    opacity = 0,
    duration = 0.85,
    ease = "power3.out",
    delay = 0,
    start = "top 90%",
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, x, opacity, willChange: "transform, opacity" },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: { trigger: el, start, once: true },
          onComplete: () => { gsap.set(el, { willChange: "auto" }) },
        }
      )
    }, el)

    return () => ctx.revert()
  // deps intentionally empty — options treated as stable on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

// ── useStaggerReveal ──────────────────────────────────────────────────────────
// Stagger-reveals child elements matching `selector` inside the container ref.

type StaggerRevealOptions = {
  y?: number
  stagger?: number
  duration?: number
  ease?: string
  start?: string
  delay?: number
}

export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  selector: string,
  options: StaggerRevealOptions = {}
) {
  const containerRef = useRef<T>(null)
  const {
    y = 28,
    stagger = 0.08,
    duration = 0.7,
    ease = "power3.out",
    start = "top 90%",
    delay = 0,
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const targets = container.querySelectorAll<HTMLElement>(selector)
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { y, opacity: 0, willChange: "transform, opacity" },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
          delay,
          scrollTrigger: { trigger: container, start, once: true },
          onComplete: () => { gsap.set(targets, { willChange: "auto" }) },
        }
      )
    }, container)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return containerRef
}

// ── useParallax ───────────────────────────────────────────────────────────────
// Subtle vertical parallax on scroll. `speed` 0.08–0.2 recommended.

export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
