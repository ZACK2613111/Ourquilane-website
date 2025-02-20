"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ArrowRightWhite from "../../../public/images/shared/arrow-right-white.svg";

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-xs sm:max-w-sm font-gabarito px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-xl
                overflow-hidden group hover:scale-105 transform duration-300
                border border-white/20 bg-gradient-to-r from-[#9747FF]/5 to-[#E9CD2A]/5"
      title={title}
    >
      <div className="flex items-center justify-center space-x-2">
        <span className="text-white text-sm sm:text-base md:text-lg font-medium">
          {title}
        </span>
        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
          <Image
            src={ArrowRightWhite}
            alt="Arrow Right"
            layout="fill"
            className={`transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          />
        </div>
      </div>
    </button>
  );
};

export default Button;