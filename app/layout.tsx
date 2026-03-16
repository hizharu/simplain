

import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/organisms/Navbar"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
})

const inter = Inter ({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: 'Simplain',
  description: 'Your simple app description',
  icons: {
    icon: '/favicon.ico', // pastikan file ada di folder public
    apple: '/apple-icon.png', // opsional untuk iPhone
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-[#62A2F3] min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  )
}