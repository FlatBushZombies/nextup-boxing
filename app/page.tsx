import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { EventsSection } from "@/components/EventsSection"
import { ChampionsSection } from "@/components/ChampionsSection"
import { EventBanner } from "@/components/EventBanner"
import { LiveStreamPromo } from "@/components/LiveStreamPromo"
import { YoutubeSection } from "@/components/YoutubeSection"
import { Rankings } from "@/components/Rankings"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { Footer } from "@/components/Footer"
import { MagazineSection } from "@/components/magazine/magaine-section"
import { SocialWall } from "@/components/SocialWall"
import { ScrollReveal } from "@/components/ScrollReveal"

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <ChampionsSection />
      <LiveStreamPromo />
      <ScrollReveal delay={0.04}>
        <YoutubeSection />
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <MagazineSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <SocialWall />
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <Rankings />
      </ScrollReveal>
      <ScrollReveal delay={0.14}>
        <SponsorsStrip />
      </ScrollReveal>
      <ScrollReveal delay={0.16}>
        <Footer />
      </ScrollReveal>
    </main>
  )
}

