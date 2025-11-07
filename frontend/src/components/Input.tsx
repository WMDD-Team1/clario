import React, { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
  borderColor?: string;
  register?: UseFormRegisterReturn;
  hidden?: boolean;
  children?: React.ReactNode
  padding?: string
  endAdornment?: ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  color,
  borderColor,
  id,
  register,
  children,
  hidden = false,
  padding,
  endAdornment,
  ...props
}) => {
  return (
    <div className={`relative ${hidden && 'hidden'}`}>
      {label && (
        <label
          htmlFor={id}
          className={`absolute top-[-0.8rem] left-[1rem] ${color} px-[0.3rem] rounded-[1rem]`}
        >
          {label}
        </label>
      )}

      <div className={`flex justify-between rounded-[1rem] border-2 ${color} ${padding} ${borderColor || "border-neutral-300"}`}>
        <input
          id={id}
          {...register}
          {...props}
          className="w-full p-[1rem] rounded-[1rem]"
        />
        {endAdornment && (
          <div className="m-2 flex items-center text-[var(--primitive-colors-brand-primary-500-base)]">
            {endAdornment}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Input;
