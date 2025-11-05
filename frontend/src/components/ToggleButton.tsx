import React from 'react'

interface Props {
    options: { key: string, label: string }[];
    option: { key: string, label: string };
    onClick: (option: { key: string, label: string }) => void;
}

const ToggleButton = ({ options, option, onClick }: Props) => {
    const [firstOption, secondOption] = options;
    return (
        <div className="relative toggle-view flex rounded-[20px] p-[10px] h-[60px] w-[400px] border-[2px] border-[#E4E7EC] justify-evenly bg-white">
            <button className={`z-2 grow px-4 py-1 text-sm font-medium transition rounded-[15px] ${option.key === firstOption.key
                ? " text-[var(--brand-alpha)]"
                : "text-[var(--primitive-colors-gray-light-mode-400)]"
                }`} onClick={() => onClick(firstOption)}>{firstOption.label}</button>
            <button className={`z-2 grow px-4 py-1 text-sm font-medium transition rounded-[15px] ${option.key === secondOption.key
                ? "text-[var(--brand-alpha)]"
                : "text-[var(--primitive-colors-gray-light-mode-400)]"
                }`} onClick={() => onClick(secondOption)}>{secondOption.label}</button>

                <div className={`transition-all w-[45%] h-[35px] bg-[var(--primitive-colors-gray-light-mode-100)]  absolute z-1 rounded-[15px] left-[3%] ${option.key === firstOption.key ? '' : "translate-x-[109%]"}`}></div>
        </div>
    )
}

export default ToggleButton