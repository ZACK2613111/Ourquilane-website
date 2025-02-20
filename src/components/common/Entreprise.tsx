'use client';

import React, { memo, lazy, Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import WhiteButton from '../shared/WhiteButton';
import Logo from "../../../public/images/Logo-shadow.svg";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix initial render issues by setting mounted state
    setMounted(true);
    
    // Add viewport height fix for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const handleContactClick = () => {
    router.push('/contact');
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

  if (!mounted) return null; // Prevent flash of unstyled content

  return (
    <motion.section
      id="entreprise"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
      className="relative w-full flex items-center justify-center py-10 px-5 sm:py-16 md:py-20"
      variants={fadeInUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
        {/* Left Content - Always Left Aligned */}
        <div className="w-full lg:w-2/3 space-y-5 md:space-y-6">
          <div className="w-auto inline-block">
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
            className="font-gabarito font-semibold text-3xl sm:text-4xl md:text-5xl tracking-wide text-left text-white"
          >
            <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#9747FF] to-[#E9CD2A]">Ourquilane</span>
            {' '}{translations.entreprise.title}
          </motion.h1>

          <motion.p
            custom={0.4}
            variants={textFadeVariant}
            initial="hidden"
            animate="visible"
            className="font-dmSans font-normal text-base sm:text-lg md:text-xl tracking-wide text-grayDescription max-w-4xl"
          >
            {translations.entreprise.description}
          </motion.p>

          {/* Button Container - Mobile Half Width */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full sm:w-1/2"
          >
            <Suspense fallback={<div className="h-12 w-full bg-gray-700/20 rounded-md animate-pulse"></div>}>
              <Button
                handleClick={handleContactClick}
                title={translations.entreprise.Button}
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Right Content - Logo */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div
            className="relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px]">
              <div 
                className="absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse bg-gradient-to-r from-purple-500 to-yellow-400" 
                aria-hidden="true"
              />
              <Image 
                src={Logo} 
                alt="Ourquilane company logo" 
                fill
                className="rounded-full object-contain z-10 relative"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 250px"
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