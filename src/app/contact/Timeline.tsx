"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface TimelineStep {
  title: string
  description: string
}

interface TimelineProps {
  steps: TimelineStep[]
}

// Separate TimelineCircle component to avoid recreation on each render
const TimelineCircle = ({ 
  index, 
  isActive, 
  scrollProgress, 
  stepsCount 
}: { 
  index: number; 
  isActive: boolean; 
  scrollProgress: number; 
  stepsCount: number; 
}) => {
  const isCompleted = scrollProgress * stepsCount > index;
  
  return (
    <div 
      className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10" 
      style={{ top: `${(index / (stepsCount - 1)) * 100}%` }}
    >
      <div
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${isCompleted ? 'bg-violet' : 'bg-yellow'}
          transition-all duration-500
          ${isActive ? 'scale-125 ring-4 ring-opacity-40 ring-yellow' : 'scale-100'}
        `}
      >
        <div 
          className={`w-2 h-2 rounded-full bg-white transition-transform duration-500 ${isCompleted ? 'scale-80' : 'scale-100'}`}
        />
      </div>
    </div>
  )
};

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const activeStepRef = useRef(activeStep)
  
  // Update ref when state changes to avoid dependency issues
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  // Memoize the steps count to avoid recalculations
  const stepsCount = useMemo(() => steps.length, [steps]);

  // Optimized scroll handler with fewer dependencies
  const handleScroll = useCallback(() => {
    const timeline = document.getElementById("timeline")
    if (!timeline) return

    const rect = timeline.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    const viewportPosition = windowHeight - rect.top;
    const totalScrollDistance = windowHeight + rect.height;
    const progress = Math.min(Math.max(viewportPosition / totalScrollDistance, 0), 1)
    setScrollProgress(progress)

    const stepProgress = progress * stepsCount;
    const newActiveStep = Math.min(Math.floor(stepProgress), stepsCount - 1);
    
    // Use ref instead of state in dependency
    if (newActiveStep !== activeStepRef.current) {
      setActiveStep(newActiveStep)
    }
  }, [stepsCount]); // Removed activeStep from dependencies

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Trigger initial calculation
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll]);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative">
          {/* Timeline track */}
          <div className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2 z-0 bg-gray-800/30">
            <div
              className="absolute w-full bg-gradient-to-b from-violet to-yellow transition-all duration-500"
              style={{
                height: `${scrollProgress * 100}%`,
                top: 0,
              }}
            />
          </div>

          {/* Timeline circles */}
          {steps.map((_, index) => (
            <TimelineCircle 
              key={`circle-${index}`} 
              index={index} 
              isActive={activeStep === index}
              scrollProgress={scrollProgress}
              stepsCount={stepsCount}
            />
          ))}

          {/* Timeline content */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <div
                key={`step-${index}`}
                className={`
                  relative mb-20 md:mb-32 
                  w-[calc(100%-3rem)] sm:w-[calc(100%-4rem)] md:w-[40%]
                  ml-16 sm:ml-20 
                  ${index % 2 === 0 ? 'md:mr-[60%]' : 'md:ml-[60%]'} 
                  md:mx-0
                  transition-all duration-500
                  ${activeStep === index ? 'scale-102' : 'scale-100'}
                `}
              >
                <div 
                  className="relative p-6 sm:p-8 rounded-xl border border-white/10 bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300 group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`
                    hidden md:block absolute top-1/2 w-16 h-0.5 
                    bg-gradient-to-r 
                    ${index % 2 === 0 ? 
                      'right-0 translate-x-full from-gray-700 to-transparent' : 
                      'left-0 -translate-x-full from-transparent to-gray-700'
                    }
                    -translate-y-1/2
                  `} />
                  
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline