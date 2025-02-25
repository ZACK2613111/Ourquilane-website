"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import WhiteButton from "../shared/WhiteButton"
import Logo from "../../../public/images/Logo-shadow.svg"
import { useLanguage } from "@/context/LanguageContext"
import { useRouter } from "next/navigation"
import Button from "../shared/Button"

interface EnterpriseTranslations {
  titleButton: string
  title: string
  description: string
  Button: string
}

interface LanguageContextType {
  translations: {
    entreprise: EnterpriseTranslations
  }
}

const Enterprise: React.FC = () => {
  const { translations } = useLanguage() as LanguageContextType
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
    setVh()
    window.addEventListener("resize", setVh)
    return () => window.removeEventListener("resize", setVh)
  }, [])

  const handleContactClick = () => {
    router.push("/contact")
  }

  if (!mounted) return null

  return (
    <section id="entreprise" className="w-full text-white py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <WhiteButton
            handleClick={() => console.log("Who Are We clicked")}
            title={translations.entreprise.titleButton}
          />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="w-full lg:w-2/3 space-y-5 md:space-y-6">
            <h1 className="font-gabarito font-semibold sm:text-title-other tracking-[2%] text-left text-white mb-6 text-title-mobile">
              <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#9747FF] to-[#E9CD2A]">
                Ourquilane
              </span>{" "}
              {translations.entreprise.title}
            </h1>

            <p className="font-dmSans font-normal text-base sm:text-lg md:text-xl tracking-wide text-grayDescription max-w-4xl">
              {translations.entreprise.description}
            </p>

            <div className="w-full sm:w-1/2">
              <Button handleClick={handleContactClick} title={translations.entreprise.Button} />
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px]">
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse bg-gradient-to-r from-violet to-yellow"
                aria-hidden="true"
              />
              <Image
                src={Logo || "/placeholder.svg"}
                alt="Ourquilane company logo"
                fill
                className="rounded-full object-contain z-10 relative logo-rotation"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 250px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Enterprise

