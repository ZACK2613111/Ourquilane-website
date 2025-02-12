import React from 'react';

interface ButtonProps {
  handleClick: () => void;
  title: string;
}

const WhiteButton : React.FC<ButtonProps> = ({ handleClick, title }) => (
  <button
    onClick={handleClick}
    className="font-neueGraphica px-10 py-4 rounded-full bg-white text-black
              hover:bg-gray-100 transition-colors duration-200 text-sm"
  >
    {title}
  </button>
)

export default WhiteButton;