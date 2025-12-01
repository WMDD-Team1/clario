import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Option {
    id: string;
    label: string;
}

interface Props {
    options: Option[];
    value: Option;
    className?: string;
    customBg?: string;
    onChange: (option: Option) => void;
}

const SelectionFilter = ({ options, value, className, customBg, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking OUTSIDE trigger + dropdown
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                (triggerRef.current && triggerRef.current.contains(target)) ||
                (dropdownRef.current && dropdownRef.current.contains(target))
            ) {
                // click inside -> do nothing
                return;
            }

            setOpen(false);
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Calculate dropdown position
    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setPos({
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
        });
    };

    useEffect(() => {
        if (open) updatePosition();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handler = () => updatePosition();
        window.addEventListener("resize", handler);
        window.addEventListener("scroll", handler, true);
        return () => {
            window.removeEventListener("resize", handler);
            window.removeEventListener("scroll", handler, true);
        };
    }, [open]);

    const dropdown =
        open &&
        pos &&
        createPortal(
            <div
                ref={dropdownRef}
                style={{
                    position: "fixed",
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    zIndex: 500000,
                }}
                className="
          bg-[var(--background-toggle2)]
          rounded-[20px]
          shadow-lg border border-[var(--sublight-2)]
          overflow-hidden
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
                            onChange(opt);   // ✅ now this runs
                            setOpen(false);
                        }}
                    >
                        {opt.label}
                    </div>
                ))}
            </div>,
            document.body
        );

    return (
        <div ref={triggerRef} className={`relative min-w-[220px] ${className ?? ""}`}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className={`
          w-full flex items-center justify-between
          px-4 py-3 rounded-[20px]
          text-[var(--secondary-text)]
          border border-[var(--sublight-2)]
          ${customBg ? customBg : "bg-[var(--background-toggle2)]"}
          transition
        `}
            >
                {value.label}

                <ChevronDown
                    className={`
            transition-transform duration-200 text-[var(--brand-alpha)]
            ${open ? "rotate-180" : ""}
          `}
                />
            </button>

            {dropdown}
        </div>
    );
};

export default SelectionFilter;
