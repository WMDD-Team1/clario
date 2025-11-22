import React from 'react'

interface Props {
    options: { key: string, label: string }[];
    option: { key: string, label: string };
    onClick: (option: { key: string, label: string }) => void;
}

const ToggleButton = ({ options, option, onClick }: Props) => {
    const [firstOption, secondOption] = options;
    return (
        <div className="relative toggle-view flex rounded-[20px] p-[10px] h-[60px] w-[100%] sm:w-[400px] border-[2px] border-[var(--sublight)] justify-evenly bg-[var(--general-alpha)]">
            <button
                className={`font-['Red_Hat_Display'] text-[18px] z-2 grow px-4 py-1 transition rounded-[15px] ${
                    option.key === firstOption.key
                        ? "text-[var(--text-alpha)]"
                        : "text-[var(--outlined-icon)]"
                }`}
                onClick={() => onClick(firstOption)}
            >
                {firstOption.label}
            </button>

            <button
                className={`font-['Red_Hat_Display'] text-[18px] z-2 grow px-4 py-1 transition rounded-[15px] ${
                    option.key === secondOption.key
                        ? "text-[var(--text-alpha)]"
                        : "text-[var(--primitive-colors-gray-light-mode-400)]"
                }`}
                onClick={() => onClick(secondOption)}
            >
                {secondOption.label}
            </button>

            {/* highlight */}
            <div
                className={`
                    absolute inset-y-0
                    top-[5px] bottom-[5px] left-[5px] w-[calc(50%-5px)]
                    md:top-[10px] md:bottom-[10px] md:left-[10px] md:w-[calc(50%-10px)]
                    rounded-[15px]
                    bg-[var(--tab-background)]
                    transition-all duration-300
                    ${option.key === secondOption.key ? "translate-x-[100%]" : "translate-x-0"}
                `}
            />
        </div>
    );
};

export default ToggleButton;
