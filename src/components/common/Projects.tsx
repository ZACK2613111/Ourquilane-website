'use client'
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import ButtonArrow from '../shared/ButtonArrow';
import Button from '../shared/Button'
import WhiteButton from '../shared/WhiteButton';
import Image from 'next/image';
import ProjectImage from "../../../public/images/shared/projects.svg";

interface Project {
  id: string;
  number: string;
  name: string;
  client: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
  totalProjects: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, totalProjects }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
  const ySpring = useSpring(y, springConfig);

  const imageScale = useSpring(isHovered ? 1.05 : 1, springConfig);

  useEffect(() => {
    if (isInView) {
      cardRef.current?.classList.add('animate-fadeIn');
    } else {
      cardRef.current?.classList.remove('animate-fadeIn');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: scaleSpring, opacity: opacitySpring, y: ySpring }}
      className="w-full sticky top-24"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="rounded-3xl p-4 sm:p-8 border border-white backdrop-blur-md bg-opacity-80 hover:bg-opacity-100 transition-all duration-300"
        whileHover={{ boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}
      >
        <div className="flex flex-col space-y-4 sm:space-y-8">
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div 
              className="flex items-baseline gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-satoshi text-5xl sm:text-7xl font-bold leading-none">
                {project.number}
              </span>
              <span className="font-satoshi text-sm text-gray-400">
                /{totalProjects.toString().padStart(2, '0')}
              </span>
            </motion.div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:px-8 lg:px-16">
              {['PROJET', 'CLIENT', 'TECHNOLOGIES'].map((label, index) => (
                <motion.div 
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <span className="text-sm font-medium text-gray-200 font-neueGraphica tracking-wide">
                    {label}
                  </span>
                  <motion.div 
                    className="text-base font-medium mt-2 font-satoshi"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {label === 'PROJET' && project.name}
                    {label === 'CLIENT' && project.client}
                    {label === 'TECHNOLOGIES' && (
                      <div className="flex flex-wrap gap-4">
                        {project.technologies.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <ButtonArrow 
              title="VOIR PROJET" 
              handleClick={() => console.log("VOIR PROJET")}
            />
          </motion.div>

          <motion.div 
            ref={imageRef}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div style={{ scale: imageScale }}>
              <Image
                src={ProjectImage || "/placeholder.svg"}
                alt="project"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const projects: Project[] = [
    {
      id: '1',
      number: '01',
      name: 'Ourquilane Website',
      client: 'OURQUILANE',
      technologies: ['React', 'Angular', 'Node js'],
    },
    {
      id: '2',
      number: '02',
      name: 'Ourquilane Website',
      client: 'OURQUILANE',
      technologies: ['React', 'Angular', 'Node js'],
    },
    {
      id: '3',
      number: '03',
      name: 'Ourquilane Website',
      client: 'OURQUILANE',
      technologies: ['React', 'Angular', 'Node js'],
    },
    {
      id: '4',
      number: '04',
      name: 'Ourquilane Website',
      client: 'OURQUILANE',
      technologies: ['React', 'Angular', 'Node js'],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-24"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
        }
      }}
    >
      <div className="max-w-[90%] mx-auto mb-24">
        <motion.div 
          className="mb-6 sm:mb-8"
          variants={headerVariants}
        >
          <WhiteButton 
            title="OUR PROJECTS"
            handleClick={() => console.log('Our Projects clicked')}
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12"
          variants={headerVariants}
        >
          <motion.h2 
            className="font-neueGraphica text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-0 max-w-2xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
              }
            }}
          >
            Our Latest Work
          </motion.h2>
          <motion.div 
            className="w-full sm:w-auto"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
              }
            }}
          >
            <Button 
              handleClick={() => console.log('View all projects')} 
              title="VIEW ALL PROJECTS"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="space-y-[100vh] max-w-[90%] mx-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            totalProjects={projects.length}
          />    
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;