import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { VideoScrollSection } from "@/components/VideoScrollSection"
import { ChampionsSection } from "@/components/ChampionsSection"
import { YoutubeSection } from "@/components/YoutubeSection"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"
import { NextUpLiveStream } from "@/components/NextUpLiveStream"
import { JsonLd } from "@/components/JsonLd"

const SocialWall = dynamic(() => import("@/components/SocialWall").then((mod) => mod.SocialWall))
const MagazineSection = dynamic(() => import("@/components/magazine/magaine-section").then((mod) => mod.MagazineSection))

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  // title.default in layout.tsx handles the root title; this keeps it clean.
  title: "Next Up Boxing League — Showcasing Elite Amateurs™",
  description:
    "Live amateur boxing events on Long Island. Watch Fight Night XI live — upcoming bouts, fighter rankings, and champion history. Next Up Boxing League.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Next Up Boxing League — Fight Night XI",
    description:
      "Strong Island Fight Night 11 — June 6, 2026 at Stereo Garden, Patchogue NY. Watch live or get your tickets now.",
    url: "/",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: "Strong Island Fight Night 11",
            sport: "Boxing",
            startDate: "2026-06-06T19:00:00-04:00",
            url: `${siteUrl}/events`,
            image: `${siteUrl}/event-poster.png`,
            description:
              "Next Up Boxing League presents Strong Island Fight Night 11, featuring elite amateur boxers competing across multiple weight divisions.",
            organizer: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: "Next Up Boxing League",
            },
            location: {
              "@type": "Place",
              name: "Stereo Garden",
              address: {
                "@type": "PostalAddress",
                streetAddress: "9 Railroad Ave",
                addressLocality: "Patchogue",
                addressRegion: "NY",
                postalCode: "11772",
                addressCountry: "US",
              },
            },
            offers: {
              "@type": "Offer",
              url: "https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611",
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
            },
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          },
        ]}
      />
      <Navbar />
      <HeroSection />
      <VideoScrollSection />
      <NextUpLiveStream />
      <ChampionsSection />
      <SocialWall /> 
      <YoutubeSection />
      <SponsorsStrip />
      <MagazineSection />
      <Footer />
    </main>
  )
}

