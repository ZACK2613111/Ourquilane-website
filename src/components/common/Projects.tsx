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
  }}, []);

  // Select the project list based on the current language
  const selectedProjects = language === "FR" ? projects : projectsEnglish;

  // Translate static texts based on the language
  const title = language === "FR" ? "Où la vision rencontre la réalité" : "Where Vision Meets Reality";
  const buttonTitle = language === "FR" ? "VOIR TOUS LES PROJETS" : "VIEW ALL PROJECTS";

  return (
    <section id="projects" className="w-full min-h-screen py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <WhiteButton 
            title={language === "FR" ? "NOS PROJETS" : "OUR PROJECTS"}
            handleClick={() => console.log('Our projects clicked')}
          />
        </div>
        
        {/* Title and CTA Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-gabarito font-semibold sm:text-title-other tracking-[2%] text-left text-white mb-6 text-title-mobile">
            {title}
          </h2>
          <div className="w-full sm:w-auto">
            <Button 
              handleClick={() => console.log('View all projects')} 
              title={buttonTitle}
            />
          </div>
        </div>

        {/* Project Cards */}
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
