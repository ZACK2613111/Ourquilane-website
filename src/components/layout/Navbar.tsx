"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

// Define strict types for translations
interface NavbarTranslations {
  home: string
  aboutUs: string
  services: string
  projects: string
  products: string
  trainings: string
  contact: string
  selectLanguage: string
  getStarted: string
}

// interface Translations {
//   navbar: NavbarTranslations
// }

interface NavItem {
  key: keyof NavbarTranslations
  href: string
  route?: string
}

// Predefined nav items to ensure type safety
const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "#home", route: "/" },
  { key: "aboutUs", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "products", href: "#products" },
  { key: "trainings", href: "#trainings", route: "trainings" },
  { key: "contact", href: "#contact", route: "contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language, translations, changeLanguage } = useLanguage()

  // Fixed type safety issue with translations
  const t = useCallback(
    (key: keyof NavbarTranslations) => {
      return translations?.navbar?.[key] || key
    },
    [translations]
  )

  const getActiveSection = useCallback(() => {
    return pathname === "/" ? "#home" : pathname
  }, [pathname])

  const [activeSection, setActiveSection] = useState(getActiveSection())

  useEffect(() => {
    setActiveSection(getActiveSection())
  }, [getActiveSection])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  const handleNavigation = useCallback(
    (href: string, route?: string, e?: React.MouseEvent) => {
      e?.preventDefault()
      setActiveSection(href)
      
      if (route) {
        router.push(route)
        setIsOpen(false)
      } else if (href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    },
    [router]
  )

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-2xl p-3 md:p-3 flex items-center justify-between",
              "border border-white/10 backdrop-blur-md",
              isScrolled && "shadow-xl shadow-[#9A5CE4]/10"
            )}
          >
            {/* Logo */}
            <motion.div 
              className="relative" 
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/images/Logo-header.svg"
                alt="Logo"
                width={120}
                height={48}
                className="h-8 w-auto lg:h-10"
                priority
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative font-gabarito px-4 py-2 rounded-xl text-lg whitespace-nowrap transition-all duration-300",
                    "text-white/90 hover:text-white",
                    activeSection === item.href
                      ? "bg-gradient-to-r from-[#9A5CE4]/40 to-[#FADD2A]/40"
                      : "hover:bg-gradient-to-r hover:from-[#9A5CE4]/20 hover:to-[#FADD2A]/20"
                  )}
                  onClick={(e) => handleNavigation(item.href, item.route, e)}
                  whileHover={{ scale: 1.05 }}
                >
                  {t(item.key)}
                </motion.a>
              ))}

              {/* Language Selector */}
              <motion.div 
                className="ml-2 rounded-lg p-2 backdrop-blur-md" 
                whileHover={{ scale: 1.05 }}
              >
                <select
                  title={t("selectLanguage")}
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="font-gabarito py-2 px-4 text-base bg-transparent text-white cursor-pointer"
                >
                  <option value="EN" className="text-black">EN</option>
                  <option value="FR" className="text-black">FR</option>
                </select>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <MenuIcon
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white relative w-8 h-8 text-sm rounded-lg bg-gradient-to-r from-[#9A5CE4]/20 to-[#FADD2A]/20 flex items-center justify-between"
              aria-label="Toggle menu"
            />
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 p-4 lg:hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#9A5CE4]/10 backdrop-blur-xl"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative rounded-2xl bg-gradient-to-r from-[#9A5CE4]/20 to-[#FADD2A]/20 backdrop-blur-md p-6 max-w-lg mx-auto mt-20"
              >
                <div className="space-y-4">
                  {NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      className={cn(
                        "block w-full text-center py-3 text-base font-gabarito rounded-xl",
                        "text-white/90 hover:text-white transition-colors",
                        activeSection === item.href
                          ? "bg-gradient-to-r from-[#9A5CE4]/40 to-[#FADD2A]/40"
                          : "hover:bg-gradient-to-r hover:from-[#9A5CE4]/20 hover:to-[#FADD2A]/20"
                      )}
                      onClick={(e) => handleNavigation(item.href, item.route, e)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t(item.key)}
                    </motion.a>
                  ))}

                  <motion.div 
                    className="mt-6" 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                  >
                    <select
                      title={t("selectLanguage")}
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="w-full bg-transparent py-3 text-base font-gabarito text-white rounded-lg text-center"
                    >
                      <option value="EN" className="text-black">English</option>
                      <option value="FR" className="text-black">Français</option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}