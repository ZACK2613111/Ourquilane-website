"use client"

import { useState, useCallback } from "react"
import Button from "@/components/shared/Button"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Products", href: "#products" },
  { label: "Trainings", href: "#trainings" },
  { label: "Contact", href: "#contact" },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [language, setLanguage] = useState("FR")
  
    const handleScroll = useCallback((href: string, e: React.MouseEvent) => {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, [])

    return (
      <nav className="py-4 w-full top-0 z-50 shadow-xl">
        <div className="max-w-full mx-20 px-6">
          <div className="flex items-center justify-between">
            <span className="font-neueGraphica text-white text-2xl font-bold tracking-wide mx-8">
              OURQUILANE
            </span>
  

            <div className="hidden lg:flex items-center gap-6">
              <div className="rounded-full px-4 py-2 shadow-inner border bg-white">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-2">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="font-neueGraphica px-5 py-2.5 rounded-full text-sm transition-all duration-300 whitespace-nowrap text-black hover:scale-105 hover:text-white hover:bg-black"
                        onClick={(e) => handleScroll(item.href, e)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
  
                  <div className="relative ml-2">
                  <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="font-neueGraphica py-2.5 text-sm bg-white text-black "
  title="Select Language"
>
  <option value="FR" className=" ">FR</option>
  <option value="EN" className=" ">EN</option>
</select>

                  </div>
                </div>
              </div>
  
              <Button
                title="GET STARTED"
                handleClick={() => console.log('GET STARTED')}
              />
            </div>
  
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Toggle Navigation"
            >
              <svg
                className="h-8 w-8"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
  
          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 space-y-2 shadow-xl border border-white/20">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-neueGraphica block px-6 py-3 rounded-lg text-sm text-center text-black hover:bg-black/80 hover:text-white transition-all"
                  onClick={(e) => {
                    handleScroll(item.href, e)
                    setIsOpen(false)
                  }}
                >
                  {item.label}
                </a>
              ))}
  
              <div className="pt-2">
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full font-neueGraphica px-6 py-3 rounded-lg  text-white border border-white/20"
                    title="Select Language"
                  >
                    <option value="FR">FR</option>
                    <option value="EN">EN</option>
                  </select>
                </div>
              </div>
  
              <Button
                title="GET STARTED"
                handleClick={() => console.log('GET STARTED')}
              />
            </div>
          )}
        </div>
      </nav>
    )
  }

export default Navbar
