"use client"

import { useLanguage } from "@/contexts/language-context"

export function useLanguageStyles() {
  const { isRTL } = useLanguage()

  const getDirectionalClasses = (rtlClasses: string, ltrClasses: string) => {
    return isRTL ? rtlClasses : ltrClasses
  }

  return {
    getDirectionalClasses,
  }
}

