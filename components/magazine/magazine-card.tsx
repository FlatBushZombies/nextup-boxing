import Image from "next/image"

interface MagazineCardProps {
  coverImage: string
  issueName: string
  issueNumber: string
  releaseDate?: string
}

export function MagazineCard({
  coverImage,
  issueName,
  issueNumber,
  releaseDate,
}: MagazineCardProps) {
  return (
    <div className="group relative">
      <div className="relative overflow-hidden border border-white/15 bg-[#1a1a1a] p-3">
        <div className="relative aspect-[0.74] overflow-hidden bg-[#0a0a0a]">
          <Image
            src={coverImage}
            alt={issueName}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

          {/* Issue number badge */}
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5">
            <span className="text-xs font-medium uppercase tracking-widest text-[#111111]">{issueNumber}</span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-12 text-white">
            <p className="text-xs font-medium uppercase tracking-widest text-white/60">Next Up Magazine</p>
            <h3 className="mt-1.5 text-[clamp(2.2rem,5vw,3rem)] uppercase leading-[0.88] font-display">
              {issueName}
            </h3>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="mb-2.5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">Featured Cover</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {releaseDate ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              {releaseDate}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
