"use client"

import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ChallengesSection from "@/components/challenges-section"
import ProgramsSection from "@/components/programs-section"
import MethodologySection from "@/components/methodology-section"
import AchievementsSection from "@/components/achievements-section"
import ContactSection from "@/components/contact-section"
import ResourcesSection from "@/components/resources-section"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export default function Home() {
  const { language, isRTL } = useLanguage()

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language

    // Force layout recalculation
    document.body.style.display = "none"
    document.body.offsetHeight // Force a reflow
    document.body.style.display = ""
  }, [language, isRTL])

  return (
    <>
      <Hero />
      <AboutSection />
      <ChallengesSection />
      <ProgramsSection />
      <MethodologySection />
      <AchievementsSection />
      <ResourcesSection />
      <ContactSection />
    </>
  )
}

