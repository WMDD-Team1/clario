import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: string;
  borderColor?: string
}

const Input: React.FC<InputProps> = ({ label,color,borderColor, id, ...props }) => (
  <div className='relative'>
    {label && <label htmlFor={id} className={`absolute top-[-.8rem] left-[1rem] ${color} pl-[.3rem] pr-[.3rem] rounded-[1rem]`}>{label}</label>}
    <input id={id} {...props} className={`p-[1rem] rounded-[1rem] border-2 ${color} w-full`} />
  </div>
);

export default Input;
