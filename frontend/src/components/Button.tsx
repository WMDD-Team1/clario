import { ReactNode } from "react";
import { colorOptions } from "./style/color";

interface ButtonProps {
  buttonColor: 'lightButton' | 'darkButton' | 'regularButton' | 'deleteButton';
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  width?: string;
  textColor?: string
}

const Button = ({
  children,
  onClick,
  type = "button",
  buttonColor,
  width,
  textColor
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-[1rem] rounded-[1rem] ${colorOptions[buttonColor]} cursor-pointer`}
      style={{width:width, color:textColor}}
    >
      {children}
    </button>
  );
};
export default Button;
