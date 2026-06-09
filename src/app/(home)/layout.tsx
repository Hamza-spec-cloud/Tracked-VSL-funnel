import type { Metadata } from "next"
import { Inter } from "next/font/google"
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
      <body>{children}</body>
    </html>
  )
}
