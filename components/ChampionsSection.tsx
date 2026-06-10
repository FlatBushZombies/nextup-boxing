import Image from "next/image"
import { Users } from "lucide-react"

const champions = [
  {
    firstName: "ARTURO",
    lastName: "ACEVEDO",
    weightClass: "Super-Bantamweight",
    championship: "SBC Champion",
    image: "/champions/ARTURO_ACEVEDO_121_SBC_CHAMPION.webp",
  },
  {
    firstName: "XAVIER",
    lastName: "WILCHER",
    weightClass: "Cruiserweight",
    championship: "SBC Champion",
    image: "/champions/XAVIER_WILCHER_198_SBC_CHAMPION.webp",
  },
  {
    firstName: "JADEN",
    lastName: "HARVEY",
    weightClass: "Super-Middleweight",
    championship: "DAWG Champion",
    image: "/champions/JADEN_HARVEY_165_DAWG_CHAMPION.webp",
  },
  {
    firstName: "BRADLEY",
    lastName: "BELT",
    weightClass: "Cruiserweight",
    championship: "ADC Champion",
    image: "/champions/BRADLEY_BELT_198_ADC_CHAMPION.webp",
  },
  {
    firstName: "NAIJALIE",
    lastName: "RODRIGUEZ",
    weightClass: "Women's Light-Flyweight",
    championship: "Women's SBC Champion",
    image: "/champions/NAIJALIE_RODRIGUEZ_106_WOMENS_SBC_CHAMPION.webp",
  }, 
   {
    firstName: "KEVIN",
    lastName: "TORRES",
    weightClass: "Super-Middleweight",
    championship: "SBC Champion",
    image: "/champions/KEVIN_TORRES_165_SBC_CHAMPION.webp",
  },
  {
    firstName: "KIAMAL",
    lastName: "EVELYN",
    weightClass: "Super-Featherweight",
    championship: "SBC Champion",
    image: "/champions/KIAMAL_EVELYN_132_SBC_CHAMPION.webp",
  },
  {
    firstName: "REESE",
    lastName: "MISTRETTA",
    weightClass: "Light-Heavyweight",
    championship: "SBC Champion",
    image: "/champions/REESE_MISTRETTA_176_SBC_CHAMPION.webp",
  },
]

function getFighterNumberFromImage(imagePath: string) {
  const match = imagePath.match(/_(\d+)_/)
  return match?.[1] ?? ""
}

function BoxerSilhouette() {
  return (
    <div className="relative flex h-[220px] w-[220px] items-center justify-center border border-secondary/20 bg-[#0d1124] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.5)] sm:h-[240px] sm:w-[240px]">
      <div className="relative h-full w-full overflow-hidden bg-[#05070f]">
        <Image
          src="/boxer-shadow.png"
          alt="Boxers silhouette"
          fill
          sizes="(min-width: 640px) 240px, 220px"
          className="object-cover object-center opacity-90 grayscale"
        />
      </div>
    </div>
  )
}

export function ChampionsSection() {
  return (
    <section className="bg-gradient-to-b from-[#0a0f1d] to-[#05070f] py-16 w-full overflow-hidden border-t border-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-12 flex flex-col items-center justify-center text-center">
          <div className="relative z-10 mx-auto flex flex-col items-center justify-center gap-3 px-5 py-1 text-center">
            <Image
              src="/logo-footer.png"
              alt="Logo"
              width={160}
              height={80}
              className="max-w-[180px] object-contain opacity-95"
            />

            <h2
              className="text-4xl md:text-5xl uppercase text-white font-display tracking-wider"
            >
              Current <span className="text-secondary">Champions</span>
            </h2>
            <div className="h-[3px] w-16 bg-accent mt-2" />
          </div>
        </div>

        {/* Cards */}
        <div
          className="relative mx-auto grid w-full max-w-[62rem] grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {champions.map((fighter) => {
            const fighterNumber = getFighterNumberFromImage(fighter.image)

            return (
              <div
                key={fighter.image}
                className="group relative w-full overflow-hidden bg-[#0d1124] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-b-4 border-secondary border-t border-x border-white/5"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={fighter.image}
                    alt={`${fighter.firstName} ${fighter.lastName}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                    className="scale-[1.015] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-transparent to-transparent opacity-85" />
                </div>

                <div className="relative p-4 text-left bg-[#0d1124]">
                  <h3
                    className="text-lg leading-tight text-white font-display tracking-wide uppercase font-black"
                  >
                    {fighter.firstName}
                    <br />
                    <span className="text-secondary">{fighter.lastName}</span>
                  </h3>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-accent">
                    {fighterNumber ? `${fighterNumber} LBS | ${fighter.championship}` : fighter.championship}
                  </p>
                  <p className="mt-0.5 text-[9px] font-medium uppercase tracking-widest text-white/55">
                    {fighter.weightClass}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots */}
        <div
          className="mt-10 flex justify-center gap-2"
        >
          <div className="h-2 w-2 rounded-full bg-secondary shadow-sm" />
          <div className="h-2 w-2 rounded-full border border-white/20 bg-transparent" />
        </div>

        {/* Bottom Banner */}
        <div
          className="mt-12 relative w-full overflow-hidden bg-[#0a0e1a] px-4 sm:px-6 py-8 flex flex-col items-center justify-center border border-white/5 shadow-2xl"
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c5203a 0, #c5203a 2px, transparent 2px, transparent 12px)",
            }}
          />

          <div className="relative z-10 mb-4 flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 text-white mb-2 drop-shadow-md">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />

              <span
                className="text-2xl sm:text-3xl font-black uppercase font-display tracking-wider"
              >
                rising stars / contenders
              </span>
            </div>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 pb-1">
            <BoxerSilhouette />

            <div className="max-w-[24rem] text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-secondary font-bold font-sans">
                The next wave of talent
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-base font-display">
                Rising Stars &amp; Contenders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
