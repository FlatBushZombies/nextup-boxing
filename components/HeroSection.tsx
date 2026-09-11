import Image from "next/image"
import { Reveal } from "@/components/Reveal"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#111111] sm:min-h-[700px]"
    >
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 futuristic-grid opacity-20" />

      {/* Main content — info left, poster right, both fully visible (no overlap) */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-28 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:px-16 lg:py-20">
        {/* Info */}
        <div className="order-2 flex flex-col items-start gap-4 text-left lg:order-1">
          {/* Event details */}
          <Reveal as="fade-up" className="flex flex-col items-start gap-2 sm:gap-3">
            {/* Date Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#111111]">
                Sat
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
                Sept 12th
              </span>
            </div>

            {/* League Name */}
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              Next Up Boxing League
            </span>

            {/* Event Title */}
            <h1 className="text-[3.2rem] uppercase leading-[0.95] text-[var(--gold-light)] min-[380px]:text-[3.8rem] sm:text-[5.6rem] md:text-[6rem] lg:text-[76px] font-display">
              Strong Island
              <span className="block text-[var(--crimson-light)]">Fight Night 12</span>
            </h1>

            {/* Time Info */}
            <div className="mt-2 inline-flex items-center gap-2 border border-white/20 px-4 py-2">
              <span className="pulse-glow h-2 w-2 rounded-full bg-white" />
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-white">
                Doors 4:30 · Fights 6 PM
              </span>
            </div>

            {/* Venue */}
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
              Stereo Garden · 9 Railroad Ave, Patchogue NY
            </span>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal as="fade-up" delay={120} className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="https://strongislandfights.com"
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

        {/* Poster */}
        <Reveal as="fade-in" className="order-1 lg:order-2">
          <div className="relative w-full aspect-[2011/782]">
            <Image
              src="/12-sept-poster.webp"
              alt="Strong Island Fight Night 12 — September 12 event poster"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
