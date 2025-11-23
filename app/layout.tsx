import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CursorTrail } from "@/components/cursor-trail"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crush Confession Roulette - Anonymous campus confessions",
  description: "The anonymous crush line for your campus, always on. Powered by Kupid Dating.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CursorTrail />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
