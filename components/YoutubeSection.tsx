"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
    <div className="relative overflow-hidden border border-[#e5e5e5] bg-[#111111]">
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
      <div className="border-t border-[#e5e5e5]/10 bg-[#111111] px-5 py-4">
        <h3 className="truncate text-sm font-medium uppercase tracking-wide text-white md:text-base">
          {activeVideo?.title ?? "Featured Content"}
        </h3>
      </div>
    </div>
  )
}

// Video Thumbnail Card for the sidebar
function VideoThumbnailCard({
  video,
  isActive,
  onClick,
}: {
  video: YoutubeFeedVideo
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full cursor-pointer items-start gap-3 p-2 text-left transition-colors duration-300 ${
        isActive ? "bg-[#f5f5f5]" : "hover:bg-[#f5f5f5]"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-[67px] w-[120px] flex-shrink-0 overflow-hidden bg-[#111111]">
        <Image
          src={ytThumb(video.id, "hqdefault")}
          alt={video.title}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              isActive ? "bg-white" : "bg-white/80 group-hover:bg-white"
            }`}
          >
            <Play className="ml-0.5 h-3 w-3 fill-[#111111] text-[#111111]" />
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="min-w-0 flex-1">
        <h4 className={`mb-1 line-clamp-2 text-sm font-medium leading-tight transition-colors duration-300 ${
          isActive ? "text-[#111111]" : "text-[#707072] group-hover:text-[#111111]"
        }`}>
          {video.title}
        </h4>
        <p className="text-xs text-[#9e9ea0]">
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

  const selectVideo = (id: string) => {
    setActiveVideoId(id)
    setIsPlaying(false)
  }

  return (
    <section
      id="youtube"
      className="relative overflow-hidden bg-white py-16 sm:py-24 scroll-mt-28 border-t border-[#e5e5e5]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[#707072]">
            On YouTube
          </span>
          <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-crimson">
            Latest Videos
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left: Featured Video */}
          <div className="flex flex-col">
            <FeaturedVideoPlayer
              activeVideo={activeVideo}
              activeIndex={activeIndex}
              playlistId={playlistId}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
            />

            {status === "error" && errorMessage ? (
              <div className="mt-4 flex items-center gap-2 border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-sm text-[#707072]">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#111111]" />
                {errorMessage}
              </div>
            ) : null}
          </div>

          {/* Right: Video Playlist Sidebar */}
          <div className="flex flex-col border border-[#e5e5e5] p-4">
            {/* Sidebar Header */}
            <div className="mb-4 flex items-center gap-2 border-b border-[#e5e5e5] pb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111111]">
                <Play className="h-3 w-3 fill-white text-white" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-[#111111]">
                More Videos
              </span>
            </div>

            {/* Video List */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto" style={{ maxHeight: "400px" }}>
              {status === "loading" ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-3 p-2">
                    <div className="h-[67px] w-[120px] bg-[#f5f5f5]" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 w-full bg-[#f5f5f5]" />
                      <div className="h-3 w-20 bg-[#f5f5f5]" />
                    </div>
                  </div>
                ))
              ) : videos.length > 0 ? (
                videos.map((video) => (
                  <VideoThumbnailCard
                    key={video.id}
                    video={video}
                    isActive={video.id === activeVideo?.id}
                    onClick={() => selectVideo(video.id)}
                  />
                ))
              ) : (
                <div className="bg-[#f5f5f5] px-4 py-6 text-sm text-[#707072]">
                  Latest uploads will appear here from the connected YouTube channel.
                </div>
              )}
            </div>

            {/* Watch More Button */}
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-4 flex items-center justify-center gap-2 overflow-hidden bg-[#111111] py-3 text-xs font-medium uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-crimson transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">Watch More on YouTube</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
