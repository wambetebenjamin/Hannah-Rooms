import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import CookieConsent from '@/components/CookieConsent'
import LoadingScreen from '@/components/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import VoiceTour from '@/components/VoiceTour'
import WhatsAppButton from '@/components/WhatsAppButton'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Find boarding and short-stay rooms across Kenyan towns with photos, clear KES weekly and monthly prices, house rules, safety tips, and direct host contact.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-KE">
      <head>
        {/* Google Fonts, same families as vacation-rental-master */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,500,500i,600,600i,700,700i&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-sm text-gray-600 antialiased sm:text-base">
        <LoadingScreen />
        <SmoothScroll />
        {children}
        <CookieConsent />
        <WhatsAppButton />
        <VoiceTour />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
