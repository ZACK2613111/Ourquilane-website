"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import React, { memo, lazy, Suspense } from "react";

// Lazy loading Button component
const Button = lazy(() => import("@/components/shared/Button"));

const AboutUs = () => {
  const { translations } = useLanguage();

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
      className="min-h-screen flex items-center justify-center"
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center bg-transparent flex flex-col items-center justify-center">
        <div className="max-w-3xl mb-6">
          <motion.h1
            custom={0.2}
            variants={textFadeVariant}
            initial="hidden"
            animate="visible"
            className="font-gabarito font-semibold sm:text-title-about text-4xl md:text-5xl lg:text-6xl tracking-[0.02em] text-center text-white"
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
          animate="visible"
          className="font-dmSans font-normal sm:text-description tracking-[0.01em] max-w-4xl mx-auto mb-10 text-grayDescription text-description-mobile"
        >
          {translations.about.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center mt-6 w-1/2 lg:w-1/3 mx-auto"
        >
          <Suspense fallback={<div>Loading...</div>}>
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