"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import React, { memo, lazy, Suspense } from "react";

// Lazy loading Button component
const Button = lazy(() => import("@/components/shared/Button"));

const Header = () => {
  const { language } = useLanguage();
  const formURL = "https://forms.gle/crL34FXLV3FTMXj98";

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

  const title = language === "FR"
    ? "Innovateurs du Futur : Ourquilane"
    : "Future Innovators : Ourquilane";

  const subtitle = language === "FR"
    ? "Stagiaires & Leurs Projets"
    : "Trainees & Their Projects";

  const description = language === "FR"
    ? "Responsabiliser la prochaine génération à travers des projets pratiques et une expérience réelle."
    : "Empowering the next generation through hands-on projects and real-world experience.";

  return (
    <motion.section
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
      className="mt-32 mb-24 text-center relative z-10 px-4 md:px-8"
    >
      <motion.h1
        custom={0.2}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="font-gabarito font-semibold sm:text-title-about tracking-[2%] text-center text-white mb-6 text-title-mobile"
      >
        <span className="block">
          <span className="bg-gradient-to-r from-[#9747FF] to-[#E9CD2A] text-transparent bg-clip-text">
            {title.split(":")[0]}
          </span>
          <span className="text-white">{title.split(":")[1]}</span>
        </span>
        <span className="block text-white">{subtitle}</span>
      </motion.h1>

      <motion.p
        custom={0.4}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-white"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 mx-auto mt-6"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Button
            title={language === "FR" ? "POSTULER MAINTENANT" : "APPLY NOW"}
            handleClick={() => window.open(formURL, "_blank")}
          />
        </Suspense>
      </motion.div>
    </motion.section>
  );
};

export default memo(Header);
