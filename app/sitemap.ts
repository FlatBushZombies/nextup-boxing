import type { MetadataRoute } from "next"

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

// Last-modified dates reflect content cadence, not code change dates.
// Update the event pages date whenever the fight card is refreshed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/boxers`,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/rankings`,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/champions`,
      lastModified: new Date("2026-06-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
