import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Roboto } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

// Use Tajawal font which supports Arabic characters well
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

// Use Roboto for German text
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "مبادرة التعاون الأكاديمي السوري الألماني | Syrisch-Deutsche Akademische Kooperationsinitiative",
  description:
    "مبادرة لتعزيز التعاون الأكاديمي بين الجامعات السورية والألمانية | Eine Initiative zur Förderung der akademischen Zusammenarbeit zwischen syrischen und deutschen Universitäten",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      <html suppressHydrationWarning>
        <body className={`${tajawal.variable} ${roboto.variable} font-sans bg-white`}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  )
}

