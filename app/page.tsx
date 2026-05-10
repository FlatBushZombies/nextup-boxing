import { SplashSection } from "@/components/SplashSection"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { EventBanner } from "@/components/EventBanner"
import { LiveStreamPromo } from "@/components/LiveStreamPromo"
import { Rankings } from "@/components/Rankings"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <EventBanner />
      <LiveStreamPromo />
      <Rankings />
      <SponsorsStrip />
      <Footer />
    </main>
  )
}
