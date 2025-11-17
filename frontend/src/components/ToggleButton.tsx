import React from 'react'

interface Props {
    options: { key: string, label: string }[];
    option: { key: string, label: string };
    onClick: (option: { key: string, label: string }) => void;
}

const ToggleButton = ({ options, option, onClick }: Props) => {
    const [firstOption, secondOption] = options;
    return (
        <div className="relative toggle-view flex rounded-[20px] md:w-[400px] h-[60px] w-full border-[2px] border-[#E4E7EC] bg-white">

            {/* highlight */}
            <div
                className={`
                absolute 
                inset-y-0 w-1/2
                md:top-[10px] md:bottom-[10px] md:left-[10px] md:w-[calc(50%-10px)]
                rounded-[15px]
                bg-[var(--brand-alpha)]
                md:bg-[var(--tab-background)]
                transition-all duration-300
                ${option.key === secondOption.key ? "translate-x-[100%]" : "translate-x-0"}
            `}
            />

            <button
                className={`relative z-10 grow text-[18px] md:pl-[10px] py-1 transition rounded-[15px]
                ${option.key === firstOption.key
                        ? "text-[var(--text-alpha)]"
                        : "text-[var(--primitive-colors-gray-light-mode-400)]"}`}
                onClick={() => onClick(firstOption)}
            >
                {firstOption.label}
            </button>

            <button
                className={`relative z-10 grow text-[18px] md:pr-[10px] py-1 transition rounded-[15px] 
      ${option.key === secondOption.key
                        ? "text-[var(--text-alpha)]"
                        : "text-[var(--primitive-colors-gray-light-mode-400)]"}`}
                onClick={() => onClick(secondOption)}
            >
                {secondOption.label}
            </button>
        </div>
    )
}

export default ToggleButton