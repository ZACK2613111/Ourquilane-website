import Image, { StaticImageData } from 'next/image';
import Button from "@/components/shared/ButtonArrow"
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  icon: StaticImageData;
}

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`font-dmSans group relative flex flex-col rounded-3xl p-6 sm:p-8 
        border border-white/10 backdrop-blur-sm 
        bg-transparent
        transition-all duration-300 ease-in-out ${className}`}
    >
      {/* bg-gradient-to-r from-purple-900/20 to-yellow-500/20 
        hover:from-purple-900/30 hover:to-yellow-500/30  */}
      <motion.div 
        className="w-16 h-16 flex items-center justify-center mb-6"
        whileHover={{ rotate: 5 }}
      >
        <Image 
          src={service.icon} 
          alt={service.title} 
          width={64} 
          height={64}
          className="h-16 w-16 object-contain"
        />
      </motion.div>

      <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-gabarito">{service.title}</h3>
      <p className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-description">
        {service.description}
      </p>

      <div className="mt-auto">
        <Button
          handleClick={() => console.log(`Discover ${service.title}`)}
          title="Discover our services"
        />
      </div>
    </motion.div>
  );
};