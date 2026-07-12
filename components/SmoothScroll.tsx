"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false, // native scroll on touch devices
    })

    lenisRef.current = lenis

    // Keep ScrollTrigger position in sync with Lenis on every scroll frame
    lenis.on("scroll", () => ScrollTrigger.update())

    // Drive Lenis from GSAP ticker so ScrollTrigger scrub stays frame-perfect
    const tick = (time: number) => { lenis.raf(time * 1000) }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
      lenisRef.current = null
    }
  }, [])

  // Hard reset to top on route change — no lerp animation between pages
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
