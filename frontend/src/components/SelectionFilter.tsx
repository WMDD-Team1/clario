import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    id: string;
    label: string;
}

interface Props {
    options: Option[];
    value: Option;
    className?: string;
    onChange: (option: Option) => void;
}

const SelectionFilter = ({ options, value, className, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative min-w-[220px]" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full flex items-center justify-between
                    px-4 py-3 rounded-[20px]
                    text-[var(--secondary-text)]
                    border border-[var(--sublight-2)]
                    bg-[var(--background-toggle2)]
                    transition
                "
            >
                {value.label}

                <ChevronDown
                    className={`transition-transform duration-200  text-[var(--brand-alpha)] ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute left-0 right-0 mt-2
                        bg-[var(--background-toggle2)] rounded-[20px]
                        shadow-lg border border-[var(--sublight-2)]
                        overflow-hidden z-50
                    "
                >
                    {options.map((opt) => (
                        <div
                            key={opt.id}
                            className={`
                                px-4 py-3 cursor-pointer select-none
                                text-[var(--secondary-text)]
                                transition
                                ${opt.id === value.id
                                    ? "bg-[var(--primitive-colors-brand-primary-95)]/20"
                                    : "hover:bg-[var(--primitive-colors-brand-primary-95)]/20"
                                }
                            `}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectionFilter;
