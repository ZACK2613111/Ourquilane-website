import React from 'react'
import Image from 'next/image'
import ArrowRounded from "../../../public/images/shared/arrow-rounded.svg"

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, title }) => {
  return (
    <button
      onClick={handleClick}
      className="font-gabarito px-5 py-3 rounded-xl flex items-center gap-2
                text-white  border-2 border-white/5  bg-transparent shadow-md 
                transform duration-300"
      title={title}
    >
      <p className="text-base font-medium tracking-wide">{title}</p>
      <span className="inline-block ml-2 ">
        <Image
          src={ArrowRounded}  
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
