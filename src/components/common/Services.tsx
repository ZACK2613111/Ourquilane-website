'use client'
import React from 'react';
import { motion } from 'framer-motion';
import WhiteButton from '@/components/shared/WhiteButton';
import Button from '@/components/shared/Button';
import {ServiceCard} from '@/components/layout/ServiceCard';
import { services } from '@/data/Services';
import { Service } from '@/types/Service'

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
  return (
    <section id="services" className="w-full text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <WhiteButton 
            title="OUR SERVICES"
            handleClick={() => console.log('Our Services clicked')}
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
          <h2 className="font-gabarito text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-0 max-w-2xl">
            What We Are Good At
          </h2>
          <div className="w-full sm:w-auto">
            <Button 
              handleClick={() => console.log('View all services')} 
              title="VIEW ALL SERVICES"
            />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={services[0]} className="sm:w-1/2" direction="left" />
            <AnimatedServiceCard service={services[1]} className="sm:w-1/2" direction="right" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={services[2]} className="sm:w-2/3" direction="left" />
            <AnimatedServiceCard service={services[3]} className="sm:w-1/3" direction="right" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <AnimatedServiceCard service={services[4]} className="sm:w-1/3" direction="left" />
            <AnimatedServiceCard service={services[5]} className="sm:w-2/3" direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;