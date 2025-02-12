'use client'
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import WhiteButton from '../shared/WhiteButton';
import Button from '../shared/Button';

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "/images/shared/person1.jpg"
  },
  {
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: ""  // No image, we will render a placeholder
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun",
    imageUrl: "/images/shared/person3.jpg"
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row  gap-16">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left space-y-8 flex flex-col justify-between h-full"
        >
          <div>
            <WhiteButton title="Testimonials" handleClick={()=> console.log("Testimonials")}/>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6 font-neueGraphica"
          >
            Don&apos;t Take It From Us,<br />Hear It From Our Clients
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 font-neueGraphica"
          >
            We drive sector transformation with tailor-made solutions
            and a commitment to excellence, bringing your most
            ambitious projects to life.
          </motion.p>
          <div>
          <Button title="KNOW MORE" handleClick={()=> console.log("KNOW MORE")}/>

          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col rounded-xl p-6 sm:p-8 border-2 border-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-white/30 font-satochi hover:shadow-xl hover:shadow-white/5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image 
                      src="/images/shared/star.svg" 
                      alt="star" 
                      width={20} 
                      height={20} 
                      className="mr-1"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {testimonial.text}
              </p>

              {/* Border above the image and author */}
              <div className="border-t-2 border-white/30 mt-6 pt-4 flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-full relative overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 border border-white/30 rounded-full" />
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </motion.div>

                <div>
                  <p className="text-white font-medium text-lg">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm font-neueGraphica">{testimonial.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
