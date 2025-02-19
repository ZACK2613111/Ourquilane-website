'use client';
import React from 'react';
import { motion } from 'framer-motion';
import WhiteButton from '@/components/shared/WhiteButton';
import Button from '@/components/shared/Button';
import { ServiceCard } from '@/components/layout/ServiceCard';
import { services, servicesFrensh } from '@/data/Services';
import { Service } from '@/types/Service';
import { useLanguage } from "@/context/LanguageContext";


const AnimatedServiceCard = ({ service, className, direction }: { 
  service: Service; 
  className: string; 
  direction: 'left' | 'right' 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ x: direction === 'left' ? -100 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        bounce: 0.4,
        duration: 0.8 
      }}
    >
      <ServiceCard service={service} className="h-full" />
    </motion.div>
  );
};

const Services: React.FC = () => {
  
  const {language} = useLanguage()
  const servicesToRender = language == "FR" ? servicesFrensh : services;

  return (
    <section id="services" className="w-full min-h-screen text-white py-8 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <WhiteButton 
            title={language === "FR" ? "NOS SERVICES" : "OUR SERVICES"}
            handleClick={() => console.log('Our Services clicked')}
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-gabarito font-semibold text-4xl md:text-5xl leading-[50px] tracking-[2%] text-white mb-6 sm:mb-0 max-w-2xl">
            {language === "FR" ? "Ce que nous savons faire" : "What We Are Good At"}
          </h2>
          <div className="w-2/3 sm:w-auto">
            <Button 
              handleClick={() => console.log('View all services')} 
              title={language === "FR" ? "VOIR TOUS LES SERVICES" : "VIEW ALL SERVICES"}
            />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={servicesToRender[0]} className="sm:w-1/2" direction="left" />
            <AnimatedServiceCard service={servicesToRender[1]} className="sm:w-1/2" direction="right" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={servicesToRender[2]} className="sm:w-2/3" direction="left" />
            <AnimatedServiceCard service={servicesToRender[3]} className="sm:w-1/3" direction="right" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={servicesToRender[4]} className="sm:w-1/3" direction="left" />
            <AnimatedServiceCard service={servicesToRender[5]} className="sm:w-2/3" direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
