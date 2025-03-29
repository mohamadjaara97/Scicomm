"use client"

import { useLanguage } from "@/contexts/language-context"
import { FileText, Layout, Settings, Eye } from "lucide-react"
import { adminTranslations } from "@/translations/admin"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const { language, isRTL } = useLanguage()
  const t = adminTranslations[language].navigation

  const menuItems = [
    { id: "news", label: t.news, icon: <FileText className="h-5 w-5" /> },
    { id: "sections", label: t.sections, icon: <Layout className="h-5 w-5" /> },
    { id: "preview", label: t.preview, icon: <Eye className="h-5 w-5" /> },
    { id: "settings", label: t.settings, icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <aside className="w-full md:w-64 bg-secondary-custom border-r border-primary-custom p-4">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
                  activeTab === item.id ? "bg-primary-custom text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

