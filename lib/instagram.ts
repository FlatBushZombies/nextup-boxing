import "server-only"

export type InstagramReel = {
  id: string
  caption: string
  permalink: string
  mediaType: string
  mediaUrl: string | null
  thumbnailUrl: string | null
  timestamp: string
  likeCount: number | null
  commentsCount: number | null
  category?: "promos" | "training" | "behind-the-scenes"
  duration?: string
  commentsList?: Array<{ user: string; text: string }>
  platform?: "instagram" | "tiktok" | "youtube"
}

export type InstagramFeedPayload = {
  handle: string
  profileUrl: string
  reels: InstagramReel[]
}

type InstagramMediaResponse = {
  data?: Array<{
    id: string
    caption?: string
    permalink?: string
    media_type?: string
    media_product_type?: string
    media_url?: string
    thumbnail_url?: string
    timestamp?: string
    like_count?: number
    comments_count?: number
  }>
}

type InstagramWebProfileResponse = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: Array<{
          node?: {
            id?: string
            shortcode?: string
            is_video?: boolean
            display_url?: string
            thumbnail_src?: string
            taken_at_timestamp?: number
            __typename?: string
            edge_liked_by?: {
              count?: number
            }
            edge_media_preview_like?: {
              count?: number
            }
            edge_media_to_caption?: {
              edges?: Array<{
                node?: {
                  text?: string
                }
              }>
            }
          }
        }>
      }
    }
  }
}

const DEFAULT_HANDLE = "nextupboxingleague"
const GRAPH_API_VERSION = "v23.0"

function getInstagramConfig() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim() || ""
  const businessAccountId =
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim() || ""
  const handle = process.env.INSTAGRAM_HANDLE?.trim() || DEFAULT_HANDLE

  return {
    accessToken,
    businessAccountId,
    handle,
    profileUrl: `https://www.instagram.com/${handle}/`,
  }
}

export function getInstagramPublicConfig() {
  const { handle, profileUrl } = getInstagramConfig()
  return { handle, profileUrl }
}

async function fetchInstagramPublicFeed(
  limit = 12
): Promise<InstagramFeedPayload> {
  const { handle, profileUrl } = getInstagramConfig()

  const response = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(handle)}`,
    {
      headers: {
        "x-ig-app-id": "936619743392459",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 },
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to load Instagram public profile (${response.status}): ${errorText}`
    )
  }

  const payload = (await response.json()) as InstagramWebProfileResponse
  const edges =
    payload.data?.user?.edge_owner_to_timeline_media?.edges?.slice(0, limit) ||
    []

  const reels = edges
    .map((edge): InstagramReel | null => {
      const node = edge.node

      if (!node?.id || !node.shortcode) {
        return null
      }

      const caption =
        node.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() || ""
      const likeCount =
        typeof node.edge_liked_by?.count === "number"
          ? node.edge_liked_by.count
          : typeof node.edge_media_preview_like?.count === "number"
            ? node.edge_media_preview_like.count
            : null
      const timestamp =
        typeof node.taken_at_timestamp === "number"
          ? new Date(node.taken_at_timestamp * 1000).toISOString()
          : ""
      const permalinkPath = node.__typename === "GraphVideo" ? "reel" : "p"

      return {
        id: node.id,
        caption,
        permalink: `https://www.instagram.com/${permalinkPath}/${node.shortcode}/`,
        mediaType: node.is_video ? "VIDEO" : "IMAGE",
        mediaUrl: node.display_url || node.thumbnail_src || null,
        thumbnailUrl: node.thumbnail_src || node.display_url || null,
        timestamp,
        likeCount,
        commentsCount: null,
      }
    })
    .filter((item): item is InstagramReel => Boolean(item))

  return {
    handle,
    profileUrl,
    reels,
  }
}

export async function fetchInstagramReels(
  limit = 12
): Promise<InstagramFeedPayload> {
  const { accessToken, businessAccountId, handle, profileUrl } =
    getInstagramConfig()

  // Log configuration state for debugging if configured, but do not make any network requests.
  if (accessToken || businessAccountId) {
    console.log("Instagram API configurations are present but bypassed to fetch mock reels.")
  }

  // Pre-configured mock data representing reels with royalty-free video URLs for autoplay
  const mockReels: InstagramReel[] = [
    {
      id: "reel-1",
      caption: "STILL HUNGRY. ⚡️ @marcus_steel gears up for the main event on June 6. Six weeks of relentless camp boils down to one night. Are you ready? #NextUpBoxing #FightCamp #MainEvent #BoxerLife",
      permalink: `https://www.instagram.com/${handle}/`,
      mediaType: "VIDEO",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-training-with-a-punching-bag-40232-large.mp4",
      thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-training-with-a-punching-bag-40232-large.mp4",
      timestamp: "2026-05-18T18:00:00Z",
      likeCount: 4820,
      commentsCount: 142,
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
      permalink: `https://www.instagram.com/${handle}/`,
      mediaType: "VIDEO",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-boxer-wrapped-in-bandages-40225-large.mp4",
      thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-boxer-wrapped-in-bandages-40225-large.mp4",
      timestamp: "2026-05-17T12:00:00Z",
      likeCount: 3120,
      commentsCount: 89,
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
      permalink: `https://www.instagram.com/${handle}/`,
      mediaType: "VIDEO",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-boxer-training-in-the-gym-40228-large.mp4",
      thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-female-boxer-training-in-the-gym-40228-large.mp4",
      timestamp: "2026-05-15T09:30:00Z",
      likeCount: 5410,
      commentsCount: 204,
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
      permalink: `https://www.instagram.com/${handle}/`,
      mediaType: "VIDEO",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-hitting-a-punching-bag-40224-large.mp4",
      thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-hitting-a-punching-bag-40224-large.mp4",
      timestamp: "2026-05-14T20:15:00Z",
      likeCount: 7120,
      commentsCount: 315,
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
      permalink: `https://www.instagram.com/${handle}/`,
      mediaType: "VIDEO",
      mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-guy-doing-shadow-boxing-in-the-gym-40229-large.mp4",
      thumbnailUrl: "https://assets.mixkit.co/videos/preview/mixkit-boxer-guy-doing-shadow-boxing-in-the-gym-40229-large.mp4",
      timestamp: "2026-05-12T14:40:00Z",
      likeCount: 2890,
      commentsCount: 95,
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

  return {
    handle,
    profileUrl,
    reels: mockReels.slice(0, limit),
  }
}
