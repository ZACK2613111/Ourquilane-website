"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/layout/ProjectCard";
import { projects, projectsEnglish } from "@/data/Projects";
import Button from "../shared/Button";
import WhiteButton from "../shared/WhiteButton";
import { useLanguage } from "@/context/LanguageContext";

const ProjectsSection = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if(isVisible==false) {
    setIsVisible(true);
  }}, [isVisible]);

  const selectedProjects = language === "FR" ? projects : projectsEnglish;

  return (
    <section id="projects" className="w-full min-h-screen py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
      <div className="mb-2 sm:mb-4">
          <WhiteButton 
            title={language === "FR" ? "NOS PROJETS" : "OUR PROJECTS"}
            handleClick={() => console.log('Our Services clicked')}
          />
        </div>
        
        {/* Services Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-gabarito font-semibold text-4xl md:text-5xl leading-[50px] tracking-[2%] text-white mb-6 sm:mb-0 max-w-2xl">
            {language === "FR" ? "Où la vision rencontre la réalité" : "VIEW ALL PROJECTS"}
          </h2>
          <div className="w-2/3 sm:w-auto">
            <Button 
              handleClick={() => console.log('View all projects')} 
              title={language === "FR" ? "VOIR TOUS LES PROJETS" : "VIEW ALL PROJECTS"}
            />
          </div>
        </div>

        <div className="mt-32">
          {selectedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} totalProjects={selectedProjects.length} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
