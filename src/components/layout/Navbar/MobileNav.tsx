import React from "react"
import { cn } from "@/lib/utils"
import SimpleTechBackground from "@/components/common/Background"
import { MobileNavProps } from "@/types/Navbar"

export function MobileNav({
  isOpen,
  items,
  activeSection,
  onNavigate,
  onClose,
  t,
  language,
  onLanguageChange,
}: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col pt-20 pb-4 px-4 lg:hidden overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="absolute inset-0 " onClick={onClose} role="button" tabIndex={0} aria-label="Close menu" />
      
      <nav className="relative flex-1 flex flex-col max-w-xs mx-auto w-full h-full">
        <SimpleTechBackground />
        
        <div className="flex-1 flex flex-col justify-center py-8 space-y-6 w-full relative z-10">
          {items.map((item) => {
            const isActive = item.route 
              ? activeSection === item.route
              : activeSection === item.href;
              
            return (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  "block w-full text-center py-3 text-lg font-gabarito rounded-xl transition-all duration-300",
                  "text-white/90 hover:text-white",
                  isActive
                    ? "bg-gradient-to-r from-violet to-yellow"
                    : "hover:bg-gradient-to-r hover:from-violet/20 hover:to-yellow/20",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(item.href, item.route, e)
                }}
              >
                {t(item.key)}
              </a>
            );
          })}
        </div>

        <div className="pb-8 w-full">
          <select
            title={t("selectLanguage")}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full py-3 text-lg font-gabarito text-white rounded-xl text-center bg-transparent"
          >
            <option value="EN" className="text-black">
              English
            </option>
            <option value="FR" className="text-black">
              Français
            </option>
          </select>
        </div>
      </nav>
    </div>
  )
}