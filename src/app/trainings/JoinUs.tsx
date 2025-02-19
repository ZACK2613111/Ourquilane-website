"use client";
import Button from "@/components/shared/Button";
import { motion } from "framer-motion";

const JoinUs = () => {
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
      className="mt-32 mb-24 text-center relative z-10 flex flex-col items-center justify-center min-h-screen"
    >
      <motion.h1
        custom={0.2}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl font-bold mb-6 font-gabarito leading-tight"
      >
        <span className="block">
          <span className="block text-white">Rejoignez-Nous : Stages, </span>
          <span className="text-white">Candidatures et Opportunités</span>
        </span>
      </motion.h1>

      <motion.p
        custom={0.4}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-dmSans mb-10"
      >
        Postulez dès maintenant et vivez une expérience formatrice au sein de notre équipe dynamique.
      </motion.p>

      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center"
        >
      <Button title="POSTULER MAINTENANT" handleClick={() => console.log("Postuler maintenant")} />
      </motion.div>
    </motion.section>
  );
};

export default JoinUs;
