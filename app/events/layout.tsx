/**
 * Server-component layout for /events.
 * The page itself is "use client" so can't export metadata.
 * This layout owns the metadata and renders children unchanged.
 */
import type { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming fight night schedule and past results for Next Up Boxing League. Bouts, venues, fight cards, and division results — all in one place.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Boxing Events | Next Up Boxing League",
    description:
      "Upcoming fight nights and past results. Full schedule, fight cards, and bout results for every Next Up Boxing League event.",
    url: "/events",
  },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
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
              name: "Events",
              item: `${siteUrl}/events`,
            },
          ],
        }}
      />
      {children}
    </>
  )
}
