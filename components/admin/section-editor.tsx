"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Save, Eye, ChevronDown, ChevronUp } from "lucide-react"

interface Section {
  id: string
  name_ar: string
  name_de: string
  content_ar: string
  content_de: string
  type: "text" | "html" | "image"
}

// Update the component props to include onPreview
interface SectionEditorProps {
  onPreview?: (content: Section) => void
}

export default function SectionEditor({ onPreview }: SectionEditorProps) {
  const { language, isRTL } = useLanguage()
  const [sections, setSections] = useState<Section[]>([
    {
      id: "hero",
      name_ar: "القسم الرئيسي",
      name_de: "Hauptbereich",
      content_ar: "مبادرة التعاون الأكاديمي السوري الألماني",
      content_de: "Syrisch-Deutsche Akademische Kooperationsinitiative",
      type: "text",
    },
    {
      id: "about",
      name_ar: "التعريف بالمبادرة",
      name_de: "Über die Initiative",
      content_ar: "مبادرة التعاون الأكاديمي السوري الألماني هي مشروع تحت رعاية اتحاد الطلبة السوريين في ألمانيا...",
      content_de:
        "Die Syrisch-Deutsche Akademische Kooperationsinitiative ist ein Projekt unter der Schirmherrschaft des Verbands Syrischer Studierender in Deutschland...",
      type: "html",
    },
    {
      id: "challenges",
      name_ar: "التحديات والأهداف",
      name_de: "Herausforderungen & Ziele",
      content_ar: "يعاني الواقع العلمي في سوريا من عدة تحديات رئيسية...",
      content_de: "Die wissenschaftliche Realität in Syrien steht vor mehreren Hauptherausforderungen...",
      type: "html",
    },
  ])

  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState<{ [key: string]: { ar: string; de: string } }>({})
  const [previewMode, setPreviewMode] = useState(false)

  const t = {
    ar: {
      title: "تعديل أقسام الموقع",
      save: "حفظ التغييرات",
      preview: "معاينة",
      editArabic: "تعديل المحتوى العربي",
      editGerman: "تعديل المحتوى الألماني",
      expand: "توسيع",
      collapse: "طي",
      saveSuccess: "تم حفظ التغييرات بنجاح",
    },
    de: {
      title: "Website-Bereiche bearbeiten",
      save: "Änderungen speichern",
      preview: "Vorschau",
      editArabic: "Arabischen Inhalt bearbeiten",
      editGerman: "Deutschen Inhalt bearbeiten",
      expand: "Erweitern",
      collapse: "Einklappen",
      saveSuccess: "Änderungen erfolgreich gespeichert",
    },
  }

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null)
    } else {
      setExpandedSection(sectionId)

      // Initialize edited content if not already done
      if (!editedContent[sectionId]) {
        const section = sections.find((s) => s.id === sectionId)
        if (section) {
          setEditedContent({
            ...editedContent,
            [sectionId]: {
              ar: section.content_ar,
              de: section.content_de,
            },
          })
        }
      }
    }
  }

  const handleContentChange = (sectionId: string, lang: "ar" | "de", value: string) => {
    setEditedContent({
      ...editedContent,
      [sectionId]: {
        ...editedContent[sectionId],
        [lang]: value,
      },
    })
  }

  const handleSave = (sectionId: string) => {
    if (!editedContent[sectionId]) return

    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            content_ar: editedContent[sectionId].ar,
            content_de: editedContent[sectionId].de,
          }
        }
        return section
      }),
    )

    // Show success message (in a real app, you might use a toast notification)
    alert(t[language].saveSuccess)
  }

  const handleSaveAll = () => {
    // Update all sections with edited content
    const updatedSections = sections.map((section) => {
      if (editedContent[section.id]) {
        return {
          ...section,
          content_ar: editedContent[section.id].ar,
          content_de: editedContent[section.id].de,
        }
      }
      return section
    })

    setSections(updatedSections)

    // Show success message
    alert(t[language].saveSuccess)
  }

  // Add this function
  const handlePreview = (section: Section) => {
    if (onPreview) {
      onPreview(section)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-primary-custom p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary-custom">{t[language].title}</h2>
        <div className="flex gap-2">
          <button onClick={() => setPreviewMode(!previewMode)} className="btn-outline flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {t[language].preview}
          </button>
          <button onClick={handleSaveAll} className="btn-primary flex items-center gap-2">
            <Save className="h-4 w-4" />
            {t[language].save}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-primary-custom rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-4 bg-secondary-custom cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="font-bold">{language === "ar" ? section.name_ar : section.name_de}</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handlePreview(section)}
                  className="p-1 text-blue-500 hover:bg-gray-100 rounded ml-2"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-200">
                  {expandedSection === section.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {expandedSection === section.id && (
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t[language].editArabic}</h4>
                  <textarea
                    value={editedContent[section.id]?.ar || section.content_ar}
                    onChange={(e) => handleContentChange(section.id, "ar", e.target.value)}
                    className="w-full px-3 py-2 border border-primary-custom rounded-md h-32"
                    dir="rtl"
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">{t[language].editGerman}</h4>
                  <textarea
                    value={editedContent[section.id]?.de || section.content_de}
                    onChange={(e) => handleContentChange(section.id, "de", e.target.value)}
                    className="w-full px-3 py-2 border border-primary-custom rounded-md h-32"
                    dir="ltr"
                  />
                </div>

                <div className="flex justify-end">
                  <button onClick={() => handleSave(section.id)} className="btn-primary flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {t[language].save}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

