import React from 'react'

interface Props {
    options: { key: string, label: string }[];
    option: { key: string, label: string };
    onClick: (option: { key: string, label: string }) => void;
}

const ToggleButton = ({ options, option, onClick }: Props) => {
    const [firstOption, secondOption] = options;
    return (
        <div className="toggle-view flex rounded-[20px] p-[10px] h-[60px] w-[400px] border-[2px] border-[#E4E7EC] justify-evenly bg-white">
            <button className={`grow px-4 py-1 text-sm font-medium transition rounded-[15px] ${option.key === firstOption.key
                ? "bg-[var(--primitive-colors-gray-light-mode-100)] text-[var(--brand-alpha)]"
                : "text-[var(--primitive-colors-gray-light-mode-400)]"
                }`} onClick={() => onClick(firstOption)}>{firstOption.label}</button>
            <button className={`grow px-4 py-1 text-sm font-medium transition rounded-[15px] ${option.key === secondOption.key
                ? "bg-[var(--primitive-colors-gray-light-mode-100)] text-[var(--brand-alpha)]"
                : "text-[var(--primitive-colors-gray-light-mode-400)]"
                }`} onClick={() => onClick(secondOption)}>{secondOption.label}</button>
        </div>
    )
}

export default ToggleButton