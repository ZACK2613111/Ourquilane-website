'use client'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

interface TimelineStep {
  title: string
  description: string
}

interface TimelineProps {
  steps: TimelineStep[]
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const timeline = document.getElementById('timeline')
    if (!timeline) return

    const rect = timeline.getBoundingClientRect()
    const progress = (window.innerHeight - rect.top) / (rect.bottom - rect.top)
    setScrollProgress(Math.min(Math.max(progress, 0), 1))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const TimelineDot: React.FC<{
    index: number
    isActive: boolean
    progress: number
  }> = ({ index, isActive, progress }) => (
    <motion.div 
      className="absolute left-0 md:left-1/2 top-8 -ml-3 z-10"
      animate={{ 
        scale: isActive ? 1.2 : 1,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: progress * steps.length > index ? 'white' : '#374151',
          boxShadow: progress * steps.length > index ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
          transition: 'all 0.3s ease-out'
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white/50"
          animate={{ 
            scale: progress * steps.length > index ? 0.5 : 1
          }}
        />
      </motion.div>
    </motion.div>
  )

  return (
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
            <TimelineDot 
              index={index}
              isActive={activeStep === index}
              progress={scrollProgress}
            />

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
  )
}

export default Timeline