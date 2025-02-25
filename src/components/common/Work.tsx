'use client'
import React, { lazy, Suspense } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useRouter } from "next/navigation";

const Button = lazy(() => import("../shared/Button"))

const Work = () => {
  const { translations } = useLanguage()
  const router = useRouter();
  const handleContactClick = () => {
    router.push("/contact");
  }

  return (
    <section
      id="work"
      className="relative flex flex-col items-center justify-center bg-transparent text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10 z-10">
        <div>
          <h1 className="font-gabarito font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-center tracking-wide">
            {translations.work.title}
          </h1>
        </div>

        <div>
          <p className="font-dmSans font-normal sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed tracking-wide max-w-3xl mx-auto">
            {translations.work.description}
          </p>
        </div>

        <div className="flex items-center justify-center w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto px-4 sm:px-0">
          <Suspense fallback={<div className="h-12 w-full bg-gray-700/20 rounded-md animate-pulse"></div>}>
            <Button handleClick={handleContactClick} title={translations.work.Button} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default Work
