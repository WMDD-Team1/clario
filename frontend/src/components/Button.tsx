import { ReactNode } from "react";
import { colorOptions } from "./style/color";

interface ButtonProps {
  buttonColor: 'lightButton' | 'darkButton' | 'regularButton' | 'deleteButton' | "white";
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  width?: string;
  textColor?: string
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  buttonColor,
  width,
  textColor,
  disabled=false
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`p-[1rem] rounded-[1rem] ${colorOptions[buttonColor]} cursor-pointer`}
      style={{width:width, color:textColor}}
    >
      {children}
    </button>
  );
};
export default Button;
