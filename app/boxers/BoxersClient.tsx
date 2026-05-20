"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Trophy, X, Calendar, MapPin, Scale, ChevronRight, User, Circle } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

interface Record {
  win: number;
  loss: number;
  draw: number;
  kos: number;
}

interface TimelineItem {
  year: string;
  event: string;
  opponent: string;
  outcome: string;
}

interface Fighter {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  weightClass: string;
  division: "Male" | "Female";
  titles: string[];
  record: Record;
  image: string;
  height: string;
  reach: string;
  stance: "Orthodox" | "Southpaw";
  age: number;
  hometown: string;
  nationality: string;
  recentForm: ("W" | "L" | "D")[];
  timeline: TimelineItem[];
}

const boxersData: Fighter[] = [
  {
    id: 1,
    firstName: "VERGIL",
    lastName: "ORTIZ JR.",
    nickname: "The Nightmare",
    weightClass: "WELTERWEIGHT",
    division: "Male",
    titles: ["WBC Interim Welterweight Champion"],
    record: { win: 24, loss: 0, draw: 0, kos: 22 },
    image: "https://images.pexels.com/photos/6296016/pexels-photo-6296016.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 10\"",
    reach: "70\"",
    stance: "Orthodox",
    age: 28,
    hometown: "Grand Prairie, Texas",
    nationality: "USA",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Won WBC Interim Title", opponent: "Serhii Bohachuk", outcome: "MD 12" },
      { year: "2024", event: "Super Welterweight Debut", opponent: "Thomas Dulorme", outcome: "KO 1" },
      { year: "2022", event: "Rankings Title Fight", opponent: "Michael McKinson", outcome: "TKO 9" },
      { year: "2021", event: "WBO International Title", opponent: "Maurice Hooker", outcome: "TKO 7" },
    ]
  },
  {
    id: 2,
    firstName: "RYAN",
    lastName: "GARCIA",
    nickname: "KingRy",
    weightClass: "WELTERWEIGHT",
    division: "Male",
    titles: ["Former WBC Interim Lightweight Champion"],
    record: { win: 25, loss: 2, draw: 0, kos: 20 },
    image: "https://images.pexels.com/photos/4753996/pexels-photo-4753996.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 10\"",
    reach: "70\"",
    stance: "Orthodox",
    age: 27,
    hometown: "Victorville, California",
    nationality: "USA",
    recentForm: ["W", "W", "L", "W", "W"],
    timeline: [
      { year: "2024", event: "Showdown Clash", opponent: "Devin Haney", outcome: "MD 12" },
      { year: "2023", event: "Super Lightweight Fight", opponent: "Oscar Duarte", outcome: "KO 8" },
      { year: "2023", event: "Mega Catchweight Fight", opponent: "Gervonta Davis", outcome: "KO by 7" },
      { year: "2021", event: "Interim WBC Title", opponent: "Luke Campbell", outcome: "TKO 7" },
    ]
  },
  {
    id: 3,
    firstName: "RICARDO",
    lastName: "SANDOVAL",
    nickname: "El Niño",
    weightClass: "FLYWEIGHT",
    division: "Male",
    titles: ["WBC Silver Flyweight Champion"],
    record: { win: 27, loss: 2, draw: 0, kos: 18 },
    image: "https://images.pexels.com/photos/7045735/pexels-photo-7045735.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 4\"",
    reach: "66\"",
    stance: "Orthodox",
    age: 26,
    hometown: "Rialto, California",
    nationality: "USA",
    recentForm: ["W", "W", "W", "L", "W"],
    timeline: [
      { year: "2024", event: "Title Defense", opponent: "Angel Acosta", outcome: "UD 10" },
      { year: "2023", event: "Contender Bout", opponent: "Rocco Santomauro", outcome: "UD 10" },
      { year: "2022", event: "Title Eliminator", opponent: "David Jimenez", outcome: "MD 12" },
      { year: "2021", event: "Breakout IBF Eliminator", opponent: "Jay Harris", outcome: "KO 8" },
    ]
  },
  {
    id: 4,
    firstName: "GABRIELA",
    lastName: "FUNDORA",
    nickname: "Sweet Poison",
    weightClass: "FLYWEIGHT",
    division: "Female",
    titles: ["Undisputed WBA, WBC, IBF, WBO World Flyweight Champion"],
    record: { win: 18, loss: 0, draw: 0, kos: 10 },
    image: "https://images.pexels.com/photos/6253163/pexels-photo-6253163.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 9\"",
    reach: "69\"",
    stance: "Southpaw",
    age: 24,
    hometown: "Coachella, California",
    nationality: "USA",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2025", event: "Undisputed Flyweight Unification", opponent: "Marlen Esparza", outcome: "UD 10" },
      { year: "2024", event: "WBA Title Unification", opponent: "Christina Ruiz", outcome: "UD 10" },
      { year: "2023", event: "Won IBF Flyweight Title", opponent: "Arely Mucino", outcome: "TKO 5" },
      { year: "2022", event: "WBC Youth Title", opponent: "Naomi Reyes", outcome: "UD 10" },
    ]
  },
  {
    id: 5,
    firstName: "CANELO",
    lastName: "ALVAREZ",
    nickname: "El Rey",
    weightClass: "SUPER MIDDLEWEIGHT",
    division: "Male",
    titles: ["Unified WBC, WBA, WBO Super Middleweight Champion"],
    record: { win: 61, loss: 2, draw: 2, kos: 39 },
    image: "https://images.pexels.com/photos/8381830/pexels-photo-8381830.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 8\"",
    reach: "70.5\"",
    stance: "Orthodox",
    age: 35,
    hometown: "Guadalajara, Jalisco",
    nationality: "Mexico",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Title Defense", opponent: "Jaime Munguia", outcome: "UD 12" },
      { year: "2023", event: "Defeated Champion", opponent: "Jermell Charlo", outcome: "UD 12" },
      { year: "2022", event: "Trilogy Defense", opponent: "Gennady Golovkin", outcome: "UD 12" },
      { year: "2021", event: "Won Undisputed Title", opponent: "Caleb Plant", outcome: "TKO 11" },
    ]
  },
  {
    id: 6,
    firstName: "TERENCE",
    lastName: "CRAWFORD",
    nickname: "Bud",
    weightClass: "SUPER WELTERWEIGHT",
    division: "Male",
    titles: ["WBA Super Welterweight Champion", "Former Undisputed Welterweight Champion"],
    record: { win: 41, loss: 0, draw: 0, kos: 31 },
    image: "https://images.pexels.com/photos/4754139/pexels-photo-4754139.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 8\"",
    reach: "74\"",
    stance: "Southpaw",
    age: 38,
    hometown: "Omaha, Nebraska",
    nationality: "USA",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Super Welterweight Debut & Title", opponent: "Israil Madrimov", outcome: "UD 12" },
      { year: "2023", event: "Undisputed Welterweight Unification", opponent: "Errol Spence Jr.", outcome: "TKO 9" },
      { year: "2022", event: "Title Defense", opponent: "David Avanesyan", outcome: "KO 6" },
      { year: "2021", event: "Title Battle", opponent: "Shawn Porter", outcome: "TKO 10" },
    ]
  },
  {
    id: 7,
    firstName: "NAOYA",
    lastName: "INOUE",
    nickname: "The Monster",
    weightClass: "FEATHERWEIGHT",
    division: "Male",
    titles: ["Undisputed WBC, WBA, IBF, WBO Super Bantamweight Champion"],
    record: { win: 27, loss: 0, draw: 0, kos: 24 },
    image: "https://images.pexels.com/photos/4753993/pexels-photo-4753993.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 5\"",
    reach: "67.5\"",
    stance: "Orthodox",
    age: 33,
    hometown: "Zama, Kanagawa",
    nationality: "Japan",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Dome Showdown", opponent: "Luis Nery", outcome: "KO 6" },
      { year: "2023", event: "Undisputed Super Bantamweight Unification", opponent: "Marlon Tapales", outcome: "KO 10" },
      { year: "2023", event: "Won Unified Titles", opponent: "Stephen Fulton", outcome: "TKO 8" },
      { year: "2022", event: "Undisputed Bantamweight Battle", opponent: "Paul Butler", outcome: "KO 11" },
    ]
  },
  {
    id: 8,
    firstName: "GERVONTA",
    lastName: "DAVIS",
    nickname: "Tank",
    weightClass: "LIGHTWEIGHT",
    division: "Male",
    titles: ["WBA World Lightweight Champion"],
    record: { win: 30, loss: 0, draw: 0, kos: 28 },
    image: "https://images.pexels.com/photos/4754141/pexels-photo-4754141.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 5.5\"",
    reach: "67.5\"",
    stance: "Southpaw",
    age: 31,
    hometown: "Baltimore, Maryland",
    nationality: "USA",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Title Defense", opponent: "Frank Martin", outcome: "KO 8" },
      { year: "2023", event: "Super Fight Night", opponent: "Ryan Garcia", outcome: "KO 7" },
      { year: "2023", event: "Championship Bout", opponent: "Hector Garcia", outcome: "TKO 9" },
      { year: "2022", event: "Title Defense", opponent: "Rolando Romero", outcome: "TKO 6" },
    ]
  },
  {
    id: 9,
    firstName: "KATIE",
    lastName: "TAYLOR",
    nickname: "The Bray Bomber",
    weightClass: "LIGHTWEIGHT",
    division: "Female",
    titles: ["Undisputed Unified WBC, WBA, IBF, WBO World Light Welterweight Champion"],
    record: { win: 24, loss: 1, draw: 0, kos: 6 },
    image: "https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 5\"",
    reach: "66\"",
    stance: "Orthodox",
    age: 39,
    hometown: "Bray, County Wicklow",
    nationality: "Ireland",
    recentForm: ["W", "W", "L", "W", "W"],
    timeline: [
      { year: "2024", event: "Rematch Unification", opponent: "Amanda Serrano", outcome: "UD 10" },
      { year: "2023", event: "Super Lightweight Unification Rematch", opponent: "Chantelle Cameron", outcome: "MD 10" },
      { year: "2023", event: "Super Lightweight Title Attempt", opponent: "Chantelle Cameron", outcome: "MD Loss 10" },
      { year: "2022", event: "Historic Garden Clash", opponent: "Amanda Serrano", outcome: "SD 10" },
    ]
  },
  {
    id: 10,
    firstName: "SENIESA",
    lastName: "ESTRADA",
    nickname: "Super Bad",
    weightClass: "FLYWEIGHT",
    division: "Female",
    titles: ["Former Undisputed WBC, WBA, IBF, WBO Strawweight Champion"],
    record: { win: 26, loss: 0, draw: 0, kos: 9 },
    image: "https://images.pexels.com/photos/6253162/pexels-photo-6253162.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 2\"",
    reach: "63\"",
    stance: "Orthodox",
    age: 33,
    hometown: "East Los Angeles, California",
    nationality: "USA",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Undisputed Strawweight Battle", opponent: "Yokasta Valle", outcome: "UD 10" },
      { year: "2023", event: "WBC Title Defense", opponent: "Leonela Yudica", outcome: "UD 10" },
      { year: "2023", event: "WBA & WBC Unification", opponent: "Tina Rupprecht", outcome: "UD 10" },
      { year: "2021", event: "Won WBA Minimumweight Title", opponent: "Anabel Ortiz", outcome: "UD 10" },
    ]
  },
  {
    id: 11,
    firstName: "DMITRY",
    lastName: "BIVOL",
    nickname: "Elegant Boxer",
    weightClass: "LIGHT HEAVYWEIGHT",
    division: "Male",
    titles: ["WBA Super Light Heavyweight Champion"],
    record: { win: 23, loss: 1, draw: 0, kos: 12 },
    image: "https://images.pexels.com/photos/8381829/pexels-photo-8381829.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "6' 0\"",
    reach: "72\"",
    stance: "Orthodox",
    age: 35,
    hometown: "Tokmak, Kyrgyzstan",
    nationality: "Russia",
    recentForm: ["L", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Undisputed Light Heavyweight Title", opponent: "Artur Beterbiev", outcome: "MD Loss 12" },
      { year: "2024", event: "Title Defense", opponent: "Malik Zinad", outcome: "TKO 6" },
      { year: "2023", event: "Title Defense", opponent: "Lyndon Arthur", outcome: "UD 12" },
      { year: "2022", event: "P4P Giant Battle", opponent: "Canelo Alvarez", outcome: "UD 12" },
    ]
  },
  {
    id: 12,
    firstName: "ARTUR",
    lastName: "BETERBIEV",
    nickname: "The Beast",
    weightClass: "LIGHT HEAVYWEIGHT",
    division: "Male",
    titles: ["Undisputed Unified WBC, WBA, IBF, WBO Light Heavyweight Champion"],
    record: { win: 21, loss: 0, draw: 0, kos: 20 },
    image: "https://images.pexels.com/photos/8381832/pexels-photo-8381832.jpeg?auto=compress&cs=tinysrgb&w=800",
    height: "5' 11.5\"",
    reach: "73\"",
    stance: "Orthodox",
    age: 41,
    hometown: "Khasavyurt, Dagestan",
    nationality: "Canada",
    recentForm: ["W", "W", "W", "W", "W"],
    timeline: [
      { year: "2024", event: "Undisputed Light Heavyweight Unification", opponent: "Dmitry Bivol", outcome: "MD 12" },
      { year: "2024", event: "Title Unification Defense", opponent: "Callum Smith", outcome: "TKO 7" },
      { year: "2023", event: "WBC/IBF/WBO Defense", opponent: "Anthony Yarde", outcome: "TKO 8" },
      { year: "2022", event: "WBO Unification", opponent: "Joe Smith Jr.", outcome: "TKO 2" },
    ]
  }
];

export function BoxersClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWeight, setSelectedWeight] = useState("ALL")
  const [selectedDivision, setSelectedDivision] = useState("ALL")
  const [activeFighter, setActiveFighter] = useState<Fighter | null>(null)

  const weightClasses = ["ALL", "HEAVYWEIGHT", "LIGHT HEAVYWEIGHT", "SUPER MIDDLEWEIGHT", "WELTERWEIGHT", "LIGHTWEIGHT", "FLYWEIGHT"]
  const divisions = ["ALL", "MALE", "FEMALE"]

  // Filter roster dynamically
  const filteredBoxers = useMemo(() => {
    return boxersData.filter((fighter) => {
      const matchesSearch =
        `${fighter.firstName} ${fighter.lastName} ${fighter.nickname}`.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesWeight = selectedWeight === "ALL" || fighter.weightClass === selectedWeight
      
      const matchesDivision =
        selectedDivision === "ALL" ||
        (selectedDivision === "MALE" && fighter.division === "Male") ||
        (selectedDivision === "FEMALE" && fighter.division === "Female")

      return matchesSearch && matchesWeight && matchesDivision
    })
  }, [searchTerm, selectedWeight, selectedDivision])

  return (
    <main className="relative min-h-screen bg-white text-[#0d1124] overflow-x-hidden">
      <Navbar />

      {/* Header Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-44 pb-12 z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b8962e] mb-6">
          <Link href="/" className="hover:text-[#1e2d5e] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-gray-400">Boxers Directory</span>
        </div>

        {/* Title Section matching matchroomboxing.com layout */}
        <div className="flex flex-col mb-12 border-b border-gray-100 pb-8">
          <span className="section-eyebrow text-[#c5203a] mb-2">Stable Profiles</span>
          <h1 
            className="text-6xl md:text-8xl font-black uppercase tracking-tight text-[#0d1124] mb-2 leading-none"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
          >
            THE <span className="text-transparent" style={{ WebkitTextStroke: "2px #1e2d5e" }}>FIGHTERS</span>
          </h1>
          <p className="max-w-2xl text-gray-500 text-sm md:text-base leading-relaxed">
            The official roster directory of NextUp Boxing stable champions and top-tier contenders. Browse records, divisions, and complete career history.
          </p>
        </div>

        {/* Search & Filter Bar - White Minimalist Style */}
        <div className="bg-[#f9fafb] border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-12 flex flex-col gap-6">
          
          {/* Top row: Search input & Division picker */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="boxers-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search boxers..."
                className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold tracking-wide text-black placeholder-gray-400 focus:outline-none focus:border-[#1e2d5e] focus:ring-1 focus:ring-[#1e2d5e] transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black rounded-full bg-gray-100 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Division Filter */}
            <div className="flex bg-white border border-gray-200 rounded-xl p-1 justify-between items-center">
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`flex-1 text-center py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    selectedDivision === div
                      ? "bg-[#1e2d5e] text-white shadow-sm"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>

          </div>

          {/* Bottom row: Weight class filters */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-[#b8962e]" />
              Filter by Weight Class
            </span>
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {weightClasses.map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest border rounded-full transition-all shrink-0 ${
                    selectedWeight === weight
                      ? "bg-[#b8962e] text-[#0d1124] border-[#b8962e] shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-black"
                  }`}
                >
                  {weight === "ALL" ? "ALL WEIGHTS" : weight}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Roster stable: <span className="text-black font-bold">{filteredBoxers.length}</span> boxers
          </span>
          { (searchTerm || selectedWeight !== "ALL" || selectedDivision !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedWeight("ALL")
                setSelectedDivision("ALL")
              }}
              className="text-xs font-bold tracking-wider text-[#c5203a] uppercase hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredBoxers.length === 0 ? (
          <div className="bg-[#f9fafb] border border-gray-200 rounded-2xl p-16 text-center shadow-inner">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold uppercase mb-2 tracking-wider text-[#0d1124]">No Boxers Found</h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              We couldn't find any fighters matching your search parameters. Try expanding your weight class or search keyword filters.
            </p>
          </div>
        ) : (
          /* Fighters Grid - Simulating matchroomboxing.com layout exactly */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBoxers.map((fighter) => (
              <motion.div
                key={fighter.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#1e2d5e]/40 hover:shadow-2xl transition-all duration-300"
              >
                {/* Fighter Image Container */}
                <div 
                  onClick={() => setActiveFighter(fighter)}
                  className="relative h-[360px] w-full bg-[#f3f4f6] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={fighter.image}
                    alt={`${fighter.firstName} ${fighter.lastName}`}
                    fill
                    className="object-cover object-top hover:scale-[1.04] transition-all duration-500"
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                    priority={fighter.id <= 4}
                  />
                  
                  {/* Division / Weight Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    <span className="bg-[#1e2d5e] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                      {fighter.weightClass}
                    </span>
                    {fighter.titles.length > 0 && (
                      <span className="bg-[#b8962e] text-[#0d1124] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                        <Trophy className="h-2.5 w-2.5 text-[#c5203a]" />
                        CHAMPION
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats Summary Panel */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5203a] block mb-1">
                      {fighter.weightClass}
                    </span>
                    <h3 
                      className="text-2xl font-black uppercase tracking-tight text-[#0d1124] leading-none mb-1.5"
                      style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
                    >
                      {fighter.firstName} <span className="text-[#1e2d5e]">{fighter.lastName}</span>
                    </h3>
                    {fighter.nickname && (
                      <span className="text-[10px] font-medium text-gray-500 italic block mb-3">
                        "{fighter.nickname}"
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">
                      Record: <strong className="text-black font-extrabold">{fighter.record.win}-{fighter.record.loss}-{fighter.record.draw}</strong>
                    </span>
                    <button
                      onClick={() => setActiveFighter(fighter)}
                      className="text-[10px] font-black uppercase tracking-wider text-[#b8962e] hover:text-[#1e2d5e] transition-colors flex items-center gap-0.5"
                    >
                      VIEW PROFILE
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Dynamic Profile Side Drawer */}
      <AnimatePresence>
        {activeFighter && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFighter(null)}
              className="fixed inset-0 bg-black z-40 cursor-pointer backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-[#0d1124] border-l border-[#b8962e]/20 z-50 shadow-2xl p-6 sm:p-8 overflow-y-auto grain-overlay flex flex-col justify-between text-white"
            >
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#b8962e]">FIGHTER DOSSIER</span>
                    <Circle className="h-2 w-2 text-[#c5203a] fill-[#c5203a] animate-pulse" />
                  </div>
                  <button
                    id="close-drawer-btn"
                    onClick={() => setActiveFighter(null)}
                    className="p-2 border border-white/10 hover:border-[#b8962e] rounded-full text-gray-400 hover:text-white transition-all bg-white/5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Hero section containing image & main title details */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#141f45] to-[#0d1124] border border-white/10 p-6 flex flex-col items-center text-center mb-8">
                  {/* Photo Overlay Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-[#b8962e]/10 blur-3xl pointer-events-none" />
                  
                  <div className="relative h-[220px] w-[220px] rounded-full overflow-hidden border-2 border-[#b8962e]/40 shadow-xl mb-4 z-10">
                    <Image
                      src={activeFighter.image}
                      alt={`${activeFighter.firstName} ${activeFighter.lastName}`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <span className="text-xs font-black uppercase tracking-[0.3em] text-[#b8962e] mb-1.5 z-10">
                    {activeFighter.nickname ? `"${activeFighter.nickname}"` : "LEAGUE FIGHTER"}
                  </span>
                  <h2 
                    className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none z-10"
                    style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
                  >
                    {activeFighter.firstName} <span className="text-[#b8962e]">{activeFighter.lastName}</span>
                  </h2>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5 z-10">
                    {activeFighter.weightClass} Division
                  </span>

                  {activeFighter.titles.map((title, index) => (
                    <div 
                      key={index}
                      className="mt-3 bg-[#b8962e]/15 border border-[#b8962e]/40 px-4 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-black text-[#b8962e] uppercase tracking-wider max-w-sm z-10"
                    >
                      <Trophy className="h-3.5 w-3.5 text-[#c5203a]" />
                      {title}
                    </div>
                  ))}
                </div>

                {/* Professional Record Stats display */}
                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#c5203a] rounded-full" />
                    PROFESSIONAL RECORD
                  </h3>
                  
                  <div className="grid grid-cols-4 gap-2 bg-[#141f45]/50 border border-white/5 rounded-2xl p-4 text-center">
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">WINS</span>
                      <span className="text-3xl font-black text-white">{activeFighter.record.win}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">LOSSES</span>
                      <span className="text-3xl font-black text-white">{activeFighter.record.loss}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">DRAWS</span>
                      <span className="text-3xl font-black text-white">{activeFighter.record.draw}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">KO WINS</span>
                      <span className="text-3xl font-black text-[#b8962e]">{activeFighter.record.kos}</span>
                    </div>
                  </div>

                  {/* Progress ratio bars */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-[#141f45]/20 border border-white/5 rounded-xl p-3">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Win Percentage</span>
                      <div className="flex justify-between items-center gap-2">
                        <div className="w-full bg-[#0d1124] rounded-full h-1.5">
                          <div 
                            className="bg-[#c5203a] h-1.5 rounded-full" 
                            style={{ width: `${(activeFighter.record.win / (activeFighter.record.win + activeFighter.record.loss + activeFighter.record.draw || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold">
                          {Math.round((activeFighter.record.win / (activeFighter.record.win + activeFighter.record.loss + activeFighter.record.draw || 1)) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#141f45]/20 border border-white/5 rounded-xl p-3">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block mb-1">KO Ratio</span>
                      <div className="flex justify-between items-center gap-2">
                        <div className="w-full bg-[#0d1124] rounded-full h-1.5">
                          <div 
                            className="bg-[#b8962e] h-1.5 rounded-full" 
                            style={{ width: `${(activeFighter.record.kos / (activeFighter.record.win || 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold">
                          {Math.round((activeFighter.record.kos / (activeFighter.record.win || 1)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tale of the Tape / Profile Table */}
                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#c5203a] rounded-full" />
                    PHYSICAL METRICS
                  </h3>
                  
                  <div className="bg-[#141f45]/30 border border-white/5 rounded-2xl overflow-hidden text-xs">
                    <div className="grid grid-cols-2 border-b border-white/5 py-3 px-4">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-[#b8962e]" />Height</span>
                      <span className="font-extrabold text-right uppercase tracking-wider">{activeFighter.height}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-white/5 py-3 px-4">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-[#b8962e]" />Reach</span>
                      <span className="font-extrabold text-right uppercase tracking-wider">{activeFighter.reach}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-white/5 py-3 px-4">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-[#b8962e]" />Stance</span>
                      <span className="font-extrabold text-right uppercase tracking-wider text-[#b8962e]">{activeFighter.stance}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-white/5 py-3 px-4">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#b8962e]" />Age</span>
                      <span className="font-extrabold text-right uppercase tracking-wider">{activeFighter.age} years old</span>
                    </div>
                    <div className="grid grid-cols-2 py-3 px-4">
                      <span className="font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#b8962e]" />Hometown</span>
                      <span className="font-extrabold text-right uppercase tracking-wider">{activeFighter.hometown} ({activeFighter.nationality})</span>
                    </div>
                  </div>
                </div>

                {/* Career Timeline */}
                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#c5203a] rounded-full" />
                    CAREER MILESTONES
                  </h3>

                  <div className="relative pl-6 border-l-2 border-[#b8962e]/30 space-y-6">
                    {activeFighter.timeline.map((item, index) => (
                      <div key={index} className="relative group/timeline">
                        {/* Bullet Icon */}
                        <div className="absolute -left-[31px] top-1 bg-[#0d1124] border-2 border-[#b8962e] h-4 w-4 rounded-full group-hover/timeline:bg-[#c5203a] group-hover/timeline:border-[#c5203a] transition-all" />
                        
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-[#b8962e] tracking-widest block mb-0.5">{item.year}</span>
                          <span className="text-xs font-black uppercase tracking-wide text-white">{item.event}</span>
                          <span className="text-[11px] text-gray-400 mt-1">
                            Opponent: <strong className="text-white">{item.opponent}</strong> | Outcome: <strong className="text-[#b8962e]">{item.outcome}</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Close Button Strip at very bottom */}
              <div className="pt-4 border-t border-white/5 mt-4">
                <button
                  onClick={() => setActiveFighter(null)}
                  className="w-full text-center py-3 bg-[#c5203a] rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#a01830] transition-colors shadow-lg shadow-[#c5203a]/25"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
