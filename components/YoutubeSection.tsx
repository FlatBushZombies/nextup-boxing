"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AlertCircle, ArrowUpRight, Play, Radio, Ticket, ExternalLink } from "lucide-react"

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
  liveStream: YoutubeLiveStream | null
  isNewYorkUser: boolean
  hasRestrictedLiveStream: boolean
  ticketPurchaseUrl: string
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

// Live Stream Banner for NY users
function LiveStreamRestricted({ ticketPurchaseUrl, isVisible }: { ticketPurchaseUrl: string; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-lg border border-[#c5203a]/30 bg-gradient-to-br from-[#0a1628] via-[#0d1e3a] to-[#0a1628]"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(197,32,58,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,32,58,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center">
        {/* Pulsing live indicator */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#c5203a] opacity-75" />
            <Radio className="relative h-8 w-8 text-[#c5203a]" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-[#c5203a]">
            Live Now
          </span>
        </div>

        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Not streaming in New York
        </h3>

        <p className="mb-8 max-w-md text-white/60">
          Not streaming in New York, but the rest of the event is still available to watch. Get your tickets to watch the event live in person!
        </p>

        <a
          href={ticketPurchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c5203a] to-[#e63950] px-8 py-4 font-bold uppercase tracking-wider text-white shadow-lg shadow-[#c5203a]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c5203a]/40"
        >
          <Ticket className="h-5 w-5" />
          Purchase Tickets
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  )
}

// Live Stream Player Component
function LiveStreamPlayer({ liveStream, isVisible }: { liveStream: YoutubeLiveStream; isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg"
    >
      {/* Live indicator banner */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-r from-[#c5203a] to-[#e63950] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-white">
            Live Now
          </span>
        </div>
        <Radio className="h-5 w-5 text-white" />
      </div>

      <div className="aspect-video w-full bg-black pt-10">
        <iframe
          loading="lazy"
          src={`https://www.youtube.com/embed/${liveStream.id}?autoplay=1&rel=0&modestbranding=1`}
          title={liveStream.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>

      {/* Title bar below video - red accent like big3.com */}
      <div className="bg-[#c5203a] px-4 py-3">
        <h3 className="truncate text-sm font-bold uppercase tracking-wide text-white md:text-base">
          {liveStream.title}
        </h3>
      </div>
    </motion.div>
  )
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
      ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&index=${Math.max(activeIndex, 0)}&rel=0`
      : `https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1`
    : playlistId
      ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`
      : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative overflow-hidden rounded-lg"
    >
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
    </motion.div>
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
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
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
    </motion.button>
  )
}

export function YoutubeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [channelUrl, setChannelUrl] = useState(DEFAULT_CHANNEL_URL)
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const [videos, setVideos] = useState<YoutubeFeedVideo[]>([])
  const [liveStream, setLiveStream] = useState<YoutubeLiveStream | null>(null)
  const [isNewYorkUser, setIsNewYorkUser] = useState(false)
  const [hasRestrictedLiveStream, setHasRestrictedLiveStream] = useState(false)
  const [ticketPurchaseUrl, setTicketPurchaseUrl] = useState("")
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const POLL_INTERVAL_MS = 60_000

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
        setVideos(data.videos)
        setLiveStream(data.liveStream)
        setIsNewYorkUser(data.isNewYorkUser)
        setHasRestrictedLiveStream(Boolean(data.hasRestrictedLiveStream))
        setTicketPurchaseUrl(data.ticketPurchaseUrl)
        setActiveVideoId((currentVideoId) => currentVideoId ?? data.videos[0]?.id ?? null)
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
    const id = setInterval(loadVideos, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      controller.abort()
      clearInterval(id)
    }
  }, [])

  const activeVideo = videos.find((video) => video.id === activeVideoId) ?? videos[0] ?? null
  const activeIndex = activeVideo ? videos.findIndex((video) => video.id === activeVideo.id) : 0
  const shouldShowTicketGate = isNewYorkUser && hasRestrictedLiveStream

  return (
    <section
      id="youtube"
      ref={ref}
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-[#c5203a]">
              On YouTube
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Latest Videos
            </h2>
          </div>
        </motion.div>

        {/* Live Stream Section - New York users receive only the ticket gate */}
        {(liveStream || shouldShowTicketGate) && (
          <div className="mb-10">
            {shouldShowTicketGate ? (
              <LiveStreamRestricted ticketPurchaseUrl={ticketPurchaseUrl} isVisible={isInView} />
            ) : (
              liveStream && <LiveStreamPlayer liveStream={liveStream} isVisible={isInView} />
            )}
          </div>
        )}

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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#c5203a]">
                <Play className="h-3 w-3 text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                More Videos
              </span>
            </motion.div>

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
                    <div className="h-[67px] w-[120px] animate-pulse rounded-md bg-white/10" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                      <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
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
            <motion.a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#1e2d5e] py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#2a3f7a]"
            >
              Watch More on YouTube
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
