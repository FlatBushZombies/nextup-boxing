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
    // Never skip trigger callbacks on fast scroll; detect "jumped past" triggers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ScrollTrigger.config({ limitCallbacks: false, ignoreMobileResize: true, fastScrollEnd: 300 } as any)

    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      syncTouch: false, // native scroll on touch devices
    })

    lenisRef.current = lenis

    // Keep ScrollTrigger position in sync with Lenis on every scroll frame
    // Also drive a velocity-proportional skewY on anything tagged [data-skew]
    const skewSetter = gsap.quickSetter("[data-skew]", "skewY", "deg")
    const clamp = gsap.utils.clamp(-5, 5)
    lenis.on("scroll", (e: { velocity: number }) => {
      ScrollTrigger.update()
      skewSetter(clamp(e.velocity * 0.35))
    })

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
