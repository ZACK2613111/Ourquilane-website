'use client'
import React from 'react';
import WhiteButton from '@/components/shared/WhiteButton';
import Button from '@/components/shared/Button';
import {ServiceCard} from '@/components/layout/ServiceCard';
import { services } from '@/data/Services';

const Services: React.FC = () => {
  return (
    <section id="services" className="w-full text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <WhiteButton 
            title="OUR SERVICES"
            handleClick={() => console.log('Our Services clicked')}
          />
        </div>
        
        {/* Title and CTA Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="font-gabarito text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-0 max-w-2xl">
            What We Are Good At
          </h2>
          <div className="w-full sm:w-auto">
            <Button 
              handleClick={() => console.log('View all services')} 
              title="VIEW ALL SERVICES"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={services[0]} className="sm:w-1/2" />
            <ServiceCard service={services[1]} className="sm:w-1/2" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={services[2]} className="sm:w-2/3" />
            <ServiceCard service={services[3]} className="sm:w-1/3" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <ServiceCard service={services[4]} className="sm:w-1/3" />
            <ServiceCard service={services[5]} className="sm:w-2/3" />
          </div>
        </div>
      </div>
    </section>
  );
};



export default Services;
