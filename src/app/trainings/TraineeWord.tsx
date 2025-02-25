'use client';
import React, { useEffect, useState } from 'react';
import { TraineeWords, TraineeWordsEnglish } from '@/data/TraineeWords';
import { useLanguage } from '@/context/LanguageContext';

const LearningCards: React.FC = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  const selectedTraineeWords = language === 'FR' ? TraineeWords : TraineeWordsEnglish;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Only check for mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define card styles with colors
  const cardStyles = [
    {
      bg: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: 'rgba(255, 255, 255, 0.08)',
    },
    {
      bg: 'rgba(250, 221, 42, 0.05)',
      border: 'rgba(250, 221, 42, 0.3)',
      shadow: 'rgba(250, 221, 42, 0.08)',
    },
    {
      bg: 'rgba(250, 221, 42, 0.05)',
      border: 'rgba(250, 221, 42, 0.3)',
      shadow: 'rgba(250, 221, 42, 0.08)',
    },
    {
      bg: 'rgba(154, 92, 228, 0.05)',
      border: 'rgba(154, 92, 228, 0.3)',
      shadow: 'rgba(154, 92, 228, 0.08)',
    },
  ];

  return (
    <div className="w-full max-w-[1440px] overflow-hidden relative mx-auto">
      {/* Main Content */}
      <div className=" pt-8 px-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-gabarito font-bold mb-4 text-white">
          {language === 'FR' ? 'Apprendre, Grandir,' : 'Learning, Growing,'}
          <br />
          {language === 'FR' ? 'Réussir' : 'Succeeding'}
        </h1>
        <p className="text-base sm:text-lg font-dmSans text-gray-300 max-w-xl mx-auto">
          {language === 'FR'
            ? 'Apprendre en action : découvrez comment nos stagiaires relèvent les défis et grandissent avec nous.'
            : 'Learning in action—see how our trainees tackle challenges and grow with us.'}
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className={`px-4 py-6 grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}
      >
        {selectedTraineeWords.map((testimonial, index) => {
          const style = cardStyles[index % cardStyles.length]; // Cycle through card styles
          return (
            <div
              key={testimonial.fullname}
              className="backdrop-blur-lg p-6 rounded-xl w-full h-full flex flex-col"
              style={{
                background: style.bg,
                border: `0.5px solid ${style.border}`,
                boxShadow: `0px 0px 17.8px 4.4px ${style.shadow}`,
                minHeight: '220px',
              }}
            >
              <p className="text-[#E5E5E5] font-dmSans text-sm sm:text-base leading-relaxed mb-4 flex-1">
                {testimonial.word}
              </p>
              {testimonial.secondWord && (
                <p className="text-white font-dmSans text-sm leading-relaxed mb-4">
                  {testimonial.secondWord}
                </p>
              )}
              <div className="mt-auto space-y-1">
                <h3 className="font-dmSans font-semibold text-white">{testimonial.fullname}</h3>
                <p className="font-dmSans text-base font-bold text-gray-300">{testimonial.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningCards;
