import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import {
  Inter,
  Roboto,
  Lato,
  Open_Sans,
  Montserrat,
  Roboto_Condensed,
  Source_Sans_3,
  Oswald,
  Raleway,
  Poppins,
  Nunito,
  Playfair_Display,
  Merriweather,
  Ubuntu,
  Rubik,
} from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Initialize fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-roboto" })
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], variable: "--font-roboto-condensed" })
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" })
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-poppins" })
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-merriweather" })
const ubuntu = Ubuntu({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-ubuntu" })
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" })

export const metadata: Metadata = {
  title: "Rich Text Editor",
  description: "A rich text editor with drag, resize, and rotate functionality",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${lato.variable} ${openSans.variable} ${montserrat.variable} ${robotoCondensed.variable} ${sourceSans.variable} ${oswald.variable} ${raleway.variable} ${poppins.variable} ${nunito.variable} ${playfair.variable} ${merriweather.variable} ${ubuntu.variable} ${rubik.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'