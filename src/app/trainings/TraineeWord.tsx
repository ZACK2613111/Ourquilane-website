'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TraineeWords } from "@/data/TraineeWords";

const CARD_CONFIG = {
  positions: [
    { top: 115.52, left: 135.97, rotation: -16.13, dimensions: { w: 415.9, h: 223.74, br: 19.74 } },
    { top: 73.56, left: 897.66, rotation: 11.28, dimensions: { w: 426.08, h: 144.27, br: 20.23 } },
    { top: 521.09, left: 124.66, rotation: 11.5, dimensions: { w: 451.37, h: 264.25, br: 21.43 } },
    { top: 613.3, left: 877.98, rotation: -10.37, dimensions: { w: 452.87, h: 174.84, br: 21.5 } }
  ],
  styles: [
    { bg: 'rgba(255, 255, 255, 0.05)', border: 'rgba(255, 255, 255, 0.1)', shadow: 'rgba(255, 255, 255, 0.08)' },
    { bg: 'rgba(250, 221, 42, 0.05)', border: 'rgba(250, 221, 42, 0.3)', shadow: 'rgba(250, 221, 42, 0.08)' },
    { bg: 'rgba(250, 221, 42, 0.05)', border: 'rgba(250, 221, 42, 0.3)', shadow: 'rgba(250, 221, 42, 0.08)' },
    { bg: 'rgba(154, 92, 228, 0.05)', border: 'rgba(154, 92, 228, 0.3)', shadow: 'rgba(154, 92, 228, 0.08)' }
  ]
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    rotate: CARD_CONFIG.positions[index].rotation,
    scale: 0.8,
    y: 50,
  }),
  visible: (index) => ({
    opacity: 1,
    rotate: CARD_CONFIG.positions[index].rotation,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
      delay: index * 0.15,
    }
  }),
  hover: {
    scale: 1.05,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
};

const TestimonialCard = ({ testimonial, index, isVisible, isMobile }) => {
  const { dimensions, top, left } = CARD_CONFIG.positions[index];
  const style = CARD_CONFIG.styles[index];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      className={`backdrop-blur-lg p-6 ${isMobile ? 'w-full max-w-md mx-auto' : 'absolute'}`}
      style={{
        width: isMobile ? '100%' : `${dimensions.w}px`,
        height: isMobile ? 'auto' : `${dimensions.h}px`,
        top: isMobile ? 'auto' : `${top}px`,
        left: isMobile ? 'auto' : `${left}px`,
        borderRadius: `${dimensions.br}px`,
        background: style.bg,
        border: `0.5px solid ${style.border}`,
        boxShadow: `0px 0px 17.8px 4.4px ${style.shadow}`,
      }}
    >
      <motion.div
        className="h-full flex flex-col justify-between"
        variants={contentVariants}
      >
        <p className="text-[#E5E5E5] font-dmSans text-sm leading-relaxed mb-4">
          {testimonial.word}
        </p>

        <div className="space-y-1">
          <h3 className="font-gabarito font-semibold text-white">
            {testimonial.fullname}
          </h3>
          <p className="font-gabarito text-xs text-gray-300">
            {testimonial.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MainContent = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }}
      className="text-center mb-8 sm:mb-16 px-4 sm:px-0 w-full"
    >
      <motion.h1 
        className="text-4xl sm:text-5xl font-gabarito font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Learning, Growing,<br />Succeeding
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-base sm:text-lg font-dmSans text-gray-300 max-w-2xl mx-auto"
      >
        Learning in action—see how our trainees tackle challenges and grow with us.
      </motion.p>
    </motion.div>
  </div>
);

const LearningCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Delay the animation start slightly
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Check for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '120vh' }}>
      <MainContent />

      <AnimatePresence>
        <div className="absolute inset-0 z-10">
          {TraineeWords.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.fullname}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible && !isMobile}
              isMobile={isMobile}
            />
          ))}
        </div>
      </AnimatePresence>

      {/* Mobile View - Vertical Layout */}
      {isMobile && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start space-y-6 p-4 mt-8">
          {TraineeWords.map((testimonial, index) => (
            <motion.div
              key={testimonial.fullname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-full max-w-md backdrop-blur-lg p-6 rounded-lg"
              style={{
                background: CARD_CONFIG.styles[index].bg,
                border: `0.5px solid ${CARD_CONFIG.styles[index].border}`,
                boxShadow: `0px 0px 17.8px 4.4px ${CARD_CONFIG.styles[index].shadow}`,
              }}
            >
              <p className="text-white font-dmSans text-sm leading-relaxed mb-4">
                {testimonial.word}
              </p>
              <div className="space-y-1">
                <h3 className="font-gabarito font-semibold text-white">
                  {testimonial.fullname}
                </h3>
                <p className="font-dmSans text-xs text-gray-300">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningCards;
