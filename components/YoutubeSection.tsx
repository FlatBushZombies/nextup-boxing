"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { AlertCircle, ArrowUpRight, Play } from "lucide-react"

type YoutubeFeedVideo = {
  id: string
  title: string
  publishedAt: string
  url: string
}

type YoutubeApiPayload = {
  channelUrl: string
  channelId: string | null
  playlistId: string | null
  videos: YoutubeFeedVideo[]
  error?: string
}

const DEFAULT_CHANNEL_URL = "https://www.youtube.com/@NextUpBoxing"

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

function FeaturedCard({
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
      className="editorial-surface-dark block overflow-hidden p-3"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[1.15rem] bg-black ring-1 ring-white/10 shadow-[0_0_40px_rgba(197,32,58,0.15)]">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={activeVideo?.title ?? "NextUp Boxing uploads"}
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

      <div className="mt-6 px-4 pb-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-[#c5203a] px-4 py-2">
            <span className="editorial-meta text-white">Latest Upload</span>
          </div>
        </div>

        <h3
          className="mb-3 leading-tight tracking-[0.03em] text-white"
          style={{
            fontFamily: "var(--font-bebas), Impact, sans-serif",
            fontSize: "clamp(1.85rem, 4vw, 2.9rem)",
          }}
        >
          {activeVideo?.title ?? "NextUp Boxing Channel"}
        </h3>

        <p className="editorial-body max-w-2xl text-sm text-white/62 md:text-base">
          {activeVideo
            ? `Published ${formatPublishedDate(activeVideo.publishedAt)}. Browse the latest uploads from the official NextUp Boxing channel.`
            : "Watch the latest uploads, highlights, and behind-the-scenes coverage directly from the official channel."}
        </p>
      </div>
    </motion.div>
  )
}

function SmallCard({
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
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className={`group flex w-full cursor-pointer items-start gap-4 rounded-2xl border border-transparent px-3 py-4 text-left transition-all duration-300 hover:bg-white/5 ${
        isActive ? "border-white/8 bg-white/5" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex-shrink-0 overflow-hidden rounded-xl bg-[#0d1124]"
        style={{ width: "9rem", aspectRatio: "16/9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ytThumb(video.id, "hqdefault")}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isActive ? "bg-transparent" : "bg-[#0d1124]/42 group-hover:bg-[#0d1124]/12"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300"
            style={{
              background: isActive || hovered ? "rgba(197,32,58,0.9)" : "rgba(255,255,255,0.15)",
              transform: isActive || hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            <Play className="ml-px h-3.5 w-3.5 text-white" fill="white" />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 pt-1">
        <div className="mb-2 inline-flex rounded-full bg-[#1e2d5e] px-3 py-1">
          <span className="editorial-meta text-white">{formatPublishedDate(video.publishedAt)}</span>
        </div>

        <h4
          className={`line-clamp-2 text-sm font-semibold leading-snug transition-colors duration-300 ${
            isActive ? "text-[#f2ccd3]" : "text-white/90 group-hover:text-white"
          }`}
        >
          {video.title}
        </h4>
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
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadVideos() {
      try {
        const response = await fetch("/api/youtube", {
          cache: "no-store",
        })
        const data: YoutubeApiPayload = await response.json()

        if (!isMounted) {
          return
        }

        setChannelUrl(data.channelUrl || DEFAULT_CHANNEL_URL)
        setPlaylistId(data.playlistId)
        setVideos(data.videos)
        setActiveVideoId((currentVideoId) => currentVideoId ?? data.videos[0]?.id ?? null)
        setErrorMessage(data.error || "")
        setStatus(response.ok ? "ready" : "error")
      } catch {
        if (!isMounted) {
          return
        }

        setStatus("error")
        setErrorMessage("We couldn't load the latest uploads right now.")
      }
    }

    loadVideos()

    return () => {
      isMounted = false
    }
  }, [])

  const activeVideo = videos.find((video) => video.id === activeVideoId) ?? videos[0] ?? null
  const activeIndex = activeVideo ? videos.findIndex((video) => video.id === activeVideo.id) : 0
  const playlist = activeVideo ? videos.filter((video) => video.id !== activeVideo.id) : videos.slice(1)

  return (
    <section
      id="youtube"
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "#080c18" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[60vw] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse, rgba(197,32,58,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#b8962e]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="section-eyebrow text-[#c5203a]">NextUp Boxing Network</span>
            </div>

            <h2
              className="uppercase leading-none text-white"
              style={{
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                fontSize: "clamp(2.7rem, 5vw, 4.2rem)",
                letterSpacing: "0.03em",
              }}
            >
              Featured Content
            </h2>
          </div>

          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-button inline-flex flex-shrink-0 items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-6 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/45 hover:bg-red-500/18"
          >
            <Play fill="white" className="h-4 w-4 text-white" />
            Subscribe on YouTube
          </a>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 h-px origin-left bg-gradient-to-r from-[#c5203a]/50 via-white/10 to-transparent"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:gap-12">
          <div className="flex flex-col">
            <FeaturedCard activeVideo={activeVideo} activeIndex={activeIndex} playlistId={playlistId} />

            {status === "error" && errorMessage ? (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#c5203a]/20 bg-[#c5203a]/8 px-4 py-3 text-sm text-white/70">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#c5203a]" />
                {errorMessage}
              </div>
            ) : null}
          </div>

          <div className="editorial-surface-dark flex h-full flex-col p-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-6 flex items-center gap-3 px-1"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#c5203a]" />
              <span className="editorial-meta text-white">Up Next</span>
            </motion.div>

            <div
              className="flex flex-1 flex-col gap-2 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#c5203a transparent" }}
            >
              {status === "loading" ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[108px] animate-pulse rounded-2xl border border-white/5 bg-white/5"
                  />
                ))
              ) : playlist.length > 0 ? (
                playlist.map((video, index) => (
                  <SmallCard
                    key={video.id}
                    video={video}
                    index={index}
                    isActive={video.id === activeVideo?.id}
                    onClick={() => setActiveVideoId(video.id)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-6 text-sm leading-relaxed text-white/55">
                  Latest uploads will populate here automatically from the connected YouTube channel.
                </div>
              )}
            </div>

            <motion.a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="editorial-button group mt-6 flex items-center justify-center gap-2 border-t border-white/5 pt-6 text-white/42 transition-all duration-300 hover:text-white"
            >
              View All on YouTube
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5203a]/50 to-transparent" />
    </section>
  )
}
