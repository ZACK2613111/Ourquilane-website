'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Button from '../shared/Button'
import { useLanguage } from '@/context/LanguageContext'

const Work = () => {
  const ref = React.useRef(null)
  const { translations } = useLanguage() // Using the translations directly from context

  return (
    <section
      ref={ref}
      id="work"
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-white py-20 px-4 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-gabarito font-semibold text-title-mobile sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center tracking-wide mt-4 sm:mt-8">
            {translations.work.title} 
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-dmSans font-normal text-description-mobile sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide mt-4 sm:mt-6">
            {translations.work.description} 
          </p>
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center relative z-20 mt-6 sm:mt-8"
      >
        <Button title={translations.work.Button} handleClick={() => console.log('Contact Us clicked')} />
      </motion.div>
    </section>
  )
}

export default Work
