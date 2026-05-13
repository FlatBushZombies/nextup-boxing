import { SplashSection } from "@/components/SplashSection"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { EventBanner } from "@/components/EventBanner"
import { LiveStreamPromo } from "@/components/LiveStreamPromo"
import { YoutubeSection } from "@/components/YoutubeSection"
import { Rankings } from "@/components/Rankings"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"
import { MagazineSection } from "@/components/magazine/magaine-section"
import { SocialWall } from "@/components/SocialWall"

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <EventBanner />
      <LiveStreamPromo />
      <YoutubeSection />
      <MagazineSection />
      <SocialWall />
      <Rankings />
      <SponsorsStrip />
      <Footer />
    </main>
  )
}

