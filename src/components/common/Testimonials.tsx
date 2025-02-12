import React, { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun"
  },
  {
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun"
  },
  {
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    author: "DERBAL RAYHANE",
    role: "CEO, BrightSun"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-black flex items-center px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="lg:w-2/3 text-center lg:text-left">
          <div className="mb-8 lg:mb-12">
            <button 
              onClick={() => console.log('Who Are We clicked')}
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              WHO ARE WE
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 max-w-4xl mx-auto">
            Ourquilane, a leader in R&D for innovative and efficient software solutions
          </h1>

          <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto lg:mx-0">
            We drive sector transformation with tailor-made solutions
            <br className="hidden md:block" />
            and a commitment to excellence, bringing your most
            <br className="hidden md:block" />
            ambitious projects to life.
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => console.log('Know More clicked')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              KNOW MORE
            </button>
          </div>
        </div>

        {/* Right Content - Testimonials */}
        <div className="lg:w-1/3 relative">
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A] p-6 rounded-xl min-h-[200px] flex flex-col justify-between"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6">{testimonial.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{testimonial.author}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;