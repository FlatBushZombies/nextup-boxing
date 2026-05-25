"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, ChevronRight, ChevronLeft, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const champions = [
  {
    id: 1,
    firstName: "VERGIL",
    lastName: "ORTIZ JR.",
    weightClass: "SUPER WELTERWEIGHT",
    titles: ["WBC Interim"],
    stats: { win: 24, loss: 0, draw: 0, kos: 22 },
    image: "/fighter-1.png",
  },
  {
    id: 2,
    firstName: "RYAN",
    lastName: "GARCIA",
    weightClass: "WELTERWEIGHT",
    titles: ["WBC"],
    stats: { win: 25, loss: 2, draw: 0, kos: 20 },
    image: "/fighter-2.png",
  },
  {
    id: 3,
    firstName: "RICARDO",
    lastName: "SANDOVAL",
    weightClass: "FLYWEIGHT",
    titles: ["WBC", "WBA"],
    stats: { win: 27, loss: 2, draw: 0, kos: 18 },
    image: "/fighter-1.png",
  },
  {
    id: 4,
    firstName: "GABRIELA",
    lastName: "FUNDORA",
    weightClass: "FLYWEIGHT",
    titles: ["IBF", "WBO", "WBC", "WBA"],
    stats: { win: 18, loss: 0, draw: 0, kos: 10 },
    image: "/fighter-2.png",
  },
  {
    id: 5,
    firstName: "LUIS",
    lastName: "ESCOBAR",
    weightClass: "LIGHTWEIGHT",
    titles: ["WBA"],
    stats: { win: 20, loss: 1, draw: 0, kos: 12 },
    image: "/fighter-1.png",
  },
  {
    id: 6,
    firstName: "MARIO",
    lastName: "SOTO",
    weightClass: "FEATHERWEIGHT",
    titles: ["WBC"],
    stats: { win: 22, loss: 2, draw: 0, kos: 15 },
    image: "/fighter-2.png",
  },
]

const bannerFighters = [
  { id: 1, name: "CAPETILLO", image: "/fighter-1.png" },
  { id: 2, name: "BARBOZA JR.", image: "/fighter-2.png" },
  { id: 3, name: "FLORES", image: "/fighter-1.png" },
  { id: 4, name: "PRIEST", image: "/fighter-2.png" },
  { id: 5, name: "CONWELL", image: "/fighter-1.png" },
]

export function ChampionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, scale: 1.15, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Lines animation
      gsap.fromTo(
        ".champ-line-left",
        { scaleX: 0, transformOrigin: "right center" },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".champ-line-right",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".champ-card")

      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            clipPath: "inset(100% 0% 0% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        )

        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".card-img")

          if (img) {
            gsap.fromTo(
              img,
              { y: -15 },
              {
                y: 15,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              }
            )
          }
        })
      }

      // Dots animation
      if (dotsRef.current) {
        gsap.fromTo(
          dotsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.12,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dotsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const bannerItems =
        bannerRef.current?.querySelectorAll<HTMLElement>(".banner-fighter")

      if (bannerItems && bannerItems.length) {
        gsap.fromTo(
          bannerItems,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] py-16 w-full overflow-hidden border-t border-[#b8962e]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="relative mb-12 flex flex-col items-center justify-center text-center"
        >
          <div className="champ-line-left absolute top-1/2 left-0 right-1/2 h-px bg-[#b8962e] opacity-40 z-0 mr-20" />

          <div className="champ-line-right absolute top-1/2 left-1/2 right-0 h-px bg-[#b8962e] opacity-40 z-0 ml-20" />

          <div className="relative z-10 bg-[#0a0a0a] px-8 py-2 flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={60}
              className="object-contain"
              priority
            />

            <h2
              className="text-4xl md:text-5xl uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              <span className="text-[#b8962e]">Champions</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {/* Nav arrows */}
          <button className="absolute left-0 top-1/3 -translate-y-1/2 z-20 bg-black/60 p-2 text-white hover:bg-[#c5203a] transition-colors lg:-left-6 hidden md:block border border-white/10 shadow-lg">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button className="absolute right-0 top-1/3 -translate-y-1/2 z-20 bg-black/60 p-2 text-white hover:bg-[#c5203a] transition-colors lg:-right-6 hidden md:block border border-white/10 shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button>

          {champions.map((fighter) => (
            <div
              key={fighter.id}
              className="champ-card flex flex-col transform transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-[170px] w-full bg-gradient-to-b from-[#d4ae44] to-[#b8962e] overflow-hidden">
                <div className="card-img absolute inset-0 flex items-end justify-center">
                  <div className="relative h-[145px] w-[85%]">
                    <Image
                      src={fighter.image}
                      alt={`${fighter.firstName} ${fighter.lastName}`}
                      fill
                      className="object-contain object-bottom drop-shadow-2xl"
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                <div className="absolute bottom-3 left-0 right-0 text-center px-2">
                  <div
                    className="uppercase tracking-widest text-sm md:text-[0.9rem] drop-shadow-lg"
                    style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                  >
                    <span className="text-white font-normal">
                      {fighter.firstName}{" "}
                    </span>

                    <span className="text-[#b8962e] font-bold">
                      {fighter.lastName}
                    </span>
                  </div>

                  <div className="text-[10px] font-semibold text-gray-300 tracking-[0.12em] mb-1 uppercase drop-shadow-sm">
                    {fighter.weightClass}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {fighter.titles.map((title, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-[11px] font-bold text-[#b8962e] tracking-wider uppercase drop-shadow-md"
                      >
                        <Trophy className="h-3.5 w-3.5 text-[#c5203a]" />
                        {title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 text-center border-b border-[#1e2d5e]/20">
                <div className="bg-[#b8962e] py-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  WIN
                </div>

                <div className="bg-[#b8962e] py-1.5 text-[10px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">
                  LOSS
                </div>

                <div className="bg-[#b8962e] py-1.5 text-[10px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">
                  DRAW
                </div>

                <div className="bg-[#b8962e] py-1.5 text-[10px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">
                  KOs
                </div>

                <div className="bg-[#1a1a1a] py-2 text-[13px] font-bold text-white">
                  {fighter.stats.win}
                </div>

                <div className="bg-[#1a1a1a] py-2 text-[13px] font-bold text-white border-l border-white/10">
                  {fighter.stats.loss}
                </div>

                <div className="bg-[#1a1a1a] py-2 text-[13px] font-bold text-white border-l border-white/10">
                  {fighter.stats.draw}
                </div>

                <div className="bg-[#1a1a1a] py-2 text-[13px] font-bold text-white border-l border-white/10">
                  {fighter.stats.kos}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div ref={dotsRef} className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
          <div className="h-2 w-2 rounded-full border border-white bg-transparent" />
        </div>

        {/* Bottom Banner */}
        <div
          ref={bannerRef}
          className="mt-12 relative w-full overflow-hidden bg-gradient-to-r from-[#b8962e] to-[#d4ae44] px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-3 text-white mb-3 drop-shadow-md">
              <Users className="h-7 w-7" />

              <span
                className="text-4xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                FIGHTERS
              </span>
            </div>

            <Link
              id="view-all-fighters-btn"
              href="/boxers"
              className="flex items-center gap-2 bg-[#0a0a0a] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#c5203a] uppercase tracking-wider shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
              VIEW ALL
            </Link>
          </div>

          <div className="relative z-10 flex w-full md:w-auto items-end justify-between md:justify-end gap-2 md:gap-8 overflow-x-auto pb-1 scrollbar-hide">
            {bannerFighters.map((bf) => (
              <div
                key={bf.id}
                className="banner-fighter flex flex-col items-center shrink-0 w-[80px] md:w-[110px] transform transition-transform hover:-translate-y-1"
              >
                <div className="relative h-[90px] md:h-[120px] w-full mb-1">
                  <Image
                    src={bf.image}
                    alt={bf.name}
                    fill
                    className="object-contain object-bottom drop-shadow-lg"
                  />
                </div>

                <div className="w-full border-t-2 border-black/30 pt-1.5 text-center">
                  <span
                    className="text-[12px] md:text-[14px] font-bold text-black uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                  >
                    {bf.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}