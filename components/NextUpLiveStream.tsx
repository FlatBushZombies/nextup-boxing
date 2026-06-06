"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Radio, Volume2, VolumeX, Maximize2, Settings } from "lucide-react"

type YoutubeFeedVideo = {
  id: string
  title: string
  publishedAt: string
  url: string
}

type YoutubeLiveStream = {
  id: string
  title: string
  isLive: boolean
  url: string
  thumbnailUrl: string
}

type LiveStreamApiPayload = {
  liveStream: YoutubeLiveStream | null
  videos: YoutubeFeedVideo[]
  isNewYorkUser: boolean
  hasRestrictedLiveStream: boolean
  blockedBySignInGate?: boolean
  ticketPurchaseUrl?: string
  error?: string
}

export function NextUpLiveStream() {
  const [liveStream, setLiveStream] = useState<YoutubeLiveStream | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [isMuted, setIsMuted] = useState(true)
  const [isNewYorkUser, setIsNewYorkUser] = useState(false)
  const [hasRestrictedLiveStream, setHasRestrictedLiveStream] = useState(false)
  const [blockedBySignInGate, setBlockedBySignInGate] = useState(false)
  const [ticketPurchaseUrl, setTicketPurchaseUrl] = useState<string | null>(null)
  const [viewerCount] = useState(Math.floor(Math.random() * 5000) + 2000)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadLiveStream() {
      try {
        const response = await fetch("/api/youtube", {
          cache: "no-store",
          signal: controller.signal,
        })
        const data: LiveStreamApiPayload = await response.json()

        if (!isMounted) return

        setLiveStream(data.liveStream)
        setIsNewYorkUser(Boolean(data.isNewYorkUser))
        setHasRestrictedLiveStream(Boolean(data.hasRestrictedLiveStream))
        setBlockedBySignInGate(Boolean((data as any).blockedBySignInGate))
        setTicketPurchaseUrl((data as any).ticketPurchaseUrl || null)
        setStatus(response.ok ? "ready" : "error")
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return
        if (!isMounted) return
        setStatus("error")
      }
    }

    loadLiveStream()
    const interval = window.setInterval(loadLiveStream, 30000)

    return () => {
      isMounted = false
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  if (status === "loading") {
    return (
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-8 h-12 w-64 rounded-lg bg-gray-200" />
            <div className="aspect-video w-full rounded-3xl bg-gray-200" />
          </div>
        </div>
      </section>
    )
  }

  const isStreamLive = Boolean(liveStream?.isLive)
  const isRestricted = Boolean((hasRestrictedLiveStream && isNewYorkUser) || blockedBySignInGate)
  const videoLabel = isStreamLive ? "Live Now" : "Scheduled"
  const sectionLabel = isStreamLive ? "Broadcasting Now" : "Scheduled Live Stream"
  const badgeText = isStreamLive ? "Live Now" : "Scheduled"
  const embedSrc = liveStream
    ? `https://www.youtube-nocookie.com/embed/${liveStream.id}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&controls=0&showinfo=0&disablekb=1&fs=0&cc_load_policy=0&origin=${typeof window !== "undefined" ? window.location.origin : ""}`
    : ""

  return (
    <section id="youtube" className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0a1628 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #c5203a 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #0a1628 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-[#c5203a]">
            {sectionLabel}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Next Up Official Stream
          </h2>
        </div>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <div className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c5203a] to-[#e63950] px-5 py-2.5 shadow-lg shadow-[#c5203a]/30">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  {badgeText}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <div className="flex -space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-gray-300 to-gray-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {isStreamLive ? `${viewerCount.toLocaleString()} watching` : "Stay tuned for the next live event"}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
              {liveStream?.title ?? "Scheduled livestream"}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
              <span className="text-sm font-medium text-gray-600">HD Quality</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Radio className="h-4 w-4 text-[#c5203a]" />
              <span className="text-sm font-medium text-gray-600">Official Broadcast</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl shadow-gray-900/30 ring-1 ring-gray-900/10">
          <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/40 to-transparent px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#c5203a]" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5203a] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5203a]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {videoLabel}
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-white/70">Official Stream</div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black">
              {isRestricted ? (
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0a1628] via-[#07101f] to-[#050912] px-6 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 p-4 shadow-xl shadow-black/30">
                    <Image
                      src="/logo.png"
                      alt="NextUp Boxing"
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-3 max-w-xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      Live stream unavailable
                    </p>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {blockedBySignInGate ? "This broadcast requires signing in on YouTube." : "This broadcast isn't available in your location."}
                    </h3>
                    <p className="max-w-xl text-sm text-white/70">
                      {blockedBySignInGate
                        ? "YouTube is asking viewers to sign in before viewing this content. You can open the stream on YouTube if you'd like to sign in there."
                        : "Due to distribution restrictions the live stream cannot be shown in your area. You can still view event details or purchase tickets below."}
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      {ticketPurchaseUrl ? (
                        <a
                          href={ticketPurchaseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md bg-[#c5203a] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                          Purchase Tickets
                        </a>
                      ) : null}
                      <a
                        href={liveStream?.url || "https://www.youtube.com"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                      >
                        View on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ) : isStreamLive ? (
              <>
                <iframe
                  loading="lazy"
                  src={embedSrc}
                  title={liveStream?.title ?? "NextUp Live Stream"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />

                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="pointer-events-auto absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                      <div className="hidden items-center gap-3 sm:flex">
                        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/20">
                          <div className="h-full w-full animate-pulse bg-gradient-to-r from-[#c5203a] to-[#e63950]" />
                        </div>
                        <span className="text-sm font-medium text-white/70">LIVE</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          const iframe = document.querySelector('iframe')
                          if (iframe) {
                            iframe.requestFullscreen?.()
                          }
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#0a1628] via-[#07101f] to-[#050912] px-6 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 p-4 shadow-xl shadow-black/30">
                  <Image
                    src="/logo.png"
                    alt="NextUp Boxing"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    Scheduled livestream
                  </p>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    The live stream will appear here when it goes live.
                  </h3>
                  <p className="max-w-xl text-sm text-white/70">
                    Stay tuned for the next event. This section will automatically switch to the live broadcast once it starts.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="h-1.5 w-full bg-gradient-to-r from-[#c5203a] via-[#e63950] to-[#c5203a]" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#c5203a] to-[#e63950] shadow-lg shadow-[#c5203a]/25">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                {isStreamLive ? "Broadcasting Live" : ""}
              </p>
              <p className="text-base font-bold text-gray-900">
                {isStreamLive ? " Stream" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-px bg-gray-200" />
            <div className="text-sm font-medium text-gray-500">
              {isStreamLive ? "Low latency stream" : ""}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
