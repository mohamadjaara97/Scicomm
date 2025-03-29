"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"
import NewsEditor from "@/components/admin/news-editor"
import SectionEditor from "@/components/admin/section-editor"
import SettingsPanel from "@/components/admin/settings-panel"
import PreviewPanel from "@/components/admin/preview-panel"

export default function AdminPanel() {
  const { language, isRTL } = useLanguage()
  const [activeTab, setActiveTab] = useState("news")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewContent, setPreviewContent] = useState(null)
  const [previewType, setPreviewType] = useState<"news" | "section">("news")

  const handlePreview = (content: any, type: "news" | "section") => {
    setPreviewContent(content)
    setPreviewType(type)
    setPreviewOpen(true)
  }

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <AdminHeader />
      <div className="flex flex-col md:flex-row">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 md:p-6">
          {activeTab === "news" && <NewsEditor onPreview={(content) => handlePreview(content, "news")} />}

          {activeTab === "sections" && <SectionEditor onPreview={(content) => handlePreview(content, "section")} />}

          {activeTab === "settings" && <SettingsPanel />}

          {activeTab === "preview" && (
            <iframe
              src="/"
              className="w-full h-[calc(100vh-12rem)] border border-primary-custom rounded-lg"
              title="Website Preview"
            />
          )}
        </main>
      </div>

      <PreviewPanel
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        content={previewContent}
        contentType={previewType}
      />
    </div>
  )
}

