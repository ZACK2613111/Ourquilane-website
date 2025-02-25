"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ArrowRightWhite from "../../../public/images/shared/arrow-right-white.svg";

interface ButtonProps {
  handleClick: () => void;
  title: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, title, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full font-gabarito px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl
                overflow-hidden group hover:scale-105 transform duration-300
                border border-white/20 relative hover:bg-transparent ${className}`}
      title={title}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow to-violet
                    transform transition-all duration-500 ease-in-out origin-left
                    ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
      ></div>

      <div className="flex items-center justify-center space-x-2 relative z-10">
        <span className="text-white text-[13px] sm:text-[15px] md:text-base font-medium whitespace-nowrap">
          {title}
        </span>
        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
          <Image
            src={ArrowRightWhite}
            alt="Arrow Right"
            fill
            className={`transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
            priority
          />
        </div>
      </div>
    </button>
  );
};

export default Button;