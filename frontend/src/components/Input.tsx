import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div>
    {label && <label htmlFor={id}>{label}</label>}
    <input id={id} {...props} />
  </div>
);

export default Input;
