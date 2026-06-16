"use client"

import { useEffect, useState, useRef } from "react"
import { Heart, Play, ExternalLink, X, Check, Share2 } from "lucide-react"

type MockReel = {
  id: string
  caption: string
  permalink: string
  mediaUrl: string
  timestamp: string
  likeCount: number
  category: "promos" | "training" | "behind-the-scenes"
  duration: string
  commentsList: { user: string; text: string }[]
  platform?: "instagram" | "tiktok" | "youtube"
}

const MOCK_REELS: MockReel[] = [
  {
    id: "reel-1",
    caption: "STILL HUNGRY. ⚡️ @marcus_steel gears up for the main event on June 6. Six weeks of relentless camp boils down to one night. Are you ready? #NextUpBoxing #FightCamp #MainEvent #BoxerLife",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-training-with-a-punching-bag-40232-large.mp4",
    timestamp: "2026-05-18T18:00:00Z",
    likeCount: 4820,
    category: "training",
    duration: "0:45",
    commentsList: [
      { user: "champ_boxing", text: "Marcus is looking in absolute peak condition! 💪" },
      { user: "iron_fist99", text: "That heavy bag work is pure speed. June 6 cannot come soon enough." },
      { user: "fight_analyst", text: "Steele's jab is looking noticeably sharper this camp." }
    ],
    platform: "instagram"
  },
  {
    id: "reel-2",
    caption: "The atmosphere is building. 🔥 Arena setup in progress for the biggest showdown of the year. Limited tickets remaining via link in bio. #NextUpBoxing #FightNight #SoldOut #ArenaLights",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-boxer-wrapped-in-bandages-40225-large.mp4",
    timestamp: "2026-05-17T12:00:00Z",
    likeCount: 3120,
    category: "behind-the-scenes",
    duration: "0:30",
    commentsList: [
      { user: "nextup_fanatic", text: "Just secured my ringside seat! Let's go!!" },
      { user: "dan_harrison_fc", text: "Vegas styling! Looks massive." },
      { user: "ticket_broker", text: "Unbelievable production value." }
    ],
    platform: "tiktok"
  },
  {
    id: "reel-3",
    caption: "Precision meets power. 🥊 @elena_tyson showing absolute masterclass speed on the pads. Undefeated champion defending her title. #NextUpBoxing #TysonDefends #WomenInSports #ChampionMindset",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-boxer-training-in-the-gym-40228-large.mp4",
    timestamp: "2026-05-15T09:30:00Z",
    likeCount: 5410,
    category: "training",
    duration: "0:58",
    commentsList: [
      { user: "elena_t_fan", text: "Fastest hands in the division! Undefeated for a reason 👑" },
      { user: "coach_smith", text: "The footwork rotation is textbook. Excellent form." },
      { user: "strike_force", text: "She is going to dominate." }
    ],
    platform: "instagram"
  },
  {
    id: "reel-4",
    caption: "GOLD ON THE LINE. 🏆 The official Next Up Boxing League World Championship Belt is polished and ready. Who takes it home? Drop your predictions below! 👇 #NextUpBoxing #AndTheNew #GoldGlory",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-hitting-a-punching-bag-40224-large.mp4",
    timestamp: "2026-05-14T20:15:00Z",
    likeCount: 7120,
    category: "promos",
    duration: "0:15",
    commentsList: [
      { user: "boxer_pete", text: "Steele gets it done in the 8th round. Knockout!" },
      { user: "harrison_army", text: "Harrison is taking that belt home, no doubt!" },
      { user: "boxing_weekly", text: "Beautiful design on that strap." }
    ],
    platform: "youtube"
  },
  {
    id: "reel-5",
    caption: "A look inside the tunnel. 🚶‍♂️ The heavy silence before the storm. Visualizing the victory. Experience the live walkouts exclusively on nextupboxing.com on June 6. #NextUpBoxing #FighterWalkout #BehindTheScenes",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-guy-doing-shadow-boxing-in-the-gym-40229-large.mp4",
    timestamp: "2026-05-12T14:40:00Z",
    likeCount: 2890,
    category: "behind-the-scenes",
    duration: "1:00",
    commentsList: [
      { user: "the_mental_game", text: "Focus is everything. The walkout tells you who wins before the bell." },
      { user: "boxing_promoter", text: "The walkout production is going to be cinematic!" },
      { user: "ring_side_ricky", text: "Chills down my spine just watching this." }
    ],
    platform: "tiktok"
  }
]

const isVideoUrl = (url: string) => {
  if (!url) return false
  return (
    url.includes(".mp4") ||
    url.includes("video") ||
    url.includes("fbcdn") ||
    url.startsWith("blob:")
  )
}

const PlatformBadge = ({ platform }: { platform?: "instagram" | "tiktok" | "youtube" }) => {
  if (!platform) return null

  const renderIcon = () => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        )
      case "tiktok":
        return (
          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.99-1.72-.08-.08-.17-.17-.25-.26-.02 1.93-.01 3.86-.02 5.79-.06 2.07-.66 4.17-1.99 5.76-1.52 1.87-3.9 2.87-6.26 2.85-2.27.03-4.57-.84-6.06-2.54-1.68-1.89-2.34-4.61-1.74-7.07.51-2.18 1.94-4.14 3.96-5.07 1.74-.83 3.76-.94 5.54-.31v4.21c-1.12-.44-2.4-.29-3.37.45-.92.68-1.4 1.83-1.28 2.96.06 1.09.73 2.08 1.71 2.53.94.46 2.09.36 2.94-.28.78-.57 1.18-1.53 1.17-2.49-.02-3.21-.01-6.43-.02-9.64-.02-.13-.01-.26-.02-.39z" />
          </svg>
        )
      case "youtube":
        return (
          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163c-.272-1.002-1.064-1.794-2.065-2.066C19.654 3.62 12 3.62 12 3.62s-7.654 0-9.433.477A2.96 2.96 0 0 0 .502 6.163C0 7.943 0 12 0 12s0 4.057.502 5.837c.272 1.002 1.064 1.794 2.065 2.066C4.346 20.38 12 20.38 12 20.38s7.654 0 9.433-.477a2.96 2.96 0 0 0 2.065-2.066C24 16.057 24 12 24 12s0-4.057-.502-5.837zM9.545 15.568V8.17l6.505 3.7-6.505 3.698z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white">
      {renderIcon()}
    </div>
  )
}

const AutoplayVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Explicitly set muted to bypass React-specific rendering quirks
    video.muted = true
    video.defaultMuted = true

    const attemptPlay = () => {
      video.play().catch((err: any) => {
        // Suppress known browser policy errors (NotSupportedError, NotAllowedError)
        // These are expected and don't break functionality
        if (err.name !== "NotSupportedError" && err.name !== "NotAllowedError") {
          console.warn("Video playback error:", err.message)
        }
      })
    }

    attemptPlay()

    // Retry triggers
    video.addEventListener("loadedmetadata", attemptPlay)
    video.addEventListener("canplay", attemptPlay)

    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay)
      video.removeEventListener("canplay", attemptPlay)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      crossOrigin="anonymous"
      preload="metadata"
      onError={() => {
        // Silently handle video load errors - expected for external video sources
      }}
      className={className}
    />
  )
}

export function SocialWall() {
  const [selectedReel, setSelectedReel] = useState<MockReel | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({})

  const [posts, setPosts] = useState<MockReel[]>(MOCK_REELS)
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  useEffect(() => {
    if (selectedReel) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedReel])

  const shouldUseInstagramApi = process.env.NEXT_PUBLIC_USE_INSTAGRAM_API === "true"

  useEffect(() => {
    if (!shouldUseInstagramApi) return

    let isMounted = true
    const controller = new AbortController()

    async function loadReels() {
      try {
        const res = await fetch("/api/instagram/reels", { cache: "no-store", signal: controller.signal })
        const data = await res.json()

        if (!isMounted) return

        if (res.ok && Array.isArray(data.reels) && data.reels.length > 0) {
          const mapped = data.reels.map((r: Record<string, unknown>, idx: number) => ({
            id: String(r.id ?? ""),
            caption: String(r.caption ?? ""),
            permalink: String(r.permalink ?? data.profileUrl ?? "https://www.instagram.com/nextupboxingleague/"),
            mediaUrl: String(r.mediaUrl ?? r.thumbnailUrl ?? r.media_url ?? r.thumbnail_url ?? ""),
            timestamp: String(r.timestamp ?? ""),
            likeCount:
              typeof r.likeCount === "number"
                ? r.likeCount
                : typeof r.like_count === "number"
                  ? r.like_count
                  : 0,
            category: (r.category as "promos" | "training" | "behind-the-scenes" | undefined) ??
              (["promos", "training", "behind-the-scenes"][idx % 3]) as "promos" | "training" | "behind-the-scenes",
            duration: String(r.duration ?? "0:30"),
            commentsList: Array.isArray(r.commentsList) ? r.commentsList : [],
            platform: (r.platform as "instagram" | "tiktok" | "youtube" | undefined) ?? "instagram"
          })) as MockReel[]

          setPosts(mapped)
          setApiMessage(null)
        } else {
          setApiMessage("Loading latest Instagram highlights...")
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return
        setApiMessage("Showing recent Instagram highlights while loading latest...")
      }
    }

    loadReels()
    const id = setInterval(loadReels, 30_000)

    return () => {
      isMounted = false
      controller.abort()
      clearInterval(id)
    }
  }, [shouldUseInstagramApi])

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setCopiedId(id)
    navigator.clipboard.writeText(`https://instagram.com/nextupboxingleague/reel/${id}`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const featuredPost = posts[0]
  const gridPosts = posts.slice(1)

  if (!featuredPost) return null

  return (
    <section
      id="social-wall"
      className="relative overflow-hidden bg-[#111111] py-16 sm:py-24 border-t border-[#e5e5e5]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2 block">
              Social Wall
            </span>
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-white">
              Latest from @NextUpBoxingLeague
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
              Real-time highlights from @nextupboxingleague — fight week, training, promos, and the behind-the-scenes energy that keeps the league moving.
            </p>
          </div>

          <a
            href="https://www.instagram.com/nextupboxingleague/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-start rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:border-white/40"
          >
            Follow on Instagram
          </a>
        </div>

        {apiMessage && (
          <p className="mb-6 text-sm text-white/50" role="status">
            {apiMessage}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {/* Featured Large Tile */}
          <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2">
            <button
              type="button"
              onClick={() => setSelectedReel(featuredPost)}
              className="group relative block h-full min-h-[320px] w-full overflow-hidden bg-[#1a1a1a] text-left text-white sm:min-h-[420px] lg:min-h-[500px]"
            >
              {isVideoUrl(featuredPost.mediaUrl) ? (
                <AutoplayVideo
                  src={featuredPost.mediaUrl}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={featuredPost.mediaUrl}
                  alt={featuredPost.caption}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

              {/* Top Badges */}
              <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white">
                  Featured Reel
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white">
                  {featuredPost.duration}
                </span>
              </div>

              <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                <PlatformBadge platform={featuredPost.platform} />
              </div>

              {/* Center Play Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#111111]">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                <h3 className="max-w-lg text-lg font-medium uppercase leading-tight text-white sm:text-2xl lg:text-[2.2rem]">
                  {featuredPost.caption}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/60 sm:mt-6 sm:gap-4">
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" />
                    {featuredPost.likeCount} likes
                  </span>
                  <span>•</span>
                  <span>{featuredPost.category.replace("-", " ")}</span>
                </div>
              </div>
            </button>
          </div>

          {/* Grid posts */}
          {gridPosts.map((post, index) => (
            <div key={post.id}>
              <button
                type="button"
                onClick={() => setSelectedReel(post)}
                className="group relative flex w-full flex-col overflow-hidden bg-[#1a1a1a] text-left text-white"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {isVideoUrl(post.mediaUrl) ? (
                    <AutoplayVideo
                      src={post.mediaUrl}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-4 sm:top-4">
                    <div className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white">
                      {post.duration}
                    </div>
                  </div>

                  <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                    <PlatformBadge platform={post.platform} />
                  </div>

                  {/* Center Play Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#111111]">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="line-clamp-2 text-xs font-medium uppercase leading-tight tracking-[0.06em] text-white/90">
                      {post.caption}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.15em] text-white/50">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likeCount}
                      </span>
                      <span>{post.category.replace("-", " ")}</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/90 p-0 animate-fade-in sm:items-center sm:p-4"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative flex max-h-[95dvh] w-full max-w-[850px] flex-col overflow-hidden bg-[#111111] border border-white/10 animate-fade-in sm:max-h-[92vh] md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
              aria-label="Close reel"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Video Player / Image left side */}
            <div className="relative min-h-[260px] flex-1 bg-black sm:min-h-[320px] md:min-h-0">
              {isVideoUrl(selectedReel.mediaUrl) ? (
                <video
                  src={selectedReel.mediaUrl}
                  autoPlay
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <img
                  src={selectedReel.mediaUrl}
                  alt={selectedReel.caption}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Header overlay (Only for images) */}
              {!isVideoUrl(selectedReel.mediaUrl) && (
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                      {selectedReel.duration}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#111111]">
                      <span className="h-2 w-2 rounded-full bg-[#111111]" />
                      Live Player
                    </span>
                  </div>

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16">
                    <Play className="h-6 w-6 fill-current" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-medium text-white">
                      NUB
                    </div>
                    <span className="text-sm font-medium text-white">@nextupboxingleague</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar detail/interaction right side */}
            <div className="flex min-h-0 w-full flex-col justify-between border-t border-white/10 bg-[#1a1a1a] p-4 sm:p-6 md:w-[380px] md:border-l md:border-t-0">
              <div className="max-h-[40dvh] space-y-4 overflow-y-auto pr-1 sm:max-h-none sm:space-y-5 md:max-h-[440px]">
                {/* Channel Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[9px] font-medium text-white">
                      NUB
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white">nextupboxingleague</span>
                      <span className="text-[9px] text-white/40 capitalize">{selectedReel.platform || "Instagram"}</span>
                    </div>
                  </div>
                </div>

                {/* Caption & Timestamp */}
                <div className="space-y-2">
                  <p className="text-xs font-medium leading-relaxed text-white/80">
                    {selectedReel.caption.split(" ").map((word, i) =>
                      word.startsWith("#") || word.startsWith("@") ? (
                        <span key={i} className="font-medium text-white">
                          {word}{" "}
                        </span>
                      ) : (
                        `${word} `
                      )
                    )}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                    {selectedReel.timestamp ? (
                      <>Posted {new Date(selectedReel.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</>
                    ) : (
                      <>Posted recently</>
                    )}
                  </p>
                </div>

                {/* Dynamic Discussion section if mock comments are present */}
                {selectedReel.commentsList.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                      Discussion
                    </h4>

                    <div className="space-y-3">
                      {selectedReel.commentsList.map((comment, index) => (
                        <div key={index} className="border border-white/10 bg-white/5 p-3 text-xs">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-medium text-white">@{comment.user}</span>
                            <span className="text-[9px] text-white/40">Active</span>
                          </div>
                          <p className="font-normal leading-normal text-white/70">
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Interaction Actions */}
              <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(selectedReel.id, e)}
                    className="flex items-center gap-1.5 text-xs font-medium text-white/80 transition-colors hover:text-white"
                  >
                    <Heart
                      className={`h-4 w-4 transition-transform ${likedReels[selectedReel.id] ? "scale-110 fill-white text-white" : "text-white/80"}`}
                    />
                    {likedReels[selectedReel.id] ? selectedReel.likeCount + 1 : selectedReel.likeCount}
                  </button>

                  <button
                    onClick={(e) => handleShare(selectedReel.id, e)}
                    className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-white/50 transition-colors hover:text-white"
                  >
                    {copiedId === selectedReel.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        Share
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={selectedReel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-medium uppercase tracking-widest text-[#111111] transition-colors hover:bg-[#e5e5e5]"
                >
                  View Original Reel
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
