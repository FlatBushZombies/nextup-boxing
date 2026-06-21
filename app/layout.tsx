import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider } from '@clerk/nextjs'
import { AuthProvider } from '@/lib/auth-context'
import { OnboardingGate } from '@/components/OnboardingGate'
import { PageLoader } from '@/components/PageLoader'
import './globals.css'

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
  title: 'Next Up Boxing League - Showcasing Elite Amateurs™',
  description:
    'Witness the future of boxing. Sign up for exclusive livestream access and event highlights.',
  keywords: [
    'boxing',
    'next up boxing league',
    'livestream',
    'boxing event',
    '2026',
  ],
  openGraph: {
    title: 'Next Up Boxing League - Showcasing Elite Amateurs™',
    description:
      'Witness the future of boxing. Sign up for exclusive livestream access and event highlights.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Up Boxing League - Showcasing Elite Amateurs™',
    description: 'Witness the future of boxing. Sign up for exclusive livestream access.',
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
        <PageLoader />
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
