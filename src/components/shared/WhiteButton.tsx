import React from 'react';

interface ButtonProps {
  handleClick: () => void;
  title: string;
  href?: string;
}

const WhiteButton: React.FC<ButtonProps> = ({ handleClick, title, href }) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    handleClick();
  };

  return (
    <span
      onClick={handleButtonClick}
      className="font-gabarito px-3 py-2 rounded-full bg-white text-black
                hover:bg-gray-100 transition-colors duration-200 text-sm font-semibold"
    >
      {title}
    </span>
  );
};

export default WhiteButton;