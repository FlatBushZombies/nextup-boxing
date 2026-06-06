import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ChampionsSection } from "@/components/ChampionsSection"
import { YoutubeSection } from "@/components/YoutubeSection"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"
import { SocialWall } from "@/components/SocialWall"
import { NextUpLiveStream } from "@/components/NextUpLiveStream"

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />
      <HeroSection />
      <NextUpLiveStream />
      <ChampionsSection />
      { /* <SocialWall /> */ }
      <YoutubeSection />
      <SponsorsStrip />
      <Footer />
    </main>
  )
}

