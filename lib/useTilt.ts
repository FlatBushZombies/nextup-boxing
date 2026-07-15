// lib/useTilt.ts
"use client"

import { useRef } from "react"
import type { MouseEvent as ReactMouseEvent, RefObject } from "react"

type UseTiltReturn = {
  ref: RefObject<HTMLDivElement | null>
  onMouseMove: (e: ReactMouseEvent<HTMLDivElement>) => void
  onMouseLeave: () => void
  onMouseEnter: () => void
}

export function useTilt(maxDeg = 6): UseTiltReturn {
  const ref = useRef<HTMLDivElement>(null)
  const willChangeTimeout = useRef<number | null>(null)

  const onMouseEnter = () => {
    const el = ref.current
    if (!el) return
    if (willChangeTimeout.current !== null) {
      window.clearTimeout(willChangeTimeout.current)
      willChangeTimeout.current = null
    }
    el.style.transition = "transform 0.1s ease-out, box-shadow 0.1s ease-out"
    el.style.willChange = "transform"
  }

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const rotateY = x * maxDeg
    const rotateX = -y * maxDeg

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition =
      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    willChangeTimeout.current = window.setTimeout(() => {
      if (ref.current) ref.current.style.willChange = "auto"
      willChangeTimeout.current = null
    }, 500)
  }

  return { ref, onMouseMove, onMouseLeave, onMouseEnter }
}
