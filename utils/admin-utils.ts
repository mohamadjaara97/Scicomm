"use client"

// This is a simple client-side storage utility for the admin panel
// In a real application, this would connect to a backend API

export interface NewsPost {
  id: string
  title_ar: string
  title_de: string
  content_ar: string
  content_de: string
  date: string
  image?: string
  published: boolean
}

export interface SectionContent {
  id: string
  name_ar: string
  name_de: string
  content_ar: string
  content_de: string
  type: "text" | "html" | "image"
}

// Local storage keys
const STORAGE_KEYS = {
  NEWS_POSTS: "admin_news_posts",
  SECTION_CONTENT: "admin_section_content",
}

// Save news posts to local storage
export function saveNewsPosts(posts: NewsPost[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.NEWS_POSTS, JSON.stringify(posts))
  }
}

// Get news posts from local storage
export function getNewsPosts(): NewsPost[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.NEWS_POSTS)
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return []
}

// Save section content to local storage
export function saveSectionContent(sections: SectionContent[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SECTION_CONTENT, JSON.stringify(sections))
  }
}

// Get section content from local storage
export function getSectionContent(): SectionContent[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.SECTION_CONTENT)
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return []
}

