/**
 * Server-component layout for /rankings.
 * The page itself is "use client" so can't export metadata.
 * This layout owns the metadata and renders children unchanged.
 */
import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Fighter Rankings",
  description:
    "Official Next Up Boxing League rankings across all weight divisions — Heavyweight, Cruiserweight, Light Heavyweight, Middleweight, Welterweight, Lightweight, and Super Featherweight. Updated weekly.",
  alternates: {
    canonical: "/rankings",
  },
  openGraph: {
    title: "Fighter Rankings | Next Up Boxing League",
    description:
      "Official Next Up Boxing League rankings across all weight divisions, updated weekly.",
    url: "/rankings",
  },
}

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Rankings",
              item: `${siteUrl}/rankings`,
            },
          ],
        }}
      />
      {children}
    </>
  )
}
