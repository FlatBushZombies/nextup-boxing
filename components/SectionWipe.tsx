"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CLOSED = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 2%)"
const OPEN   = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"

type Props = {
  children: React.ReactNode
  className?: string
}

export function SectionWipe({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.set(el, { clipPath: CLOSED })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 94%",
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: OPEN,
          duration: 0.9,
          ease: "power3.inOut",
          onComplete: () => { gsap.set(el, { clipPath: "none" }) },
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{ clipPath: CLOSED }}
    >
      {children}
    </div>
  )
}
