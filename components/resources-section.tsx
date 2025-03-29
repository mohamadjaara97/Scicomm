"use client"

import { FileText, Download } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function ResourcesSection() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const resources = [
    {
      title: t.resources.proposalTitle,
      description: t.resources.proposalDescription,
      type: "pdf",
      icon: <FileText className="h-8 w-8 text-primary-custom" />,
      filename: isRTL ? "مقترح_اللجنة_العلمية.pdf" : "Vorschlag_Wissenschaftliches_Komitee.pdf",
    },
  ]

  const handleDownload = async (resource) => {
    setIsDownloading(true)

    try {
      // Fetch the document content from the public folder
      const response = await fetch(
        isRTL ? "/documents/مقترح_اللجنة_العلمية.txt" : "/documents/Vorschlag_Wissenschaftliches_Komitee.txt",
      )
      const text = await response.text()

      // Create a Blob from the text content
      const blob = new Blob([text], { type: "application/pdf" })

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a")
      a.href = url
      a.download = resource.filename
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Show success message
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      console.error("Download failed:", error)
      setIsDownloading(false)
    }
  }

  return (
    <section id="resources" className="section-container">
      <h2 className="section-title">{t.resources.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary-custom">{t.resources.downloadTitle}</h3>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-secondary-custom p-4 rounded-lg border border-primary-custom flex items-start"
              >
                <div className={isRTL ? "ml-4 mt-1" : "mr-4 mt-1"}>{resource.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">{resource.title}</h4>
                  <p className="text-sm text-muted-custom mb-2">{resource.description}</p>
                  <button
                    onClick={() => handleDownload(resource)}
                    disabled={isDownloading}
                    className="text-primary-custom hover:text-primary-dark text-sm font-medium flex items-center"
                  >
                    <Download className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                    {isDownloading ? t.resources.downloading : `${t.resources.download} (${resource.type})`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-primary-custom">
            <h4 className="font-bold mb-4 text-primary-custom">{t.resources.documentContentTitle}</h4>
            <p className="text-sm text-muted-custom mb-4">{t.resources.documentContentDescription}</p>
            <ul className={`space-y-2 text-sm text-muted-custom list-disc ${isRTL ? "pr-5" : "pl-5"}`}>
              {t.resources.documentSections.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-primary-custom">{t.resources.usefulLinksTitle}</h3>
          <div className="bg-secondary-custom p-6 rounded-lg border border-primary-custom">
            <ul className="space-y-4">
              {t.resources.usefulLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-900 hover:text-primary-custom transition-colors"
                  >
                    <FileText className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-primary-custom">
            <h4 className="font-bold mb-2 text-primary-custom">{t.resources.contactTitle}</h4>
            <p className="text-sm text-muted-custom mb-4">{t.resources.contactDescription}</p>
            <p className="text-sm font-medium">
              {t.resources.email} <span className="text-primary-custom">scicomm@sysunion.de</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

