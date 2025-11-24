import React, { Children } from 'react';
import { ChevronDown } from '@assets/icons';

interface SelectProps {
  id?: string;
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  color: string;
  width?: string;
  placeHolder?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  color,
  width,
  placeHolder,
  children,
}) => {
  return (
    <>
      <div className="relative">
        {label && (
          <label
            className={`absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem] text-[var(--sub-text)] bg-[var(--background)]`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <select
          style={{ width: width }}
          className={`p-[1rem] rounded-[1rem] border-2 cursor-pointer bg-[var(--background)] text-[var(--secondary-text)] appearance-none border-[var(--background-alternate)]`}
          id={id}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        >
          <option value="" disabled>
            {placeHolder}
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="w-[30px] h-[30px] absolute right-[1rem] top-4 pointer-events-none" />
        {children}
      </div>
    </>
  );
};

export default Select;
