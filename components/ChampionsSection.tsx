import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { AnimatedLine } from "@/components/AnimatedLine"

const champions = [
  {
    firstName: "ARTURO",
    lastName: "ACEVEDO",
    weightClass: "Super-Bantamweight",
    championship: "121 SBC Champion",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
  },
  {
    firstName: "XAVIER",
    lastName: "WILCHER",
    weightClass: "Cruiserweight",
    championship: "198 SBC Champion",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    firstName: "JADEN",
    lastName: "HARVEY",
    weightClass: "Super-Middleweight",
    championship: "165 DAWG Champion",
    image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp",
  },
  {
    firstName: "BRADLEY",
    lastName: "BELT",
    weightClass: "Cruiserweight",
    championship: "198 ADC Champion",
    image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp",
  },
  {
    firstName: "NAIJALIE",
    lastName: "RODRIGUEZ",
    weightClass: "Women's Light-Flyweight",
    championship: "106 Women's SBC Champion",
    image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp",
  },
  {
    firstName: "KEVIN",
    lastName: "TORRES",
    weightClass: "Super-Middleweight",
    championship: "165 SBC Champion",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp",
  },
  {
    firstName: "KIAMAL",
    lastName: "EVELYN",
    weightClass: "Super-Featherweight",
    championship: "132 SBC Champion",
    image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp",
  },
  {
    firstName: "REESE",
    lastName: "MISTRETTA",
    weightClass: "Light-Heavyweight",
    championship: "176 SBC Champion",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp",
  },
]

export function ChampionsSection() {
  return (
    <section className="relative bg-white py-16 md:py-24 w-full overflow-hidden border-t border-[#e5e5e5]">
      {/* Boxer silhouette accent */}
      <Image
        src="/boxer-shadow.png"
        alt=""
        aria-hidden="true"
        width={1149}
        height={1369}
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[120%] w-auto opacity-[0.06] mix-blend-multiply md:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Reveal as="slide-jab" className="flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-gold font-sans">
              Current Champions
            </h2>
            <Link
              href="/boxers"
              className="hidden sm:inline-flex items-center border border-[#e5e5e5] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#111111] transition-colors hover:border-[#707072] font-sans"
            >
              View All Boxers
            </Link>
          </Reveal>
          <AnimatedLine color="gold" delay={100} className="mt-3" />
        </div>

        {/* Cards — clip-up reveal staggered */}
        <div className="relative mx-auto grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {champions.map((fighter, index) => (
            <Reveal key={fighter.image} as="clip-up" delay={index * 70}>
              <div className="boxer-card-mr aspect-[3/4]">
                <div className="image-wrap">
                  <Image
                    src={fighter.image}
                    alt={`${fighter.firstName} ${fighter.lastName}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                    className="object-cover object-top"
                  />
                  <div className="gradient-overlay" />
                </div>
                <div className="card-text">
                  <h2 className="font-sans font-semibold">{fighter.firstName} {fighter.lastName}</h2>
                  <span className="weight-cat champion-badge">{fighter.championship}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Rising Stars Banner */}
        <Reveal as="fade-up" className="mt-12 flex flex-col items-center justify-center gap-4 border border-[#e5e5e5] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#707072] font-sans">The next wave of talent</p>
            <p className="mt-1 text-base md:text-lg font-semibold uppercase tracking-wide text-gold font-sans">
              Rising Stars &amp; Contenders
            </p>
          </div>
          <Link
            href="/boxers"
            className="inline-flex items-center bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#1a1a1a] font-sans"
          >
            View All Boxers
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
