"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Button from "@/components/shared/ButtonArrow"
import type { ProjectCardProps } from "@/types/Project"

const ProjectCard = ({ project, totalProjects = 1 }: ProjectCardProps) => {
  const cardRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Safeguard: Provide default values for the project object
  const safeProject = {
    number: project?.number || "01",
    name: project?.name || "Project Name",
    description: project?.description || "Project description goes here.",
    technologies: project?.technologies || ["Tech 1", "Tech 2", "Tech 3"],
  }

  // Safeguard: Ensure totalProjects is a valid number
  const safeTotalProjects = typeof totalProjects === "number" ? totalProjects : 1

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, isMobile ? 1 : 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, isMobile ? 0 : -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [5, 0, 0, isMobile ? 0 : -5])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, 20])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const techVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        y,
        opacity,
        rotateZ: rotate,
        transformOrigin: "center center",
      }}
      className={`w-full sticky top-24 min-h-[80vh] rounded-3xl p-8 sm:p-12 overflow-hidden group border border-white/10 backdrop-blur-xl bg-transparent transition-all duration-500 ease-out`}
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backdropFilter: `blur(${blur}px)` }}
      />

      {/* Project Number and Total Projects */}
      <motion.div
        className="flex items-start gap-2 mb-8 sm:mb-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="font-gabarito text-6xl sm:text-8xl font-bold text-white/90 leading-none">
          {safeProject.number}
        </span>
        <span className="font-gabarito text-sm text-white/40 mt-2 sm:mt-4">
          /{safeTotalProjects.toString().padStart(2, "0")}
        </span>
      </motion.div>

      {/* Project Content */}
      <div className="max-w-2xl space-y-6 sm:space-y-8 relative z-10">
        {/* Project Title */}
        <motion.h3
          className="text-4xl sm:text-5xl font-gabarito font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {safeProject.name}
        </motion.h3>

        {/* Project Description */}
        <motion.p
          className="text-xl sm:text-2xl text-white/70 leading-relaxed font-gabarito"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {safeProject.description}
        </motion.p>

        {/* Technologies and View Project Button */}
        <motion.div
          className="flex flex-wrap items-center gap-4 pt-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Technologies */}
          {safeProject.technologies.map((tech) => (
            <motion.span
              key={tech}
              variants={techVariants}
              className="px-6 py-2 rounded-full border border-white/20 backdrop-blur-md text-white/70 text-sm sm:text-base font-dmSans font-bold transition-all duration-300"
              style={{
                transformOrigin: "center bottom",
              }}
            >
              {tech}
            </motion.span>
          ))}

          {/* View Project Button */}
          <div className="w-full sm:w-auto">
            <Button handleClick={() => console.log('View Project')} title="VIEW PROJECT" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectCard