import type { MetadataRoute } from "next"

const siteUrl = process.env.SITE_URL || "http://localhost:3000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account/",   // auth-protected dashboard
          "/api/",       // server-only API routes
          "/sso-callback", // OAuth callback; not a meaningful page
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
