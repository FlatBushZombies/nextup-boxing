"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ChevronDown, Search, X } from "lucide-react"

// Boxers data - World Champions
const worldChampions = [
  {
    id: 1,
    firstName: "Arturo",
    lastName: "Acevedo",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
    weightClass: "Super-Bantamweight",
    titles: "SBC SUPER-BANTAMWEIGHT CHAMPION",
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
    titles: "ADC CRUISERWEIGHT CHAMPION",
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
    titles: "DAWG SUPER-MIDDLEWEIGHT CHAMPION",
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
    titles: "SBC SUPER-MIDDLEWEIGHT CHAMPION",
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
    titles: "SBC SUPER-FEATHERWEIGHT CHAMPION",
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
    titles: "WOMENS SBC LIGHT-FLYWEIGHT CHAMPION",
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
    titles: "SBC LIGHT-HEAVYWEIGHT CHAMPION",
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
    titles: "SBC CRUISERWEIGHT CHAMPION",
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
  const championsRef = useRef<HTMLDivElement>(null)
  const allBoxersRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  
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

  useEffect(() => {
    let ctx: any = null
    let cancelled = false

    async function initGSAP() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Banner parallax
        const bannerImg = bannerRef.current?.querySelector<HTMLImageElement>("img")
        if (bannerImg) {
          gsap.to(bannerImg, {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
        }

        // Champions cards stagger reveal
        const championCards = championsRef.current?.querySelectorAll(".champion-card")
        if (championCards) {
          gsap.fromTo(
            championCards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: championsRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // All boxers cards stagger
        const boxerCards = allBoxersRef.current?.querySelectorAll(".boxer-card")
        if (boxerCards) {
          gsap.fromTo(
            boxerCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: allBoxersRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // Vertical title animation
        gsap.fromTo(
          ".vertical-title",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".vertical-title",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }

    initGSAP()

    return () => {
      cancelled = true
      ctx?.revert?.()
    }
  }, [])

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <Navbar />

      {/* Banner Section - Matchroom Style */}
      <section 
        ref={bannerRef}
        className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center bg-[#05070f]"
      >
        <div className="absolute inset-0">
          <Image
            src="/boxers/banner-bg.webp"
            alt="Boxing ring atmosphere"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/95 via-[#05070f]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <span 
            className="block text-xl md:text-2xl font-semibold tracking-[0.1em] text-[#d4ae44] mb-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Ordinary People.
          </span>
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.95]"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            NEXT UP BOXING LEAGUE<br />CURRENT CHAMPIONS
          </h1>
        </div>

        {/* Diagonal accent line */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c5203a] via-[#c5203a] to-transparent" />
      </section>

      {/* World Champions Section */}
      <section className="world-champions relative">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1e2d5e]/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c5203a]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Vertical Title */}
            <div className="vertical-title lg:w-20 flex-shrink-0">
              <div className="vertical-title-container">
                <h2 
                  className="text-5xl lg:text-7xl font-black uppercase text-outline-white-heavy"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  NEXT UP BOXING LEAGUE<br />CHAMPIONS
                </h2>
              </div>
            </div>

            {/* Champions Grid */}
            <div ref={championsRef} className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {worldChampions.map((boxer) => (
                  <ChampionCard key={boxer.id} boxer={boxer} />
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
            <h2 
              className="text-4xl md:text-5xl font-black uppercase text-[#0d1124]"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              Rising Stars/Contenders
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-sm font-medium text-[#0d1124] placeholder-gray-400 focus:outline-none focus:border-[#c5203a] transition-colors w-40"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-bold uppercase tracking-wider text-[#0d1124] hover:border-gray-300 transition-colors"
                >
                  {selectedWeight === "All" ? "Weight" : selectedWeight}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showWeightDropdown ? "rotate-180" : ""}`} />
                </button>
                {showWeightDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg z-50 max-h-64 overflow-y-auto">
                    {weightClasses.map((weight) => (
                      <button
                        key={weight}
                        onClick={() => {
                          setSelectedWeight(weight)
                          setShowWeightDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors ${
                          selectedWeight === weight ? "bg-[#c5203a] text-white" : "text-[#0d1124]"
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-bold uppercase tracking-wider text-[#0d1124] hover:border-gray-300 transition-colors"
                >
                  Sort
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 shadow-lg z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors ${
                          sortBy === option ? "bg-[#c5203a] text-white" : "text-[#0d1124]"
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
          <div ref={allBoxersRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {filteredBoxers.map((boxer) => (
              <BoxerCard key={boxer.id} boxer={boxer} />
            ))}
          </div>

          {filteredBoxers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No boxers found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Champion Card Component
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

function getChampionTitleFromImage(image: string) {
  const filename = image.split("/").pop()?.replace(/\.[^/.]+$/, "") || ""
  const parts = filename.split("_")
  return parts.slice(2).join(" ")
}

function ChampionCard({ boxer }: { boxer: BoxerData }) {
  const [isHovered, setIsHovered] = useState(false)
  const championTitle = getChampionTitleFromImage(boxer.image)

  return (
    <div 
      className="champion-card boxer-card-mr group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-wrap">
        <Image
          src={boxer.image}
          alt={`${boxer.firstName} ${boxer.lastName}`}
          fill
          className="object-cover object-top transition-transform duration-600"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="gradient-overlay" />
      
      <div className="card-text">
        <h2>
          {boxer.firstName}<br />{boxer.lastName}
        </h2>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d4ae44]">{championTitle}</p>
      </div>

      {/* Hover overlay */}
      <div className="hover-overlay">
        <h3
          className="text-4xl uppercase leading-none text-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {boxer.firstName} {boxer.lastName}
        </h3>
        <p className="trophy-text">{championTitle}</p>
      </div>
    </div>
  )
}

// Regular Boxer Card Component
function BoxerCard({ boxer }: { boxer: BoxerData }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="boxer-card relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        {boxer.image ? (
          <div className="absolute inset-0">
            <Image
              src={boxer.image}
              alt={`${boxer.firstName} ${boxer.lastName}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center px-4">
              <p className="text-gray-600 font-bold">{boxer.firstName} {boxer.lastName}</p>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 
            className="text-xl md:text-2xl font-black uppercase text-white leading-[0.95]"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {boxer.firstName}<br />{boxer.lastName}
          </h3>
        </div>

        {/* Hover effect - red tint */}
        <div 
          className={`absolute inset-0 bg-[#c5203a]/0 transition-colors duration-300 ${
            isHovered ? "bg-[#c5203a]/20" : ""
          }`}
        />
    </div>
  )
}
