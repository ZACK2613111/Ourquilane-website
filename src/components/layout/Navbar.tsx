"use client"

import { useState, useCallback, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"
import SimpleTechBackground from "../common/Background"

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

interface NavItem {
  key: keyof NavbarTranslations
  href: string
  route?: string
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "#home", route: "/" },
  { key: "aboutUs", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "products", href: "#products" },
  { key: "trainings", href: "", route: "trainings" },
  { key: "contact", href: "", route: "contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language, translations, changeLanguage } = useLanguage()

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
      
      if (href.startsWith("#")) {
        if (pathname !== "/" && pathname !== "/home") {
          router.push(`/${href}`);
          setIsOpen(false);
        } else {
          const section = document.querySelector(href);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
          }
        }
      } else if (route) {
        // For direct route navigation
        router.push(route);
        setIsOpen(false);
      }
    },
    [pathname, router]
  )

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={cn(
              "rounded-2xl p-3 md:p-3 flex items-center justify-between",
              "backdrop-blur-md",
              "lg:border lg:border-white/10",
              isScrolled && "shadow-xl shadow-[#9A5CE4]/10"
            )}
          >
            {/* Logo */}
            <div className="relative">
              <Image
                src="/images/Logo-header.svg"
                alt="Logo"
                width={120}
                height={48}
                className="h-8 w-auto lg:h-10"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative font-gabarito px-4 py-2 rounded-xl text-lg whitespace-nowrap transition-all duration-300",
                    "text-white/90 hover:text-white",
                    activeSection === item.href
                      ? "bg-gradient-to-r from-[#9A5CE4]/20 to-[#FADD2A]/40"
                      : "hover:bg-[#9A5CE4]/5"
                  )}
                  onClick={(e) => handleNavigation(item.href, item.route, e)}
                >
                  {t(item.key)}
                </a>
              ))}

              {/* Language Selector */}
              <div className="ml-2 rounded-lg p-2 backdrop-blur-md">
                <select
                  title={t("selectLanguage")}
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="font-gabarito py-2 px-4 text-base bg-transparent text-white cursor-pointer"
                >
                  <option value="EN" className="text-black">EN</option>
                  <option value="FR" className="text-black">FR</option>
                </select>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden bg-[#9A5CE4]/20 rounded-lg p-2">
              <MenuIcon
                onClick={() => setIsOpen(!isOpen)}
                className="text-white w-6 h-6"
                aria-label="Toggle menu"
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50 pt-24 pb-8 px-6 lg:hidden">
            <SimpleTechBackground />
            <div 
              className="absolute inset-0" 
              onClick={() => setIsOpen(false)}
            />
            <div className="relative rounded-2xl p-6 max-w-lg mx-auto flex flex-col items-center">
              <div className="space-y-6 w-full max-w-xs">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "block w-full text-center py-4 text-lg font-gabarito rounded-xl",
                      "text-white/90 hover:text-white transition-colors",
                      activeSection === item.href
                        ? "bg-gradient-to-r from-[#9A5CE4]/40 to-[#FADD2A]/40"
                        : "hover:bg-gradient-to-r hover:from-[#9A5CE4]/20 hover:to-[#FADD2A]/20"
                    )}
                    onClick={(e) => handleNavigation(item.href, item.route, e)}
                  >
                    {t(item.key)}
                  </a>
                ))}

                {/* Language Selector */}
                <div className="mt-8 w-full">
                  <select
                    title={t("selectLanguage")}
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="w-full bg-transparent py-4 text-lg font-gabarito text-white rounded-lg text-center border-0" 
                  >
                    <option value="EN" className="text-black">English</option>
                    <option value="FR" className="text-black">Français</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
