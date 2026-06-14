const sponsors = [
  { name: "BULOVAS RESTORATIONS", url: "https://www.bulovasrestorations.com/index.html" },
  { name: "M&T STRONG CONCRETE", url: "https://mbstrongconcrete.com/" },
]

const sponsorTickerItems = Array.from({ length: 6 }, () => sponsors).flat()
const sponsorTickerTrack = [...sponsorTickerItems, ...sponsorTickerItems]

export function SponsorsStrip() {
  return (
    <section className="bg-[#f5f5f5] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="section-eyebrow text-xs tracking-[0.1em] text-[#707072]">
          Official Partners and Sponsors
        </span>
      </div>

      <div className="sponsor-ticker-wrap" aria-label="Official sponsor ticker">
        <div className="sponsor-ticker-fade sponsor-ticker-fade--l" aria-hidden="true" />
        <div className="sponsor-ticker-fade sponsor-ticker-fade--r" aria-hidden="true" />

        <div className="sponsor-ticker-track">
          {sponsorTickerTrack.map((sponsor, i) => (
            <a
              key={`${sponsor.name}-${i}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-ticker-item"
            >
              {sponsor.name}
              <span className="sponsor-ticker-gem" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
