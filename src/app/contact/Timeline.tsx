"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface TimelineStep {
  title: string
  description: string
}

interface TimelineProps {
  steps: TimelineStep[]
}

interface TimelineCircleProps {
  index: number
  isActive: boolean
  scrollProgress: number
  stepsCount: number
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Memoize steps count to prevent unnecessary recalculations
  const stepsCount = useMemo(() => steps.length, [steps]);

  const handleScroll = useCallback(() => {
    const timeline = document.getElementById("timeline")
    if (!timeline) return

    const rect = timeline.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    // Calculate scroll progress more efficiently
    const viewportPosition = windowHeight - rect.top;
    const totalScrollDistance = windowHeight + rect.height;
    const progress = Math.min(Math.max(viewportPosition / totalScrollDistance, 0), 1)
    setScrollProgress(progress)

    // Calculate active step based on progress
    const stepProgress = progress * stepsCount;
    const newActiveStep = Math.min(Math.floor(stepProgress), stepsCount - 1);
    
    if (newActiveStep !== activeStep) {
      setActiveStep(newActiveStep)
    }
  }, [stepsCount, activeStep])

  useEffect(() => {
    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial calculation on mount
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Timeline circle component
  const TimelineCircle: React.FC<TimelineCircleProps> = ({ index, isActive, scrollProgress, stepsCount }) => {
    const isCompleted = scrollProgress * stepsCount > index;
    
    return (
      <div 
        className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10" 
        style={{ top: `${(index / (stepsCount - 1)) * 100}%` }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: isActive ? 1.2 : 1,
            transition: { duration: 0.4 }
          }}
          className={`
            w-6 h-6 rounded-full flex items-center justify-center
            ${isCompleted ? 'bg-[#E9CD2A]' : 'bg-[#9A5CE4]'}
            transition-colors duration-500
            ${isActive ? 'ring-4 ring-opacity-40 ring-[#E9CD2A]' : ''}
          `}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-white"
            animate={{
              scale: isCompleted ? 0.8 : 1
            }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative">
          {/* Fixed vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2 z-0 bg-gray-800/30">
            <motion.div
              className="absolute w-full bg-gradient-to-b from-[#9A5CE4] to-[#E9CD2A]"
              style={{
                height: `${scrollProgress * 100}%`,
                top: 0,
              }}
              transition={{ type: "tween", ease: "easeOut" }}
            />
          </div>

          {steps.map((_, index) => (
            <TimelineCircle 
              key={`circle-${index}`} 
              index={index} 
              isActive={activeStep === index}
              scrollProgress={scrollProgress}
              stepsCount={stepsCount}
            />
          ))}

          <div className="relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={`step-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: activeStep === index ? 1.02 : 1
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  relative mb-20 md:mb-32 
                  w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[40%]
                  ml-16 sm:ml-20 
                  ${index % 2 === 0 ? 'md:mr-[60%]' : 'md:ml-[60%]'} 
                  md:mx-0
                `}
              >
                <motion.div 
                  className="relative p-6 sm:p-8 rounded-xl border border-white/10 bg-gray-900/30 backdrop-blur-sm hover:bg-gray-900/40 transition-all duration-300 group"
                  whileHover={{ 
                    x: index % 2 === 0 ? 5 : -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Connecting line */}
                  <div className={`
                    hidden md:block absolute top-1/2 w-16 h-0.5 
                    bg-gradient-to-r 
                    ${index % 2 === 0 ? 
                      'right-0 translate-x-full from-gray-700 to-transparent' : 
                      'left-0 -translate-x-full from-transparent to-gray-700'
                    }
                    -translate-y-1/2
                  `} />
                  
                  {/* Card content */}
                  <div className="space-y-4 relative z-10">
                    <span className="font-gabarito text-base text-white font-medium tracking-wider uppercase opacity-80">
                      {language === "FR" 
                        ? `ÉTAPE ${(index + 1).toString().padStart(2, "0")}` 
                        : `STEP ${(index + 1).toString().padStart(2, "0")}`}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white font-gabarito">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-base sm:text-lg leading-relaxed font-dmSans">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
