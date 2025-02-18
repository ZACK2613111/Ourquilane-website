"use client";
import { motion } from "framer-motion";

const Header = () => {
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
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
      className="mt-32 mb-24 text-center relative z-10"
    >
      <motion.h1
        custom={0.2}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl font-bold mb-6 font-gabarito leading-tight"
      >
        <span className="block">
          <span className="bg-gradient-to-r from-[#9747FF] to-[#E9CD2A] text-transparent bg-clip-text">
            Future Innovators
          </span>
          <span className="text-white">: Ourquilane.</span>
        </span>
        <span className="block text-white">Trainees & Their Projects</span>
      </motion.h1>

      <motion.p
        custom={0.4}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-dmSans"
      >
        Empowering the next generation through hands-on projects and real-world
        experience.
      </motion.p>
    </motion.section>
  );
};

export default Header;
