"use client"

import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"

export default function AdminHeader() {
  const { language, isRTL } = useLanguage()
  const t = {
    ar: {
      title: "لوحة التحكم",
      subtitle: "إدارة محتوى الموقع",
    },
    de: {
      title: "Admin-Dashboard",
      subtitle: "Website-Inhaltsverwaltung",
    },
  }

  return (
    <header className="bg-primary-custom text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">{t[language].title}</h1>
          <p className="text-sm opacity-90">{t[language].subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="text" className="text-white hover:text-gray-200" />
        </div>
      </div>
    </header>
  )
}

