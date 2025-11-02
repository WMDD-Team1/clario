import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Action {
    id: string;
    label: string;
    action: () => void;
}

interface ActionMenuProps {
    actions: Action[];
    direction: "horizontal" | "vertical";
}

const ActionMenu: React.FC<ActionMenuProps> = ({ actions, direction }: ActionMenuProps) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    if (actions.length === 0) return null;

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!buttonRef.current?.contains(e.target as Node) &&
                !menuRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Calculate dropdown position when opened
    useEffect(() => {
        if (open && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom,
                left: rect.right - 160,
            });
        }
    }, [open]);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                ref={buttonRef}
                className="p-1 rounded-full hover:bg-[var(--primitive-colors-brand-primary-025)] transition"
            >
                {direction === "horizontal" ?
                    <MoreHorizontal
                        size={18}
                        className="text-[var(--primitive-colors-gray-light-mode-500)]" /> :
                    <MoreVertical
                        size={18}
                        className="text-[var(--primitive-colors-gray-light-mode-500)]" />}
            </button>

            {open && createPortal(
                <div ref={menuRef} className="absolute right-0 mt-2 w-[160px] bg-[var(--general-alpha)] rounded-2xl shadow-md border border-[var(--primitive-colors-gray-light-mode-200)] overflow-hidden z-50"
                    style={{ position: "fixed", top: coords.top, left: coords.left }}>
                    {actions.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                item.action();
                                setOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm text-[var(--primitive-colors-gray-light-mode-600)] hover:bg-[var(--sublight)] hover:text-[var(--tertiary-text)] transition`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default ActionMenu;
