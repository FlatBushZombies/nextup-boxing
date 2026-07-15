"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface MagazineCardProps {
  coverImage: string
  issueName: string
  issueNumber: string
  releaseDate?: string
}

export function MagazineCard({
  coverImage,
  issueName,
  issueNumber,
  releaseDate,
}: MagazineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Subtle scroll-driven parallax — cover settles from 1.04 to 1.0 as card enters
  useEffect(() => {
    const card = cardRef.current
    const img = card?.querySelector("img")
    if (!card || !img) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tween = gsap.fromTo(img,
      { scale: 1.04 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const onMouseEnter = () => {
    const el = cardRef.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    el.style.transition = "transform 0.1s ease-out"
    el.style.willChange = "transform"
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale3d(1.012,1.012,1.012)`
  }

  const onMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    setTimeout(() => { if (el) el.style.willChange = "auto" }, 560)
  }

  return (
    <div
      ref={cardRef}
      className="group relative card-lift"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative overflow-hidden border border-white/15 bg-[#1a1a1a] p-3">
        <div className="relative aspect-[0.74] overflow-hidden bg-[#0a0a0a]">
          <Image
            src={coverImage}
            alt={issueName}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

          {/* Issue number badge */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5">
            <span className="text-xs font-medium uppercase tracking-widest text-[#111111]">{issueNumber}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-12 text-white">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">Next Up Magazine</p>
            <h3 className="mt-1.5 text-[clamp(2.2rem,5vw,3rem)] uppercase leading-[0.88] font-display">
              {issueName}
            </h3>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="mb-2.5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">Featured Cover</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {releaseDate ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {releaseDate}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
