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
                hover:bg-transparent text-white border-white border-2 border-transparent shadow-lg 
                hover:scale-105 transform duration-300"
      title={title}
    >
      <p className="text-sm font-medium tracking-wide">{title}</p>
      <span className="inline-block ml-2 transition-transform transform translate-x-0 group-hover:translate-x-3 duration-300 ease-in-out">
        <Image
          src={ArrowRight}  
          alt="Arrow"
          width={20}              
          height={20}             
          className="object-contain" 
        />
      </span>
    </button>
  )
}

export default Button
