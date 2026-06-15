import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"

const eras = [
  {
    year: "2025",
    label: "Season III",
    champions: [
      { name: "BRADLEY BELT", title: "SBC Heavyweight Champion", record: "27-1-0", image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp" },
      { name: "XAVIER WILCHER", title: "ADC Cruiserweight Champion", record: "24-2-0", image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp" },
      { name: "REESE MISTRETTA", title: "SBC Light-Heavyweight Champion", record: "21-0-0", image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp" },
      { name: "NAIJALIE RODRIGUEZ", title: "Women's SBC Flyweight Champion", record: "16-1-0", image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp" },
    ],
  },
  {
    year: "2024",
    label: "Season II",
    champions: [
      { name: "JADEN HARVEY", title: "DAWG Super-Middleweight Champion", record: "20-1-0", image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp" },
      { name: "KIAMAL EVELYN", title: "SBC Super-Featherweight Champion", record: "17-0-0", image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp" },
      { name: "KEVIN TORRES", title: "SBC Super-Middleweight Champion", record: "22-2-0", image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp" },
      { name: "ARTURO ACEVEDO", title: "SBC Super-Bantamweight Champion", record: "19-1-0", image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp" },
    ],
  },
  {
    year: "2023",
    label: "Inaugural Season",
    champions: [
      { name: "JEREMY RODRIGUEZ", title: "SBC Heavyweight Champion", record: "14-0-0", image: "/fighter-1.png" },
      { name: "ANTHONY VASQUEZ", title: "SBC Cruiserweight Champion", record: "16-0-0", image: "/fighter-2.png" },
    ],
  },
]

export default function ChampionsHistoryPage() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] pt-32 pb-16 flex items-center bg-[#111111] text-white overflow-hidden border-b border-[#e5e5e5]">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Reveal as="fade-up" className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-2 block">
              Hall of Champions
            </span>
            <h1 className="text-6xl sm:text-7xl lg:text-[76px] uppercase tracking-wide leading-none font-display mb-4">
              Historical Champions
            </h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-[46ch]">
              Every titleholder who has stepped through the ropes and made history with Next Up Boxing League, season by season.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ERA SECTIONS */}
      {eras.map((era, eraIndex) => (
        <section
          key={era.year}
          className={`py-16 sm:py-20 border-t border-[#e5e5e5] ${eraIndex % 2 === 1 ? "bg-[#f5f5f5]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal as="fade-up" className="flex items-end justify-between border-b border-[#e5e5e5] pb-4 mb-8">
              <div className="text-left">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#707072] mb-1.5 block">
                  {era.label}
                </span>
                <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold leading-none">
                  {era.year} Champions
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {era.champions.map((champ, index) => (
                <Reveal key={champ.name} as="fade-up" delay={index * 60}>
                  <div className="boxer-card-mr aspect-[3/4]">
                    <div className="image-wrap">
                      <Image
                        src={champ.image}
                        alt={champ.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover object-top"
                      />
                      <div className="gradient-overlay" />
                    </div>
                    <div className="card-text">
                      <h2>{champ.name}</h2>
                      <span className="weight-cat champion-badge">{champ.title}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs font-mono text-[#707072]">{champ.record}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#111111] py-16 border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal as="fade-up" className="flex flex-col items-center justify-center gap-4 border border-white/10 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">The next chapter</p>
              <p className="mt-1 text-base md:text-lg font-medium uppercase tracking-wide text-white">
                See Who&apos;s Ranked Today
              </p>
            </div>
            <Link
              href="/rankings"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-[#e5e5e5]"
            >
              View Current Rankings
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
