"use client"

import { useEffect, useState } from "react"
import { AlertCircle, ArrowUpRight, Play } from "lucide-react"

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
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0a0e1a]">
      {/* Video container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0a0e1a]">
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
          <div className="flex h-full items-center justify-center px-6 text-center text-white/55">
            Channel videos will appear here once the YouTube feed is available.
          </div>
        )}
      </div>

      {/* Red accent title bar - matches big3.com style */}
      <div className="bg-[#c5203a] px-5 py-4">
        <h3 className="truncate text-sm font-bold uppercase tracking-wider text-white md:text-base lg:text-lg">
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
      className={`group flex w-full cursor-pointer items-start gap-3 rounded-lg p-2 text-left transition-all duration-300 ${
        isActive 
          ? "bg-[#c5203a]/10 ring-1 ring-[#c5203a]/30" 
          : "hover:bg-white/5"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-md bg-[#0a0e1a]"
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
            isActive || hovered ? "bg-transparent" : "bg-[#0a0e1a]/30"
          }`}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              isActive || hovered
                ? "scale-100 bg-[#c5203a] opacity-100"
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
            isActive ? "text-white" : "text-white/80 group-hover:text-white"
          }`}
        >
          {video.title}
        </h4>
        <p className="text-xs text-white/40">
          {formatPublishedDate(video.publishedAt)}
        </p>
      </div>
    </button>
  )
}

export function YoutubeSection() {
  const [channelUrl, setChannelUrl] = useState(DEFAULT_CHANNEL_URL)
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [videos, setVideos] = useState<YoutubeFeedVideo[]>([])
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
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
        } else {
          setVideos(data.videos)
          setActiveVideoId((currentVideoId) => currentVideoId ?? data.videos[0]?.id ?? null)
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
    <section
      id="youtube"
      className="relative overflow-hidden py-16 sm:py-24 scroll-mt-28"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d1e3a 50%, #0a1628 100%)" }}
    >
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(197,32,58,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(30,45,94,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-[#c5203a]">
              On YouTube
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Latest Videos
            </h2>
          </div>
        </div>

        {/* Main Content Grid - Big3.com style layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left: Featured Video */}
          <div className="flex flex-col">
            <FeaturedVideoPlayer
              activeVideo={activeVideo}
              activeIndex={activeIndex}
              playlistId={playlistId}
            />

            {status === "error" && errorMessage ? (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#c5203a]/20 bg-[#c5203a]/10 px-4 py-3 text-sm text-white/70">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#c5203a]" />
                {errorMessage}
              </div>
            ) : null}
          </div>

          {/* Right: Video Playlist Sidebar */}
          <div className="flex flex-col rounded-lg bg-[#0a0e1a]/80 p-4 backdrop-blur-sm">
            {/* Sidebar Header */}
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#c5203a]">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                More Videos
              </span>
            </div>

            {/* Video List */}
            <div
              className="flex flex-1 flex-col gap-2 overflow-y-auto"
              style={{ maxHeight: "400px", scrollbarWidth: "thin", scrollbarColor: "#c5203a transparent" }}
            >
              {status === "loading" ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-lg bg-white/5 p-2"
                  >
                    <div className="h-[67px] w-[120px] rounded-md bg-white/10" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 w-full rounded bg-white/10" />
                      <div className="h-3 w-20 rounded bg-white/5" />
                    </div>
                  </div>
                ))
              ) : videos.length > 0 ? (
                videos.map((video, index) => (
                  <VideoThumbnailCard
                    key={video.id}
                    video={video}
                    index={index}
                    isActive={video.id === activeVideo?.id}
                    onClick={() => setActiveVideoId(video.id)}
                  />
                ))
              ) : (
                <div className="rounded-lg bg-white/5 px-4 py-6 text-sm text-white/50">
                  Latest uploads will appear here from the connected YouTube channel.
                </div>
              )}
            </div>

            {/* Watch More Button - Big3.com style */}
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#1e2d5e] py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#2a3f7a]"
            >
              Watch More on YouTube
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
