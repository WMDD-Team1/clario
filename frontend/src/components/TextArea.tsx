import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  color?: string;
  borderColor?: string;
  register?: UseFormRegisterReturn;
  children?:React.ReactNode
}

const TextArea: React.FC<TextAreaProps> = ({ label, color, borderColor, id, register,children, ...props }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor={id}
        className={`absolute top-[-0.8rem] left-[1rem] ${color} pl-[0.3rem] pr-[0.3rem] rounded-[1rem]`}
      >
        {label}
      </label>
    )}
    <textarea
      id={id}
      {...register}
      {...props}
      className={`p-[1rem] rounded-[1rem] border-2 ${borderColor || 'border-[var(--primitive-colors-gray-light-mode-200)]'} w-full resize-none`}
    />
    {children}
  </div>
);

export default TextArea;