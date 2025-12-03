import React, { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const convertedOptions = options.map((opt) => ({
    id: opt,
    label: opt,
  }));

  const selectedLabel =
    value && convertedOptions.find((o) => o.id === value)?.label
      ? convertedOptions.find((o) => o.id === value)?.label
      : placeHolder || 'Select';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative" ref={ref} style={{ width }}>
      {label && (
        <label
          htmlFor={id}
          className="absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem]
                     text-[var(--primitive-colors-gray-light-mode-500)]
                     bg-[var(--background)] z-10"
        >
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-4 py-3 rounded-[20px]
          border border-[var(--sublight)]
          bg-[var(--background)]
          text-[var(--secondary-text)]
          cursor-pointer
          transition-all
        "
        style={{ color }}
      >
        {selectedLabel}
        <ChevronDown
          className={`w-6 h-6 text-[var(--brand-alpha)] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute left-0 right-0 mt-2
            bg-[var(--background)] rounded-[20px]
            shadow-lg border border-[var(--sublight)]
            overflow-hidden z-50
          "
        >
          {convertedOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`
                px-4 py-3 cursor-pointer select-none
                text-[var(--secondary-text)]
                transition
                ${
                  opt.id === value
                    ? 'bg-[var(--primitive-colors-brand-primary-95)]/20'
                    : 'hover:bg-[var(--primitive-colors-brand-primary-95)]/20'
                }
              `}
            >
              {opt.label}
            </div>
          ))}

          {children}
        </div>
      )}
    </div>
    // <>
    //   <div className="relative">
    //     {label && (
    //       <label
    //         className={`absolute top-[-0.8rem] left-[1rem] px-[0.3rem] rounded-[1rem] text-[var(--primitive-colors-gray-light-mode-500)] bg-[var(--background)]`}
    //         htmlFor={id}
    //       >
    //         {label}
    //       </label>
    //     )}
    //     <select
    //       style={{ width: width }}
    //       className={`p-[1rem] rounded-[1rem] border-2 cursor-pointer bg-[var(--background)] text-[var(--secondary-text)] appearance-none border-[var(--sublight)] focus-within:border-[var(--primitive-colors-brand-primary-500-base)] transition-all focus:outline-none`}
    //       id={id}
    //       value={value}
    //       onChange={(e) => {
    //         onChange(e.target.value);
    //       }}
    //     >
    //       <option value="" disabled>
    //         {placeHolder}
    //       </option>
    //       {options.map((option) => (
    //         <option value={option} key={option}>
    //           {option}
    //         </option>
    //       ))}
    //     </select>
    //     <ChevronDown className="w-[30px] h-[30px] absolute right-[1rem] top-4 pointer-events-none" />
    //     {children}
    //   </div>
    // </>
  );
};

export default Select;
