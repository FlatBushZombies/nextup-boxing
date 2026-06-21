import dynamic from "next/dynamic"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ChampionsSection } from "@/components/ChampionsSection"
import { YoutubeSection } from "@/components/YoutubeSection"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"
import { NextUpLiveStream } from "@/components/NextUpLiveStream"

const SocialWall = dynamic(() => import("@/components/SocialWall").then((mod) => mod.SocialWall))
const MagazineSection = dynamic(() => import("@/components/magazine/magaine-section").then((mod) => mod.MagazineSection))

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />
      <HeroSection />
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

