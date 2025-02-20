import React from 'react';

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const WhiteButton : React.FC<ButtonProps> = ({ handleClick, title }) => (
  <button
  type='button'
    onClick={handleClick}
    className="font-gabarito px-8 py-3 rounded-full bg-white text-black
              hover:bg-gray-100 transition-colors duration-200 text-base font-bold"
  >
    {title}
  </button>
)

export default WhiteButton;