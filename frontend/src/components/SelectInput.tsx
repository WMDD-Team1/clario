import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    label?: string;
    id?: string;
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder?: string;
    hidden?: boolean;
    disabled?: boolean;
    error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    id,
    options,
    value,
    onChange,
    placeholder = "Select...",
    hidden = false,
    disabled = false,
    error,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (opt: Option) => {
        onChange(opt);
        setOpen(false);
    };

    return (
        <div className={`relative ${hidden && "hidden"} flex-1`} ref={wrapperRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="
            absolute top-[-0.7rem] left-[1rem]
            px-[0.3rem] rounded-[1rem]
            text-[var(--primitive-colors-gray-light-mode-500)]
            bg-[var(--background)]
            z-50
          "
                >
                    {label}
                </label>
            )}

            <div
                className={`
          relative flex rounded-[1rem]
          border-2 border-[var(--sublight)]
          bg-[var(--background)]
          transition-colors
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          focus-within:border-[var(--primitive-colors-brand-primary-500-base)]
        `}
            >
                {/* Botón principal */}
                <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    onClick={() => !disabled && setOpen((prev) => !prev)}
                    className="
            flex w-full items-center justify-between
            p-[1rem] rounded-[0.89rem]
            bg-[var(--background)]
            text-[var(--secondary-text)]
            outline-none
          "
                >
                    <span className={value ? "" : "text-[var(--primitive-colors-gray-light-mode-500)]"}>
                        {value?.label ?? placeholder}
                    </span>

                    <ChevronDown
                    className={`transition-transform duration-200  text-[var(--brand-alpha)] ${open ? "rotate-180" : ""
                        }`}
                />
                </button>

                {/* Dropdown */}
                {open && (
                    <div
                        className="
              absolute left-0 right-0 top-[calc(100%+0.4rem)]
              z-50 overflow-hidden
              bg-[var(--background-toggle2)] rounded-[20px]
              border border-[var(--sublight-2)]
              shadow-md
            "
                    >
                        {options.map((opt) => {
                            const isSelected = opt.value === value?.value;

                            return (
                                <button
                                    type="button"
                                    key={opt.value}
                                    onClick={() => handleSelect(opt)}
                                    className={`
                    w-full text-left px-4 py-3
                    text-[var(--secondary-text)]
                    select-none
                    transition
                    ${isSelected
                                            ? "bg-[var(--primitive-colors-brand-primary-95)]/20"
                                            : "hover:bg-[var(--primitive-colors-brand-primary-95)]/20"
                                        }
                  `}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectInput;
