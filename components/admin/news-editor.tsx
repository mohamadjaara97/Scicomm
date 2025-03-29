"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Plus, Edit, Trash2, Save, X, Image, Eye } from "lucide-react"

interface NewsPost {
  id: string
  title_ar: string
  title_de: string
  content_ar: string
  content_de: string
  date: string
  image?: string
  published: boolean
}

// Update the component props to include onPreview
interface NewsEditorProps {
  onPreview?: (content: NewsPost) => void
}

export default function NewsEditor({ onPreview }: NewsEditorProps) {
  const { language, isRTL } = useLanguage()
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Sample data - in a real app, this would come from an API or local storage
  useEffect(() => {
    setPosts([
      {
        id: "1",
        title_ar: "توقيع اتفاقية تعاون مع جامعة برلين",
        title_de: "Kooperationsvereinbarung mit der Universität Berlin unterzeichnet",
        content_ar: "تم توقيع اتفاقية تعاون أكاديمي مع جامعة برلين لتعزيز التبادل الطلابي والبحثي...",
        content_de:
          "Eine akademische Kooperationsvereinbarung mit der Universität Berlin wurde unterzeichnet, um den Studenten- und Forschungsaustausch zu fördern...",
        date: "2025-02-15",
        published: true,
      },
      {
        id: "2",
        title_ar: "ورشة عمل حول الذكاء الاصطناعي",
        title_de: "Workshop zum Thema Künstliche Intelligenz",
        content_ar: "نظمت اللجنة العلمية ورشة عمل متخصصة حول تطبيقات الذكاء الاصطناعي في البحث العلمي...",
        content_de:
          "Das wissenschaftliche Komitee organisierte einen spezialisierten Workshop über Anwendungen der künstlichen Intelligenz in der wissenschaftlichen Forschung...",
        date: "2025-01-20",
        published: true,
      },
    ])
  }, [])

  const t = {
    ar: {
      title: "إدارة الأخبار والمدونة",
      addNew: "إضافة منشور جديد",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      preview: "معاينة",
      publish: "نشر",
      unpublish: "إلغاء النشر",
      titleAr: "العنوان (عربي)",
      titleDe: "العنوان (ألماني)",
      contentAr: "المحتوى (عربي)",
      contentDe: "المحتوى (ألماني)",
      date: "التاريخ",
      image: "الصورة",
      uploadImage: "رفع صورة",
      noImage: "لا توجد صورة",
      confirmDelete: "هل أنت متأكد من حذف هذا المنشور؟",
    },
    de: {
      title: "News & Blog-Verwaltung",
      addNew: "Neuen Beitrag hinzufügen",
      edit: "Bearbeiten",
      delete: "Löschen",
      save: "Speichern",
      cancel: "Abbrechen",
      preview: "Vorschau",
      publish: "Veröffentlichen",
      unpublish: "Zurückziehen",
      titleAr: "Titel (Arabisch)",
      titleDe: "Titel (Deutsch)",
      contentAr: "Inhalt (Arabisch)",
      contentDe: "Inhalt (Deutsch)",
      date: "Datum",
      image: "Bild",
      uploadImage: "Bild hochladen",
      noImage: "Kein Bild",
      confirmDelete: "Sind Sie sicher, dass Sie diesen Beitrag löschen möchten?",
    },
  }

  const handleAddNew = () => {
    const newPost: NewsPost = {
      id: Date.now().toString(),
      title_ar: "",
      title_de: "",
      content_ar: "",
      content_de: "",
      date: new Date().toISOString().split("T")[0],
      published: false,
    }
    setEditingPost(newPost)
    setIsEditing(true)
  }

  const handleEdit = (post: NewsPost) => {
    setEditingPost({ ...post })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!editingPost) return

    if (editingPost.id && posts.some((p) => p.id === editingPost.id)) {
      // Update existing post
      setPosts(posts.map((p) => (p.id === editingPost.id ? editingPost : p)))
    } else {
      // Add new post
      setPosts([...posts, editingPost])
    }

    setIsEditing(false)
    setEditingPost(null)
  }

  const handleDelete = (id: string) => {
    if (window.confirm(t[language].confirmDelete)) {
      setPosts(posts.filter((p) => p.id !== id))
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingPost(null)
  }

  const handleChange = (field: keyof NewsPost, value: string) => {
    if (!editingPost) return
    setEditingPost({ ...editingPost, [field]: value })
  }

  const togglePublish = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, published: !p.published } : p)))
  }

  // Add this function
  const handlePreview = (post: NewsPost) => {
    if (onPreview) {
      onPreview(post)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-primary-custom p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary-custom">{t[language].title}</h2>
        <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t[language].addNew}
        </button>
      </div>

      {isEditing && editingPost ? (
        <div className="space-y-4 bg-secondary-custom p-4 rounded-lg border border-primary-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">{t[language].titleAr}</label>
              <input
                type="text"
                value={editingPost.title_ar}
                onChange={(e) => handleChange("title_ar", e.target.value)}
                className="w-full px-3 py-2 border border-primary-custom rounded-md"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t[language].titleDe}</label>
              <input
                type="text"
                value={editingPost.title_de}
                onChange={(e) => handleChange("title_de", e.target.value)}
                className="w-full px-3 py-2 border border-primary-custom rounded-md"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">{t[language].contentAr}</label>
              <textarea
                value={editingPost.content_ar}
                onChange={(e) => handleChange("content_ar", e.target.value)}
                className="w-full px-3 py-2 border border-primary-custom rounded-md h-40"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t[language].contentDe}</label>
              <textarea
                value={editingPost.content_de}
                onChange={(e) => handleChange("content_de", e.target.value)}
                className="w-full px-3 py-2 border border-primary-custom rounded-md h-40"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">{t[language].date}</label>
              <input
                type="date"
                value={editingPost.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-primary-custom rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t[language].image}</label>
              <div className="flex items-center gap-2">
                <button className="btn-outline flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  {t[language].uploadImage}
                </button>
                <span className="text-sm text-muted-custom">
                  {editingPost.image ? editingPost.image : t[language].noImage}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={handleCancel} className="btn-outline flex items-center gap-2">
              <X className="h-4 w-4" />
              {t[language].cancel}
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="h-4 w-4" />
              {t[language].save}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg border ${post.published ? "border-primary-custom" : "border-gray-300"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{language === "ar" ? post.title_ar : post.title_de}</h3>
                  <p className="text-sm text-muted-custom">{post.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePublish(post.id)}
                    className={`px-2 py-1 text-xs rounded ${
                      post.published ? "bg-gray-200 text-gray-700" : "bg-primary-custom text-white"
                    }`}
                  >
                    {post.published ? t[language].unpublish : t[language].publish}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-1 text-primary-custom hover:bg-gray-100 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-1 text-red-500 hover:bg-gray-100 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {/* Add a preview button in the post list */}
                  <button onClick={() => handlePreview(post)} className="p-1 text-blue-500 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm line-clamp-2">{language === "ar" ? post.content_ar : post.content_de}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

