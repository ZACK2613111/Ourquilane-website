"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import WhiteButton from '@/components/shared/WhiteButton'
import ArrowTop from '../../../public/images/shared/arrow-up.svg'
import ArrowDown from '../../../public/images/shared/arrow-down.svg'
import AuroraBackground from '@/components/common/Background'

const steps = [
  {
    title: "First Contact",
    description: "A phone call to discover your contact"
  },
  {
    title: "Discovery Meeting",
    description: "A working session to understand your challenges"
  },
  {
    title: "Proposal",
    description: "Solutions to achieve your goals"
  },
  {
    title: "Mission",
    description: "Effective implementation of your projects"
  },
  {
    title: "After-Sales Service",
    description: "Dedicated support to ensure satisfaction and long-term success"
  }
]

const faqs = [
  {
    question: "How do I get started?",
    answer: "Start by contacting our team through our contact form or phone number. We'll schedule an initial consultation to discuss your needs."
  },
  {
    question: "How do I figure out how much your services will cost?",
    answer: "After understanding your project requirements, we provide a detailed proposal with transparent pricing."
  },
  {
    question: "What kind of clients do you work with?",
    answer: "We work with businesses of all sizes across various industries, from startups to enterprises."
  },
  {
    question: "How long does a project last?",
    answer: "Project duration varies based on complexity, typically ranging from 2 weeks to 6 months."
  },
  {
    question: "How can I be sure my information is confidential?",
    answer: "We sign NDAs and use enterprise-grade security measures to protect your data."
  }
]

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.getElementById('timeline')
      if (timeline) {
        const rect = timeline.getBoundingClientRect()
        const timelineTop = rect.top
        const timelineBottom = rect.bottom
        const windowHeight = window.innerHeight
        const progress = (windowHeight - timelineTop) / (timelineBottom - timelineTop)
        setScrollProgress(Math.min(Math.max(progress, 0), 1))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <AuroraBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-24">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="mb-8">
            <WhiteButton 
              title="HOW WE WORK" 
              handleClick={() => console.log("HOW WE WORK")}
            />
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-semibold text-white mb-6 font-neueGraphica leading-tight"
          >
            <span className="">
              Got a Project?
            </span>
            <br />
            Ourquilane is Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-satochi"
          >
            We are here to help and support you through every step of your digital transformation journey.
          </motion.p>
        </motion.section>

        <section id="timeline" className="mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="absolute left-0 md:left-1/2 top-0 w-0.5 h-full bg-gray-700 transform md:-translate-x-1/2">
              <motion.div 
                className="absolute top-0 w-full bg-white"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  transition: 'height 0.2s ease-out'
                }}
              />
            </div>

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-12`}
                onViewportEnter={() => setActiveStep(index)}
              >
                <div className="absolute left-0 md:left-1/2 top-8 -ml-3 z-10">
                  <motion.div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: scrollProgress * steps.length > index ? 'white' : '#374151',
                      boxShadow: scrollProgress * steps.length > index ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
                      transition: 'all 0.3s ease-out'
                    }}
                    animate={{ 
                      scale: activeStep === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white/50"
                      animate={{ 
                        scale: scrollProgress * steps.length > index ? 0.5 : 1
                      }}
                    />
                  </motion.div>
                </div>

                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-8 md:pl-0`}>
                  <motion.div 
                    className="flex flex-col gap-2"
                    whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-white/80 text-sm font-satochi tracking-wider">
                      STEP {index + 1}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white font-neueGraphica mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/80 font-satochi leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <WhiteButton 
              title="FREQUENTLY ASKED QUESTIONS" 
              handleClick={() => console.log("FAQ")}
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
              <motion.div 
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-neueGraphica text-base">
                    {faq.question}
                  </span>
                  <Image 
                    src={openFaq === index ? ArrowTop : ArrowDown}
                    alt="Toggle answer"
                    className="h-6 w-6 filter brightness-0 invert transition-transform duration-300"
                  />
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-black/20">
                        <p className="text-white/80 font-satochi">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default HowWeWork
