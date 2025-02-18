import Image from "next/image"
import type { Training } from "@/types/Trainings"

interface TrainingCardProps {
  training: Training
}

const TrainingCard = ({ training }: TrainingCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/4 grid grid-cols-2 gap-4">
        {training.TechIcons.map((Icon, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-xl backdrop-blur-md bg-white/5 border border-white/5 p-3 transition-all duration-500 hover:bg-white/10"
          >
            <div className="relative w-full h-full">
              <Image 
                src={Icon || "/placeholder.svg"} 
                alt="Technology icon" 
                fill 
                className="object-contain p-4"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-9/12 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:bg-white/10">
        <div className="flex flex-wrap gap-2 mb-6">
          {training.field.map((field, index) => (
            <span 
              key={index} 
              className="px-4 py-1.5 bg-white rounded-2xl font-dmSans tracking-wide text-base font-bold"
            >
              {field.toUpperCase()}
            </span>
          ))}
        </div>
        
        <h3 className="text-3xl font-semibold font-gabarito text-white mb-4 leading-tight">
          {training.title}
        </h3>
        
        <p className="text-white/80 font-dmSans text-base leading-relaxed">
          {training.description}
        </p>
      </div>
    </div>
  )
}

export default TrainingCard