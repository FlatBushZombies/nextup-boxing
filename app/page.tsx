import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { AboutClub } from "@/components/AboutClub"
import { TrainingPrograms } from "@/components/TrainingPrograms"
import { FeaturedFighters } from "@/components/FeaturedFighters"
import { ClubAchievements } from "@/components/ClubAchievements"
import { UpcomingMatches } from "@/components/UpcomingMatches"
import { PreviousResults } from "@/components/PreviousResults"
import { ScheduleClasses } from "@/components/ScheduleClasses"
import { UpcomingEvents } from "@/components/UpcomingEvents"
import { Merchandise } from "@/components/Merchandise"
import { SponsorsStrip } from "@/components/SponsorsStrip"
import { NewsArticles } from "@/components/NewsArticles"
import { MembershipCTA } from "@/components/MembershipCTA"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      {/* Always-visible Ring Magazine-style navbar */}
      <Navbar />

      <main className="bg-white">
        {/* 1. Hero — Cinematic, Forging Tomorrow's Champions */}
        <HeroSection />

        {/* 2. About the Club — Editorial split layout */}
        <AboutClub />

        {/* 3. Training Programs — 4 program cards, dark section */}
        <TrainingPrograms />

        {/* 4. Featured Fighters — Athlete profiles, white section */}
        <FeaturedFighters />

        {/* 5. Club Rankings & Achievements — dark, timeline */}
        <ClubAchievements />

        {/* 6. Upcoming Matches — Ring Magazine fight card style */}
        <UpcomingMatches />

        {/* 7. Previous Results — tabular dark results section */}
        <PreviousResults />

        {/* 8. Schedule & Classes — weekly timetable */}
        <ScheduleClasses />

        {/* 9. Upcoming Events — event posters + countdown */}
        <UpcomingEvents />

        {/* 10. Merchandise — product grid, dark section */}
        <Merchandise />

        {/* 11. News & Articles — magazine-style cards */}
        <NewsArticles />

        {/* 12. Membership CTA — pricing tiers + email strip */}
        <MembershipCTA />

        {/* 13. Sponsors & Partners — dual marquee ticker */}
        <SponsorsStrip />

        {/* 14. Footer — editorial masthead */}
        <Footer />
      </main>
    </>
  )
}
