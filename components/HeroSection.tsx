import Image from "next/image"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#0d1124] sm:h-[100dvh] sm:min-h-[700px]"
    >
      {/* Futuristic background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Diagonal speed lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="diagonal-line absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#c5203a] to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: "-100%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-20" />

        {/* Glow effects */}
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#c5203a]/10 blur-[150px] [transform:translateZ(0)]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#b8962e]/10 blur-[100px] [transform:translateZ(0)]" />
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-4 pb-8 pt-28 sm:block sm:h-full sm:min-h-0 sm:px-8 sm:pb-0 sm:pt-0 lg:px-16">
        <div
          className="relative z-30 flex w-full max-w-[calc(100vw-2rem)] flex-col items-start gap-4 text-left sm:absolute sm:inset-x-auto sm:left-[6%] sm:bottom-10 sm:w-auto sm:max-w-[36rem] sm:gap-7 md:left-[7%] md:max-w-[40rem] lg:left-[8%] lg:bottom-16 xl:left-[9%]"
        >
            {/* Event details */}
            <div className="animate-text mb-4 flex flex-col items-start gap-1.5 select-none sm:mb-6 sm:gap-2">
              {/* Date Eyebrow */}
              <div className="flex items-center gap-3">
                <span
                  className="bg-accent px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-white shadow-md min-[380px]:text-sm sm:px-4 sm:text-base font-display skew-x-[-12deg] inline-block"
                >
                  <span className="skew-x-[12deg] block">SAT</span>
                </span>
                <span
                  className="text-[1.55rem] font-bold uppercase tracking-[0.1em] text-white min-[380px]:text-[1.8rem] sm:text-[2.2rem] md:text-[2.4rem] font-display"
                >
                  JUNE 6TH
                </span>
              </div>

              {/* League Name */}
              <span
                className="text-[1.1rem] font-semibold uppercase tracking-[0.18em] text-secondary min-[380px]:text-[1.25rem] sm:text-[1.5rem] md:text-[1.7rem] font-display"
              >
                Next up boxing league
              </span>

              {/* Event Title */}
              <h1
                className="mt-1 text-[3.2rem] font-black uppercase leading-[0.9] tracking-[0.01em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] min-[380px]:text-[3.8rem] sm:text-[5.6rem] md:text-[6rem] lg:text-[6.5rem] font-display"
              >
                strong island
                <span className="block text-accent drop-shadow-[0_2px_8px_rgba(197,32,58,0.4)]">
                  fight night 11
                </span>
              </h1>

              {/* Time Info */}
              <div className="mt-2 inline-flex items-center gap-2 border-l-4 border-secondary bg-ink/85 px-4 py-2 backdrop-blur-md shadow-lg sm:mt-3">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
                <span
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-white min-[380px]:text-base sm:text-lg md:text-xl font-display"
                >
                  5 pm sharp
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-text relative z-30 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-12 w-full sm:w-auto items-center justify-center overflow-hidden bg-secondary px-6 py-3 text-center text-sm font-bold text-ink transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,150,46,0.3)] min-[380px]:text-base sm:px-8 skew-x-[-8deg] uppercase tracking-wider cursor-pointer"
              >
                <span className="relative z-10 skew-x-[8deg] font-display text-lg tracking-widest font-black">
                  GET TICKETS
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white transition-transform duration-300 group-hover:translate-x-0" />
              </a>

              <a
                href="#youtube"
                className="group relative flex min-h-12 w-full sm:w-auto items-center justify-center overflow-hidden border-2 border-white/30 bg-transparent px-6 py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:border-white min-[380px]:text-base sm:px-8 skew-x-[-8deg] uppercase tracking-wider cursor-pointer"
              >
                <span className="relative z-10 skew-x-[8deg] font-display text-lg tracking-widest font-black">
                  FREE LIVESTREAM
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
              </a>
            </div>
          </div>
      </div>

      {/* Full Background Cover Image */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        {/* Image container - full cover */}
        <div
          className="relative h-full w-full"
        >
          <Image
            src="/hero-boxers.webp"
            alt="Main event fighters image"
            fill
            priority
            sizes="100vw"            style={{ objectPosition: "center 20%" }}            className="object-contain object-top sm:object-cover sm:object-center"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/45 via-[#0d1124]/20 to-[#0d1124]/10 sm:from-[#0d1124]/70 sm:via-[#0d1124]/40 sm:to-[#0d1124]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/95 via-[#0d1124]/55 to-transparent sm:from-[#0d1124]/50 sm:via-transparent" />
        </div>
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#0d1124] to-transparent" />
    </section>
  )
}
