"use client"

import { useEffect, useState } from "react"
import { AlertCircle, ArrowUpRight, Play, Radio, ShieldCheck } from "lucide-react"

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

// Default to Strong Island Fight Night channel for this event
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A"

function ytThumb(id: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${quality}.jpg`
}

function formatPublishedDate(value: string) {
  const publishedDate = new Date(value)

  if (Number.isNaN(publishedDate.getTime())) {
    return "Recent upload"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(publishedDate)
}

// Featured Video Player - Main large video on the left
function FeaturedVideoPlayer({
  activeVideo,
  activeIndex,
  playlistId,
}: {
  activeVideo: YoutubeFeedVideo | null
  activeIndex: number
  playlistId: string | null
}) {
  const embedUrl = activeVideo
    ? playlistId
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&index=${Math.max(activeIndex, 0)}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
      : `https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
    : playlistId
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`
      : null

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#05070f] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* Video container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {embedUrl ? (
          <iframe
            loading="lazy"
            src={embedUrl}
            title={activeVideo?.title ?? "Channel uploads"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-white/40 font-sans">
            Channel videos will appear here once the YouTube feed is available.
          </div>
        )}
      </div>

      {/* Accent title bar */}
      <div className="bg-accent px-5 py-4 border-t border-white/5">
        <h3 className="truncate text-base font-black uppercase tracking-wider text-white md:text-lg lg:text-xl font-display">
          {activeVideo?.title ?? "Featured Content"}
        </h3>
      </div>
    </div>
  )
}

// Video Thumbnail Card for the sidebar
function VideoThumbnailCard({
  video,
  index,
  isActive,
  onClick,
}: {
  video: YoutubeFeedVideo
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      className={`group flex w-full cursor-pointer items-start gap-3 p-2 text-left transition-all duration-300 ${
        isActive 
          ? "bg-accent/10 ring-1 ring-accent/30" 
          : "hover:bg-white/5"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden bg-[#05070f]"
        style={{ width: "120px", aspectRatio: "16/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ytThumb(video.id, "hqdefault")}
          alt={video.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isActive || hovered ? "bg-transparent" : "bg-[#05070f]/30"
          }`}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              isActive || hovered
                ? "scale-100 bg-accent opacity-100"
                : "scale-90 bg-white/20 opacity-70"
            }`}
          >
            <Play className="ml-0.5 h-3 w-3 text-white" fill="white" />
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="min-w-0 flex-1">
        <h4
          className={`mb-1 line-clamp-2 text-sm font-semibold leading-tight transition-colors duration-300 ${
            isActive ? "text-white font-sans" : "text-white/80 group-hover:text-white font-sans"
          }`}
        >
          {video.title}
        </h4>
        <p className="text-xs text-white/40 font-sans">
          {formatPublishedDate(video.publishedAt)}
        </p>
      </div>
    </button>
  )
}

export function NextUpLiveStream() {
  const [channelUrl, setChannelUrl] = useState(DEFAULT_CHANNEL_URL)
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [videos, setVideos] = useState<YoutubeFeedVideo[]>([])
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [isStreamLive, setIsStreamLive] = useState(false)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

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

        setChannelUrl(data.channelUrl || DEFAULT_CHANNEL_URL)
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
    <section id="youtube" className="relative overflow-hidden bg-[#0d1124] py-16 sm:py-24 scroll-mt-28 border-t border-white/5">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(197,32,58,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(30,45,94,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-black uppercase tracking-wider skew-x-[-10deg] ${isStreamLive ? 'bg-accent text-white' : 'bg-secondary text-ink'}`}>
                <span className="skew-x-[10deg] flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5" />
                  <span>{isStreamLive ? 'Live Now' : 'Scheduled'}</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider skew-x-[-10deg] bg-white/10 text-white/90">
                <span className="skew-x-[10deg] flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                  <span>Official Broadcast</span>
                </span>
              </div>
            </div>
            <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl font-display uppercase tracking-wide">
              Next Up <span className="text-secondary">Official Stream</span>
            </h2>
            <div className="h-[3px] w-16 bg-accent mt-2" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6">
          {/* Featured Video covering full width */}
          <div className="flex flex-col">
            <FeaturedVideoPlayer
              activeVideo={activeVideo}
              activeIndex={activeIndex}
              playlistId={playlistId}
            />

            {status === "error" && errorMessage ? (
              <div className="mt-4 flex items-center gap-2 rounded-none border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-white/80">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-accent" />
                {errorMessage}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}