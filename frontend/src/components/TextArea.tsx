import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  color?: string;
  borderColor?: string;
  register?: UseFormRegisterReturn;
  children?: React.ReactNode;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  color,
  borderColor,
  id,
  register,
  children,
  ...props
}) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={id}
        className={`absolute top-[-0.8rem] text-[var(--primitive-colors-gray-light-mode-500)] left-[1rem] bg-[var(--background)] pl-[0.3rem] pr-[0.3rem] rounded-[1rem]`}
      >
        {label}
      </label>
    )}
    <textarea
      id={id}
      {...register}
      {...props}
      className={`text-[var(--secondary-text)] p-[1rem] rounded-[1rem] border-2 border-[var(--sublight)] bg-[var(--background)] w-full resize-none focus-within:border-[var(--primitive-colors-brand-primary-500-base)] transition-all focus:outline-none`}
    />
    {children}
  </div>
);

export default TextArea;
