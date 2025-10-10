import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div className='relative'>
    {label && <label htmlFor={id} className='absolute top-[-.8rem] left-[1rem] bg-white pl-[.3rem] pr-[.3rem] rounded-[1rem]'>{label}</label>}
    <input id={id} {...props} className='p-[1rem] rounded-[1rem] border-2 border-black w-full' />
  </div>
);

export default Input;
