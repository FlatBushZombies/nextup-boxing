"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    url.includes("cdninstagram") ||
    url.startsWith("blob:")
  )
}

const PlatformBadge = ({ platform }: { platform?: "instagram" | "tiktok" | "youtube" }) => {
  if (!platform) return null

  const getBadgeStyle = () => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"
      case "tiktok":
        return "bg-black text-white border border-white/20"
      case "youtube":
        return "bg-[#ff0000] text-white"
      default:
        return "bg-slate-800 text-white"
    }
  }

  const renderIcon = () => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <div className={`flex h-7 w-7 items-center justify-center rounded-full shadow-lg backdrop-blur-sm ${getBadgeStyle()}`}>
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
      video.play().catch((err) => {
        console.warn("Autoplay was prevented by browser policy:", err)
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
      className={className}
    />
  )
}

export function SocialWall() {
  const [selectedReel, setSelectedReel] = useState<MockReel | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({})

  const [posts, setPosts] = useState<MockReel[]>(MOCK_REELS)
  const [isError, setIsError] = useState<string | null>(null)

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

  const POLL_INTERVAL_MS = 30_000

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function loadReels() {
      try {
        const res = await fetch("/api/instagram/reels", { cache: "no-store", signal: controller.signal })
        const data = await res.json()

        if (!isMounted) return

        if (Array.isArray(data.reels) && data.reels.length > 0) {
          const mapped = data.reels.map((r: Record<string, unknown>, idx: number) => ({
            id: String(r.id ?? ""),
            caption: String(r.caption ?? ""),
            permalink: String(r.permalink ?? data.profileUrl ?? "https://www.instagram.com/"),
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
            platform: (r.platform as "instagram" | "tiktok" | "youtube" | undefined) ??
              (["instagram", "tiktok", "youtube"][idx % 3]) as "instagram" | "tiktok" | "youtube"
          })) as MockReel[]

          setPosts(mapped)
          setIsError(null)
        } else if (data.error) {
          setIsError(data.error)
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return
        setIsError("Unable to load Instagram reels right now.")
      }
    }

    loadReels()
    const id = setInterval(loadReels, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      controller.abort()
      clearInterval(id)
    }
  }, [])

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

  const renderFeedTile = (
    post: MockReel,
    className: string
  ) => (
    <motion.button
      key={post.id}
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setSelectedReel(post)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 text-left text-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#c5203a]/30 hover:shadow-[0_20px_40px_rgba(197,32,58,0.15)] ${className}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {/* Autoplay Video or Image */}
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

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-[#0d1124]/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#c5203a]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2 sm:left-4 sm:top-4">
          <div className="rounded-full bg-black/60 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
            {post.duration}
          </div>
        </div>

        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <PlatformBadge platform={post.platform} />
        </div>

        {/* Center Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-[#c5203a]/90 text-white shadow-[0_0_20px_rgba(197,32,58,0.6)] backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-[#c5203a]">
            <Play className="ml-0.5 h-5 w-5 fill-white" />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="line-clamp-2 text-xs font-bold uppercase leading-tight tracking-[0.06em] text-white/90 group-hover:text-white transition-colors duration-300">
            {post.caption}
          </p>
          <div className="mt-3 flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/50 group-hover:text-white/80 transition-colors duration-300">
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 fill-current text-[#c5203a]" />
              {post.likeCount}
            </span>
            <span>{post.category.replace("-", " ")}</span>
          </div>
        </div>
      </div>
    </motion.button>
  )

  if (!featuredPost) return null

  return (
    <section
      id="social-wall"
      className="relative overflow-hidden border-t border-slate-100 bg-white py-16 sm:py-24 lg:py-32"
    >
      {/* Futuristic background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Diagonal speed lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="diagonal-line absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#c5203a] to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: "-100%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-[0.04]" />

        {/* Glow effects */}
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#c5203a]/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#b8962e]/5 blur-[100px]" />
      </div>

      {/* HUD Frame */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Top left accent */}
        <div className="absolute left-6 top-6">
          <div className="h-6 w-6 border-l-2 border-t-2 border-[#c5203a]/20" />
        </div>

        {/* Bottom right accent */}
        <div className="absolute bottom-6 right-6">
          <div className="ml-auto h-6 w-6 border-b-2 border-r-2 border-[#b8962e]/20" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-2 sm:gap-x-4">
              <span className="font-display text-[clamp(2rem,8vw,4.5rem)] font-black uppercase leading-none text-slate-950" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
                NEXTUP
              </span>
              <span className="pb-0.5 font-sans text-[clamp(1rem,3.5vw,1.75rem)] font-black uppercase tracking-[0.2em] text-[#c5203a] sm:tracking-[0.26em]" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                SOCIAL WALL
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Real-time highlights from @nextupboxingleague — fight week, training, promos, and the behind-the-scenes energy that keeps the league moving.
            </p>
          </div>

          <a
            href="https://www.instagram.com/nextupboxingleague/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex self-start md:self-auto overflow-hidden bg-[#b8962e] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0d1124] transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,150,46,0.2)]"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Follow on Instagram</span>
            <div className="absolute inset-0 translate-x-[-100%] bg-[#0d1124] transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </motion.div>

        {isError && (
          <p className="mb-6 text-sm text-slate-500" role="status">
            {isError}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {/* Featured Large Tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 hover:border-[#c5203a]/30 hover:shadow-[0_30px_60px_rgba(197,32,58,0.15)] sm:rounded-[2rem] sm:col-span-2 lg:col-span-2 xl:col-span-2 xl:row-span-2"
          >
            <button
              type="button"
              onClick={() => setSelectedReel(featuredPost)}
              className="relative block h-full min-h-[320px] w-full overflow-hidden text-left sm:min-h-[420px] lg:min-h-[500px]"
            >
              {/* Autoplay Video or Image */}
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
              
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-[#0d1124]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c5203a]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Glow effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,32,58,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top Badges */}
              <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md sm:text-[0.65rem] sm:tracking-[0.18em]">
                  Featured Reel
                </span>
                <span className="rounded-full bg-black/60 px-2.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                  {featuredPost.duration}
                </span>
              </div>

              <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                <PlatformBadge platform={featuredPost.platform} />
              </div>

              {/* Center Play Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div className="flex h-16 w-16 scale-75 items-center justify-center rounded-full bg-[#c5203a]/90 text-white shadow-[0_0_30px_rgba(197,32,58,0.7)] backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-[#c5203a]">
                  <Play className="ml-1 h-6 w-6 fill-white" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                <h3 className="max-w-lg text-lg font-black uppercase leading-tight text-white group-hover:text-white sm:text-2xl lg:text-[2.2rem]">
                  {featuredPost.caption}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/50 group-hover:text-white/80 transition-colors duration-300 sm:mt-6 sm:gap-4 sm:text-[0.74rem] sm:tracking-[0.2em]">
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4.5 w-4.5 fill-current text-[#c5203a]" />
                    {featuredPost.likeCount} likes
                  </span>
                  <span>•</span>
                  <span>{featuredPost.category.replace("-", " ")}</span>
                </div>
              </div>
            </button>
          </motion.div>

          {/* Grid posts */}
          {gridPosts.map((post) =>
            renderFeedTile(
              post,
              ""
            )
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/95 p-0 backdrop-blur-md sm:items-center sm:p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex max-h-[95dvh] w-full max-w-[850px] flex-col overflow-hidden rounded-t-3xl bg-[#0d1124] border border-white/10 shadow-2xl sm:max-h-[92vh] sm:rounded-3xl md:flex-row md:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-[#c5203a] sm:right-4 sm:top-4 sm:h-10 sm:w-10"
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

                {/* Glassy Header Badge overlay (Only for images) */}
                {!isVideoUrl(selectedReel.mediaUrl) && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-bold text-white backdrop-blur-sm">
                        {selectedReel.duration}
                      </span>

                      <span className="flex items-center gap-1.5 rounded-full bg-[#c5203a] px-3 py-1 font-sans text-xs font-bold text-white shadow-md">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        LIVE PLAYER
                      </span>
                    </div>

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16">
                      <Play className="h-6 w-6 fill-white" />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/30 font-display text-[10px] font-black italic text-white">
                        NUB
                      </div>
                      <span className="font-sans text-sm font-bold text-white">@nextupboxingleague</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar detail/interaction right side */}
              <div className="flex min-h-0 w-full flex-col justify-between border-t border-white/10 bg-[#0f132a] p-4 sm:p-6 md:w-[380px] md:border-l md:border-t-0">
                <div className="max-h-[40dvh] space-y-4 overflow-y-auto pr-1 sm:max-h-none sm:space-y-5 md:max-h-[440px]">
                  {/* Channel Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#c5203a] to-[#b8962e] p-[1.5px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d1124] font-display text-[9px] font-black italic text-white">
                          NUB
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-xs font-bold text-white">nextupboxingleague</span>
                        <span className="text-[9px] text-slate-400 capitalize">{selectedReel.platform || "Instagram"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Timestamp */}
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-semibold leading-relaxed text-slate-200">
                      {selectedReel.caption.split(" ").map((word, i) =>
                        word.startsWith("#") || word.startsWith("@") ? (
                          <span key={i} className="font-bold text-[#c5203a]">
                            {word}{" "}
                          </span>
                        ) : (
                          `${word} `
                        )
                      )}
                    </p>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">
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
                      <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Discussion
                      </h4>

                      <div className="space-y-3">
                        {selectedReel.commentsList.map((comment, index) => (
                          <div key={index} className="rounded-xl bg-[#1d223f] border border-white/5 p-3 text-xs">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="font-sans font-bold text-white">@{comment.user}</span>
                              <span className="text-[9px] text-slate-400">Active</span>
                            </div>
                            <p className="font-sans font-medium leading-normal text-slate-300">
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
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-[#c5203a] transition-colors"
                    >
                      <Heart
                        className={`h-4.5 w-4.5 transition-transform ${likedReels[selectedReel.id] ? "scale-125 fill-[#c5203a] text-[#c5203a]" : "text-white hover:scale-110"}`}
                      />
                      {likedReels[selectedReel.id] ? selectedReel.likeCount + 1 : selectedReel.likeCount}
                    </button>

                    <button
                      onClick={(e) => handleShare(selectedReel.id, e)}
                      className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === selectedReel.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5203a] to-[#b8962e] py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,32,58,0.4)]"
                  >
                    View Original Reel
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
