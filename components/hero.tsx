"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function Hero() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <div className="relative bg-secondary-custom overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
            <div className={`text-center lg:text-${isRTL ? "right" : "left"}`}>
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                <span className="block">{t.hero.title1}</span>
                <span className="block text-primary-custom">{t.hero.title2}</span>
              </h1>
              <p className="mt-3 text-base text-muted-custom sm:mt-5 sm:text-lg max-w-xl mx-auto lg:mx-0">
                {t.hero.description}
              </p>
              <div
                className={`mt-5 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-${isRTL ? "end" : "start"} gap-3 sm:gap-4`}
              >
                <Link href="#about" className="btn-primary flex items-center justify-center px-8 py-3 w-full sm:w-auto">
                  {t.hero.learnMore}
                </Link>
                <Link
                  href="#contact"
                  className="btn-outline flex items-center justify-center px-8 py-3 w-full sm:w-auto"
                >
                  {t.hero.contactUs}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/academic-collaboration.webp"
              alt={isRTL ? "التعاون الأكاديمي والتبادل المعرفي" : "Akademische Zusammenarbeit und Wissensaustausch"}
              width={800}
              height={600}
              className="h-56 w-full object-contain sm:h-72 md:h-96 lg:h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

