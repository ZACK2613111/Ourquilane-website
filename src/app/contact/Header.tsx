'use client'
import { motion } from 'framer-motion'
import WhiteButton from '@/components/shared/WhiteButton'

const Header = () => {
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const textFadeVariant = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: {
        delay,
        duration: 0.5
      }
    })
  }

  return (
    <motion.section 
      variants={fadeInUpVariant}
      initial="hidden"
      animate="visible"
      className="mb-16 md:mb-24 text-center relative z-10"
    >
      <div className="mb-8">
        <WhiteButton 
          title="HOW WE WORK" 
          handleClick={() => {}}
        />
      </div>
      
      <motion.h1
        custom={0.2}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-6xl font-semibold text-white mb-6 font-neueGraphica leading-tight"
      >
        <span className="block">Got a Project?</span>
        <span className="block">Ourquilane is Here</span>
      </motion.h1>

      <motion.p
        custom={0.4}
        variants={textFadeVariant}
        initial="hidden"
        animate="visible"
        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-satochi"
      >
        We are here to help and support you through every step of your digital transformation journey.
      </motion.p>
    </motion.section>
  )
}

export default Header