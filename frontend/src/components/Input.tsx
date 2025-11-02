import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
  borderColor?: string;
  register?: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({
  label,
  color,
  borderColor,
  id,
  register,
  ...props
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute top-[-0.8rem] left-[1rem] ${color} px-[0.3rem] rounded-[1rem]`}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...register}
        {...props}
        className={`w-full p-[1rem] rounded-[1rem] border-2 ${color} ${
          borderColor || "border-neutral-300"
        }`}
      />
    </div>
  );
};

export default Input;
