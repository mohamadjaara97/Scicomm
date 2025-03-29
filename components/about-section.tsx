"use client"

import { BookOpen, Users, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function AboutSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="about" className="section-container">
      <h2 className="section-title">{t.about.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg mb-6">{t.about.description1}</p>
          <p className="text-lg mb-6">{t.about.description2}</p>
          <p className="text-lg">{t.about.description3}</p>
        </div>

        <div className="bg-secondary-custom p-8 rounded-lg shadow-md border border-primary-custom">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary-custom mb-4 flex items-center">
              <BookOpen className={isRTL ? "ml-2" : "mr-2"} /> {t.about.vision.title}
            </h3>
            <p className="text-muted-custom">{t.about.vision.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary-custom mb-4 flex items-center">
              <Users className={isRTL ? "ml-2" : "mr-2"} /> {t.about.mission.title}
            </h3>
            <p className="text-muted-custom">{t.about.mission.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary-custom mb-4 flex items-center">
              <Award className={isRTL ? "ml-2" : "mr-2"} /> {t.about.values.title}
            </h3>
            <p className="text-muted-custom">{t.about.values.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

