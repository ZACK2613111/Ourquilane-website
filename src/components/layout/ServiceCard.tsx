import Image from 'next/image';
import { ServiceCardProps } from '@/types/Service';

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  return (
    <div
      className={`font-dmSans group relative flex flex-col rounded-3xl p-6 sm:p-8 
        border border-white/10 backdrop-blur-sm 
        bg-transparent
         ${className}`}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-6">
        <Image 
          src={service.icon} 
          alt={service.title} 
          width={64} 
          height={64}
          className="h-16 w-16 object-contain"
        />
      </div>

      <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-gabarito">{service.title}</h3>
      <p className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-grayDescription">
        {service.description}
      </p>
    </div>
  );
};
