"use client";

import { useRef, useEffect, useState } from "react";
// import Button from "@/components/shared/ButtonArrow";  
import type { ProjectCardProps } from "@/types/Project";
import TechBackground from "../common/Background";

const ProjectCard = ({ project, totalProjects = 1 }: ProjectCardProps) => {
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const safeProject = {
    number: project?.number || "01",
    name: project?.name || "Project Name is loading ...",
    description: project?.description || "Project description is loading ...",
    technologies: project?.technologies || ["NestJS", "NextJS", "Docker"],
  };

  const safeTotalProjects = typeof totalProjects === "number" ? totalProjects : 1;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-full mx-auto sticky top-[15vh] sm:top-[20vh] min-h-[50vh] rounded-3xl p-4 sm:p-6 overflow-hidden group border border-white/10 backdrop-blur-xl bg-[#0A0A0A]/80 animate-fade-in"
    >
      <TechBackground />

      <div className="flex justify-between items-center mx-2 my-2 sm:mb-6 animate-slide-in-left">
        <div className="flex items-center gap-2">
          <span className="font-gabarito text-5xl sm:text-6xl md:text-7xl font-bold text-white/90 leading-none">
            {safeProject.number}
          </span>
          <span className="font-gabarito text-xs sm:text-sm text-grayDescription mt-1.5 sm:mt-2 md:mt-3">
            /{safeTotalProjects.toString().padStart(2, "0")}
          </span>
        </div>
        {/* <Button handleClick={() => console.log("View Project")} title="VIEW PROJECT" /> */}
      </div>

      <div className="group relative flex flex-col rounded-3xl p-4 sm:p-6 border border-white/10 backdrop-blur-sm bg-transparent mx-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-gabarito font-bold text-white mb-3 sm:mb-4 animate-slide-in-left">
          {safeProject.name}
        </h3>

        <p className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mb-10 text-description-mobile text-grayDescription animate-slide-in-left">
          {safeProject.description}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 animate-slide-in-left">
          {safeProject.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-white/5 bg-transparent backdrop-blur-md text-white/70 text-sm sm:text-lg font-dmSans sm:font-bold font-normal hover:text-white transition-all duration-300 tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;