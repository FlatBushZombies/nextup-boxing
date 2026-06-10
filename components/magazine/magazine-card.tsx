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
      <div className="absolute -inset-6 bg-[radial-gradient(circle,rgba(184,150,46,0.12),transparent_62%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={`relative transition-transform duration-500 ease-out ${
          isHovered ? "-translate-y-2 rotate-[0.5deg]" : ""
        }`}
      >
        {/* Shadow-esque frame backing */}
        <div className="absolute -right-3 top-3 hidden h-[96%] w-full border border-ink bg-ink/5 lg:block" />

        <div className="relative overflow-hidden border-4 border-ink bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="relative aspect-[0.74] overflow-hidden bg-[#ddd6ca]">
            <Image
              src={coverImage}
              alt={issueName}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/6" />

            {/* Skewed issue number badge */}
            <div className="absolute left-4 top-4 z-10 bg-accent px-3 py-1.5 shadow-md skew-x-[-10deg]">
              <span className="editorial-meta text-white skew-x-[10deg] block font-display font-black tracking-widest">{issueNumber}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent px-5 pb-5 pt-12 text-white">
              <p className="editorial-meta text-secondary font-display tracking-widest font-black text-sm">Next Up Magazine</p>
              <h3
                className="mt-1.5 text-[clamp(2.2rem,5vw,3rem)] uppercase leading-[0.88] font-display font-black tracking-wide"
              >
                {issueName}
              </h3>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="mb-2.5 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-ink/15 to-ink/10" />
              <span className="editorial-meta text-ink/40 font-display font-bold tracking-wider">Featured Cover</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-ink/15 to-ink/10" />
            </div>

            {releaseDate ? (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60 font-sans">
                {releaseDate}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
