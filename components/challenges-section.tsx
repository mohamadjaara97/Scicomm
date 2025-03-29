"use client"

import { AlertTriangle, Target, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function ChallengesSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="challenges" className="section-container bg-secondary-custom">
      <h2 className="section-title">{t.challenges.title}</h2>

      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
          <AlertTriangle className={`${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />{" "}
          {t.challenges.currentChallenges}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.challenges.challengesList.map((challenge, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-primary-custom" />
                <h4 className={`text-xl font-bold ${isRTL ? "mr-3" : "ml-3"}`}>{challenge.title}</h4>
              </div>
              <p className="text-muted-custom">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
          <CheckCircle className={`${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} /> {t.challenges.ourObjectives}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.challenges.objectivesList.map((objective, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary-custom" />
                <h4 className={`text-xl font-bold ${isRTL ? "mr-3" : "ml-3"}`}>{objective.title}</h4>
              </div>
              <p className="text-muted-custom">{objective.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

