/**
 * Server-component layout for /boxers.
 * The page itself is "use client" so can't export metadata.
 * This layout owns the metadata and renders children unchanged.
 */
import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Boxers & Champions",
  description:
    "Meet the Next Up Boxing League fighters — current champions, rising stars, and contenders across all weight classes. Filter by weight division, search by name, and explore fight records.",
  alternates: {
    canonical: "/boxers",
  },
  openGraph: {
    title: "Boxers & Champions | Next Up Boxing League",
    description:
      "Current champions, rising stars, and contenders across all Next Up Boxing League weight classes.",
    url: "/boxers",
  },
}

export default function BoxersLayout({ children }: { children: React.ReactNode }) {
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
              name: "Boxers",
              item: `${siteUrl}/boxers`,
            },
          ],
        }}
      />
      {children}
    </>
  )
}
