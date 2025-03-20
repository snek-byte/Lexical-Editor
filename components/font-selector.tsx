"use client"

import { useState } from "react"
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

// Font options
const fontOptions = [
  { name: "Inter", font: inter, variable: "--font-inter" },
  { name: "Roboto", font: roboto, variable: "--font-roboto" },
  { name: "Lato", font: lato, variable: "--font-lato" },
  { name: "Open Sans", font: openSans, variable: "--font-open-sans" },
  { name: "Montserrat", font: montserrat, variable: "--font-montserrat" },
  { name: "Roboto Condensed", font: robotoCondensed, variable: "--font-roboto-condensed" },
  { name: "Source Sans 3", font: sourceSans, variable: "--font-source-sans" },
  { name: "Oswald", font: oswald, variable: "--font-oswald" },
  { name: "Raleway", font: raleway, variable: "--font-raleway" },
  { name: "Poppins", font: poppins, variable: "--font-poppins" },
  { name: "Nunito", font: nunito, variable: "--font-nunito" },
  { name: "Playfair Display", font: playfair, variable: "--font-playfair" },
  { name: "Merriweather", font: merriweather, variable: "--font-merriweather" },
  { name: "Ubuntu", font: ubuntu, variable: "--font-ubuntu" },
  { name: "Rubik", font: rubik, variable: "--font-rubik" },
]

interface FontSelectorProps {
  onFontChange: (fontName: string, fontVariable: string) => void
}

export default function FontSelector({ onFontChange }: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState("Inter")

  const handleFontSelect = (fontName: string, fontVariable: string) => {
    setSelectedFont(fontName)
    onFontChange(fontName, fontVariable)
  }

  return (
    <div className="p-3">
      {fontOptions.map((font) => (
        <button
          key={font.name}
          className={`font-option-glassmorphic block w-full text-left p-2 my-1 ${
            selectedFont === font.name ? "selected" : ""
          }`}
          style={{ fontFamily: `var(${font.variable})` }}
          onClick={() => handleFontSelect(font.name, font.variable)}
        >
          {font.name}
        </button>
      ))}
    </div>
  )
}

