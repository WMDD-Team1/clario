import React, { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
  borderColor?: string;
  register?: UseFormRegisterReturn;
  hidden?: boolean;
  children?: React.ReactNode;
  padding?: string;
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
    <div className={`relative ${hidden && 'hidden'} flex-1`}>
      {label && (
        <label
          htmlFor={id}
          className={`absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem] text-[var(--primitive-colors-gray-light-mode-500)] bg-[var(--primitive-colors-gray-light-mode-25)]`}
        >
          {label}
        </label>
      )}

      <div
        className={`flex justify-between rounded-[1rem] border-[var(--primitive-colors-gray-light-mode-200)] border-2 ${color} ${padding}`}
      >
        <input
          id={id}
          {...register}
          {...props}
          className={`w-full p-[1rem] rounded-[0.89rem] bg-[var(--background)] text-[var(--secondary-text)]`}
        />
        {endAdornment && (
          <div className="m-2 flex items-center text-[var(--brand-beta)]">{endAdornment}</div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Input;
