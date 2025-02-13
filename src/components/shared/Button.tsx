import React from 'react'
import Image from 'next/image'
import ArrowRight from "../../../public/images/shared/arrow-right.svg"

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, title }) => {
  return (
    <button
      onClick={handleClick}
      className="font-neueGraphica px-10 py-4 rounded-full flex items-center gap-2 transition-all 
                hover:bg-white text-white border-white border-2 border-transparent shadow-lg 
                hover:scale-105 transform duration-300 hover:text-black"
      title={title}
    >
      <p className="text-sm font-medium tracking-wide transition-colors duration-300 hover:text-black">
        {title}
      </p>
      <span className="inline-block ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-3">
        <Image
          src={ArrowRight}  
          alt="Arrow"
          width={20}              
          height={20}             
          className="object-contain transition-colors duration-300 hover:text-black" 
        />
      </span>
    </button>
  )
}

export default Button
