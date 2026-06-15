import { Reveal } from "@/components/Reveal"
import { MagazineCard } from "./magazine-card"

const magazines = [
  {
    coverImage: "/nextupmagcover.jpg",
    issueName: "The Championship",
    issueNumber: "Issue 01",
    releaseDate: "Summer 2026",
  },
]

export function MagazineSection() {
  const featuredIssue = magazines[0]

  return (
    <section
      id="magazine"
      className="relative overflow-hidden bg-[#111111] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8 border-t border-[#e5e5e5]"
    >
      <div className="relative mx-auto max-w-6xl">
        <Reveal as="fade-up" className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            Magazine
          </span>

          <h2 className="text-[64px] uppercase leading-[0.95] font-display text-[var(--gold-light)]">
            Inside The
            <span className="block text-[var(--crimson-light)]">Fight Issue</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            Long-form reporting, fighter profiles, championship analysis, and the stories that shape
            the sport beyond the final bell. Our magazine is built to feel collectible, informed, and
            rooted in the culture of boxing.
          </p>
        </Reveal>

        <div className="relative mt-16 flex justify-center">
          <Reveal as="slide-right" delay={100} className="relative z-10 w-full max-w-[420px]">
            <MagazineCard {...featuredIssue} />

            <div className="mt-6 flex items-center justify-center gap-3 border border-white/15 px-4 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white pulse-glow" />
              <span className="text-[0.7rem] uppercase tracking-[0.25em] text-white/70">
                Digital versions dropping soon
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-white pulse-glow" />
            </div>
          </Reveal>
        </div>

        <Reveal as="fade-up" delay={150} className="mt-16 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 border border-white/10 px-6 py-8">
            <p className="text-xs font-medium uppercase tracking-widest text-white/50">Editorial Release</p>
            <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Be first to read each new issue, from cover features and ringside essays to the sharp
              analysis behind boxing&apos;s biggest moments.
            </p>
            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:flex-row">
              <button className="rounded-full bg-white px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-[#111111] transition-colors hover:bg-[#e5e5e5] cursor-pointer">
                Read The Issue
              </button>
              <button className="rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:border-white/40 cursor-pointer">
                Join The List
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
