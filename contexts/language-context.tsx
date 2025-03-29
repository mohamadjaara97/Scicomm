"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "de"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize with browser language or default to Arabic
  const [language, setLanguageState] = useState<Language>("ar")
  const isRTL = language === "ar"

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "ar" || storedLanguage === "de")) {
      setLanguageState(storedLanguage)
    }

    // Set initial direction
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
  }, [])

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
  }, [language, isRTL])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "de" : "ar"
    setLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

