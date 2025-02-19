'use client';

import React, { memo, lazy, Suspense } from 'react';
import Image from 'next/image';
import WhiteButton from '../shared/WhiteButton';
import Logo from "../../../public/images/Logo-shadow.svg";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from 'framer-motion';

interface EnterpriseTranslations {
  titleButton: string;
  title: string;
  description: string;
  Button: string;
}

interface LanguageContextType {
  translations: {
    entreprise: EnterpriseTranslations;
  };
}

// Lazy loading Button component
const Button = lazy(() => import('../shared/Button'));

const WhiteButtonMemo = memo(WhiteButton);

const Entreprise: React.FC = () => {
  const { translations } = useLanguage() as LanguageContextType;

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
      id="entreprise"
      className="relative py-16 md:py-24 px-6 lg:px-20"
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Left Content */}
        <div className="lg:w-2/3 space-y-8">
          <div>
            <WhiteButtonMemo 
              handleClick={() => console.log('Who Are We clicked')} 
              title={translations.entreprise.titleButton}
            />
          </div>

          <motion.h1
            custom={0.2}
            variants={textFadeVariant}
            initial="hidden"
            animate="visible"
            className="font-gabarito font-semibold sm:text-title-other tracking-[2%] text-left text-white mb-6 text-title-mobile"
          >
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#9747FF] to-[#E9CD2A]">Ourquilane</span>
            {translations.entreprise.title}
          </motion.h1>

          <motion.p
            custom={0.4}
            variants={textFadeVariant}
            initial="hidden"
            animate="visible"
            className="font-dmSans font-normal sm:text-description tracking-[1%] max-w-4xl mx-auto mb-10 text-description-mobile text-grayDescription"
          >
            {translations.entreprise.description}
          </motion.p>

          {/* Responsive Button Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:w-1/2 w-full"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Button
                handleClick={() => console.log('Know More clicked')} 
                title={translations.entreprise.Button}
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Right Content - Logo */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
          <motion.div
            className="relative flex justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse" 
                aria-hidden="true"
              />
              <Image 
                src={Logo} 
                alt="Ourquilane company logo" 
                width={300} 
                height={300} 
                className="rounded-full object-contain z-10 relative"
                sizes="(max-width: 768px) 200px, 300px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(Entreprise);