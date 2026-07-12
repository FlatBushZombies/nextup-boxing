/**
 * Noindex wrapper for the /sso-callback route.
 * This is an OAuth redirect handler — not a meaningful page for search.
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function SSOCallbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
