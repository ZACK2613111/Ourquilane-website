"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Button from "@/components/shared/ButtonArrow"
import type { ProjectCardProps } from "@/types/Project"
import TechBackground from "../common/Background"

const ProjectCard = ({ project, totalProjects = 1 }: ProjectCardProps) => {
  const cardRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  const safeProject = {
    number: project?.number || "01",
    name: project?.name || "Project Name is loading ...",
    description: project?.description || "Project description is loading ...",
    technologies: project?.technologies || ["NestJS", "NextJS", "Docker"],
  }

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
      className="w-full max-w-full mx-auto sticky top-[20vh] sm:top-[30vh] min-h-[50vh] rounded-3xl p-4 sm:p-6 overflow-hidden group border border-white/10 backdrop-blur-xl bg-[#0A0A0A]/80"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <TechBackground />

      {/* Project Number and Total Projects */}
      <motion.div
        className="flex justify-between items-center mx-2 my-2 sm:mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 ">
          <span className="font-gabarito text-5xl sm:text-6xl md:text-7xl font-bold text-white/90 leading-none">
            {safeProject.number}
          </span>
          <span className="font-gabarito text-xs sm:text-sm text-description mt-1.5 sm:mt-2 md:mt-3">
            /{safeTotalProjects.toString().padStart(2, "0")}
          </span>
        </div>
        <Button handleClick={() => console.log("View Project")} title="VIEW PROJECT" />
      </motion.div>

      <div className="group relative flex flex-col rounded-3xl p-4 sm:p-6 border border-white/10 backdrop-blur-sm bg-transparent mx-2">
        {/* Project Title */}
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-gabarito font-bold text-white mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {safeProject.name}
        </motion.h3>

        {/* Project Description */}
        <motion.p
          className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-grayDescription"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {safeProject.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {safeProject.technologies.map((tech) => (
            <motion.span
              key={tech}
              variants={techVariants}
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-white/5  bg-transparent backdrop-blur-md text-white/70 text-base sm:text-lg font-dmSans font-bold hover:text-white transition-all duration-300 tracking-wider"
              style={{ transformOrigin: "center bottom" }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectCard