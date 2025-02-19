'use client';

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { useLanguage } from '@/context/LanguageContext';

const AboutUs = () => {
  const { translations } = useLanguage();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-5xl mx-auto px-4 py-20 text-center bg-transparent flex flex-col items-center justify-center">
        <div className='max-w-3xl'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-gabarito text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
          >
          {translations.about.title}
        </motion.h1>
          </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-satoshi text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          {translations.about.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <Button 
            handleClick={handleContactClick} 
            title={translations.about.contactButton} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;