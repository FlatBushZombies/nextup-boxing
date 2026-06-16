"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { AnimatedLine } from "@/components/AnimatedLine"

const divisions = [
  "ALL",
  "HEAVYWEIGHT",
  "CRUISERWEIGHT",
  "LIGHT HEAVYWEIGHT",
  "MIDDLEWEIGHT",
  "WELTERWEIGHT",
  "LIGHTWEIGHT",
  "SUPER FEATHERWEIGHT",
]

const championsData = [
  { division: "HEAVYWEIGHT", name: "JEREMY RODRIGUEZ", record: "14-0-0", image: "/fighter-1.png" },
  { division: "CRUISERWEIGHT", name: "XAVIER WILCHER", record: "21-2-0", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
  { division: "LIGHT HEAVYWEIGHT", name: "REESE MISTRETTA", record: "18-1-0", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
  { division: "MIDDLEWEIGHT", name: "KEVIN TORRES", record: "20-1-1", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
  { division: "WELTERWEIGHT", name: "ARTURO ACEVEDO", record: "22-0-0", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
]

const rankingData: Record<string, Array<{ rank: number; name: string; flag: string; country: string; record: string; lastFight: string; change: string; image: string }>> = {
  HEAVYWEIGHT: [
    { rank: 1, name: "JEREMY RODRIGUEZ", flag: "🇺🇸", country: "United States", record: "14-0-0", lastFight: "W · May 24, 2026 vs Michael Smith", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "MICHAEL SMITH", flag: "🇬🇧", country: "United Kingdom", record: "22-1-0", lastFight: "L · May 24, 2026 vs Jeremy Rodriguez", change: "—", image: "/fighter-2.png" },
    { rank: 3, name: "BRADLEY BELT", flag: "🇨🇦", country: "Canada", record: "19-2-0", lastFight: "W · May 10, 2026 vs Jaden Harvey", change: "↑ 1", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
    { rank: 4, name: "JADEN HARVEY", flag: "🇺🇸", country: "United States", record: "18-3-0", lastFight: "L · May 10, 2026 vs Bradley Belt", change: "↓ 1", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 5, name: "KIAMAL EVELYN", flag: "🇺🇸", country: "United States", record: "17-2-0", lastFight: "W · Apr 26, 2026 vs Lopez Anderson", change: "—", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
  ],
  CRUISERWEIGHT: [
    { rank: 1, name: "TYLER JOHNSON", flag: "🇺🇸", country: "United States", record: "21-2-0", lastFight: "W · Apr 15, 2026 vs Dan Harrison", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "BRADLEY BELT", flag: "🇺🇸", country: "United States", record: "26-0-0", lastFight: "W · Mar 20, 2026 vs James Cook", change: "—", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
    { rank: 3, name: "XAVIER WILCHER", flag: "🇺🇸", country: "United States", record: "28-1-0", lastFight: "W · Feb 12, 2026 vs Leo Cruz", change: "↑ 2", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
    { rank: 4, name: "MARCUS STEEL", flag: "🇨🇦", country: "Canada", record: "15-2-0", lastFight: "L · Feb 12, 2026 vs Xavier Wilcher", change: "↓ 1", image: "/fighter-1.png" },
    { rank: 5, name: "DANIEL HARRISON", flag: "🇬🇧", country: "United Kingdom", record: "19-3-0", lastFight: "L · Apr 15, 2026 vs Tyler Johnson", change: "—", image: "/fighter-2.png" },
  ],
  "LIGHT HEAVYWEIGHT": [
    { rank: 1, name: "DMITRI VOLKOV", flag: "🇷🇺", country: "Russia", record: "18-1-0", lastFight: "W · May 02, 2026 vs Reese Mistretta", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "REESE MISTRETTA", flag: "🇺🇸", country: "United States", record: "25-2-0", lastFight: "L · May 02, 2026 vs Dmitri Volkov", change: "—", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
    { rank: 3, name: "JADEN HARVEY", flag: "🇺🇦", country: "Ukraine", record: "21-1-0", lastFight: "W · Apr 10, 2026 vs Ivan Petrov", change: "—", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 4, name: "ANDRE MARTIN", flag: "🇺🇸", country: "United States", record: "16-2-0", lastFight: "W · Nov 19, 2025 vs Carlos Ruiz", change: "—", image: "/fighter-1.png" },
    { rank: 5, name: "IVAN PETROV", flag: "🇷🇺", country: "Russia", record: "20-4-0", lastFight: "L · Apr 10, 2026 vs Jaden Harvey", change: "—", image: "/fighter-2.png" },
  ],
  MIDDLEWEIGHT: [
    { rank: 1, name: "CARLOS MENDOZA", flag: "🇲🇽", country: "Mexico", record: "20-1-1", lastFight: "W · May 18, 2026 vs Kevin Torres", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "JADEN HARVEY", flag: "🇨🇦", country: "Canada", record: "22-2-0", lastFight: "W · Apr 22, 2026 vs Leo Ortiz", change: "↑ 1", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
    { rank: 3, name: "KEVIN TORRES", flag: "🇺🇸", country: "United States", record: "24-1-0", lastFight: "L · May 18, 2026 vs Carlos Mendoza", change: "↓ 1", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
    { rank: 4, name: "MARCUS RILEY", flag: "🇺🇸", country: "United States", record: "18-3-0", lastFight: "W · Mar 08, 2026 vs Dan Cruz", change: "—", image: "/fighter-1.png" },
    { rank: 5, name: "LEON ORTIZ", flag: "🇲🇽", country: "Mexico", record: "15-2-0", lastFight: "L · Apr 22, 2026 vs Jaden Harvey", change: "—", image: "/fighter-2.png" },
  ],
  WELTERWEIGHT: [
    { rank: 1, name: "ARTURO ACEVEDO", flag: "🇺🇸", country: "United States", record: "22-0-0", lastFight: "W · May 30, 2026 vs Marcus Gray", change: "—", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
    { rank: 2, name: "MARCUS GRAY", flag: "🇺🇸", country: "United States", record: "18-1-0", lastFight: "L · May 30, 2026 vs Arturo Acevedo", change: "—", image: "/fighter-1.png" },
    { rank: 3, name: "DARIUS COLE", flag: "🇬🇧", country: "United Kingdom", record: "20-2-0", lastFight: "W · Apr 12, 2026 vs James Parker", change: "↑ 1", image: "/fighter-2.png" },
    { rank: 4, name: "KIAMAL EVELYN", flag: "🇺🇸", country: "United States", record: "17-3-0", lastFight: "L · Mar 22, 2026 vs Darius Cole", change: "↓ 1", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
    { rank: 5, name: "JAMES PARKER", flag: "🇺🇸", country: "United States", record: "14-4-0", lastFight: "L · Apr 12, 2026 vs Darius Cole", change: "—", image: "/fighter-1.png" },
  ],
  LIGHTWEIGHT: [
    { rank: 1, name: "MIGUEL SANTOS", flag: "🇵🇷", country: "Puerto Rico", record: "19-0-0", lastFight: "W · May 14, 2026 vs Tony Reed", change: "—", image: "/fighter-1.png" },
    { rank: 2, name: "TONY REED", flag: "🇺🇸", country: "United States", record: "22-2-0", lastFight: "L · May 14, 2026 vs Miguel Santos", change: "—", image: "/fighter-2.png" },
    { rank: 3, name: "KIAMAL EVELYN", flag: "🇺🇸", country: "United States", record: "17-2-0", lastFight: "W · Apr 5, 2026 vs Ray Kim", change: "↑ 1", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
    { rank: 4, name: "RAY KIM", flag: "🇰🇷", country: "South Korea", record: "16-3-0", lastFight: "L · Apr 5, 2026 vs Kiamal Evelyn", change: "↓ 1", image: "/fighter-1.png" },
    { rank: 5, name: "CARLOS VEGA", flag: "🇲🇽", country: "Mexico", record: "21-4-1", lastFight: "W · Mar 20, 2026 vs Pete Walsh", change: "—", image: "/fighter-2.png" },
  ],
  "SUPER FEATHERWEIGHT": [
    { rank: 1, name: "NAIJALIE RODRIGUEZ", flag: "🇺🇸", country: "United States", record: "15-0-0", lastFight: "W · May 20, 2026 vs Lisa Chen", change: "—", image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp" },
    { rank: 2, name: "ARTURO ACEVEDO", flag: "🇺🇸", country: "United States", record: "12-1-0", lastFight: "L · Apr 10, 2026 vs Naijalie Rodriguez", change: "—", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
    { rank: 3, name: "DEON BROOKS", flag: "🇺🇸", country: "United States", record: "18-2-0", lastFight: "W · Mar 28, 2026 vs Luis Reyes", change: "↑ 2", image: "/fighter-1.png" },
    { rank: 4, name: "LUIS REYES", flag: "🇲🇽", country: "Mexico", record: "20-4-0", lastFight: "L · Mar 28, 2026 vs Deon Brooks", change: "↓ 1", image: "/fighter-2.png" },
    { rank: 5, name: "JASON PARK", flag: "🇰🇷", country: "South Korea", record: "14-2-0", lastFight: "W · Feb 15, 2026 vs Marcus Webb", change: "—", image: "/fighter-1.png" },
  ],
}

const DISPLAY_LABEL: Record<string, string> = {
  ALL: "Heavyweight",
  HEAVYWEIGHT: "Heavyweight",
  CRUISERWEIGHT: "Cruiserweight",
  "LIGHT HEAVYWEIGHT": "Light Heavyweight",
  MIDDLEWEIGHT: "Middleweight",
  WELTERWEIGHT: "Welterweight",
  LIGHTWEIGHT: "Lightweight",
  "SUPER FEATHERWEIGHT": "Super Featherweight",
}

export default function RankingsPage() {
  const [activeDivision, setActiveDivision] = useState("ALL")

  const tableData = activeDivision === "ALL"
    ? rankingData.HEAVYWEIGHT
    : rankingData[activeDivision] ?? rankingData.HEAVYWEIGHT

  const divisionLabel = DISPLAY_LABEL[activeDivision] ?? activeDivision

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* HEADER */}
      <section className="bg-[#111111] text-white pt-28 pb-0 border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="pt-8 pb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 block mb-3">
              Official Rankings
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl uppercase leading-none font-display mb-2">
              Rankings
            </h1>
            <p className="text-sm text-white/50 font-sans mt-3">
              Updated weekly · All weight divisions
            </p>
          </Reveal>

          {/* Division Tabs */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide border-t border-[#222] mt-2">
            {divisions.map((div) => {
              const isActive = activeDivision === div
              return (
                <button
                  key={div}
                  onClick={() => setActiveDivision(div)}
                  className={`whitespace-nowrap px-4 py-4 text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer border-b-2 font-sans ${
                    isActive
                      ? "border-crimson text-white"
                      : "border-transparent text-white/40 hover:text-white/70"
                  }`}
                >
                  {div}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* RANKINGS TABLE */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="slide-jab" className="mb-2 flex items-baseline gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#111111] font-sans">
              {divisionLabel} Division
            </h2>
            <span className="text-[10px] text-[#9e9ea0] font-sans uppercase tracking-widest">
              — Current Rankings
            </span>
          </Reveal>
          <AnimatedLine color="crimson" delay={80} className="mb-5" />

          <Reveal as="fade-up" delay={40}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-[#111111]">
                    <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] w-14 font-sans">#</th>
                    <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] font-sans">Boxer</th>
                    <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] w-24 font-sans">Record</th>
                    <th className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] font-sans">Last Fight</th>
                    <th className="pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9e9ea0] w-16 text-right font-sans">Chg</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((boxer, i) => (
                    <tr key={boxer.rank} className="border-b border-[#e5e5e5] group">
                      <td className="py-4 pr-4">
                        <span className={`text-sm font-semibold tabular-nums font-sans ${boxer.rank === 1 ? "text-gold" : "text-[#9e9ea0]"}`}>
                          {boxer.rank === 1 ? "C" : boxer.rank}
                        </span>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 shrink-0 bg-[#f5f5f5] overflow-hidden">
                            <Image src={boxer.image} alt={boxer.name} fill sizes="36px" className="object-cover object-top" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111111] uppercase tracking-wide leading-none font-sans">
                              {boxer.name}
                            </p>
                            <p className="text-[10px] text-[#9e9ea0] mt-0.5 font-sans">
                              <span className="mr-1">{boxer.flag}</span>
                              {boxer.country}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-mono text-sm text-[#111111]">{boxer.record}</td>
                      <td className="py-4 pr-4 text-sm text-[#707072] max-w-[260px] truncate font-sans">{boxer.lastFight}</td>
                      <td className="py-4 text-right">
                        <span className={`text-xs font-semibold font-sans ${
                          boxer.change.startsWith("↑") ? "text-emerald-600"
                          : boxer.change.startsWith("↓") ? "text-crimson"
                          : "text-[#9e9ea0]"
                        }`}>
                          {boxer.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORLD CHAMPIONS */}
      <section className="bg-[#111111] py-14 border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#333] pb-4 mb-8">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 block mb-2 font-sans">
                Current Champions
              </span>
              <h2 className="text-lg font-semibold uppercase tracking-wide text-white font-sans">
                Belt Holders
              </h2>
            </div>
            <Link
              href="/boxers"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors font-sans"
            >
              All Boxers →
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#222]">
            {championsData.map((champ, i) => (
              <Reveal key={champ.division} as="clip-up" delay={i * 70}>
                <div className="boxer-card-mr aspect-[3/4] bg-[#111111]">
                  <div className="image-wrap">
                    <Image src={champ.image} alt={champ.name} fill sizes="(min-width: 1024px) 20vw, 33vw" className="object-cover object-top" />
                    <div className="gradient-overlay" />
                  </div>
                  <div className="card-text">
                    <h2 className="font-sans font-semibold text-sm">{champ.name}</h2>
                    <span className="weight-cat champion-badge text-[10px] font-sans font-semibold">{champ.division}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
