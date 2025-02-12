'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Work = () => {
  return (
    <section id="work" className="relative min-h-screen flex items-center justify-center bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-neueGraphica text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Building the Future of Your
            <br />
            Organization Together
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-satoshi text-xl md:text-2xl text-gray-400">
            We&apos;re ready to get started, just say the word.
          </p>
        </motion.div>

        {/* Glass Button with Animation */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button className="glass-button font-satoshi uppercase tracking-wider text-sm md:text-base px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/20">
            LET&apos;S GET TO WORK!
          </button>
        </motion.div>

        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8"
        >
          <Image 
            src="/images/logo.png" 
            alt="Company Logo"
            width={160} 
            height={48}
            className="max-w-[200px] w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Work