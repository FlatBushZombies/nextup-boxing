"use client"

import { useState } from "react"
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(184,150,46,0.18),transparent_62%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={`relative transition-transform duration-500 ease-out ${
          isHovered ? "-translate-y-2 rotate-[1deg]" : ""
        }`}
      >
        <div className="absolute -right-4 top-5 hidden h-[88%] w-full rounded-[1.75rem] border border-[#0d1124]/10 bg-white/35 lg:block" />

        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#0d1124]/12 bg-white p-4 shadow-[0_30px_80px_rgba(13,17,36,0.18)]">
          <div className="relative aspect-[0.74] overflow-hidden rounded-[1.1rem] bg-[#ddd6ca]">
            <Image
              src={coverImage}
              alt={issueName}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-white/6" />

            <div className="absolute left-4 top-4 z-10 rounded-full bg-[#c5203a] px-3 py-1 shadow-lg">
              <span className="editorial-meta text-white">{issueNumber}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0d1124]/85 via-[#0d1124]/35 to-transparent px-5 pb-5 pt-12 text-white">
              <p className="editorial-meta text-[#e7c868]">Next Up Magazine</p>
              <h3
                className="mt-2 text-[clamp(2rem,5vw,2.7rem)] uppercase leading-[0.92]"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                {issueName}
              </h3>
            </div>
          </div>

          <div className="mt-5 text-center">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#0d1124]/18 to-[#0d1124]/12" />
              <span className="editorial-meta text-[#0d1124]/42">Featured Cover</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#0d1124]/18 to-[#0d1124]/12" />
            </div>

            {releaseDate ? (
              <p className="text-sm uppercase tracking-[0.18em] text-[#0d1124]/52">
                {releaseDate}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
