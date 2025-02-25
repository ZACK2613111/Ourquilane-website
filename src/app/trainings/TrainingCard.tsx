import { useState } from "react";
import Image from "next/image";
import type { Training } from "@/types/Trainings";

interface TrainingCardProps {
  training: Training;
}

const TrainingCard = ({ training }: TrainingCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Tech Icons Section */}
      <div className="lg:w-1/4">
        <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-4">
          {training.TechIcons.map((Icon, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl backdrop-blur-md 
                         bg-white/5 border border-white/5 p-2 lg:p-3 
                         transition-all duration-500 hover:bg-white/10 
                         hover:scale-105 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleMouseEnter(index)}
              onTouchEnd={handleMouseLeave} 
            >
              <div className="relative w-full h-full">
                {/* Default Icon */}
                <Image
                  src={hoveredIndex === index 
                      ? training.TechIconsWhite[index] 
                      : Icon || "/placeholder.svg"
                  }
                  alt="Technology icon"
                  fill
                  className="object-contain p-2 lg:p-4 transition-all duration-300 ease-in-out transform"
                />
                {/* White Icon for Mobile/Tablet View */}
                <Image
                  src={training.TechIconsWhite[index] || "/placeholder.svg"}
                  alt="White Technology icon"
                  fill
                  className="absolute inset-0 object-contain p-2 lg:p-4 transition-all duration-300 ease-in-out transform lg:hidden"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Description Section */}
      <div className="lg:w-9/12 rounded-2xl backdrop-blur-md bg-white/5 
                    border border-white/10 p-6 lg:p-8 transition-all 
                    duration-300 hover:bg-white/10">
        {/* Fields */}
        <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
          {training.field.map((field, index) => (
            <span
              key={index}
              className="px-3 lg:px-4 py-1 lg:py-1.5 bg-white rounded-2xl 
                         font-dmSans tracking-wide text-sm lg:text-base font-bold
                         transition-all duration-300 hover:bg-white/90"
            >
              {field.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Training Title */}
        <h3 className="text-2xl lg:text-3xl font-semibold font-gabarito 
                     text-white mb-3 lg:mb-4 leading-tight">
          {training.title}
        </h3>

        {/* Training Description */}
        <p className="text-white/80 font-dmSans text-sm lg:text-base 
                    leading-relaxed">
          {training.description}
        </p>
      </div>
    </div>
  );
};

export default TrainingCard;
