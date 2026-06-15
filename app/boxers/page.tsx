"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Reveal } from "@/components/Reveal"
import { ChevronDown, Search, X } from "lucide-react"

// Boxers data - World Champions
const worldChampions = [
  {
    id: 1,
    firstName: "Arturo",
    lastName: "Acevedo",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
    weightClass: "Super-Bantamweight",
    titles: "121 SBC SUPER-BANTAMWEIGHT CHAMPION",
    record: "23-1-0",
    wins: 23,
    kos: 17,
    losses: 1,
  },
  {
    id: 2,
    firstName: "Bradley",
    lastName: "Belt",
    image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp",
    weightClass: "Cruiserweight",
    titles: "198 ADC CRUISERWEIGHT CHAMPION",
    record: "26-0-0",
    wins: 26,
    kos: 20,
    losses: 0,
  },
  {
    id: 3,
    firstName: "Jaden",
    lastName: "Harvey",
    image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp",
    weightClass: "Super-Middleweight",
    titles: "165 DAWG SUPER-MIDDLEWEIGHT CHAMPION",
    record: "22-2-0",
    wins: 22,
    kos: 16,
    losses: 2,
  },
  {
    id: 4,
    firstName: "Kevin",
    lastName: "Torres",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp",
    weightClass: "Super-Middleweight",
    titles: "165 SBC SUPER-MIDDLEWEIGHT CHAMPION",
    record: "24-1-0",
    wins: 24,
    kos: 18,
    losses: 1,
  },
  {
    id: 5,
    firstName: "Kiamal",
    lastName: "Evelyn",
    image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp",
    weightClass: "Super-Featherweight",
    titles: "132 SBC SUPER-FEATHERWEIGHT CHAMPION",
    record: "19-0-0",
    wins: 19,
    kos: 12,
    losses: 0,
  },
  {
    id: 6,
    firstName: "Naijalie",
    lastName: "Rodriguez",
    image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp",
    weightClass: "Women’s Light-Flyweight",
    titles: "106 WOMENS SBC LIGHT-FLYWEIGHT CHAMPION",
    record: "18-0-0",
    wins: 18,
    kos: 10,
    losses: 0,
  },
  {
    id: 7,
    firstName: "Reese",
    lastName: "Mistretta",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp",
    weightClass: "Light-Heavyweight",
    titles: "176 SBC LIGHT-HEAVYWEIGHT CHAMPION",
    record: "25-2-0",
    wins: 25,
    kos: 21,
    losses: 2,
  },
  {
    id: 8,
    firstName: "Xavier",
    lastName: "Wilcher",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
    weightClass: "Cruiserweight",
    titles: "198 SBC CRUISERWEIGHT CHAMPION",
    record: "28-1-0",
    wins: 28,
    kos: 23,
    losses: 1,
  },
]

// All boxers (includes champions + prospects)
const allBoxers = [
  ...worldChampions,
]

// Weight class options
const weightClasses = [
  "All",
  "Heavyweight",
  "Cruiserweight",
  "Light-Heavyweight",
  "Super-Middleweight",
  "Middleweight",
  "Super-Welterweight",
  "Welterweight",
  "Super-Lightweight",
  "Lightweight",
  "Super-Featherweight",
  "Featherweight",
  "Super-Bantamweight",
  "Bantamweight",
  "Super-Flyweight",
  "Flyweight",
]

// Sort options
const sortOptions = ["A-Z", "Z-A", "Record"]

export default function BoxersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWeight, setSelectedWeight] = useState("All")
  const [sortBy, setSortBy] = useState("A-Z")
  const [showWeightDropdown, setShowWeightDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Filter and sort boxers
  const filteredBoxers = allBoxers
    .filter((boxer) => {
      const matchesSearch =
        boxer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        boxer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesWeight = selectedWeight === "All" || boxer.weightClass === selectedWeight
      return matchesSearch && matchesWeight
    })
    .sort((a, b) => {
      if (sortBy === "A-Z") return a.lastName.localeCompare(b.lastName)
      if (sortBy === "Z-A") return b.lastName.localeCompare(a.lastName)
      if (sortBy === "Record") return b.wins - a.wins
      return 0
    })

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* Banner Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center bg-[#111111]">
        <div className="absolute inset-0">
          <Image
            src="/boxers/banner-bg.webp"
            alt="Boxing ring atmosphere"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <h1 className="text-6xl md:text-7xl lg:text-[76px] uppercase text-white leading-[0.95] font-display">
            NEXT UP BOXING LEAGUE<br />CURRENT CHAMPIONS
          </h1>
        </div>
      </section>

      {/* World Champions Section */}
      <section className="world-champions relative">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Vertical Title */}
            <div className="vertical-title lg:w-20 flex-shrink-0">
              <div className="vertical-title-container">
                <h2 className="text-5xl lg:text-7xl uppercase text-outline-white-heavy font-display">
                  NEXT UP BOXING LEAGUE<br />CHAMPIONS
                </h2>
              </div>
            </div>

            {/* Champions Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worldChampions.map((boxer, index) => (
                  <Reveal key={boxer.id} as="fade-up" delay={index * 60}>
                    <ChampionCard boxer={boxer} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Boxers Section */}
      <section className="all-boxers py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide text-gold">
              Rising Stars / Contenders
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9e9ea0]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-normal text-[#111111] placeholder-[#9e9ea0] focus:outline-none focus:border-[#707072] transition-colors w-40 rounded-[24px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-[#9e9ea0] hover:text-[#111111]" />
                  </button>
                )}
              </div>

              {/* Weight Class Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowWeightDropdown(!showWeightDropdown)
                    setShowSortDropdown(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors rounded-full"
                >
                  {selectedWeight === "All" ? "Weight" : selectedWeight}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showWeightDropdown ? "rotate-180" : ""}`} />
                </button>
                {showWeightDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#e5e5e5] z-50 max-h-64 overflow-y-auto">
                    {weightClasses.map((weight) => (
                      <button
                        key={weight}
                        onClick={() => {
                          setSelectedWeight(weight)
                          setShowWeightDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors ${
                          selectedWeight === weight ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSortDropdown(!showSortDropdown)
                    setShowWeightDropdown(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] text-sm font-medium uppercase tracking-wide text-[#111111] hover:border-[#707072] transition-colors rounded-full"
                >
                  Sort
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-[#e5e5e5] z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors ${
                          sortBy === option ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Boxers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {filteredBoxers.map((boxer, index) => (
              <Reveal key={boxer.id} as="fade-up" delay={(index % 10) * 60}>
                <BoxerCard boxer={boxer} />
              </Reveal>
            ))}
          </div>

          {filteredBoxers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#707072] text-lg">No boxers found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

interface BoxerData {
  id: number
  firstName: string
  lastName: string
  image: string
  weightClass: string
  titles: string
  record: string
  wins: number
  kos: number
  losses: number
}

function ChampionCard({ boxer }: { boxer: BoxerData }) {
  return (
    <div className="boxer-card-mr aspect-[3/4]">
      <div className="image-wrap">
        <Image
          src={boxer.image}
          alt={`${boxer.firstName} ${boxer.lastName}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="gradient-overlay" />
      </div>
      <div className="card-text">
        <h2>{boxer.firstName} {boxer.lastName}</h2>
        <span className="weight-cat champion-badge">{boxer.titles}</span>
      </div>
    </div>
  )
}

function BoxerCard({ boxer }: { boxer: BoxerData }) {
  return (
    <div className="boxer-card-mr aspect-[3/4]">
      <div className="image-wrap">
        <Image
          src={boxer.image}
          alt={`${boxer.firstName} ${boxer.lastName}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        <div className="gradient-overlay" />
      </div>
      <div className="card-text">
        <h2 className="!uppercase !font-bold">{boxer.firstName} {boxer.lastName}</h2>
        <span className="weight-cat">{boxer.weightClass}</span>
      </div>
    </div>
  )
}
