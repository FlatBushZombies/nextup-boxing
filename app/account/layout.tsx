/**
 * Noindex wrapper for all /account/* routes.
 * The dashboard is auth-protected and should never appear in search results.
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
