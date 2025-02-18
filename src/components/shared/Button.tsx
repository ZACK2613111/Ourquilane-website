'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ArrowRightWhite from "../../../public/images/shared/arrow-right-white.svg"
// import ArrowRightBlack from "../../../public/images/shared/arrow-right-black.svg"

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
      className="relative font-gabarito px-12 py-4 mx-4 rounded-lg flex items-center
                overflow-hidden border-white border-2 group hover:scale-105 transform duration-300
                bg-transparent"
      title={title}
    >
      {/* Gradient background that slides in on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#9747FF] to-[#E9CD2A]/20
                   transition-all duration-300 ease-in-out
                   ${isHovered ? '-translate-x-0' : '-translate-x-full'}`}
      />
      
      {/* Content container */}
      <div className="relative flex items-center z-10">
        <p className={`text-base font-medium tracking-wide transition-colors duration-300 text-white`}>
          {title}
        </p>
        <span className="inline-block ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-3">
          <Image
            src={ArrowRightWhite}
            alt="Arrow"
            width={20}
            height={20}
            className="object-contain transition-all duration-300"
          />
        </span>
      </div>
    </button>
  )
}

export default Button
