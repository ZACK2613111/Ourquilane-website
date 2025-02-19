'use client';

import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Lazy loading Button component
const Button = lazy(() => import('../shared/Button'));

const Work = () => {
  const ref = React.useRef(null);
  const { translations } = useLanguage();

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
      ref={ref}
      id="work"
      className="relative min-h-screen flex flex-col items-center justify-center bg-transparent text-white py-20 px-4 overflow-hidden"
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        {/* Title */}
        <motion.div
          custom={0.2}
          variants={textFadeVariant}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-gabarito font-semibold text-title-mobile sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center tracking-wide mt-4 sm:mt-8">
            {translations.work.title} 
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          custom={0.4}
          variants={textFadeVariant}
          initial="hidden"
          animate="visible"
        >
          <p className="font-dmSans font-normal text-description-mobile sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide mt-4 sm:mt-6">
            {translations.work.description} 
          </p>
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center relative z-20 mt-6 sm:mt-8 w-1/2 lg:w-1/2"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Button title={translations.work.Button} handleClick={() => console.log('Contact Us clicked')} />
        </Suspense>
      </motion.div>
    </motion.section>
  );
};

export default Work;