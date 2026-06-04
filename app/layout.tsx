import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Bebas_Neue, Montserrat, Oswald } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const helveticaNow = localFont({
  src: [
    {
      path: '../public/fonts/helveticanowtext-bold-demo.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/helveticanowtext-bolditalic-demo.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/helveticanowtext-black-demo.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/helveticanowtext-blackitalic-demo.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['800', '900'],
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['600', '700'],
  display: 'swap',
})


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
    <html
      lang="en"
      className={`${helveticaNow.variable} ${geistMono.variable} ${bebasNeue.variable} ${montserrat.variable} ${oswald.variable} bg-white`}
    >
      <body className="overflow-x-hidden font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
