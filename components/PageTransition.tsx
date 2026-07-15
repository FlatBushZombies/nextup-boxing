// components/PageTransition.tsx
"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1"
      el.style.transform = "none"
      return
    }

    el.style.transition = "none"
    el.style.opacity = "0"
    el.style.transform = "translateY(8px)"

    const id = requestAnimationFrame(() => {
      el.style.transition =
        "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)"
      el.style.opacity = "1"
      el.style.transform = "translateY(0px)"
    })

    return () => cancelAnimationFrame(id)
  }, [pathname])

  // The inline opacity: 0 prevents a flash of unstyled content before JS runs.
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
