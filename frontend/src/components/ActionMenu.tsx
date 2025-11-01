import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, MoreVertical } from 'lucide-react';

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

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
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

            {open && (
                <div className="absolute right-0 mt-2 w-[160px] bg-[var(--general-alpha)] rounded-2xl shadow-md border border-[var(--primitive-colors-gray-light-mode-200)] overflow-hidden z-50">
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
                </div>
            )}
        </div>
    );
};

export default ActionMenu;
