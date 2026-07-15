import { NextResponse, NextRequest } from "next/server"

import { fetchYoutubeFeed } from "@/lib/youtube"

// Default to the event's Strong Island Fight Night channel
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A"
const DEFAULT_TICKET_PURCHASE_URL = "https://strongislandfights.com"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Check if user is in New York based on Vercel's geo headers
function isUserInNewYork(request: NextRequest): boolean {
  const normalizeHeader = (value: string | null) => {
    if (!value) return ""

    try {
      return decodeURIComponent(value).toLowerCase()
    } catch {
      return value.toLowerCase()
    }
  }

  const region = normalizeHeader(
    request.headers.get("x-vercel-ip-country-region") ||
      request.headers.get("x-vercel-ip-region") ||
      request.headers.get("cf-ipregion") ||
      request.headers.get("x-region")
  )
  const city = normalizeHeader(
    request.headers.get("x-vercel-ip-city") ||
      request.headers.get("cf-ipcity") ||
      request.headers.get("x-city")
  )
  
  // Check for New York state code (NY) or common NY cities
  const nyRegions = ["ny", "new york"]
  const nyCities = ["new york", "brooklyn", "manhattan", "queens", "bronx", "staten island", "buffalo", "rochester", "yonkers", "syracuse", "albany"]
  
  const isNYRegion = nyRegions.includes(region)
  const isNYCity = nyCities.some(c => city.includes(c))
  
  return isNYRegion || isNYCity
}

export async function GET(request: NextRequest) {
  try {
    const payload = await fetchYoutubeFeed()
    const isNY = isUserInNewYork(request)
    const hasRestrictedLiveStream = isNY && Boolean(payload.liveStream)

    return NextResponse.json({
      ...payload,
      liveStream: isNY || Boolean(payload.blockedBySignInGate) ? null : payload.liveStream,
      isNewYorkUser: isNY,
      hasRestrictedLiveStream,
      blockedBySignInGate: Boolean(payload.blockedBySignInGate),
      ticketPurchaseUrl: process.env.TICKET_PURCHASE_URL || DEFAULT_TICKET_PURCHASE_URL,
    })
  } catch (error) {
    console.error("Failed to load YouTube feed:", error)

    const channelUrl = process.env.YOUTUBE_CHANNEL_URL?.trim() || DEFAULT_CHANNEL_URL
    const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || null

    return NextResponse.json(
      {
        channelUrl,
        channelId,
        playlistId: channelId?.startsWith("UC") ? `UU${channelId.slice(2)}` : null,
        videos: [],
        liveStream: null,
        isNewYorkUser: isUserInNewYork(request),
        hasRestrictedLiveStream: false,
        blockedBySignInGate: false,
        ticketPurchaseUrl: process.env.TICKET_PURCHASE_URL || DEFAULT_TICKET_PURCHASE_URL,
        error: "We couldn't load the latest uploads right now.",
      },
      { status: 503 }
    )
  }
}
