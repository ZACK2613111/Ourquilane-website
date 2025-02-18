'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import WhiteButton from '../shared/WhiteButton'
import Button from '../shared/Button'
import Logo from "../../../public/images/Logo-shadow.svg"
import { useLanguage } from "@/context/LanguageContext"

// Define types for translations
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

const Entreprise: React.FC = () => {
  const { translations } = useLanguage() as LanguageContextType

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.3 }
    }
  }

  const logoAnimationProps = {
    animate: {
      rotate: 360,
      scale: [1, 1.05, 1],
    },
    transition: {
      rotate: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      },
      scale: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative py-16 md:py-24 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="lg:w-2/3 space-y-8"
        >
          <div>
            <WhiteButton 
              handleClick={() => console.log('Who Are We clicked')} 
              title={translations.entreprise.titleButton}
            />
          </div>

          <h1 className="font-gabarito text-4xl lg:text-5xl font-semibold text-white leading-tight">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#9747FF] to-[#E9CD2A]">Ourquilane</span>
          {translations.entreprise.title}
          </h1>

          <p className="font-dmSans text-lg text-[#E5E5E5] max-w-2xl">
            {translations.entreprise.description}
          </p>

          <div>
            <Button
              handleClick={() => console.log('Know More clicked')} 
              title={translations.entreprise.Button}
            />
          </div>
        </motion.div>

        {/* Right Content - Animated Logo */}
        <motion.div 
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          className="lg:w-1/3 flex justify-center lg:justify-end"
        >
          <div className="relative">
            <motion.div
              {...logoAnimationProps}
              className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
            >
              <div 
                className="absolute inset-0 rounded-full  opacity-30 blur-xl animate-pulse" 
                aria-hidden="true"
              />
              <Image 
                src={Logo} 
                alt="Ourquilane company logo" 
                fill
                className="rounded-full object-contain z-10 relative"
                sizes="(max-width: 768px) 200px, 300px"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Entreprise