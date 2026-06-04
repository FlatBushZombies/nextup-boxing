"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, Play, Radio, ScanLine, Sparkles, Zap } from "lucide-react"

const factoids = [
  { label: "4K Signal", detail: "HDR-ready replay pass" },
  { label: "Replay Pass", detail: "Every angle lands with intent" },
  { label: "Live Pulse", detail: "Realtime overlays and callouts" },
  { label: "Global Feed", detail: "Built for every screen" },
]

const storyBeats = [
  {
    title: "Tunnel Vision",
    detail: "The lens locks into the ring as lights punch through the smoke.",
    threshold: 0,
  },
  {
    title: "Camera Rush",
    detail: "Our feed accelerates into the ropeside angle and sharpens the crowd energy.",
    threshold: 0.34,
  },
  {
    title: "Final Bell",
    detail: "Graphics glow harder and the replay cadence turns the finish into a statement.",
    threshold: 0.68,
  },
]

const STREAM_VIDEO_URL =
  "https://videos.pexels.com/video-files/8611533/8611533-hd_1920_1080_25fps.mp4"

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function formatClock(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const mins = Math.floor(safeSeconds / 60)
  const secs = safeSeconds % 60

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function LiveStreamPromo() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const introRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLDivElement | null>(null)
  const scanlineRef = useRef<HTMLDivElement | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [scrubProgress, setScrubProgress] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const syncMetadata = () => {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0)
      setVideoReady(true)

      if (prefersReducedMotion) {
        const playPromise = video.play()
        playPromise?.catch(() => {})
        return
      }

      video.pause()
      video.currentTime = 0
    }

    const syncCurrentTime = () => {
      if (prefersReducedMotion) {
        setCurrentTime(video.currentTime)
      }
    }

    video.addEventListener("loadedmetadata", syncMetadata)
    video.addEventListener("durationchange", syncMetadata)
    video.addEventListener("timeupdate", syncCurrentTime)

    return () => {
      video.removeEventListener("loadedmetadata", syncMetadata)
      video.removeEventListener("durationchange", syncMetadata)
      video.removeEventListener("timeupdate", syncCurrentTime)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const video = videoRef.current

    if (!video || !videoReady) {
      return
    }

    if (prefersReducedMotion) {
      const playPromise = video.play()
      playPromise?.catch(() => {})
      return
    }

    video.pause()
  }, [prefersReducedMotion, videoReady])

  useEffect(() => {
    let ctx: any = null
    let cancelled = false

    async function initGsap() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const intro = introRef.current
      const frame = frameRef.current
      const scanline = scanlineRef.current
      const progressBar = progressBarRef.current

      if (!section || !intro || !frame || !scanline || !progressBar) {
        return
      }

      if (prefersReducedMotion) {
        gsap.set([intro, frame], { clearProps: "all" })
        gsap.set(scanline, { opacity: 0.16 })
        gsap.set(progressBar, { scaleX: 1, transformOrigin: "left center" })
        return
      }

      ctx = gsap.context(() => {
        gsap.set(intro, { y: 48, opacity: 0.3 })
        gsap.set(frame, { y: 72, scale: 0.92 })
        gsap.set(scanline, { opacity: 0.18 })
        gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" })

        gsap.to(intro, {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        })

        gsap.to(frame, {
          y: -42,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        })

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onUpdate: (self) => {
            const normalizedProgress = clamp((self.progress - 0.08) / 0.84, 0, 1)
            const video = videoRef.current

            gsap.set(scanline, {
              opacity: gsap.utils.interpolate(0.18, 0.08, normalizedProgress),
            })
            gsap.set(progressBar, { scaleX: normalizedProgress, transformOrigin: "left center" })

            setScrubProgress(normalizedProgress)

            if (!video || !duration) {
              return
            }

            const nextTime = normalizedProgress * Math.max(duration - 0.12, 0)

            if (Math.abs(video.currentTime - nextTime) > 0.04) {
              video.currentTime = nextTime
            }

            setCurrentTime(nextTime)
          },
        })
      }, section)
    }

    initGsap()

    return () => {
      cancelled = true
      ctx?.revert?.()
    }
  }, [duration, prefersReducedMotion])

  const activeBeat = useMemo(() => {
    for (let index = storyBeats.length - 1; index >= 0; index -= 1) {
      if (scrubProgress >= storyBeats[index].threshold) {
        return storyBeats[index]
      }
    }

    return storyBeats[0]
  }, [scrubProgress])

  return (
    <section
      id="livestream"
      ref={sectionRef}
      className="relative min-h-[220vh] overflow-hidden bg-[#050811]"
    >
      <div className="futuristic-grid absolute inset-0 opacity-40" />
      <div className="scanline-overlay absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,32,58,0.14),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,150,46,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050811_0%,#0b1020_40%,#050811_100%)]" />
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/25 to-transparent" />

      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr,1.08fr] lg:gap-14">
            <div ref={introRef}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c5203a]" />
                <span className="section-eyebrow text-[#c5203a]">Cinematic Livestream</span>
              </div>

              <div
                className="pointer-events-none mb-4 select-none text-white/[0.04] uppercase"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(4.6rem, 16vw, 11rem)",
                  lineHeight: 0.9,
                }}
              >
                Live
              </div>

              <h2
                className="relative mb-6 uppercase leading-[0.86]"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(3.4rem, 7vw, 6.8rem)",
                }}
              >
                <span className="block text-white">Control The</span>
                <span className="block bg-gradient-to-r from-[#c5203a] via-[#d4ae44] to-[#f5d98b] bg-clip-text text-transparent">
                  Broadcast Tempo
                </span>
              </h2>

              <p className="editorial-body mb-8 max-w-xl text-base text-white/56 sm:text-lg">
                A cinematic preview reel built to make the broadcast feel larger than the page:
                polished atmosphere, sharper transitions, and a sense of rising pressure before the
                first bell.
              </p>

              <div className="mb-8 rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4ae44]/30 bg-[#d4ae44]/10 text-[#d4ae44]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="editorial-meta text-[#d4ae44]">Active Story Beat</p>
                    <p className="mt-1 text-lg font-semibold uppercase tracking-[0.08em] text-white">
                      {activeBeat.title}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/52">{activeBeat.detail}</p>
              </div>

              <div className="mb-10 grid grid-cols-2 gap-3">
                {factoids.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-[#d4ae44]/28"
                  >
                    <div
                      className="mb-1 text-[#d4ae44]"
                      style={{
                        fontFamily: "var(--font-bebas), Impact, sans-serif",
                        fontSize: "1.25rem",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {fact.label}
                    </div>
                    <div className="editorial-meta text-white/34">{fact.detail}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#youtube"
                  className="editorial-button inline-flex items-center justify-center gap-2 rounded-full bg-[#c5203a] px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a01830] hover:shadow-[0_24px_54px_rgba(197,32,58,0.3)]"
                >
                  <Play className="h-4 w-4" />
                  Watch Full Preview
                </a>
                <a
                  href="#magazine"
                  className="editorial-button inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ae44]/20 bg-white/[0.04] px-8 py-4 text-[#d4ae44] transition-all duration-300 hover:-translate-y-1 hover:border-[#d4ae44]/55 hover:bg-white/[0.08]"
                >
                  <ArrowDown className="h-4 w-4" />
                  Keep Exploring
                </a>
              </div>
            </div>

            <div ref={frameRef} className="relative">
              <div className="story-glow absolute -inset-6 rounded-[2.4rem]" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#09101f]/78 p-3 shadow-[0_36px_120px_rgba(5,8,17,0.65)] backdrop-blur-xl">
                <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-4 py-2 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5203a] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5203a]" />
                    </span>
                    <span className="editorial-meta text-white">Live Preview</span>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/28 px-4 py-2 backdrop-blur-md">
                    <span className="editorial-meta text-white/72">
                      {videoReady ? formatClock(currentTime) : "--:--"} / {duration ? formatClock(duration) : "--:--"}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.55rem] bg-black">
                  <video
                    ref={videoRef}
                    src={STREAM_VIDEO_URL}
                    poster="/broadcast-scene.png"
                    muted
                    playsInline
                    loop={prefersReducedMotion}
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />

                  <div
                    ref={scanlineRef}
                    className="scanline-overlay pointer-events-none absolute inset-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(4,7,14,0.55)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,18,0.1)_0%,rgba(6,10,18,0)_35%,rgba(6,10,18,0.6)_100%)]" />

                  <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 rounded-full border border-[#d4ae44]/22 bg-[#d4ae44]/10 px-3 py-1.5 text-[#f5d98b] backdrop-blur-sm">
                        <ScanLine className="h-3.5 w-3.5" />
                        <span className="editorial-meta text-[#f5d98b]">Replay Pass</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/24 px-3 py-1.5 text-white/72 backdrop-blur-sm">
                        <Radio className="h-3.5 w-3.5 text-[#c5203a]" />
                        <span className="editorial-meta text-white/78">Broadcast Mode</span>
                      </div>
                    </div>

                    <div className="max-w-lg">
                      <p className="section-eyebrow mb-2 text-[#d4ae44]">NextUp Championship Night</p>
                      <p className="text-lg font-semibold uppercase tracking-[0.08em] text-white sm:text-2xl">
                        Ringside Atmosphere. Streamed Like A Trailer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-5 sm:px-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="editorial-meta text-white/34">Playback Arc</div>
                    <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                      <Zap className="h-3.5 w-3.5 text-[#d4ae44]" />
                      Live Feed
                    </div>
                  </div>

                  <div className="relative mb-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      ref={progressBarRef}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#d4ae44]"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {storyBeats.map((beat, index) => {
                      const isActive = activeBeat.title === beat.title
                      const nextThreshold = storyBeats[index + 1]?.threshold ?? 1
                      const beatRangeText = `${Math.round(beat.threshold * 100)}-${Math.round(nextThreshold * 100)}%`

                      return (
                        <div
                          key={beat.title}
                          className={`rounded-[1.2rem] border px-4 py-4 transition-all duration-300 ${
                            isActive
                              ? "border-[#d4ae44]/35 bg-white/[0.08] shadow-[0_18px_40px_rgba(212,174,68,0.12)]"
                              : "border-white/6 bg-white/[0.03]"
                          }`}
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="editorial-meta text-[#d4ae44]">Beat {index + 1}</span>
                            <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/26">
                              {beatRangeText}
                            </span>
                          </div>
                          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                            {beat.title}
                          </p>
                          <p className="text-sm leading-relaxed text-white/44">{beat.detail}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
