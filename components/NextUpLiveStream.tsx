"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AlertCircle, Play, Radio, ShieldCheck } from "lucide-react"
import { Reveal } from "@/components/Reveal"

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

type YoutubeApiPayload = {
  channelUrl: string
  channelId: string | null
  playlistId: string | null
  videos: YoutubeFeedVideo[]
  liveStream?: YoutubeLiveStream | null
  error?: string
}

function ytThumb(id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

// Featured Video Player - click-to-load facade, iframe only injected after play is pressed
function FeaturedVideoPlayer({
  activeVideo,
  activeIndex,
  playlistId,
  isPlaying,
  onPlay,
}: {
  activeVideo: YoutubeFeedVideo | null
  activeIndex: number
  playlistId: string | null
  isPlaying: boolean
  onPlay: () => void
}) {
  const embedUrl = activeVideo
    ? playlistId
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&index=${Math.max(activeIndex, 0)}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&autoplay=1`
    : playlistId
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&autoplay=1`
      : null

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#1a1a1a]">
      {/* Video container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#111111]">
        {embedUrl ? (
          isPlaying ? (
            <iframe
              loading="lazy"
              src={embedUrl}
              title={activeVideo?.title ?? "Channel uploads"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={onPlay}
              className="group relative block h-full w-full cursor-pointer"
              aria-label={`Play ${activeVideo?.title ?? "video"}`}
            >
              {activeVideo ? (
                <Image
                  src={ytThumb(activeVideo.id, "maxresdefault")}
                  alt={activeVideo.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-[#111111]/30 transition-colors duration-300 group-hover:bg-[#111111]/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105">
                  <Play className="ml-1 h-6 w-6 fill-[#111111] text-[#111111]" />
                </div>
              </div>
            </button>
          )
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/60">
            Channel videos will appear here once the YouTube feed is available.
          </div>
        )}
      </div>

      {/* Title bar */}
      <div className="border-t border-white/10 bg-[#1a1a1a] px-5 py-4">
        <h3 className="truncate text-sm font-medium uppercase tracking-wide text-white md:text-base">
          {activeVideo?.title ?? "Featured Content"}
        </h3>
      </div>
    </div>
  )
}

export function NextUpLiveStream() {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [videos, setVideos] = useState<YoutubeFeedVideo[]>([])
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [isStreamLive, setIsStreamLive] = useState(false)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadVideos() {
      try {
        const response = await fetch("/api/youtube", {
          cache: "no-store",
          signal: controller.signal,
        })
        const data: YoutubeApiPayload = await response.json()

        if (!isMounted) return

        setPlaylistId(data.playlistId)

        // If the API provides a live stream, prefer that as the active video and show it first
        if (data.liveStream?.id) {
          const liveAsVideo: YoutubeFeedVideo = {
            id: data.liveStream.id,
            title: data.liveStream.title,
            publishedAt: new Date().toISOString(),
            url: data.liveStream.url,
          }

          setVideos([liveAsVideo, ...(data.videos || [])])
          setActiveVideoId(liveAsVideo.id)
          setIsStreamLive(true)
        } else {
          setVideos(data.videos)
          setActiveVideoId((currentVideoId) => currentVideoId ?? data.videos[0]?.id ?? null)
          setIsStreamLive(false)
        }
        setErrorMessage(data.error || "")
        setStatus(response.ok ? "ready" : "error")
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return
        if (!isMounted) return
        setStatus("error")
        setErrorMessage("We couldn't load the latest uploads right now.")
      }
    }

    loadVideos()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const activeVideo = videos.find((video) => video.id === activeVideoId) ?? videos[0] ?? null
  const activeIndex = activeVideo ? videos.findIndex((video) => video.id === activeVideo.id) : 0

  return (
    <section id="livestream" className="relative overflow-hidden bg-[#111111] py-16 sm:py-24 border-t border-white/10">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal as="fade-up" className="mb-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide ${
                isStreamLive ? "bg-crimson text-white" : "border border-white/20 text-white/70"
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              {isStreamLive ? "Live Now" : "Scheduled"}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
              <ShieldCheck className="h-3.5 w-3.5" />
              Official Broadcast
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Live Stream
            </span>
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-white">
              Next Up Official Stream
            </h2>
          </div>
        </Reveal>

        {/* Featured Video */}
        <Reveal as="fade-up" delay={60}>
          <FeaturedVideoPlayer
            activeVideo={activeVideo}
            activeIndex={activeIndex}
            playlistId={playlistId}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
          />

          {status === "error" && errorMessage ? (
            <div className="mt-4 flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-white" />
              {errorMessage}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
