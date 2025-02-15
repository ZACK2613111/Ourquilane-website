"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Button from "@/components/shared/Button"
import { useLanguage } from "@/context/LanguageContext"
import EnglishTranslation from "@/data/locales/en/translations.json"
import FrenchTranslation from "@/data/locales/fr/translations.json"

interface NavItem {
  label: string
  href: string
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, translations, changeLanguage } = useLanguage()
  const pathname = usePathname()

  const getActiveSection = useCallback(() => {
    if (pathname === "/") return "#home"
    return pathname
  }, [pathname])

  const [activeSection, setActiveSection] = useState(getActiveSection())

  useEffect(() => {
    setActiveSection(getActiveSection())
  }, [getActiveSection])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleScroll = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveSection(href)
    if (href !== "/" && document.querySelector(href)) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const getTranslation = useCallback(() => {
    switch (language) {
      case "FR":
        return FrenchTranslation.navbar
      default:
        return EnglishTranslation.navbar
    }
  }, [language])

  const t = getTranslation()

  const navItems: NavItem[] = [
    { label: translations.navbar.home, href: "#home" },
    { label: translations.navbar.aboutUs, href: "#about" },
    { label: translations.navbar.services, href: "#services" },
    { label: translations.navbar.projects, href: "#projects" },
    { label: translations.navbar.products, href: "#products" },
    { label: translations.navbar.trainings, href: "#trainings" },
    { label: translations.navbar.contact, href: "#contact" },
  ]

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="relative px-4 py-4 mb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <span className="font-neueGraphica text-white text-2xl font-bold tracking-wide z-10">OURQUILANE</span>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="rounded-full px-3 py-1.5 bg-white/90 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className={`font-neueGraphica px-4 py-2 rounded-full text-base transition-all duration-300 whitespace-nowrap relative overflow-hidden
                        ${activeSection === item.href ? "text-white bg-black" : "text-black hover:text-white"}`}
                      onClick={(e) => handleScroll(item.href, e)}
                      whileHover="hover"
                    >
                      <motion.span className="relative z-10">{item.label}</motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gray-800"
                        initial={{ scale: 0, opacity: 0 }}
                        variants={{
                          hover: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.3 },
                          },
                        }}
                        style={{ originY: 0.5 }}
                      />
                    </motion.a>
                  ))}
                </div>

                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="font-neueGraphica py-2 px-3 text-base bg-transparent text-black cursor-pointer ml-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                  title={translations.navbar.selectLanguage}
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                </select>
              </div>
            </div>

            <Button title={t.getStarted} handleClick={() => console.log("GET STARTED")} />
          </div>

          {/* Mobile menu button with enhanced animation */}
          <div className="lg:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6"
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <motion.span
                  className="absolute h-0.5 bg-white rounded-full"
                  initial={{ width: "75%" }}
                  animate={{
                    width: ["75%", "25%", "75%"],
                    top: isOpen ? "0px" : "-8px",
                    rotate: isOpen ? 45 : 0,
                  }}
                  transition={{
                    width: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    top: { duration: 0.3 },
                    rotate: { duration: 0.3 },
                  }}
                />
                <motion.span
                  className="absolute h-0.5 bg-white rounded-full"
                  initial={{ width: "50%" }}
                  animate={{
                    width: ["50%", "25%", "75%", "50%"],
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0 : 1,
                  }}
                  transition={{
                    width: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                />
                <motion.span
                  className="absolute h-0.5 bg-white rounded-full"
                  initial={{ width: "25%" }}
                  animate={{
                    width: ["25%", "50%", "75%", "25%"],
                    top: isOpen ? "0px" : "8px",
                    rotate: isOpen ? -45 : 0,
                  }}
                  transition={{
                    width: {
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                    top: { duration: 0.3 },
                    rotate: { duration: 0.3 },
                  }}
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md lg:hidden"
              style={{ top: 0 }}
            >
              <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.a
                        href={item.href}
                        className={`block w-full text-center py-3 text-lg font-neueGraphica rounded-full mx-4
                          ${activeSection === item.href ? "bg-white text-black" : "text-white"}`}
                        onClick={(e) => {
                          handleScroll(item.href, e)
                          setIsOpen(false)
                        }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}
                      </motion.a>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <motion.button
                      className="block w-full text-center py-3 text-lg font-neueGraphica rounded-full mx-4 text-white"
                      onClick={() => changeLanguage(language === "EN" ? "FR" : "EN")}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {language === "EN" ? "FR" : "EN"}
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-20 w-full px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
                >
                  <div className="w-full flex justify-center">
                    <Button
                      title={t.getStarted}
                      handleClick={() => {
                        console.log("GET STARTED")
                        setIsOpen(false)
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar

