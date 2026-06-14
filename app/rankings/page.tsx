"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { Check } from "lucide-react"
import Image from "next/image"

const divisions = [
  "ALL DIVISIONS",
  "HEAVYWEIGHT",
  "CRUISERWEIGHT",
  "LIGHT HEAVYWEIGHT",
  "MIDDLEWEIGHT",
  "WELTERWEIGHT",
  "LIGHTWEIGHT",
  "SUPER FEATHERWEIGHT",
]

const championsData = [
  {
    division: "HEAVYWEIGHT",
    name: "JEREMY RODRIGUEZ",
    record: "14-0-0",
    image: "/fighter-1.png",
  },
  {
    division: "CRUISERWEIGHT",
    name: "TYLER JOHNSON",
    record: "21-2-0",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    division: "LIGHT HEAVYWEIGHT",
    name: "DMITRI VOLKOV",
    record: "18-1-0",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp",
  },
  {
    division: "MIDDLEWEIGHT",
    name: "CARLOS MENDOZA",
    record: "20-1-1",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp",
  },
  {
    division: "WELTERWEIGHT",
    name: "ISAAC BROWN",
    record: "22-0-0",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
  },
]

const p4pRankings = [
  { rank: 1, name: "JEREMY RODRIGUEZ", flag: "🇺🇸", record: "14-0-0", image: "/fighter-1.png" },
  { rank: 2, name: "TYLER JOHNSON", flag: "🇺🇸", record: "21-2-0", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
  { rank: 3, name: "DMITRI VOLKOV", flag: "🇷🇺", record: "18-1-0", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
  { rank: 4, name: "CARLOS MENDOZA", flag: "🇲🇽", record: "20-1-1", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
  { rank: 5, name: "ISAAC BROWN", flag: "🇺🇸", record: "22-0-0", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
]

const methodology = [
  {
    label: "FIGHT RESULTS",
    value: "40%",
    icon: (
      <svg className="w-8 h-8 text-white/60 mb-3 mx-auto md:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "OPPONENT QUALITY",
    value: "25%",
    icon: (
      <svg className="w-8 h-8 text-white/60 mb-3 mx-auto md:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    label: "ACTIVITY LEVEL",
    value: "15%",
    icon: (
      <svg className="w-8 h-8 text-white/60 mb-3 mx-auto md:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 7.54 16.59" />
        <path d="M19 12a7 7 0 0 0-7-7" />
        <path d="M12 9v3l2 2" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    label: "RECENCY",
    value: "10%",
    icon: (
      <svg className="w-8 h-8 text-white/60 mb-3 mx-auto md:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "TITLE STATUS",
    value: "10%",
    icon: (
      <svg className="w-8 h-8 text-white/60 mb-3 mx-auto md:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a4 4 0 0 0-4 4v6h8V6a4 4 0 0 0-4-4z" />
      </svg>
    ),
  },
]

const rankingData: Record<string, any> = {
  HEAVYWEIGHT: [
    { rank: 1, name: "JEREMY RODRIGUEZ", flag: "🇺🇸", country: "United States", record: "14-0-0", points: "1,250", lastFight: "W · May 24, 2026 vs Michael Smith", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "MICHAEL SMITH", flag: "🇬🇧", country: "United Kingdom", record: "22-1-0", points: "1,180", lastFight: "L · May 24, 2026 vs Jeremy Rodriguez", change: "—", image: "/fighter-2.png" },
    { rank: 3, name: "DERRICK MARTIN", flag: "🇨🇦", country: "Canada", record: "19-2-0", points: "1,050", lastFight: "W · May 10, 2026 vs Alexander Petrov", change: "↑ 1", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
    { rank: 4, name: "ALEXANDER PETROV", flag: "🇷🇺", country: "Russia", record: "18-3-0", points: "980", lastFight: "L · May 10, 2026 vs Derrick Martin", change: "↓ 1", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 5, name: "JASON WILLIAMS", flag: "🇺🇸", country: "United States", record: "17-2-0", points: "860", lastFight: "W · Apr 26, 2026 vs Lopez Anderson", change: "—", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
  ],
  CRUISERWEIGHT: [
    { rank: 1, name: "TYLER JOHNSON", flag: "🇺🇸", country: "United States", record: "21-2-0", points: "1,220", lastFight: "W · Apr 15, 2026 vs Dan Harrison", change: "—", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
    { rank: 2, name: "BRADLEY BELT", flag: "🇺🇸", country: "United States", record: "26-0-0", points: "1,190", lastFight: "W · Mar 20, 2026 vs James Cook", change: "—", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
    { rank: 3, name: "XAVIER WILCHER", flag: "🇺🇸", country: "United States", record: "28-1-0", points: "1,110", lastFight: "W · Feb 12, 2026 vs Leo Cruz", change: "↑ 2", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
    { rank: 4, name: "MARCUS STEEL", flag: "🇨🇦", country: "Canada", record: "15-2-0", points: "940", lastFight: "L · Feb 12, 2026 vs Xavier Wilcher", change: "↓ 1", image: "/fighter-1.png" },
    { rank: 5, name: "DANIEL HARRISON", flag: "🇬🇧", country: "United Kingdom", record: "19-3-0", points: "880", lastFight: "L · Apr 15, 2026 vs Tyler Johnson", change: "—", image: "/fighter-2.png" },
  ],
  "LIGHT HEAVYWEIGHT": [
    { rank: 1, name: "DMITRI VOLKOV", flag: "🇷🇺", country: "Russia", record: "18-1-0", points: "1,240", lastFight: "W · May 02, 2026 vs Reese Mistretta", change: "—", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
    { rank: 2, name: "REESE MISTRETTA", flag: "🇺🇸", country: "United States", record: "25-2-0", points: "1,160", lastFight: "L · May 02, 2026 vs Dmitri Volkov", change: "—", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
    { rank: 3, name: "VIKTOR DRAGO", flag: "🇺🇦", country: "Ukraine", record: "21-1-0", points: "1,070", lastFight: "W · Apr 10, 2026 vs Ivan Petrov", change: "—", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 4, name: "ANDRE WARD", flag: "🇺🇸", country: "United States", record: "32-0-0", points: "1,010", lastFight: "W · Nov 19, 2025 vs Sergey Kovalev", change: "—", image: "/fighter-1.png" },
    { rank: 5, name: "IVAN PETROV", flag: "🇷🇺", country: "Russia", record: "20-4-0", points: "850", lastFight: "L · Apr 10, 2026 vs Viktor Drago", change: "—", image: "/fighter-2.png" },
  ],
  MIDDLEWEIGHT: [
    { rank: 1, name: "CARLOS MENDOZA", flag: "🇲🇽", country: "Mexico", record: "20-1-1", points: "1,200", lastFight: "W · May 18, 2026 vs Kevin Torres", change: "—", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
    { rank: 2, name: "JADEN HARVEY", flag: "🇨🇦", country: "Canada", record: "22-2-0", points: "1,150", lastFight: "W · Apr 22, 2026 vs Leo Ortiz", change: "↑ 1", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 3, name: "KEVIN TORRES", flag: "🇺🇸", country: "United States", record: "24-1-0", points: "1,110", lastFight: "L · May 18, 2026 vs Carlos Mendoza", change: "↓ 1", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
    { rank: 4, name: "GENNADY GOLOVKIN", flag: "🇰🇿", country: "Kazakhstan", record: "42-2-1", points: "990", lastFight: "W · Sep 17, 2025 vs Ryota Murata", change: "—", image: "/fighter-1.png" },
    { rank: 5, name: "CANELO ALVAREZ", flag: "🇲🇽", country: "Mexico", record: "61-2-2", points: "950", lastFight: "W · May 04, 2026 vs Jaime Munguia", change: "—", image: "/fighter-2.png" },
  ],
  WELTERWEIGHT: [
    { rank: 1, name: "ISAAC BROWN", flag: "🇺🇸", country: "United States", record: "22-0-0", points: "1,280", lastFight: "W · May 30, 2026 vs Errol Spence", change: "—", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
    { rank: 2, name: "TERENCE CRAWFORD", flag: "🇺🇸", country: "United States", record: "40-0-0", points: "1,270", lastFight: "W · Jul 29, 2025 vs Errol Spence", change: "—", image: "/fighter-1.png" },
    { rank: 3, name: "ERROL SPENCE", flag: "🇺🇸", country: "United States", record: "28-2-0", points: "1,090", lastFight: "L · May 30, 2026 vs Isaac Brown", change: "—", image: "/fighter-2.png" },
    { rank: 4, name: "MANNY PACQUIAO", flag: "🇵🇭", country: "Philippines", record: "62-8-2", points: "960", lastFight: "L · Aug 21, 2024 vs Yordenis Ugas", change: "—", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
    { rank: 5, name: "FLOYD MAYWEATHER", flag: "🇺🇸", country: "United States", record: "50-0-0", points: "900", lastFight: "W · Aug 26, 2017 vs Conor McGregor", change: "—", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
  ],
}

// Populate other divisions with heavyweight data for fallback
const heavyweightRankings = rankingData.HEAVYWEIGHT
divisions.forEach((div) => {
  if (div !== "ALL DIVISIONS" && !rankingData[div]) {
    rankingData[div] = heavyweightRankings
  }
})

export default function RankingsPage() {
  const [activeDivision, setActiveDivision] = useState("ALL DIVISIONS")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const getTableData = () => {
    if (activeDivision === "ALL DIVISIONS") {
      return rankingData.HEAVYWEIGHT
    }
    return rankingData[activeDivision] || rankingData.HEAVYWEIGHT
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const tableData = getTableData()

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[60vh] pt-32 pb-16 flex items-center bg-[#111111] text-white overflow-hidden border-b border-[#e5e5e5]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <Reveal as="fade-up" className="flex-1 text-left max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-2 block">
              Official
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-[76px] uppercase tracking-wide leading-none font-display mb-4">
              RANKINGS
            </h1>
            <p className="text-base font-medium uppercase tracking-wide text-white mb-3">
              The Best. The Elite. The Next Up.
            </p>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-[46ch]">
              Explore the official Next Up Boxing League rankings across all weight divisions. Updated weekly.
            </p>
          </Reveal>

          <Reveal as="fade-in" delay={120} className="relative w-full md:w-[45%] aspect-[1.1] md:aspect-[1.15] shrink-0 self-end overflow-hidden flex justify-end">
            <div className="relative w-[85%] h-full">
              <Image
                src="/fighter-1.png"
                alt="Rankings Hero Fighter"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain object-bottom"
              />
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#e5e5e5] bg-[#111111] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-1">
              {divisions.map((div) => {
                const isActive = activeDivision === div
                return (
                  <button
                    key={div}
                    onClick={() => setActiveDivision(div)}
                    className={`whitespace-nowrap text-xs font-medium tracking-widest uppercase pb-1 border-b-2 transition-colors cursor-pointer ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-white/50 hover:text-white"
                    }`}
                  >
                    {div}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE SECTION */}
      <section className="bg-white text-[#111111] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold">
              {activeDivision === "ALL DIVISIONS" ? "Heavyweight Division" : `${activeDivision} Division`}
            </h2>
          </Reveal>

          <Reveal as="fade-up" delay={60} className="overflow-x-auto border border-[#e5e5e5]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#111111] text-white">
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest w-[80px]">Rank</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest">Boxer</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest w-[120px]">Record</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest w-[100px]">Points</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest">Last Fight</th>
                  <th className="py-4 px-4 text-xs font-medium uppercase tracking-widest w-[100px] text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((boxer: any, i: number) => (
                  <tr key={boxer.rank} className={`${i % 2 === 1 ? "bg-[#f5f5f5]" : "bg-white"} border-t border-[#e5e5e5]`}>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium border ${
                          boxer.rank === 1
                            ? "border-gold bg-gold text-[#111111]"
                            : "border-[#e5e5e5] bg-white text-[#111111]"
                        }`}
                      >
                        {boxer.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 overflow-hidden bg-[#111111] shrink-0">
                          <Image src={boxer.image} alt={boxer.name} fill sizes="40px" className="object-cover object-top" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium tracking-wide text-sm text-[#111111] uppercase leading-none mb-1">
                            {boxer.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-[#707072]">
                            <span>{boxer.flag}</span>
                            <span className="uppercase tracking-wider text-[10px]">{boxer.country}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-sm text-[#111111]">{boxer.record}</td>
                    <td className="py-4 px-4 text-sm text-[#707072]">{boxer.points}</td>
                    <td className="py-4 px-4 text-sm text-[#707072] max-w-[280px] truncate">{boxer.lastFight}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-block text-xs text-[#707072]">{boxer.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* VIEW FULL RANKINGS BUTTON */}
          <Reveal as="fade-up" delay={120} className="flex justify-center mt-8">
            <button className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors cursor-pointer">
              View Full {activeDivision === "ALL DIVISIONS" ? "Heavyweight" : activeDivision} Rankings
            </button>
          </Reveal>
        </div>
      </section>

      {/* 3. WORLD CHAMPIONS */}
      <section className="bg-[#111111] py-16 sm:py-20 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-1.5 block">
                World Champions
              </span>
              <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-white leading-none">
                The Kings of the Ring
              </h2>
            </div>
            <Link
              href="/boxers"
              className="hidden sm:inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-white hover:border-white/40 transition-colors"
            >
              View All Champions
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {championsData.map((champ, index) => (
              <Reveal key={champ.division} as="fade-up" delay={index * 60}>
                <div className="boxer-card-mr aspect-[3/4]">
                  <div className="image-wrap">
                    <Image src={champ.image} alt={champ.name} fill sizes="(min-width: 1024px) 20vw, 33vw" className="object-cover object-top" />
                    <div className="gradient-overlay" />
                  </div>
                  <div className="card-text">
                    <h2>{champ.name}</h2>
                    <span className="weight-cat champion-badge">{champ.division}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POUND-FOR-POUND TOP 5 */}
      <section className="bg-white text-[#111111] py-16 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8">
            <div className="text-left">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-1.5 block">
                Pound-for-Pound Top 5
              </span>
              <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold leading-none">
                P4P Rankings
              </h2>
            </div>
            <button className="hidden sm:inline-flex items-center rounded-full border border-[#e5e5e5] px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors cursor-pointer">
              View P4P Rankings
            </button>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {p4pRankings.map((boxer, index) => (
              <Reveal key={boxer.rank} as="fade-up" delay={index * 60}>
                <div className="relative bg-white border border-[#e5e5e5] aspect-[3/4] overflow-hidden flex flex-col justify-end">
                  {/* Huge rank number in background */}
                  <div className="absolute inset-0 flex items-start justify-start p-4 select-none pointer-events-none z-0">
                    <span className={`text-[120px] font-medium leading-none ${boxer.rank === 1 ? "text-gold/25" : "text-[#f5f5f5]"}`}>
                      {boxer.rank}
                    </span>
                  </div>

                  {/* Fighter Image overlapping */}
                  <div className="absolute inset-0 z-10 flex items-end justify-center">
                    <div className="relative w-full h-[85%]">
                      <Image
                        src={boxer.image}
                        alt={boxer.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, 50vw"
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>

                  {/* Info Overlay at the bottom */}
                  <div className="relative z-20 p-4 bg-gradient-to-t from-white via-white/95 to-transparent pt-8 text-left border-t border-[#e5e5e5]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-xs">{boxer.flag}</span>
                      <h4 className="font-medium tracking-wide text-sm text-[#111111] uppercase leading-none">
                        {boxer.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-[#707072]">{boxer.record}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RANKING METHODOLOGY */}
      <section className="bg-[#111111] text-white py-16 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <Reveal as="fade-up" className="flex-1 text-left max-w-md">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2.5 block">
              Ranking Methodology
            </span>
            <p className="text-white/60 text-sm leading-relaxed">
              Our rankings are determined by a comprehensive evaluation system that considers fight results, strength of opponents, activity level, and overall dominance in the ring.
            </p>
          </Reveal>

          {/* Right Cards / Indicators */}
          <Reveal as="fade-up" delay={100} className="flex-1 w-full grid grid-cols-2 min-[500px]:grid-cols-3 lg:grid-cols-5 gap-6">
            {methodology.map((m) => (
              <div key={m.label} className="text-center md:text-left flex flex-col items-center md:items-start">
                {m.icon}
                <span className="text-2xl font-medium text-white block leading-none mb-1">{m.value}</span>
                <span className="text-[10px] font-medium uppercase text-white/50 tracking-wider block">{m.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6. NEWSLETTER / NEVER MISS A MOVE */}
      <section className="bg-white text-[#111111] py-16 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text info */}
          <Reveal as="fade-up" className="flex-1 text-left max-w-lg">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-2 block">
              Stay Updated
            </span>
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-crimson leading-none mb-3">
              Never Miss a Move
            </h2>
            <p className="text-[#707072] text-sm leading-relaxed">
              Get the latest rankings, fight news, and exclusive insights delivered to your inbox.
            </p>
          </Reveal>

          {/* Right newsletter input */}
          <Reveal as="fade-up" delay={100} className="flex-1 w-full flex flex-col sm:flex-row items-center gap-6 justify-end">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 rounded-[24px] border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-3 text-sm text-[#111111] w-full max-w-sm">
                <Check className="h-4 w-4" />
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
                  className="flex-1 px-4 py-3 rounded-[24px] border border-[#e5e5e5] focus:outline-none focus:border-[#707072] text-sm text-[#111111] placeholder-[#9e9ea0] bg-white transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#111111] hover:bg-[#1a1a1a] text-white font-medium tracking-wide text-xs uppercase px-6 py-3 transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
