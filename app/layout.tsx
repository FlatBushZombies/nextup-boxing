import type { Metadata, Viewport } from 'next'
import { Sora, Geist_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Next Up Boxing League | June 6, 2026',
  description: 'Witness the future of boxing. Sign up for exclusive livestream access to the most anticipated boxing event of 2026.',
  keywords: ['boxing', 'next up boxing league', 'livestream', 'boxing event', 'june 2026'],
  openGraph: {
    title: 'Next Up Boxing League | June 6, 2026',
    description: 'Witness the future of boxing. Sign up for exclusive livestream access to the most anticipated boxing event of 2026.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Up Boxing League | June 6, 2026',
    description: 'Witness the future of boxing. Sign up for exclusive livestream access.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${geistMono.variable} ${bebasNeue.variable} bg-white`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
