'use client'

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Button from "../shared/Button"
import { useLanguage } from "@/context/LanguageContext"
import facebook from "../../../public/images/social-media/facebook.svg"
import x from "../../../public/images/social-media/x.svg"
import instagram from "../../../public/images/social-media/instagram.svg"
import linkedin from "../../../public/images/social-media/linkedin.svg"

const Footer: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const { translations } = useLanguage()

  const socialLinks = [
    { icon: facebook, name: translations.footer.socialMedia.facebook },
    { icon: linkedin, name: translations.footer.socialMedia.linkedin },
    { icon: x, name: translations.footer.socialMedia.twitter },
    { icon: instagram, name: translations.footer.socialMedia.instagram },
  ]

  const footerSections = [
    {
      title: translations.footer.navigation,
      links: ['Home', 'About', 'Services', 'Clients', 'Projects', 'Testimonials'],
    },
    {
      title: translations.footer.aboutUs,
      links: ['Mission', 'Vision', 'Values', 'Team'],
    },
    {
      title: translations.footer.services,
      links: [],
    },
    {
      title: translations.footer.projects,
      links: [],
    },
    {
      title: translations.footer.training,
      links: [],
    },
    {
      title: translations.footer.contact,
      links: [],
    },
  ]

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribe clicked with email:", email)
      setEmail("")
    }
  }

  return (
    <footer className="relative bg-transparent text-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mx-auto px-4 sm:px-6 lg:px-20 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-satoshi font-bold"
            >
              OURQUILANE
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-satoshi font-bold leading-tight"
            >
              {translations.footer.slogan}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  placeholder={translations.footer.emailPlaceholder}
                  className="w-full bg-transparent border-b border-gray-700 p-3 pr-32 
                           focus:outline-none focus:border-white transition-colors
                           font-satoshi placeholder-gray-500"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <Button 
                    title={translations.footer.subscribeButton} 
                    handleClick={handleSubscribe}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-sm font-satoshi font-bold uppercase tracking-wider mb-4">
                  {translations.footer.contactUs}
                </h3>
                <p className="text-gray-400 font-satoshi">(+213) 550923561</p>
                <p className="text-gray-400 font-satoshi">yourcompany@ourquilane.dz</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-sm font-satoshi font-bold uppercase tracking-wider mb-4">
                  {translations.footer.findUs}
                </h3>
                <p className="text-gray-400 font-satoshi">Hydra, Algiers</p>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {footerSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <h4 className="font-satoshi text-lg font-bold mb-4">
                    {section.title}
                  </h4>
                  {section.links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block text-gray-400 hover:text-white transition-colors mb-2 font-satoshi"
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <p className="text-gray-400 font-satoshi text-sm">
            {translations.footer.copyright}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer