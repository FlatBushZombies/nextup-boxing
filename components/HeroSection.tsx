import Image from "next/image"
import { Reveal } from "@/components/Reveal"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#111111] sm:h-[100dvh] sm:min-h-[700px]"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/hero-boxers.webp"
          alt="Main event fighters"
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: "center 20%" }}
          className="object-contain object-top sm:object-cover sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-[#111111]/20" />
      </div>

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 z-[1] futuristic-grid opacity-20" />

      {/* Main content */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-7xl items-center justify-center px-4 pb-8 pt-28 sm:block sm:h-full sm:min-h-0 sm:px-8 sm:pb-0 sm:pt-0 lg:px-16">
        <div className="relative z-30 flex w-full max-w-[calc(100vw-2rem)] flex-col items-start gap-4 text-left sm:absolute sm:inset-x-auto sm:left-[6%] sm:bottom-10 sm:w-auto sm:max-w-[36rem] sm:gap-7 md:left-[7%] md:max-w-[40rem] lg:left-[8%] lg:bottom-16 xl:left-[9%]">
          {/* Event details */}
          <Reveal as="fade-up" className="flex flex-col items-start gap-2 sm:gap-3">
            {/* Date Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#111111]">
                Sat
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
                June 6th
              </span>
            </div>

            {/* League Name */}
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              Next Up Boxing League
            </span>

            {/* Event Title */}
            <h1 className="text-[3.2rem] uppercase leading-[0.95] text-[var(--gold-light)] min-[380px]:text-[3.8rem] sm:text-[5.6rem] md:text-[6rem] lg:text-[76px] font-display">
              Strong Island
              <span className="block text-[var(--crimson-light)]">Fight Night 11</span>
            </h1>

            {/* Time Info */}
            <div className="mt-2 inline-flex items-center gap-2 border border-white/20 px-4 py-2">
              <span className="pulse-glow h-2 w-2 rounded-full bg-white" />
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
                5 PM Sharp
              </span>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal as="fade-up" delay={120} className="relative z-30 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center bg-white px-8 py-3 text-center text-sm font-medium uppercase tracking-wide text-[#111111] transition-colors hover:bg-gold hover:text-[#111111]"
            >
              Get Tickets
            </a>

            <a
              href="#livestream"
              className="flex min-h-12 w-full sm:w-auto items-center justify-center border border-white/30 bg-transparent px-8 py-3 text-center text-sm font-medium uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              Free Livestream
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
