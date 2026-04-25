import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/LenisProvider"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import { WEDDING } from "@/lib/constants"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${WEDDING.fullTitle} — Wedding Invitation`,
  description: `Join us to celebrate the wedding of ${WEDDING.fullTitle} on ${WEDDING.date}.`,
  openGraph: {
    title: `${WEDDING.fullTitle} — ${WEDDING.date}`,
    description: "You are invited to our wedding celebration.",
    images: ["/images/couple.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} bg-(--color-ivory) scroll-smooth`}>
      <body className="antialiased font-montserrat min-h-screen text-(--color-deep) flex flex-col relative">
        <ScrollProgressBar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
