"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Minimum time the loader holds before the collapse starts
const MIN_HOLD_MS = 1100
// Longest column delay (0.5s) + collapse duration (0.32s) + small buffer
const COLLAPSE_TOTAL_MS = 850
// Wrapper fade duration window before DOM removal
const REMOVE_AFTER_MS = 600

type LoaderPhase = "loading" | "collapsing" | "gone"

// Column stagger delays, exact from XNRGY source: cols 1 & 4 → 0.24s, col 2 → 0.42s, col 3 → 0.5s
const COLUMN_DELAYS = [0.24, 0.42, 0.5, 0.24] as const

export function PageLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading")
  const [faded, setFaded] = useState(false)

  // Hold until window load AND at least MIN_HOLD_MS elapsed, then collapse
  useEffect(() => {
    document.documentElement.classList.add("is-loading")
    const start = performance.now()
    let timer: ReturnType<typeof setTimeout> | undefined

    const scheduleCollapse = () => {
      const elapsed = performance.now() - start
      timer = setTimeout(
        () => setPhase("collapsing"),
        Math.max(0, MIN_HOLD_MS - elapsed)
      )
    }

    if (document.readyState === "complete") {
      scheduleCollapse()
    } else {
      window.addEventListener("load", scheduleCollapse, { once: true })
    }

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener("load", scheduleCollapse)
      document.documentElement.classList.remove("is-loading")
    }
  }, [])

  // After the collapse animation completes: fade wrapper, then remove from DOM
  useEffect(() => {
    if (phase !== "collapsing") return
    // Fire at the START of collapse so hero entrance overlaps with curtain lifting
    window.dispatchEvent(new CustomEvent("loader:revealed"))
    const fadeTimer = setTimeout(() => setFaded(true), COLLAPSE_TOTAL_MS)
    const goneTimer = setTimeout(() => {
      setPhase("gone")
      document.documentElement.classList.remove("is-loading")
    }, COLLAPSE_TOTAL_MS + REMOVE_AFTER_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(goneTimer)
    }
  }, [phase])

  if (phase === "gone") return null

  const collapsing = phase === "collapsing"

  return (
    <div
      className="fixed inset-0 z-[300]"
      style={{
        opacity: faded ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
      aria-hidden={collapsing}
    >
      <style>{`
        html.is-loading { overflow: hidden; }
        @keyframes loader-collapse {
          from { transform: scaleY(1); }
          to { transform: scaleY(0); }
        }
        @keyframes loader-logo-slide {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-80%); }
        }
        @keyframes loader-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-bar-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes loader-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Background overlay — collapses first */}
      <div
        className="absolute inset-0 bg-[#111111]"
        style={
          collapsing
            ? {
                transformOrigin: "top",
                animation: "loader-collapse 0.32s ease-in forwards",
              }
            : undefined
        }
      />

      {/* 4-column grid — collapses downward with stagger */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: "23.65% 26.35% 26.35% 23.65%" }}
      >
        {COLUMN_DELAYS.map((delay, i) => (
          <div
            key={i}
            className="border-r border-white/5 bg-[#111111] first:border-l-0 last:border-r-0"
            style={
              collapsing
                ? {
                    transformOrigin: "top",
                    animation: `loader-collapse 0.32s ease-in ${delay}s forwards`,
                  }
                : undefined
            }
          />
        ))}
      </div>

      {/* Logo + inner content — slides up and fades during collapse */}
      <div
        className="relative flex h-full flex-col items-center justify-center"
        style={
          collapsing
            ? { animation: "loader-logo-slide 0.32s ease-in 0.42s forwards" }
            : undefined
        }
      >
        <div
          className="flex flex-col items-center"
          style={{
            opacity: 0,
            animation: "loader-fade-up 0.55s ease-out 0.1s forwards",
          }}
        >
          <Image
            src="/logo.png"
            alt="Next Up Boxing League"
            width={120}
            height={60}
            priority
            className="h-auto w-[100px]"
          />

          {/* Gold fill bar */}
          <div className="mt-7 h-[1.5px] w-36 overflow-hidden bg-white/10">
            <div
              className="h-full w-full origin-left bg-gradient-to-r from-[#b8962e] via-[#d4b65a] to-[#b8962e]"
              style={{
                transform: "scaleX(0)",
                animation:
                  "loader-bar-fill 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
              }}
            />
          </div>

          {/* Tagline */}
          <span
            className="mt-5 font-sans text-[9px] font-semibold uppercase tracking-[0.38em] text-white/40"
            style={{
              opacity: 0,
              animation: "loader-fade-in 0.5s ease 0.55s forwards",
            }}
          >
            Showcasing Elite Amateurs
          </span>
        </div>
      </div>
    </div>
  )
}
