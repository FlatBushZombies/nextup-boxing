import { NextResponse } from "next/server"

import {
  fetchInstagramReels,
  getInstagramPublicConfig,
} from "@/lib/instagram"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await fetchInstagramReels()
    return NextResponse.json(payload)
  } catch (error) {
    console.error("Failed to load Instagram reels:", error)

    const { handle, profileUrl } = getInstagramPublicConfig()

    return NextResponse.json(
      {
        handle,
        profileUrl,
        reels: [],
        error: "We couldn't load the latest Instagram feed right now.",
      },
      { status: 500 }
    )
  }
}
