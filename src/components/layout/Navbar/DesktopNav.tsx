import React from "react"
import { cn } from "@/lib/utils"
import { DesktopNavProps } from "@/types/Navbar"

export function DesktopNav({ items, activeSection, onNavigate, t }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center justify-center gap-1 flex-1 px-4">
      {items.map((item) => {
        const isActive = item.route 
          ? activeSection === item.route
          : activeSection === item.href;
          
        return (
          <a
            key={item.key}
            href={item.href}
            className={cn(
              "relative font-gabarito px-4 py-2 rounded-xl text-lg text-center transition-all duration-300",
              "text-white/90 hover:text-white whitespace-nowrap",
              isActive
                ? "bg-gradient-to-r from-violet to-yellow"
                : "hover:bg-violet/5",
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
  )
}