import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { AboutClub } from "@/components/AboutClub"
import { TrainingPrograms } from "@/components/TrainingPrograms"
import { FeaturedFighters } from "@/components/FeaturedFighters"
import { ClubAchievements } from "@/components/ClubAchievements"
import { ScheduleClasses } from "@/components/ScheduleClasses"
import { UpcomingEvents } from "@/components/UpcomingEvents"
import { Merchandise } from "@/components/Merchandise"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { NewsArticles } from "@/components/NewsArticles"
import { MembershipCTA } from "@/components/MembershipCTA"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-white">
      {/* 1. Hero — Cinematic full-viewport, Forging Tomorrow's Champions */}
      <HeroSection />

      {/* Fixed navbar — appears after hero scroll */}
      <Navbar />

      {/* 2. About the Club — Editorial split layout */}
      <AboutClub />

      {/* 3. Training Programs — 4 premium program cards, dark section */}
      <TrainingPrograms />

      {/* 4. Featured Fighters — Athlete profile cards, white section */}
      <FeaturedFighters />

      {/* 5. Club Rankings & Achievements — dark section with timeline */}
      <ClubAchievements />

      {/* 6. Schedule & Classes — weekly timetable, white section */}
      <ScheduleClasses />

      {/* 7. Upcoming Events — secondary section, white */}
      <UpcomingEvents />

      {/* 8. Merchandise — dark section, product grid */}
      <Merchandise />

      {/* 9. News & Articles — magazine-style cards, white section */}
      <NewsArticles />

      {/* 10. Membership CTA — pricing tiers + email strip */}
      <MembershipCTA />

      {/* 11. Sponsors & Partners — dual marquee ticker, dark section */}
      <SponsorsStrip />

      {/* 12. Footer — editorial masthead */}
      <Footer />
    </main>
  )
}
