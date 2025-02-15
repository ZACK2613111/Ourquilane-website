'use client'
import React from 'react';
import WhiteButton from '@/components/shared/WhiteButton';
import Button from '@/components/shared/Button';
import ButtonArrow from '@/components/shared/ButtonArrow';
import Image from 'next/image';
import Monitor from "../../../public/images/services/monitor.svg";
import BarChart from "../../../public/images/services/status-up.svg";
import People from "../../../public/images/services/people.svg";
import Fl4 from "../../../public/images/services/lamp-charge.svg";
import { StaticImageData } from 'next/image';

interface Service {
  title: string;
  description: string;
  icon: StaticImageData;
}

const services: Service[] = [
  {
    title: "Design & Development",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: Monitor
  },
  {
    title: "Data Analysis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: BarChart
  },
  {
    title: "Accompaniement",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: People
  },
  {
    title: "R&D",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    icon: Fl4
  }
];

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
          <h2 className="font-neueGraphica text-4xl md:text-5xl font-bold leading-tight mb-6 sm:mb-0 max-w-2xl">
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
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: Service; className?: string }> = ({ service, className }) => {
  return (
    <div className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 border-2 border-white backdrop-blur-sm transition-all duration-300 ease-in-out ${className}`}>
      <div className="w-16 h-16 flex items-center justify-center mb-6">
        <Image 
          src={service.icon} 
          alt={service.title} 
          width={64} 
          height={64}
          className="h-16 w-16 object-contain"
        />
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold mb-4">{service.title}</h3>
      <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
        {service.description}
      </p>

      <div className="mt-auto">
        <ButtonArrow
          handleClick={() => console.log(`Discover ${service.title}`)}
          title="Discover our services"
        />
      </div>
    </div>
  );
};

export default Services;
