"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function MethodologySection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="methodology" className="section-container bg-secondary-custom">
      <h2 className="section-title">{t.methodology.title}</h2>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {t.methodology.steps.map((step, index) => (
            <div key={index} className="mb-12 relative">
              <div className="flex">
                <div className={`flex flex-col items-center ${isRTL ? "ml-6" : "mr-6"}`}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-custom text-white font-bold">
                    {step.number}
                  </div>
                  {index < t.methodology.steps.length - 1 && (
                    <div className="h-full w-0.5 bg-primary-custom mt-3"></div>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1 border border-primary-custom">
                  <h3 className="text-xl font-bold mb-2 text-primary-custom">{step.title}</h3>
                  <p className="text-muted-custom">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-primary-custom">
          <h3 className="text-xl font-bold mb-4 text-primary-custom flex items-center">
            <CheckCircle className={isRTL ? "ml-2" : "mr-2"} /> {t.methodology.principles.title}
          </h3>
          <ul className="space-y-2">
            {t.methodology.principles.list.map((principle, index) => (
              <li key={index} className="flex items-start">
                <span className={`text-primary-custom ${isRTL ? "ml-2" : "mr-2"}`}>•</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

