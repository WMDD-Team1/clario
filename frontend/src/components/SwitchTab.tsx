interface Props {
    currentFilter: string;
    filters: string[]
    onFilter: (filter: string) => void;
}

const SwitchTab = ({ currentFilter, filters, onFilter }: Props) => {
    return (
        <div className="flex bg-white rounded-[20px] justify-between w-full md:w-[520px] h-[60px]">
            {filters.map((label, idx) => {
                const isActive = label === currentFilter;
                const isFirst = idx === 0;
                const isLast = idx === filters.length - 1;

                return (
                    <button
                        key={label}
                        className={`
                            overflow-hidden grow px-4 py-2 transition
                            ${isActive ? "bg-[var(--background-alternate)] text-[var(--brand-subtext)]" : "text-[var(--sub-text)]"}
                            ${isActive && isFirst ? "rounded-l-[15px]" : ""}
                            ${isActive && isLast ? "rounded-r-[15px]" : ""}
                            `}
                        onClick={() => onFilter(label)}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    )
}

export default SwitchTab;