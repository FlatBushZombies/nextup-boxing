"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type AnimatedLineProps = {
  color?: "crimson" | "gold" | "white" | "steel"
  thickness?: number
  delay?: number
  className?: string
}

const colorMap = {
  crimson: "var(--crimson)",
  gold: "var(--gold)",
  white: "#ffffff",
  steel: "#707072",
}

export function AnimatedLine({
  color = "crimson",
  thickness = 2,
  delay = 0,
  className = "",
}: AnimatedLineProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, willChange: "transform" },
        {
          scaleX: 1,
          duration: 0.7,
          delay: delay / 1000,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onComplete: () => { gsap.set(el, { willChange: "auto" }) },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [delay])

  return (
    <span
      ref={ref}
      className={`block origin-left ${className}`}
      style={{
        height: `${thickness}px`,
        backgroundColor: colorMap[color],
        transform: "scaleX(0)",
      }}
    />
  )
}
