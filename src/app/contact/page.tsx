"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import WhiteButton from '@/components/shared/WhiteButton'
import ArrowTop from '../../../public/images/shared/arrow-up.svg'
import ArrowDown from '../../../public/images/shared/arrow-down.svg'
import AuroraBackground from '@/components/common/Background'
import { useForm } from "react-hook-form"

import { Loader2, Send } from "lucide-react"
interface FormData {
  fullName: string
  company: string
  email: string
  phone: string
  message: string
}

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to send message")

      setSubmitStatus("success")
      reset()
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }
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
                      <div className="px-6 py-4 bg-transparent">
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
      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <WhiteButton title="CONTACT US" handleClick={() => {}} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-semibold text-white mt-8 mb-6 font-neueGraphica"
          >
            Let&apos;s Work Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto font-satochi"
          >
            Our team will call you to discuss your needs and schedule a work session.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left Section with Map and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            {/* Map */}
            <motion.div
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.7814813012386!2d3.0424166!3d36.7459722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ0JzQ1LjUiTiAzwrAwMic0MC42IkU!5e0!3m2!1sen!2sdz!4v1647544555647!5m2!1sen!2sdz`}
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 shadow-2xl border border-white/10"
              whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("fullName", { required: "Full name is required" })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="Full Name"
                    />
                    {errors.fullName && <p className="mt-1 text-red-400 text-sm">{errors.fullName.message}</p>}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("company")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="Company & Position"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="Email"
                    />
                    {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <input
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+\-\s()]*$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                      placeholder="Phone"
                    />
                    {errors.phone && <p className="mt-1 text-red-400 text-sm">{errors.phone.message}</p>}
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors min-h-[150px]"
                    placeholder="Message"
                  />
                  {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-white text-black font-neueGraphica rounded-xl py-4 px-8 flex items-center justify-center gap-2 hover:bg-white/90 transition-colors ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      SEND YOUR MESSAGE
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-400 text-center"
                    >
                      Message sent successfully! We&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-center"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default HowWeWork
