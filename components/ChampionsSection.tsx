"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const champions = [
  {
    firstName: "ARTURO",
    lastName: "ACEVEDO",
    weightClass: "Super-Bantamweight",
    championship: "SBC Champion",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.png",
  },
  {
    firstName: "XAVIER",
    lastName: "WILCHER",
    weightClass: "Cruiserweight",
    championship: "SBC Champion",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.png",
  },
  {
    firstName: "JADEN",
    lastName: "HARVEY",
    weightClass: "Super-Middleweight",
    championship: "DAWG Champion",
    image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.png",
  },
  {
    firstName: "BRADLEY",
    lastName: "BELT",
    weightClass: "Cruiserweight",
    championship: "ADC Champion",
    image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.png",
  },
  {
    firstName: "NAIJALIE",
    lastName: "RODRIGUEZ",
    weightClass: "Women's Light-Flyweight",
    championship: "Women's SBC Champion",
    image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.png",
  }, 
   {
    firstName: "KEVIN",
    lastName: "TORRES",
    weightClass: "Super-Middleweight",
    championship: "SBC Champion",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.png",
  },
  {
    firstName: "KIAMAL",
    lastName: "EVELYN",
    weightClass: "Super-Featherweight",
    championship: "SBC Champion",
    image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.png",
  },
  {
    firstName: "REESE",
    lastName: "MISTRETTA",
    weightClass: "Light-Heavyweight",
    championship: "SBC Champion",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.png",
  },
]

function getFighterNumberFromImage(imagePath: string) {
  const match = imagePath.match(/_(\d+)_/)
  return match?.[1] ?? ""
}

const bannerFighters = champions.map((fighter) => ({
  name: fighter.lastName,
  image: fighter.image,
}))

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
      className="bg-gradient-to-br from-[#0a1628] via-[#0d1e3a] to-[#0a1628] py-12 sm:py-16 w-full overflow-hidden border-t border-[#b8962e]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="relative mb-8 sm:mb-12 flex flex-col items-center justify-center text-center"
        >
          <div className="champ-line-left absolute top-1/2 left-0 right-1/2 h-px bg-[#b8962e] opacity-40 z-0 mr-14 sm:mr-20" />

          <div className="champ-line-right absolute top-1/2 left-1/2 right-0 h-px bg-[#b8962e] opacity-40 z-0 ml-14 sm:ml-20" />

          <div className="relative z-10 mx-auto flex flex-col items-center justify-center gap-3 px-5 sm:px-8 py-2 text-center">
            <Image
              src="/logo-footer.png"
              alt="Logo"
              width={120}
              height={60}
              className="object-contain"
              priority
            />

            <h2
              className="text-4xl md:text-5xl uppercase text-white"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              <span className="text-[#b8962e]">Current Champions</span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="relative mx-auto grid w-full max-w-[60rem] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        >
  
          {champions.map((fighter) => {
            const fighterNumber = getFighterNumberFromImage(fighter.image)

            return (
              <div
                key={fighter.image}
                className="champ-card w-full transform overflow-hidden rounded-[1.6rem] border border-[#b8962e]/65 bg-gradient-to-b from-[#21190c] via-[#070b14] to-[#050912] p-1 shadow-[0_18px_45px_rgba(0,0,0,0.45),0_0_28px_rgba(184,150,46,0.12)] transition-transform hover:-translate-y-1 hover:border-[#d4ae44]/85 hover:shadow-2xl sm:rounded-[2rem] sm:p-1.5"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[#050912] sm:rounded-[1.6rem]">
                  <Image
                    src={fighter.image}
                    alt={`${fighter.firstName} ${fighter.lastName}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="scale-[1.015] object-cover"
                  />
                </div>

                <div className="mt-1 rounded-b-[1.2rem] border-t border-[#b8962e]/25 bg-gradient-to-b from-[#07101f]/95 to-[#050912]/95 px-3 py-3 text-center sm:rounded-b-[1.55rem] sm:px-5 sm:py-4">
                  <h3
                    className="text-2xl uppercase leading-none text-white sm:text-3xl"
                    style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                  >
                    {fighter.firstName}
                    <br />
                    {fighter.lastName}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b8962e] sm:text-sm sm:tracking-[0.16em]">
                    {fighterNumber ? `${fighterNumber} ${fighter.championship}` : fighter.championship}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div ref={dotsRef} className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
          <div className="h-2 w-2 rounded-full border border-white bg-transparent" />
        </div>

        {/* Bottom Banner */}
        <div
          ref={bannerRef}
          className="mt-10 sm:mt-12 relative w-full overflow-hidden bg-[#050912] px-4 sm:px-6 py-4 flex flex-col items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c5203a 0, #c5203a 2px, transparent 2px, transparent 12px)",
            }}
          />

          <div className="relative z-10 mb-4 flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 text-white mb-3 drop-shadow-md">
              <Users className="h-6 w-6 sm:h-7 sm:w-7" />

              <span
                className="text-3xl sm:text-4xl font-bold uppercase"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                rising stars/ contenders
              </span>
            </div>

          </div>

          <div className="relative z-10 flex w-full flex-wrap items-end justify-center gap-4 pb-1 sm:gap-6 md:gap-8">
            {bannerFighters.map((bf) => {
              const fighterNumber = getFighterNumberFromImage(bf.image)

              return (
                <div
                  key={bf.image}
                  className="banner-fighter flex w-[72px] flex-col items-center sm:w-[88px] md:w-[110px]"
                >
                  <div className="relative mb-1 h-[82px] w-full sm:h-[100px] md:h-[120px]">
                    <Image
                      src={bf.image}
                      alt={bf.name}
                      fill
                      className="object-contain object-bottom drop-shadow-lg"
                    />
                  </div>

                  <div className="w-full border-t-2 border-black/30 pt-1.5 text-center">
                    {fighterNumber ? (
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8962e] md:text-xs">
                        #{fighterNumber}
                      </div>
                    ) : null}
                    <span
                      className="text-[12px] font-bold uppercase tracking-wider text-white md:text-[14px]"
                      style={{ fontFamily: "var(--font-bebas), sans-serif" }}
                    >
                      {bf.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
