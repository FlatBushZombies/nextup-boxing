import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import { AuthProvider } from '@/lib/auth-context'
import { OnboardingGate } from '@/components/OnboardingGate'
import { PageLoader } from '@/components/PageLoader'
import { SmoothScroll } from '@/components/SmoothScroll'
import { JsonLd } from '@/components/JsonLd'
import './globals.css'

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})


export const metadata: Metadata = {
  // metadataBase makes all relative URLs in metadata absolute.
  // Next.js uses this to build canonical, OG, and Twitter image URLs.
  metadataBase: new URL(siteUrl),

  title: {
    // Child pages export title: 'Page Name' — template appends the brand.
    template: '%s | Next Up Boxing League',
    default: 'Next Up Boxing League — Showcasing Elite Amateurs™',
  },
  description:
    'Live amateur boxing events, fight night schedules, fighter rankings, and champions history. Watch the future of boxing with Next Up Boxing League.',
  keywords: [
    'boxing',
    'next up boxing league',
    'amateur boxing',
    'boxing events',
    'fight night',
    'boxing livestream',
    'boxing rankings',
    'boxing champions',
    'Long Island boxing',
    'Patchogue boxing',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Next Up Boxing League — Showcasing Elite Amateurs™',
    description:
      'Live amateur boxing events, fight night schedules, fighter rankings, and champions history.',
    type: 'website',
    url: '/',
    siteName: 'Next Up Boxing League',
    images: [
      {
        url: '/event-poster.png',
        width: 1200,
        height: 630,
        alt: 'Next Up Boxing League — Fight Night',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Up Boxing League — Showcasing Elite Amateurs™',
    description:
      'Live amateur boxing events, fight night schedules, fighter rankings, and champions history.',
    images: ['/event-poster.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${playfairDisplay.variable} bg-white`}
    >
      <body className="overflow-x-hidden font-sans antialiased">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              "@id": `${siteUrl}/#organization`,
              name: "Next Up Boxing League",
              alternateName: "NUBL",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              sport: "Boxing",
              description:
                "Next Up Boxing League promotes live amateur boxing events, showcasing elite amateur fighters through fight nights, livestreams, and championship bouts.",
              sameAs: [
                "https://www.instagram.com/nextupboxingleague/",
                "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A",
                "https://www.facebook.com/profile.php?id=61590315922265",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "Next Up Boxing League",
              publisher: { "@id": `${siteUrl}/#organization` },
            },
          ]}
        />
        <PageLoader />
        <SmoothScroll />
        <ClerkProvider>
          <AuthProvider>
            {children}
            <OnboardingGate />
          </AuthProvider>
        </ClerkProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
