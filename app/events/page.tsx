"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Calendar, MapPin, Tv, Ticket, Play, Mail, Check } from "lucide-react"
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
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#05070f] text-white">
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[70vh] pt-32 pb-16 flex items-center bg-gradient-to-r from-[#03050a] via-[#05070f] to-[#0a0e1a] overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-accent/15 rounded-full blur-[140px] opacity-75" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] opacity-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 text-left max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white font-display">
                LIVE COVERAGE
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-wide leading-none font-display mb-4">
              RODRIGUEZ
              <span className="block text-secondary text-4xl sm:text-5xl my-1">VS</span>
              WILLIAMS
            </h1>

            <p className="text-sm sm:text-base font-black uppercase tracking-[0.15em] text-white font-display mb-6">
              OFFICIAL WEIGH-IN CEREMONY
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/75 text-xs font-bold uppercase tracking-wider font-sans mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>JUNE 28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>HARARE ARENA</span>
              </div>
            </div>

            {/* Split Watch Live Button */}
            <div className="flex items-stretch">
              <a
                href="#watch-live"
                className="bg-accent hover:bg-accent-dark text-white font-black tracking-widest text-xs uppercase px-8 py-4 flex items-center transition-colors duration-300 font-display cursor-pointer"
              >
                WATCH LIVE
              </a>
              <div className="bg-accent-dark px-4 flex items-center justify-center border-l border-white/10">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Right Glove Image */}
          <div className="relative w-full md:w-[48%] aspect-[1.1] md:aspect-[1.2] shrink-0 self-end overflow-hidden flex justify-end">
            <div className="relative w-[90%] h-full">
              <Image
                src="/broadcast-scene.png"
                alt="Boxing Glove Hero Visual"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain object-bottom filter brightness-110 drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05070f] to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS / THE ROAD AHEAD */}
      <section className="bg-white text-ink py-16 sm:py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b-4 border-ink pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-secondary mb-1.5 block font-display">
                UPCOMING EVENTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-ink leading-none font-display">
                THE ROAD AHEAD
              </h2>
            </div>
            <button className="flex items-center gap-1 font-display text-xs font-black tracking-widest text-accent uppercase hover:text-accent-dark transition-colors cursor-pointer">
              <span>VIEW ALL EVENTS</span>
              <Play className="w-3 h-3 fill-accent stroke-none" />
            </button>
          </div>

          {/* 3 Columns Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="group relative aspect-[1.3] overflow-hidden bg-slate-900 border border-ink/5"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-103 filter grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.8]"
                />
                {/* Gradient shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Date tag in top-left */}
                <div className="absolute top-4 left-4 bg-black/60 border border-white/10 px-3 py-1 text-center flex flex-col skew-x-[-10deg] z-20">
                  <span className="skew-x-[10deg] block font-display text-[9px] font-bold text-secondary">{event.month}</span>
                  <span className="skew-x-[10deg] block font-display text-base font-black text-white leading-none">{event.day}</span>
                </div>

                {/* Card details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-20">
                  {(() => {
                    const parts = event.title.split(/\s+VS\s+/i)
                    if (parts.length === 2) {
                      return (
                        <h3 className="font-display font-black text-2xl sm:text-3xl leading-[0.9] text-white uppercase mb-2 tracking-wide">
                          <div>{parts[0]}</div>
                          <div className="text-[11px] font-black text-secondary tracking-widest my-0.5">VS</div>
                          <div>{parts[1]}</div>
                        </h3>
                      )
                    }
                    return (
                      <h3 className="text-xl sm:text-2xl font-black uppercase leading-none text-white font-display tracking-wider mb-2">
                        {event.title}
                      </h3>
                    )
                  })()}

                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50 block font-display mb-3">
                    {event.category}
                  </span>
                  
                  <a
                    href="#tickets"
                    className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-accent hover:text-white transition-colors duration-300 font-display"
                  >
                    <span>TICKETS →</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE STORY / RODRIGUEZ READY FOR TITLE OPPORTUNITY */}
      <section className="bg-[#05070f] py-16 sm:py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
          {/* Left Text */}
          <div className="flex-1 flex flex-col justify-center items-start text-left">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-secondary mb-3 block font-display">
              FEATURE STORY
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.92] text-white font-display tracking-wide mb-4">
              RODRIGUEZ READY
              <span className="block">FOR TITLE OPPORTUNITY</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[48ch] font-sans">
              Undefeated heavyweight contender Jeremy Rodriguez prepares for the biggest fight of his career.
            </p>
            <button className="border border-white bg-transparent text-white font-black tracking-widest text-xs uppercase px-8 py-3.5 hover:bg-white hover:text-[#05070f] transition-all duration-300 font-display cursor-pointer">
              <span>READ STORY</span>
            </button>
          </div>

          {/* Right image banner */}
          <div className="flex-1 relative aspect-[1.7] overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src="/boxer-shadow.png"
              alt="Fighter training visual"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center filter brightness-90"
            />
            {/* Dark overlay gradients */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070f] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070f] to-transparent" />
            
            {/* Carousel dashes */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              <span className="w-4 h-1 bg-secondary" />
              <span className="w-4 h-1 bg-white/20" />
              <span className="w-4 h-1 bg-white/20" />
              <span className="w-4 h-1 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP RANKED / HEAVYWEIGHT DIVISION */}
      <section className="bg-white text-ink py-16 sm:py-20 border-t border-ink/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b-4 border-ink pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-secondary mb-1.5 block font-display">
                TOP RANKED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-ink leading-none font-display">
                HEAVYWEIGHT DIVISION
              </h2>
            </div>
            <button className="flex items-center gap-1 font-display text-xs font-black tracking-widest text-accent uppercase hover:text-accent-dark transition-colors cursor-pointer">
              <span>FULL RANKINGS →</span>
            </button>
          </div>

          {/* 5 Cards side by side */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topRankedHeavyweights.map((fighter) => (
              <div
                key={fighter.name}
                className="group relative aspect-[3/4] overflow-hidden bg-slate-900 border border-ink/5"
              >
                <Image
                  src={fighter.image}
                  alt={fighter.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Gold rank indicator in top-left */}
                <div className="absolute top-3 left-3 w-6 h-6 bg-secondary flex items-center justify-center font-display font-black text-xs text-ink shadow-md">
                  {fighter.rank}
                </div>

                {/* Card text details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="text-base font-black uppercase leading-none text-white font-display tracking-wider mb-1">
                    {fighter.name}
                  </h3>
                  <span className="text-xs font-bold font-mono text-secondary">{fighter.record}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIVE & ON DEMAND / WATCH LIVE ANYWHERE */}
      <section className="bg-[#05070f] py-16 sm:py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-12">
          {/* Left info */}
          <div className="flex-1 flex flex-col justify-center items-start text-left">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-secondary mb-3 block font-display">
              LIVE & ON DEMAND
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none text-white font-display tracking-wide mb-4">
              WATCH LIVE ANYWHERE
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[48ch] font-sans">
              Stream every fight live or on demand. Never miss a moment.
            </p>
            {/* Split Watch Live Button */}
            <div className="flex items-stretch">
              <a
                href="#browse-tv"
                className="bg-accent hover:bg-accent-dark text-white font-black tracking-widest text-xs uppercase px-8 py-4 flex items-center transition-colors duration-300 font-display cursor-pointer"
              >
                BROWSE TV
              </a>
              <div className="bg-accent-dark px-4 flex items-center justify-center border-l border-white/10">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Right image with play button overlay */}
          <div className="flex-1 relative aspect-[1.7] overflow-hidden border border-white/5 shadow-2xl group cursor-pointer bg-black">
            <Image
              src="/broadcast-scene.png"
              alt="Two fighters boxing live visual"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center filter brightness-90 opacity-90 transition-transform duration-700 group-hover:scale-102"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 border-2 border-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER / STAY IN THE RING */}
      <section className="bg-white text-ink py-16 border-t border-ink/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text info */}
          <div className="flex-1 text-left max-w-lg">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-secondary mb-2 block font-display">
              STAY IN THE RING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide text-ink font-display leading-none mb-3">
              NEWS & UPDATES
            </h2>
            <p className="text-ink/65 text-sm font-sans leading-relaxed">
              Get the latest fight announcements, exclusive interviews, and breaking news.
            </p>
          </div>

          {/* Right newsletter input and social icons */}
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-6 justify-end">
            {subscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-500/20 text-emerald-800 text-sm font-semibold w-full max-w-sm text-center">
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
                  className="flex-1 px-4 py-3 border border-ink/20 focus:outline-none focus:border-accent font-sans text-sm text-ink placeholder-ink/40 bg-white"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white font-black tracking-widest text-xs uppercase px-6 py-3.5 transition-colors duration-300 font-display cursor-pointer"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}

            {/* Social Icons column */}
            <div className="flex flex-col items-center sm:items-start shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-ink/40 font-display mb-2">
                FOLLOW US
              </span>
              <div className="flex items-center gap-3">
                <a href="#insta" aria-label="Instagram" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#twitter" aria-label="Twitter" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="currentColor"></polygon></svg>
                </a>
                <a href="#fb" aria-label="Facebook" className="w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
