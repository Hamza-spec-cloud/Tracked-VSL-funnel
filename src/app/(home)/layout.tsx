import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pre-Call Materials — Arysn",
  description:
    "Your System Diagnostic is scheduled but not yet confirmed. Watch the orientation video, confirm via text or WhatsApp, and prepare with the pre-call materials below.",
}

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Wistia scripts host — warm TCP+TLS before player.js is requested */}
        <link rel="preconnect" href="https://fast.wistia.com" crossOrigin="anonymous" />
        {/* Wistia CDN domains — early DNS resolution for video files */}
        <link rel="dns-prefetch" href="https://embedwistia-a.akamaihd.net" />
        <link rel="dns-prefetch" href="https://distillery.wistia.com" />
        <link rel="dns-prefetch" href="https://embed-ssl.wistia.com" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
