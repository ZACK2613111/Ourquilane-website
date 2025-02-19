"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import ArrowRightWhite from "../../../public/images/shared/arrow-right-white.svg"

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, title }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}  
      onMouseLeave={() => setIsHovered(false)}
      className="relative font-gabarito px-8 sm:px-12 py-3 sm:py-4 rounded-xl 
                overflow-hidden group hover:scale-105 transform duration-300 
                border-2 border-white/5  bg-transparent"
      title={title}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#9A5CE4]/40 to-[#FADD2A]/40
                   transition-all duration-300 ease-in-out
                   ${isHovered ? 'translate-x-0' : '-translate-x-full'}`}
      />
      
      {/* Content container */}
      <div className="relative flex items-center justify-center gap-2 z-10">
        <span className="text-sm sm:text-base font-medium tracking-wide text-white">
          {title}
        </span>
        <Image
          src={ArrowRightWhite}
          alt="Arrow"
          width={20}
          height={20}
          className="object-contain transition-transform duration-300 group-hover:translate-x-3"
        />
      </div>
    </button>
  )
}

export default Button