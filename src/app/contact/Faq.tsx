'use client'
import { useState, useCallback, memo } from 'react'
import Image from 'next/image'
import WhiteButton from '@/components/shared/WhiteButton'
import ArrowTop from '../../../public/images/shared/arrow-up.svg'
import ArrowDown from '../../../public/images/shared/arrow-down.svg'
import { useLanguage } from '@/context/LanguageContext'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs?: FAQItem[] // Make `faqs` optional
}

const FAQItem: React.FC<{
  faq: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}> = memo(({ faq, index, isOpen, onToggle }) => (
  <div 
    className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/10"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
    >
      <span className="font-gabarito font-normal sm:text-description tracking-[1%] text-description-mobile text-grayDescription">
        {faq.question}
      </span>
      <div className="flex-shrink-0 ml-4">
        <Image 
          src={isOpen ? ArrowTop : ArrowDown}
          alt="Toggle answer"
          className="h-6 w-6 filter brightness-0 invert transition-transform duration-300"
        />
      </div>
    </button>

    <div 
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className="px-6 py-4 bg-transparent">
        <p className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-grayDescription">
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
))

FAQItem.displayName = 'FAQItem'

const FAQ: React.FC<FAQProps> = ({ faqs = [] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { language } = useLanguage()

  const handleToggle = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <WhiteButton 
          title={language === 'FR' ? 'QUESTIONS FRÉQUEMMENT POSÉES' : 'FREQUENTLY ASKED QUESTIONS'} 
          handleClick={() => {}}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4 font-gabarito">
          {language === 'FR' ? 'Des Questions ?' : 'Got Questions?'}<br />
          {language === 'FR' ? 'Nous avons les réponses !' : "We've Got Answers!"}
        </h1>
        <p className="text-white/80 text-lg font-dmSans">
          {language === 'FR' ? 'Les questions les plus fréquemment posées' : 'The most common questions we get asked'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => ( 
          
          
          <FAQItem 
            key={faq.question}
            faq={faq}
            index={index}
            isOpen={openFaq === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ