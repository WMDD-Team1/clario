import React from 'react';
import { colorOptions } from './style/color';

interface ButtonProps {
  style: 'lightButton' | 'darkButton' | 'regularButton';
  buttonName: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  width?:string;
}

const Button: React.FC<ButtonProps> = ({ style, buttonName, type, onClick, width }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-[1rem] rounded-[1rem] ${colorOptions[style]} w-[${width}]`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
