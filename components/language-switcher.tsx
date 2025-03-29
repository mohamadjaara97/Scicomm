"use client"

import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LanguageSwitcherProps {
  variant?: "icon" | "text" | "full"
  className?: string
}

export default function LanguageSwitcher({ variant = "full", className = "" }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage()

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLanguage}
        className={`rounded-full ${className}`}
        aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
      >
        <Globe className="h-5 w-5" />
      </Button>
    )
  }

  if (variant === "text") {
    return (
      <Button
        variant="ghost"
        onClick={toggleLanguage}
        className={`text-sm font-medium ${className}`}
        aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
      >
        {language === "ar" ? "Deutsch" : "العربية"}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 text-sm font-medium ${className}`}
      aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
    >
      <Globe className="h-4 w-4" />
      {language === "ar" ? "Deutsch" : "العربية"}
    </Button>
  )
}

