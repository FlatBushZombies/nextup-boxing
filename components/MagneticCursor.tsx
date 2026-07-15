// components/MagneticCursor.tsx
"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import { gsap } from "gsap"

const INTERACTIVE_SELECTOR = "a, button, [data-magnetic]"
const MAGNETIC_RADIUS = 80
const RING_IDLE_BORDER = "rgba(255, 255, 255, 0.1)"
const RING_HOVER_BORDER = "rgba(184, 150, 46, 0.6)"

// Active only on fine-pointer devices without reduced motion.
// useSyncExternalStore keeps SSR at `false` and reacts to media changes.
function subscribeToMediaQueries(onChange: () => void) {
  const finePointer = window.matchMedia("(pointer: fine)")
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  finePointer.addEventListener("change", onChange)
  reducedMotion.addEventListener("change", onChange)
  return () => {
    finePointer.removeEventListener("change", onChange)
    reducedMotion.removeEventListener("change", onChange)
  }
}

function getCursorEligibility(): boolean {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const active = useSyncExternalStore(
    subscribeToMediaQueries,
    getCursorEligibility,
    () => false
  )

  useEffect(() => {
    if (!active) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add("custom-cursor-active")

    // Center both elements on the pointer and park them offscreen until first move.
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" })
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" })
    const ringX = gsap.quickTo(ring, "x", { duration: 0.2, ease: "power2.out" })
    const ringY = gsap.quickTo(ring, "y", { duration: 0.2, ease: "power2.out" })

    const magnetized = new Set<HTMLElement>()
    let hovered: Element | null = null

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)

      const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]")
      magnets.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Subtract the current translation so the resting center stays stable.
        const currentX = Number(gsap.getProperty(el, "x"))
        const currentY = Number(gsap.getProperty(el, "y"))
        const centerX = rect.left + rect.width / 2 - currentX
        const centerY = rect.top + rect.height / 2 - currentY
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.hypot(deltaX, deltaY)

        if (distance < MAGNETIC_RADIUS) {
          magnetized.add(el)
          gsap.to(el, {
            x: deltaX * 0.35,
            y: deltaY * 0.35,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          })
        } else if (magnetized.has(el)) {
          magnetized.delete(el)
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          })
        }
      })
    }

    // Delegated hover tracking for the ring state.
    const onMouseOver = (e: MouseEvent) => {
      const target =
        e.target instanceof Element ? e.target.closest(INTERACTIVE_SELECTOR) : null
      if (target === hovered) return
      hovered = target
      if (target) {
        gsap.to(ring, {
          scale: 1.6,
          borderColor: RING_HOVER_BORDER,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        })
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: RING_IDLE_BORDER,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        })
      }
    }

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.15, ease: "power2.out", overwrite: "auto" })
    }

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" })
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    return () => {
      document.documentElement.classList.remove("custom-cursor-active")
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      gsap.killTweensOf([dot, ring])
      magnetized.forEach((el) => {
        gsap.killTweensOf(el)
        gsap.set(el, { x: 0, y: 0 })
      })
      magnetized.clear()
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <style>{`.custom-cursor-active, .custom-cursor-active * { cursor: none !important; }`}</style>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          border: `1.5px solid ${RING_IDLE_BORDER}`,
          borderRadius: 3,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  )
}
