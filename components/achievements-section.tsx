"use client"

import { Trophy, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import Link from "next/link"

export default function AchievementsSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="achievements" className="section-container">
      <h2 className="section-title">{t.achievements.title}</h2>

      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
          <Trophy className={`${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} /> {t.achievements.achievementsTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.achievements.achievementsList.map((achievement, index) => (
            <div key={index} className="bg-white border border-primary-custom rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-bold mb-2 text-primary-custom">{achievement.title}</h4>
              <p className="text-muted-custom">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
          <AlertTriangle className={`${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />{" "}
          {t.achievements.challengesTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.achievements.challengesList.map((challenge, index) => (
            <div key={index} className="bg-secondary-custom border border-primary-custom rounded-lg p-6 shadow-md">
              <h4 className="text-xl font-bold mb-2 text-primary-custom">{challenge.title}</h4>
              <p className="text-muted-custom">{challenge.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">{t.achievements.conclusion}</p>
          <Link href="#contact" className="btn-primary inline-block">
            {t.achievements.supportButton}
          </Link>
        </div>
      </div>
    </section>
  )
}

