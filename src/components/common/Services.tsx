'use client';
import React from 'react';
import WhiteButton from '@/components/shared/WhiteButton';
import Button from '@/components/shared/Button';
import { ServiceCard } from '@/components/layout/ServiceCard';
import { services, servicesFrensh } from '@/data/Services';
import { useLanguage } from "@/context/LanguageContext";

const Services: React.FC = () => {
  const { language } = useLanguage();
  const servicesToRender = language === "FR" ? servicesFrensh : services;

  const getText = (englishText: string, frenchText: string) => 
    language === "FR" ? frenchText : englishText;

  return (
    <section id="services" className="w-full text-white py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6 sm:mb-8">
          <WhiteButton 
            title={getText("OUR SERVICES", "NOS SERVICES")}
            handleClick={() => console.log('Our Services clicked')}
            aria-label={getText("Our Services", "Nos Services")}
            href="#services"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-gabarito font-semibold text-4xl md:text-5xl leading-[50px] tracking-[2%] text-white mb-6 sm:mb-0 max-w-2xl">
            {getText("What We Are Good At", "Ce que nous savons faire")}
          </h2>
          <div className="w-2/3 sm:w-auto">
            <Button 
              handleClick={() => console.log('View all services')} 
              title={getText("VIEW ALL SERVICES", "VOIR TOUS LES SERVICES")}
              aria-label={getText("View all services", "Voir tous les services")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={servicesToRender[0]} className="sm:w-1/2" />
            <ServiceCard service={servicesToRender[1]} className="sm:w-1/2" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={servicesToRender[2]} className="sm:w-2/3" />
            <ServiceCard service={servicesToRender[3]} className="sm:w-1/3" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={servicesToRender[4]} className="sm:w-1/3" />
            <ServiceCard service={servicesToRender[5]} className="sm:w-2/3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;