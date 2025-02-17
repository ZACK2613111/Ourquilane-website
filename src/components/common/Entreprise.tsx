'use client'
import React from 'react'
import { motion } from 'framer-motion'
import WhiteButton from '../shared/WhiteButton'
import Button from '../shared/Button'
import Image from 'next/image'
import Logo from "../../../public/images/Logo.svg"
import { useLanguage } from "@/context/LanguageContext"

const Entreprise = () => {
  const { translations } = useLanguage()

  return (
    <section className="relative py-16 md:py-24 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-2/3 space-y-8"
        >
          <div>
            <WhiteButton 
              handleClick={() => console.log('Who Are We clicked')} 
              title={translations.entreprise.titleButton}
            />
          </div>

          <h1 className="font-gabarito text-4xl lg:text-5xl font-semibold text-white leading-tight">
            {translations.entreprise.title}
          </h1>

          <p className="font-satoshi text-lg text-[#E5E5E5] max-w-2xl">
            {translations.entreprise.description}
          </p>

          <div>
            <Button
              handleClick={() => console.log('Know More clicked')} 
              title={translations.entreprise.Button}
            />
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:w-1/3 flex justify-center lg:justify-end"
        >
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] animate-rotateLogo">
            <Image 
              src={Logo} 
              alt="logo" 
              fill
              className="rounded-full object-contain shadow-xl"
              sizes="(max-width: 768px) 200px, 300px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Entreprise