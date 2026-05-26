import { NextResponse, NextRequest } from "next/server"

import { fetchYoutubeFeed } from "@/lib/youtube"

// Default to the event's Strong Island Fight Night channel
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Check if user is in New York based on Vercel's geo headers
function isUserInNewYork(request: NextRequest): boolean {
  const region = request.headers.get("x-vercel-ip-country-region") || ""
  const city = request.headers.get("x-vercel-ip-city") || ""
  
  // Check for New York state code (NY) or common NY cities
  const nyRegions = ["NY"]
  const nyCities = ["new york", "brooklyn", "manhattan", "queens", "bronx", "staten island", "buffalo", "rochester", "yonkers", "syracuse", "albany"]
  
  const isNYRegion = nyRegions.includes(region.toUpperCase())
  const isNYCity = nyCities.some(c => city.toLowerCase().includes(c))
  
  return isNYRegion || isNYCity
}

export async function GET(request: NextRequest) {
  try {
    const payload = await fetchYoutubeFeed()
    const isNY = isUserInNewYork(request)
    
    return NextResponse.json({
      ...payload,
      isNewYorkUser: isNY,
      ticketPurchaseUrl: process.env.TICKET_PURCHASE_URL || "https://tickets.example.com",
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
        ticketPurchaseUrl: process.env.TICKET_PURCHASE_URL || "https://tickets.example.com",
        error: "We couldn't load the latest uploads right now.",
      },
      { status: 503 }
    )
  }
}
