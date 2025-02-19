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
      className="w-72 font-gabarito px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-xl
                overflow-hidden group hover:scale-105 transform duration-300
                border border-white/20 bg-gradient-to-r from-[#9747FF]/5 to-[#E9CD2A]/5"
      title={title}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#9747FF]/20 to-[#E9CD2A]/20 blur-md opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#9747FF]/10 to-[#E9CD2A]/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500 rounded-xl z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full 
                    group-hover:translate-x-full transition-all duration-1000 ease-in-out z-0" />
      
      <div className="relative flex items-center justify-center space-x-2 z-10">
        <span className="text-white font-medium text-sm sm:text-base tracking-wide">
          {title}
        </span>
        <div className={`relative transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
          <Image src={ArrowRightWhite} alt="Arrow Right" width={16} height={16} priority/>
        </div>
      </div>
    </button>
  );
};

export default Button;