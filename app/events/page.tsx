"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { AnimatedLine } from "@/components/AnimatedLine"

type Tab = "upcoming" | "results"

const upcomingEvents = [
  {
    id: 1,
    date: "JUL 18, 2026",
    day: "Saturday",
    title: "Fight Night XII",
    main: "MARTINEZ VS DAVIS",
    venue: "Stereo Garden, Patchogue NY",
    division: "Heavyweight",
    image: "/fighter-1.png",
  },
  {
    id: 2,
    date: "AUG 9, 2026",
    day: "Saturday",
    title: "Fight Night XIII",
    main: "SMITH VS JOHNSON",
    venue: "Stereo Garden, Patchogue NY",
    division: "Cruiserweight",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    id: 3,
    date: "SEP 20, 2026",
    day: "Saturday",
    title: "Fight Night XIV",
    main: "LOPEZ VS ANDERSON",
    venue: "Stereo Garden, Patchogue NY",
    division: "Lightweight",
    image: "/fighter-2.png",
  },
]

const pastResults = [
  {
    event: "Fight Night XI",
    date: "Jun 6, 2026",
    venue: "Stereo Garden",
    bouts: [
      { winner: "Jeremy Rodriguez", loser: "Michael Smith", method: "TKO", round: "4", division: "Heavyweight" },
      { winner: "Bradley Belt", loser: "Jaden Harvey", method: "PTS", round: "10", division: "Cruiserweight" },
      { winner: "Kiamal Evelyn", loser: "Lopez Anderson", method: "UD", round: "8", division: "Lightweight" },
      { winner: "Arturo Acevedo", loser: "Marcus Gray", method: "KO", round: "3", division: "Welterweight" },
      { winner: "Naijalie Rodriguez", loser: "Lisa Chen", method: "SD", round: "8", division: "Super Featherweight" },
    ],
  },
  {
    event: "Fight Night X",
    date: "May 10, 2026",
    venue: "Stereo Garden",
    bouts: [
      { winner: "Xavier Wilcher", loser: "Leo Cruz", method: "UD", round: "10", division: "Cruiserweight" },
      { winner: "Carlos Mendoza", loser: "Kevin Torres", method: "MD", round: "12", division: "Middleweight" },
      { winner: "Dmitri Volkov", loser: "Reese Mistretta", method: "TKO", round: "7", division: "Light Heavyweight" },
      { winner: "Deon Brooks", loser: "Luis Reyes", method: "KO", round: "5", division: "Super Featherweight" },
    ],
  },
  {
    event: "Fight Night IX",
    date: "Apr 5, 2026",
    venue: "Stereo Garden",
    bouts: [
      { winner: "Jaden Harvey", loser: "Ivan Petrov", method: "UD", round: "10", division: "Light Heavyweight" },
      { winner: "Kiamal Evelyn", loser: "Ray Kim", method: "PTS", round: "8", division: "Lightweight" },
      { winner: "Darius Cole", loser: "James Parker", method: "TKO", round: "6", division: "Welterweight" },
    ],
  },
]

const methodColor: Record<string, string> = {
  KO: "text-crimson",
  TKO: "text-crimson",
  UD: "text-[#111111]",
  MD: "text-[#111111]",
  SD: "text-[#111111]",
  PTS: "text-[#111111]",
}

export default function EventsPage() {
  const [tab, setTab] = useState<Tab>("upcoming")

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* HEADER */}
      <section className="bg-[#111111] text-white pt-28 pb-0 border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="pt-8 pb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 block mb-3 font-sans">
              Next Up Boxing League
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl uppercase leading-none font-display mb-2">
              Events
            </h1>
            <p className="text-sm text-white/50 font-sans mt-3">
              Schedule · Results · Coverage
            </p>
          </Reveal>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-t border-[#222] mt-2">
            {(["upcoming", "results"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer border-b-2 font-sans ${
                  tab === t
                    ? "border-crimson text-white"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {t === "upcoming" ? "Upcoming" : "Results"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {tab === "upcoming" && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal as="slide-jab" className="mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9e9ea0] font-sans">
                Scheduled Fights
              </span>
            </Reveal>
            <AnimatedLine color="crimson" delay={80} className="mb-6" />

            <div className="space-y-0 border border-[#e5e5e5]">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.id} as="clip-up" delay={i * 80}>
                  <div className="flex flex-col sm:flex-row items-stretch border-b border-[#e5e5e5] last:border-b-0 group">
                    {/* Date Column */}
                    <div className="shrink-0 w-full sm:w-36 bg-[#f5f5f5] flex sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-2 px-5 py-5 sm:py-6">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] font-sans">
                        {event.day}
                      </span>
                      <span className="text-sm font-bold text-[#111111] font-sans">
                        {event.date}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative shrink-0 w-full sm:w-28 h-24 sm:h-auto bg-[#111111] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.main}
                        fill
                        sizes="(min-width: 640px) 112px, 100vw"
                        className="object-cover object-top opacity-80 group-hover:opacity-90 transition-opacity"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 px-6 py-5 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-crimson font-sans mb-1">
                        {event.title} · {event.division}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display uppercase leading-none text-[#111111] mb-2">
                        {event.main}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-[#707072] font-sans">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.venue}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="shrink-0 flex items-center px-6 py-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] hover:text-[#111111] transition-colors cursor-pointer font-sans">
                        Details →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PAST RESULTS */}
      {tab === "results" && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {pastResults.map((card, ci) => (
              <Reveal key={card.event} as="fade-up" delay={ci * 60}>
                <div>
                  {/* Event Header */}
                  <div className="pb-0 mb-0">
                    <div className="flex items-baseline gap-4 pb-3">
                      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#111111] font-sans">
                        {card.event}
                      </h2>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {card.date} · {card.venue}
                      </span>
                    </div>
                    <AnimatedLine color="steel" delay={ci * 60} />
                  </div>

                  {/* Bouts Table */}
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#e5e5e5]">
                        <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans">Winner</th>
                        <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans w-6 text-center"></th>
                        <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans">Loser</th>
                        <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans w-16 text-center hidden sm:table-cell">Method</th>
                        <th className="py-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans w-10 text-center hidden sm:table-cell">Rd</th>
                        <th className="py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e9ea0] font-sans hidden md:table-cell">Division</th>
                      </tr>
                    </thead>
                    <tbody>
                      {card.bouts.map((bout, bi) => (
                        <tr key={bi} className="border-b border-[#e5e5e5] last:border-b-0">
                          <td className="py-3.5 pr-4">
                            <span className="text-sm font-semibold text-[#111111] uppercase tracking-wide font-sans">
                              {bout.winner}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 text-center">
                            <span className="text-[10px] text-[#9e9ea0] font-sans">def.</span>
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className="text-sm text-[#707072] uppercase tracking-wide font-sans">
                              {bout.loser}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 text-center hidden sm:table-cell">
                            <span className={`text-xs font-bold font-sans ${methodColor[bout.method] ?? "text-[#111111]"}`}>
                              {bout.method}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 text-center hidden sm:table-cell">
                            <span className="text-xs text-[#9e9ea0] font-sans">{bout.round}</span>
                          </td>
                          <td className="py-3.5 hidden md:table-cell">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9e9ea0] font-sans">
                              {bout.division}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
