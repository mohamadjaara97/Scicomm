"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { RefreshCw, AlertTriangle } from "lucide-react"

export default function SettingsPanel() {
  const { language, isRTL } = useLanguage()
  const [clearingCache, setClearingCache] = useState(false)

  const t = {
    ar: {
      title: "إعدادات لوحة التحكم",
      cacheSection: "إدارة ذاكرة التخزين المؤقت",
      clearCache: "مسح ذاكرة التخزين المؤقت",
      clearing: "جاري المسح...",
      cacheCleared: "تم مسح ذاكرة التخزين المؤقت بنجاح",
      warning: "تحذير",
      cacheWarning: "سيؤدي مسح ذاكرة التخزين المؤقت إلى إزالة جميع التغييرات غير المحفوظة.",
      adminUrl: "رابط لوحة التحكم",
      currentUrl: "الرابط الحالي:",
      urlNote: "ملاحظة: هذا الرابط غير مرئي للزوار. احتفظ به سراً.",
    },
    de: {
      title: "Dashboard-Einstellungen",
      cacheSection: "Cache-Verwaltung",
      clearCache: "Cache leeren",
      clearing: "Wird geleert...",
      cacheCleared: "Cache erfolgreich geleert",
      warning: "Warnung",
      cacheWarning: "Das Leeren des Caches entfernt alle ungespeicherten Änderungen.",
      adminUrl: "Admin-Dashboard-URL",
      currentUrl: "Aktuelle URL:",
      urlNote: "Hinweis: Diese URL ist für Besucher nicht sichtbar. Halten Sie sie geheim.",
    },
  }

  const handleClearCache = () => {
    if (window.confirm(t[language].cacheWarning)) {
      setClearingCache(true)

      // Simulate clearing cache
      setTimeout(() => {
        // In a real app, you would clear localStorage or other cache here
        localStorage.removeItem("admin_news_posts")
        localStorage.removeItem("admin_section_content")

        setClearingCache(false)
        alert(t[language].cacheCleared)
      }, 1500)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-primary-custom p-4">
      <h2 className="text-xl font-bold text-primary-custom mb-6">{t[language].title}</h2>

      <div className="space-y-8">
        {/* Cache Management Section */}
        <div className="bg-secondary-custom p-4 rounded-lg border border-primary-custom">
          <h3 className="font-bold text-lg mb-4">{t[language].cacheSection}</h3>

          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="text-amber-500 h-5 w-5 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-700">{t[language].warning}</p>
              <p className="text-sm text-muted-custom">{t[language].cacheWarning}</p>
            </div>
          </div>

          <button onClick={handleClearCache} disabled={clearingCache} className="btn-primary flex items-center gap-2">
            {clearingCache ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {t[language].clearing}
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                {t[language].clearCache}
              </>
            )}
          </button>
        </div>

        {/* Admin URL Section */}
        <div className="bg-secondary-custom p-4 rounded-lg border border-primary-custom">
          <h3 className="font-bold text-lg mb-4">{t[language].adminUrl}</h3>

          <div className="mb-4">
            <p className="mb-2">{t[language].currentUrl}</p>
            <div className="bg-gray-100 p-2 rounded border border-gray-300 font-mono text-sm">
              {typeof window !== "undefined" ? window.location.origin + "/admin-panel" : "/admin-panel"}
            </div>
          </div>

          <p className="text-sm text-muted-custom italic">{t[language].urlNote}</p>
        </div>
      </div>
    </div>
  )
}

