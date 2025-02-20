'use client';

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import React, { memo, lazy, Suspense, useEffect, useState } from "react";

// Lazy loading Button component
const Button = lazy(() => import("@/components/shared/Button"));

const AboutUs: React.FC = () => {
  const { translations } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Ensure hydration is complete before animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  
  const textFadeVariant = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <motion.section
      id="about"
      className="w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12"
      variants={fadeInUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto text-center bg-transparent flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mb-6">
          <motion.h1
            custom={0.2}
            variants={textFadeVariant}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            className="font-gabarito font-semibold text-4xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-center text-white"
          >
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#9747FF] to-[#E9CD2A] block mb-2">
              {translations.about.titleSpan}
            </span>
            {translations.about.title}
          </motion.h1>
        </div>
        
        <motion.p
          custom={0.4}
          variants={textFadeVariant}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="font-dmSans font-normal text-base sm:text-lg md:text-xl tracking-wide max-w-4xl mx-auto mb-10 text-grayDescription"
        >
          {translations.about.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto mt-6"
        >
          <Suspense fallback={<div className="h-12 w-full bg-gray-700/20 rounded-md animate-pulse"></div>}>
            <Button
              handleClick={handleContactClick}
              title={translations.about.contactButton}
            />
          </Suspense>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(AboutUs);