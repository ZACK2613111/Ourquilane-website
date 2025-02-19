"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TraineeWords, TraineeWordsEnglish } from "@/data/TraineeWords";
import { useLanguage } from "@/context/LanguageContext";

const CARD_CONFIG = {
  positions: [
    {
      top: 155.52,
      left: 105.97,
      rotation: -16.13,
      dimensions: { w: 475, h: 250.74, br: 19.74 },
    },
    {
      top: 173.56,
      left: 897.66,
      rotation: 11.28,
      dimensions: { w: 426.08, h: 150.27, br: 20.23 },
    },
    {
      top: 621.09,
      left: 124.66,
      rotation: 11.5,
      dimensions: { w: 451.37, h: 264.25, br: 21.43 },
    },
    {
      top: 653.3,
      left: 877.98,
      rotation: -10.37,
      dimensions: { w: 452.87, h: 204.84, br: 21.5 },
    },
  ],
  styles: [
    {
      bg: "rgba(255, 255, 255, 0.05)",
      border: "rgba(255, 255, 255, 0.1)",
      shadow: "rgba(255, 255, 255, 0.08)",
    },
    {
      bg: "rgba(250, 221, 42, 0.05)",
      border: "rgba(250, 221, 42, 0.3)",
      shadow: "rgba(250, 221, 42, 0.08)",
    },
    {
      bg: "rgba(250, 221, 42, 0.05)",
      border: "rgba(250, 221, 42, 0.3)",
      shadow: "rgba(250, 221, 42, 0.08)",
    },
    {
      bg: "rgba(154, 92, 228, 0.05)",
      border: "rgba(154, 92, 228, 0.3)",
      shadow: "rgba(154, 92, 228, 0.08)",
    },
  ],
  backgroundPositions: [
    { top: 40, left: 70 },
    { top: 100, left: 700 },
    { top: 400, left: 300 },
    { top: 500, left: 850 },
  ],
};

const cardVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    rotate: CARD_CONFIG.positions[index].rotation,
    scale: 0.8,
    y: 50,
  }),
  visible: (index: number) => ({
    opacity: 1,
    rotate: CARD_CONFIG.positions[index].rotation,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
      delay: index * 0.15,
    },
  }),
  hover: {
    scale: 1.05,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
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
    },
  },
};

interface Testimonial {
  word: string;
  fullname: string;
  role: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
  isMobile: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
  isVisible,
  isMobile,
}) => {
  const { dimensions, top, left } = CARD_CONFIG.positions[index];
  const style = CARD_CONFIG.styles[index];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      className={`backdrop-blur-lg p-6 ${
        isMobile ? "w-full max-w-xl mx-auto mb-6" : "absolute"
      }`}
      style={{
        width: isMobile ? "100%" : `${dimensions.w}px`,
        height: isMobile ? "auto" : `${dimensions.h}px`,
        top: isMobile ? "auto" : `${top}px`,
        left: isMobile ? "auto" : `${left}px`,
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
        <p className="text-[#E5E5E5] font-dmSans text-base leading-relaxed mb-6">
          {testimonial.word}
        </p>
        <div className="space-y-2">
          <h3 className="font-dmSans font-semibold text-white">
            {testimonial.fullname}
          </h3>
          <p className="font-dmSans text-base font-bold text-gray-300">
            {testimonial.role}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
const MainContent: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        className="w-full text-center"
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-gabarito font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {language === "FR" 
            ? "Apprendre, Grandir," 
            : "Learning,"}
          <br />
          Succeeding
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg font-dmSans text-gray-300 max-w-xl mx-auto"
        >
          {language === "FR"
            ? "Apprenez en action—voyez comment nos stagiaires relèvent des défis et grandissent avec nous."
            : "Learning in action—see how our trainees tackle challenges and grow with us."}
        </motion.p>
      </motion.div>
    </div>
  );
};



const LearningCards: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const selectedTraineeWords = language === "FR" ? TraineeWords : TraineeWordsEnglish;
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden" style={{ minHeight: "145vh" }}>
      {/* Desktop Version */}
      <div className={`${isMobile ? "hidden" : "absolute inset-0 z-10"}`}>
        <MainContent />
        <AnimatePresence>
          {selectedTraineeWords.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.fullname}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible && !isMobile}
              isMobile={isMobile}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Mobile Version - Stack Cards Vertically */}
      {isMobile && (
        <div className="absolute z-10 flex flex-col items-center justify-start space-y-8 p-4 mt-8 w-full pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-gabarito font-bold mb-4 text-white w-full text-center"
          >
            Learning, Growing,
            <br />
            Succeeding
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg font-dmSans text-gray-300 max-w-xl mx-auto text-center"
          >
            Learning in action—see how our trainees tackle challenges and grow
            with us.
          </motion.p>
          {selectedTraineeWords.map((testimonial, index) => (
            <motion.div
              key={testimonial.fullname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="w-full max-w-md backdrop-blur-lg p-6 rounded-xl"
              style={{
                background: CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].bg,
                border: `0.5px solid ${CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].border}`,
                boxShadow: `0px 0px 17.8px 4.4px ${CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].shadow}`,
              }}
            >
              <p className="text-white font-dmSans text-sm leading-relaxed mb-6">
                {testimonial.word}
              </p>
              <div className="space-y-2">
                <h3 className="font-satochi font-semibold text-white">
                  {testimonial.fullname}
                </h3>
                <p className="font-dmSans text-base font-bold text-gray-300">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Background Blurred Cards with Updated Positions */}
      <div className="absolute inset-0 z-0">
        {selectedTraineeWords.map((testimonial, index) => (
          <motion.div
            key={`background-${testimonial.fullname}`}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.15 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute backdrop-blur-lg rounded-lg"
            style={{
              width: `${CARD_CONFIG.positions[index % CARD_CONFIG.positions.length].dimensions.w}px`,
              height: `${CARD_CONFIG.positions[index % CARD_CONFIG.positions.length].dimensions.h}px`,
              top: `${CARD_CONFIG.backgroundPositions[index % CARD_CONFIG.backgroundPositions.length].top}px`, 
              left: `${CARD_CONFIG.backgroundPositions[index % CARD_CONFIG.backgroundPositions.length].left}px`,
              background: CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].bg,
              border: `0.5px solid ${CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].border}`,
              boxShadow: `0px 0px 17.8px 4.4px ${CARD_CONFIG.styles[index % CARD_CONFIG.styles.length].shadow}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningCards;

