// components/WordReveal.tsx
"use client"

import { useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type WordRevealProps = {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
  start?: string
}

export default function WordReveal({
  children,
  className,
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  as = "div",
  start = "top bottom",
}: WordRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  const words = useMemo(() => children.split(" "), [children])

  useEffect(() => {
    const targets = wordRefs.current
      .slice(0, words.length)
      .filter((el): el is HTMLSpanElement => el !== null)
    if (targets.length === 0) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { y: "0%" })
      return
    }

    const tween = gsap.fromTo(
      targets,
      { y: "110%" },
      {
        y: "0%",
        duration,
        delay: delay / 1000,
        stagger,
        ease: "power4.out",
        scrollTrigger: {
          trigger: outerRef.current,
          start,
          once: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [words, delay, stagger, duration, start])

  // All allowed tags share the HTMLElement interface; narrowing to "div"
  // keeps the ref typing sound without resorting to `any`.
  const Tag = as as "div"

  return (
    <Tag ref={outerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            paddingBottom: "0.1em",
            verticalAlign: "bottom",
          }}
        >
          <span
            ref={(el) => {
              if (el) wordRefs.current[index] = el
            }}
            style={{ display: "inline-block", transform: "translateY(110%)" }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  )
}
