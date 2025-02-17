"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import ButtonArrow from "../shared/ButtonArrow"
import Button from "../shared/Button"
import WhiteButton from "../shared/WhiteButton"
import Image from "next/image"
import ProjectImage from "../../../public/images/shared/projects.svg"
import Lenis from "@studio-freight/lenis"

interface Project {
  id: string
  number: string
  name: string
  client: string
  technologies: string[]
}

interface ProjectCardProps {
  project: Project
  totalProjects: number
  i: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, totalProjects, i }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1 - (totalProjects - i) * 0.05])
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : i * 25])
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])

  return (
    <motion.div ref={cardRef} style={{ scale, y }} className={`w-full ${isMobile ? "" : "sticky top-24"}`}>
      <div className="rounded-4xl p-4 sm:p-8 border border-white backdrop-blur-md bg-transparent  transition-all duration-200">
        <div className="flex flex-col space-y-4 sm:space-y-8">
          {/* Project Header */}
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between gap-4">
            {/* Project Number */}
            <div className="flex items-baseline gap-1">
              <span className="font-satoshi text-5xl sm:text-7xl font-semibold leading-none">{project.number}</span>
              <span className="font-satoshi text-sm text-white/80">/{totalProjects.toString().padStart(2, "0")}</span>
            </div>

            {/* Project Details Grid */}
            <div className="flex-1 grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-2 lg:px-32">
              {[
                { label: "PROJET", value: project.name },
                { label: "CLIENT", value: project.client },
                {
                  label: "TECHNOLOGIES",
                  value: (
                    <div className="flex flex-wrap gap-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ),
                },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-2">
                  <span className="text-base text-white/90 font-satochi tracking-wide">{label}</span>
                  <div className="text-base font-medium font-satoshi text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Image */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="h-full">
              <Image
                src={ProjectImage || "/placeholder.svg"}
                alt={`${project.name} preview`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Mobile View Button */}
          <div className="md:hidden w-full flex justify-end mt-4">
            <ButtonArrow title="VOIR PROJET" handleClick={() => console.log("VOIR PROJET")} />
          </div>

          {/* Desktop View Button */}
          <div className="hidden md:block absolute top-8 right-8">
            <ButtonArrow title="VOIR PROJET" handleClick={() => console.log("VOIR PROJET")} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const projects: Project[] = [
    {
      id: "1",
      number: "01",
      name: "Ourquilane Website",
      client: "OURQUILANE",
      technologies: ["React", "Angular", "Node js"],
    },
    {
      id: "2",
      number: "02",
      name: "Ourquilane Website",
      client: "OURQUILANE",
      technologies: ["React", "Angular", "Node js"],
    },
    {
      id: "3",
      number: "03",
      name: "Ourquilane Website",
      client: "OURQUILANE",
      technologies: ["React", "Angular", "Node js"],
    },
    {
      id: "4",
      number: "04",
      name: "Ourquilane Website",
      client: "OURQUILANE",
      technologies: ["React", "Angular", "Node js"],
    },
  ]

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Check for mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
      lenis.destroy()
    }
  }, [])

  return (
    <section id="projects" ref={containerRef} className="w-full relative bg-transparent text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <WhiteButton title="OUR PROJECTS" handleClick={() => console.log("Our Projects clicked")} />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 gap-6">
          <h2 className="font-gabarito text-4xl md:text-5xl font-bold leading-tight max-w-2xl">Our Latest Work</h2>
          <div className="w-full sm:w-auto">
            <Button handleClick={() => console.log("View all projects")} title="VIEW ALL PROJECTS" />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`max-w-[90%] mx-auto ${isMobile ? "space-y-12" : "space-y-[100vh]"}`}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} totalProjects={projects.length} i={i} />
        ))}
      </div>

      {/* Bottom Spacing */}
      <div className="h-24 md:h-48" />
    </section>
  )
}

export default ProjectsSection

