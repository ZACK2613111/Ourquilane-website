'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import WhiteButton from '@/components/shared/WhiteButton'
import ArrowTop from '../../../public/images/shared/arrow-up.svg'
import ArrowDown from '../../../public/images/shared/arrow-down.svg'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const FAQItem: React.FC<{
    faq: FAQItem
    index: number
    isOpen: boolean
    onToggle: () => void
  }> = ({ faq, index, isOpen, onToggle }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-neueGraphica text-base">
          {faq.question}
        </span>
        <Image 
          src={isOpen ? ArrowTop : ArrowDown}
          alt="Toggle answer"
          className="h-6 w-6 filter brightness-0 invert transition-transform duration-300"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-transparent">
              <p className="text-white/80 font-satochi">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-16">
        <WhiteButton 
          title="FREQUENTLY ASKED QUESTIONS" 
          handleClick={() => {}}
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4 font-neueGraphica"
        >
          Got Questions?<br />
          We&apos;ve Got Answers!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/80 text-lg font-satochi"
        >
          The most common questions we get asked
        </motion.p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={faq.question}
            faq={faq}
            index={index}
            isOpen={openFaq === index}
            onToggle={() => setOpenFaq(openFaq === index ? null : index)}
          />
        ))}
      </div>
    </motion.section>
  )
}

export default FAQ
