"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import LanguageSwitcher from "./language-switcher"

export default function Footer() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-custom border-t border-primary-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col items-start mb-4">
              <Image
                src="/images/ssud.png"
                alt={isRTL ? "اتحاد طلبة سوريا في ألمانيا" : "Verband Syrischer Studierender in Deutschland"}
                width={200}
                height={80}
                className="mb-3"
              />
              <h3 className="text-lg font-bold text-primary-custom">
                {isRTL ? "اللجنة العلمية" : "Wissenschaftliches Komitee"}
              </h3>
            </div>
            <p className="text-muted-custom mb-4">{t.footer.description}</p>
            <div className="flex space-x-4 rtl:space-x-reverse ltr:space-x-normal">
              <Link href="#" className="text-muted-custom hover:text-primary-custom">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-custom hover:text-primary-custom">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-custom hover:text-primary-custom">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <LanguageSwitcher variant="icon" className="text-muted-custom hover:text-primary-custom" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary-custom mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {t.footer.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-custom hover:text-primary-custom">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary-custom mb-4">{t.footer.contactUs}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />
                <span className="text-muted-custom">scicomm@sysunion.de</span>
              </li>
              <li className="flex items-center">
                <Phone className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />
                <span className="text-muted-custom">+49 XXX XXX XXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-custom text-center">
          <p className="text-muted-custom">
            &copy; {currentYear} {t.footer.committee} - {t.footer.union}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

