"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { Calendar, MapPin, Play, Check } from "lucide-react"
import Image from "next/image"

const upcomingEvents = [
  {
    month: "JUL",
    day: "18",
    title: "MARTINEZ VS DAVIS",
    category: "HEAVYWEIGHT CHAMPIONSHIP",
    image: "/fighter-1.png",
  },
  {
    month: "AUG",
    day: "09",
    title: "SMITH VS JOHNSON",
    category: "WBC WORLD TITLE",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    month: "SEP",
    day: "20",
    title: "LOPEZ VS ANDERSON",
    category: "WBO INTERIM TITLE",
    image: "/fighter-2.png",
  },
]

const topRankedHeavyweights = [
  { rank: 1, name: "JEREMY RODRIGUEZ", record: "14-0-0", image: "/fighter-1.png" },
  { rank: 2, name: "MICHAEL SMITH", record: "22-1-0", image: "/fighter-2.png" },
  { rank: 3, name: "DERRICK MARTIN", record: "19-2-0", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
  { rank: 4, name: "ALEXANDER PETROV", record: "18-3-0", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
  { rank: 5, name: "JASON WILLIAMS", record: "17-2-0", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
]

export default function EventsPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* 1. HERO HEADER */}
      <section className="relative min-h-[70vh] pt-32 pb-16 flex items-center bg-[#111111] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <Reveal as="fade-up" className="flex-1 text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="pulse-glow h-2 w-2 rounded-full bg-white" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white">
                Live Coverage
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-[76px] uppercase tracking-wide leading-[0.95] font-display mb-4 text-[var(--gold-light)]">
              Rodriguez
              <span className="block text-3xl sm:text-4xl my-1 text-[var(--crimson-light)]">vs</span>
              <span className="text-[var(--crimson-light)]">Williams</span>
            </h1>

            <p className="text-sm sm:text-base font-medium uppercase tracking-[0.15em] text-white/70 mb-6">
              Official Weigh-In Ceremony
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-medium uppercase tracking-wide mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>June 28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>MSG Arena</span>
              </div>
            </div>

            <a
              href="#watch-live"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold-light)] px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-gold"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Live
            </a>
          </Reveal>

          {/* Right Image */}
          <Reveal as="fade-in" delay={120} className="relative w-full md:w-[48%] aspect-[1.1] md:aspect-[1.2] shrink-0 self-end overflow-hidden flex justify-end">
            <div className="relative w-[90%] h-full">
              <Image
                src="/broadcast-scene.png"
                alt="Boxing Glove Hero Visual"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111111] to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS / THE ROAD AHEAD */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-1.5 block">
                Upcoming Events
              </span>
              <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold">
                The Road Ahead
              </h2>
            </div>
            <a href="/events" className="flex items-center gap-1 text-xs font-medium tracking-wide text-[#111111] uppercase hover:text-[#707072] transition-colors">
              View All Events
            </a>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event, index) => (
              <Reveal key={event.title} as="fade-up" delay={index * 60}>
                <div className="boxer-card-mr aspect-[1.3]">
                  <div className="image-wrap">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-top"
                    />
                    <div className="gradient-overlay" />
                  </div>

                  {/* Date tag */}
                  <div className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-center z-10">
                    <span className="block text-[10px] font-medium uppercase tracking-wide text-[#111111]">
                      {event.month} {event.day}
                    </span>
                  </div>

                  <div className="card-text">
                    <h2>{event.title}</h2>
                    <div className="flex items-center gap-3">
                      <span className="weight-cat">{event.category}</span>
                      <a href="#tickets" className="text-xs font-medium uppercase tracking-wide text-white underline">
                        Tickets
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE STORY */}
      <section className="bg-[#111111] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
          {/* Left Text */}
          <Reveal as="fade-up" className="flex-1 flex flex-col justify-center items-start text-left">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-3 block">
              Feature Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium uppercase leading-[1.1] text-white tracking-wide mb-4">
              Rodriguez Ready
              <span className="block">For Title Opportunity</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[48ch]">
              Undefeated heavyweight contender Jeremy Rodriguez prepares for the biggest fight of his career.
            </p>
            <button className="rounded-full border border-white text-white text-xs font-medium uppercase tracking-wide px-8 py-3.5 transition-colors hover:bg-white hover:text-[#111111]">
              Read Story
            </button>
          </Reveal>

          {/* Right image */}
          <Reveal as="fade-in" delay={120} className="flex-1 relative aspect-[1.7] overflow-hidden border border-white/10">
            <Image
              src="/boxer-shadow.png"
              alt="Fighter training visual"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111111] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111111] to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* 4. TOP RANKED / HEAVYWEIGHT DIVISION */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-1.5 block">
                Top Ranked
              </span>
              <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold">
                Heavyweight Division
              </h2>
            </div>
            <a href="/rankings" className="flex items-center gap-1 text-xs font-medium tracking-wide text-[#111111] uppercase hover:text-[#707072] transition-colors">
              Full Rankings
            </a>
          </Reveal>

          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {topRankedHeavyweights.map((fighter, index) => (
              <Reveal key={fighter.name} as="fade-up" delay={index * 60}>
                <div className="boxer-card-mr aspect-[3/4]">
                  <div className="image-wrap">
                    <Image
                      src={fighter.image}
                      alt={fighter.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 33vw"
                      className="object-cover object-top"
                    />
                    <div className="gradient-overlay" />
                  </div>

                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-[#111111] z-10">
                    {fighter.rank}
                  </div>

                  <div className="card-text">
                    <h2>{fighter.name}</h2>
                    <span className="weight-cat font-mono">{fighter.record}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIVE & ON DEMAND */}
      <section className="bg-[#111111] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
          {/* Left info */}
          <Reveal as="fade-up" className="flex-1 flex flex-col justify-center items-start text-left">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-3 block">
              Live &amp; On Demand
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium uppercase leading-[1.1] text-white tracking-wide mb-4">
              Watch Live Anywhere
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[48ch]">
              Stream every fight live or on demand. Never miss a moment.
            </p>
            <a
              href="#browse-tv"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-[#e5e5e5]"
            >
              Browse TV
            </a>
          </Reveal>

          {/* Right image with play button overlay */}
          <Reveal as="fade-in" delay={120} className="flex-1 relative aspect-[1.7] overflow-hidden border border-white/10 group cursor-pointer">
            <Image
              src="/broadcast-scene.png"
              alt="Two fighters boxing live visual"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-400 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 border border-white rounded-full flex items-center justify-center transition-colors duration-200">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. NEWSLETTER */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text */}
          <Reveal as="fade-up" className="flex-1 text-left max-w-lg">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-2 block">
              Stay In The Ring
            </span>
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-crimson mb-3">
              News &amp; Updates
            </h2>
            <p className="text-[#707072] text-sm leading-relaxed">
              Get the latest fight announcements, exclusive interviews, and breaking news.
            </p>
          </Reveal>

          {/* Right newsletter input and social icons */}
          <Reveal as="fade-up" delay={80} className="flex-1 w-full flex flex-col sm:flex-row items-center gap-6 justify-end">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 p-4 border border-[#e5e5e5] bg-[#f5f5f5] text-[#111111] text-sm font-medium w-full max-w-sm text-center rounded-[24px]">
                <Check className="w-4 h-4" />
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-sm flex items-stretch gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-[#e5e5e5] focus:outline-none focus:border-[#707072] text-sm text-[#111111] placeholder-[#9e9ea0] bg-white rounded-[24px]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#111111] text-white text-xs font-medium uppercase tracking-wide px-6 py-3.5 transition-colors hover:bg-[#1a1a1a]"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9e9ea0] mb-2">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/nextupboxingleague/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#111111] hover:border-[#111111] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><circle cx="12" cy="12" r="4.4"></circle><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle></svg>
                </a>
                <a href="https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#111111] hover:border-[#111111] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="currentColor" stroke="none"></polygon></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61590315922265" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full border border-[#e5e5e5] flex items-center justify-center text-[#111111] hover:border-[#111111] transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
