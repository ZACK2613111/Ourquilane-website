"use client"

import React, { useState, useCallback, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { MenuIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"
import { NAV_ITEMS, NavbarTranslations } from "@/types/Navbar"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [navbarHeight, setNavbarHeight] = useState(0)

  const pathname = usePathname()
  const router = useRouter()
  const { language, translations, changeLanguage } = useLanguage()

  const t = useCallback(
    (key: keyof NavbarTranslations) => translations?.navbar?.[key] || key,
    [translations]
  )

  // Get navbar height on load and resize
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbarElement = document.querySelector('header')
      if (navbarElement) {
        // Get the full height including padding
        const styles = window.getComputedStyle(navbarElement)
        const height = navbarElement.offsetHeight + 
                      parseInt(styles.marginTop || '0') + 
                      parseInt(styles.marginBottom || '0')
        setNavbarHeight(height)
      }
    }
    
    // Initial measurement after a short delay to ensure all elements are rendered
    setTimeout(updateNavbarHeight, 100)
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight)
    return () => window.removeEventListener('resize', updateNavbarHeight)
  }, [])

  useEffect(() => {
    // Set active section based on current pathname
    const currentRoute = NAV_ITEMS.find(item => item.route === pathname)?.route || pathname
    setActiveSection(pathname === "/" ? "#home" : currentRoute)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  // Function to handle scroll position adjustment
  const scrollToSection = useCallback((section: Element) => {
    // Ensure we have valid elements before scrolling
    if (!section) return;
    
    // Calculate the position to scroll to
    const sectionRect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate position, ensuring we're at the very top of the section
    // Add a larger offset (100px) to ensure elements are fully visible
    const offsetPosition = scrollTop + sectionRect.top - navbarHeight - 100;
    
    // Perform the scroll
    window.scrollTo({
      top: Math.max(0, offsetPosition), // Prevent negative scroll positions
      behavior: "smooth"
    });
  }, [navbarHeight]);

  const handleNavigation = useCallback(
    (href: string, route?: string, e?: React.MouseEvent) => {
      e?.preventDefault();
      
      // Set the active section based on route or href
      const newActiveSection = route || href;
      setActiveSection(newActiveSection);
  
      if (href.startsWith("#")) {
        if (pathname !== "/" && pathname !== "/home") {
          router.push(`/${href}`);
          setIsOpen(false);
        } else {
          const section = document.querySelector(href);
          if (section) {
            scrollToSection(section);
            setIsOpen(false);
          }
        }
      } else if (route) {
        // Use router.prefetch to improve navigation performance
        router.prefetch(route);
        
        // Add a slight delay to ensure UI is responsive
        setTimeout(() => {
          router.push(route);
          setIsOpen(false);
          
          // Handle hash in route if present
          if (route.includes("#")) {
            const hash = route.substring(route.indexOf("#"));
            setTimeout(() => {
              const section = document.querySelector(hash);
              if (section) {
                scrollToSection(section);
              }
            }, 100);
          }
        }, 100);
      }
    },
    [pathname, router, scrollToSection]
  );

  return (
    <>
      {/* Fixed header for both desktop and mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={cn(
              "rounded-2xl p-3 md:p-4 flex items-center justify-between",
              "backdrop-blur-md bg-black/20",
              "border border-white/10",
              isScrolled && "shadow-xl shadow-violet/10"
            )}
          >
            {/* Logo */}
            <div className="relative flex-shrink-0">
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
            <DesktopNav
              items={NAV_ITEMS}
              activeSection={activeSection}
              onNavigate={handleNavigation}
              t={t}
            />

            {/* Language Selector (Desktop) */}
            <div className="hidden lg:block flex-shrink-0">
              <select
                title={t("selectLanguage")}
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="font-gabarito py-2 px-4 text-base bg-white/5 rounded-xl text-white cursor-pointer border border-white/10 hover:bg-white/10 transition-colors"
              >
                <option value="EN" className="text-black">
                  EN
                </option>
                <option value="FR" className="text-black">
                  FR
                </option>
              </select>
            </div>

            {/* Mobile Menu Button - Toggle between MenuIcon and MinusIcon */}
            <button
              title={isOpen ? "Close menu" : "Open menu"}
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden bg-gradient-to-r from-violet to-yellow rounded-lg p-2 transition-transform hover:scale-105 active:scale-95"
            >
              {isOpen ? (
                <MinusIcon className="text-white w-6 h-6" />
              ) : (
                <MenuIcon className="text-white w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - separate from header to ensure proper positioning */}
      <MobileNav
        isOpen={isOpen}
        items={NAV_ITEMS}
        activeSection={activeSection}
        onNavigate={handleNavigation}
        onClose={() => setIsOpen(false)}
        t={t}
        language={language}
        onLanguageChange={changeLanguage}
      />
    </>
  )
}