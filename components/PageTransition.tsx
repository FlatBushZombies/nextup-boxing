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

    // Any non-"none" transform on this wrapper — even a no-op translateY(0px)
    // — becomes the containing block for `position: fixed` descendants (the
    // Navbar included), so it stops tracking the viewport and scrolls away
    // with the page instead. Clear it once the entrance animation settles.
    const clearTransform = (e: TransitionEvent) => {
      if (e.propertyName === "transform") el.style.transform = "none"
    }
    el.addEventListener("transitionend", clearTransform)

    return () => {
      cancelAnimationFrame(id)
      el.removeEventListener("transitionend", clearTransform)
    }
  }, [pathname])

  // The inline opacity: 0 prevents a flash of unstyled content before JS runs.
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
