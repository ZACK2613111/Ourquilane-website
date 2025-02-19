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
      className="relative font-gabarito px-8 sm:px-12 py-3 sm:py-4 rounded-xl
                overflow-hidden group hover:scale-105 transform duration-300
                border-2 border-white/5 bg-transparent"
      title={title}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9747FF]/10 to-[#E9CD2A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-0" />
      
      {/* Content container */}
      <div className="relative flex items-center justify-center space-x-2 z-10">
        <span className="text-white font-medium tracking-wide">
          {title}
        </span>
        <div className={`relative transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
          <Image src={ArrowRightWhite} alt="Arrow Right" width={18} height={18} />
        </div>
      </div>
    </button>
  );
};

export default Button;