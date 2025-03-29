"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function ContactSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitStatus("success")
    setSubmitMessage(t.contact.successMessage)
    setFormData({ name: "", email: "", organization: "", message: "" })
  }

  return (
    <section id="contact" className="section-container bg-secondary-custom">
      <h2 className="section-title">{t.contact.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">{t.contact.contactUs}</h3>
          <p className="mb-8 text-lg">{t.contact.contactDescription}</p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className={`h-6 w-6 text-primary-custom ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h4 className="font-bold mb-1">{t.contact.email}</h4>
                <p className="text-muted-custom">scicomm@sysunion.de</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className={`h-6 w-6 text-primary-custom ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h4 className="font-bold mb-1">{t.contact.phone}</h4>
                <p className="text-muted-custom">+49 XXX XXX XXX</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className={`h-6 w-6 text-primary-custom ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h4 className="font-bold mb-1">{t.contact.address}</h4>
                <p className="text-muted-custom">{isRTL ? "برلين، ألمانيا" : "Berlin, Deutschland"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                {t.contact.fullName}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-primary-custom rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                {t.contact.emailAddress}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-primary-custom rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom"
              />
            </div>

            <div>
              <label htmlFor="organization" className="block mb-1 font-medium">
                {t.contact.organization}
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-primary-custom rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-1 font-medium">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-primary-custom rounded-md focus:outline-none focus:ring-2 focus:ring-primary-custom"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center justify-center w-full"
            >
              {isSubmitting ? (
                t.contact.sending
              ) : (
                <>
                  <Send className={`${isRTL ? "ml-2" : "mr-2"} h-4 w-4`} /> {t.contact.send}
                </>
              )}
            </button>

            {submitMessage && (
              <div
                className={`p-3 rounded-md ${
                  submitStatus === "success"
                    ? "bg-success-custom text-success-custom"
                    : "bg-error-custom text-error-custom"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

