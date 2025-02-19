"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/layout/ProjectCard";
import { projects } from "@/data/Projects";
import Button from "../shared/Button";
import WhiteButton from "../shared/WhiteButton";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="w-full min-h-screen py-8 px-6 lg:px-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-[1440px] mx-auto"
      >
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <WhiteButton 
            title="OUR PROJECTS"
            handleClick={() => console.log('Our projects clicked')}
          />
        </motion.div>
        
        {/* Title and CTA Button */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-gabarito font-semibold text-4xl md:text-5xl leading-[50px] tracking-[2%] text-white mb-6 sm:mb-0 max-w-2xl">
            Where Vision Meets Reality
          </h2>
          <div className="w-full sm:w-auto">
            <Button 
              handleClick={() => console.log('View all projects')} 
              title="VIEW ALL PROJECTS"
            />
          </div>
        </motion.div>

        {/* Project Cards */}
        <div className="mt-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} totalProjects={projects.length} i={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;