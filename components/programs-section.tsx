"use client"

import { Handshake, BookOpen, GraduationCap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import Link from "next/link"

export default function ProgramsSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="programs" className="section-container">
      <h2 className="section-title">{t.programs.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {t.programs.programsList.map((program, index) => {
          let icon
          if (index === 0) icon = <Handshake className="h-12 w-12 text-primary-custom" />
          else if (index === 1) icon = <BookOpen className="h-12 w-12 text-primary-custom" />
          else icon = <GraduationCap className="h-12 w-12 text-primary-custom" />

          return (
            <div key={index} className="bg-white border border-primary-custom rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="inline-block mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-muted-custom mb-6">{program.description}</p>
              </div>

              <div className="bg-secondary-custom p-6 border-t border-primary-custom">
                <h4 className="font-bold mb-3 text-primary-custom">
                  {isRTL ? "الأنشطة الرئيسية:" : "Hauptaktivitäten:"}
                </h4>
                <ul className="space-y-2">
                  {program.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`text-primary-custom ${isRTL ? "ml-2" : "mr-2"}`}>•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-6">{t.programs.conclusion}</p>
        <Link href="#contact" className="btn-primary inline-block">
          {t.programs.participateButton}
        </Link>
      </div>
    </section>
  )
}

