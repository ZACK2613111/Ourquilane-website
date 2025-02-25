"use client"

import { Trainings, TrainingsEnglsh } from "@/data/Trainings"
import TrainingCard from "./TrainingCard"
import { useLanguage } from "@/context/LanguageContext";

const Training = () => {
  const {language} = useLanguage();
  const selectedTrainings = language === "FR" ? Trainings : TrainingsEnglsh;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-16 min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-12">
        {selectedTrainings.map((training, index) => (
          <div
            key={index}
            className="transition-opacity duration-300 opacity-100"
          >
            <TrainingCard training={training} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Training;
