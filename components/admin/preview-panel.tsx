"use client"
import { useLanguage } from "@/contexts/language-context"
import { X } from "lucide-react"

interface PreviewPanelProps {
  isOpen: boolean
  onClose: () => void
  content: any
  contentType: "news" | "section"
}

export default function PreviewPanel({ isOpen, onClose, content, contentType }: PreviewPanelProps) {
  const { language, isRTL } = useLanguage()

  const t = {
    ar: {
      previewTitle: "معاينة المحتوى",
      viewOnSite: "عرض على الموقع",
      close: "إغلاق",
      newsPreview: "معاينة الخبر",
      sectionPreview: "معاينة القسم",
    },
    de: {
      previewTitle: "Inhaltsvorschau",
      viewOnSite: "Auf der Website anzeigen",
      close: "Schließen",
      newsPreview: "Nachrichtenvorschau",
      sectionPreview: "Bereichsvorschau",
    },
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="bg-primary-custom text-white p-4 flex justify-between items-center">
          <h3 className="font-bold">{contentType === "news" ? t[language].newsPreview : t[language].sectionPreview}</h3>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-red-700 rounded" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {contentType === "news" && (
            <div className="prose max-w-none">
              <h1>{language === "ar" ? content.title_ar : content.title_de}</h1>
              <p className="text-sm text-muted-custom">{content.date}</p>
              <div className="mt-4">{language === "ar" ? content.content_ar : content.content_de}</div>
            </div>
          )}

          {contentType === "section" && (
            <div className="prose max-w-none">
              <h2>{language === "ar" ? content.name_ar : content.name_de}</h2>
              <div className="mt-4 p-4 border border-primary-custom rounded-lg">
                {language === "ar" ? content.content_ar : content.content_de}
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button onClick={onClose} className="btn-outline flex items-center gap-2">
            {t[language].close}
          </button>
        </div>
      </div>
    </div>
  )
}

