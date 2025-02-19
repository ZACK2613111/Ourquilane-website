"use client"

import { Trainings, TrainingsEnglsh } from "@/data/Trainings"
import TrainingCard from "./TrainingCard"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext";

const Training = () => {
  const {language} = useLanguage();
  const selectedTrainings = language === "FR"? Trainings: TrainingsEnglsh;
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-16 min-h-screen flex justify-center items-center">
      <motion.div
        className="flex flex-col gap-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {selectedTrainings.map((training, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 25,
            }}
          >
            <TrainingCard training={training} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Training
