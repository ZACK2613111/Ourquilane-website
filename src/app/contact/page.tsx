"use client"

import { useState, useEffect } from 'react'
import Header from './Header'
import Timeline from './Timeline'
import FAQ from './Faq'
import ContactForm from './ContactForm'
import Navbar from '@/components/layout/Navbar'
import AuroraBackground from '@/components/common/Background'
import {faqs} from '@/data/contact/Faqs'
import Footer from '@/components/common/Footer'
import { steps, stepsFr } from '@/data/Steps'
import { useLanguage } from '@/context/LanguageContext'


export default function HowWeWork() {
  const { language } = useLanguage()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="min-h-screen relative my-20">
      <AuroraBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
        <Header />
        <Timeline steps={language === 'FR' ? stepsFr : steps} />
        <FAQ faqs={faqs} />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}