import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

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
    const timeline = document.getElementById("timeline")
    if (!timeline) return

    const rect = timeline.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height)
    setScrollProgress(Math.min(Math.max(progress, 0), 1))

    // Calculate active step with threshold
    const stepHeight = 1 / steps.length
    const newActiveStep = Math.floor((scrollProgress + 0.1) / stepHeight)
    if (newActiveStep !== activeStep && newActiveStep < steps.length) {
      setActiveStep(newActiveStep)
    }
  }, [steps.length, activeStep])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const TimelineDot: React.FC<{
    index: number
    isActive: boolean
    progress: number
  }> = ({ index, isActive, progress }) => (
    <motion.div
      className="absolute left-0 md:left-1/2 top-0 -ml-3 md:-ml-4 z-10"
      style={{ top: `${(index / (steps.length - 1)) * 100}%` }}
      animate={{
        scale: isActive ? 1.2 : 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      <motion.div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: progress * steps.length > index ? "#E9CD2A" : "#9A5CE4",
          opacity: progress * steps.length > index ? 1 : 0.15,
          boxShadow: progress * steps.length > index ? "0 0 30px rgba(233, 205, 42, 0.3)" : "none",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-white/60"
          animate={{
            scale: progress * steps.length > index ? 0.6 : 1,
            transition: { duration: 0.5 },
          }}
        />
      </motion.div>
    </motion.div>
  )

  return (
    <section id="timeline" className="mb-32 px-4 md:px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative max-w-full mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-3 md:left-1/2 top-0 w-0.5 h-full bg-gray-800/50 transform md:-translate-x-1/2">
          <motion.div
            className="absolute top-0 w-full bg-gradient-to-b from-[#9A5CE4]/20 to-[#E9CD2A]"
            style={{
              height: `${scrollProgress * 100}%`,
              transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>

        {/* Timeline Dots */}
        {steps.map((_, index) => (
          <TimelineDot key={index} index={index} isActive={activeStep === index} progress={scrollProgress} />
        ))}

        {/* Timeline Cards */}
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: activeStep === index ? 1.02 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.1,
            }}
            className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 border border-white/5 bg-transparent transition-all duration-500 ease-in-out
              ${index % 2 === 1 ? "md:ml-auto md:mr-16" : "md:mr-auto md:ml-16"} 
              mb-16 md:mb-24 w-full md:w-[42%]
              hover:border-white/10 backdrop-blur-sm
            `}
          >
            <div className={`${index % 2 === 1 ? "md:pr-8 md:text-right" : "md:pl-8"} pl-8 md:pl-0`}>
              <motion.div
                className="flex flex-col gap-2"
                whileHover={{ x: index % 2 === 1 ? -5 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white/60 text-xs sm:text-sm font-dmSans tracking-wider">
                  STEP {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-gabarito mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 font-dmSans leading-relaxed">{step.description}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Timeline
