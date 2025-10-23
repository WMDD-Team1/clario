interface Props {
    currentFilter: string;
    filters: string[]
    onFilter: (filter: string) => void;
}

const SwitchTab = ({ currentFilter, filters, onFilter }: Props) => {
    return (
        <div className="flex bg-white rounded-[20px] p-1 justify-between w-full md:w-[520px]">
            {filters.map((label) => (
                <button
                    key={label}
                    className={`grow px-4 py-2 rounded-[20px] text-sm transition ${label === currentFilter ? "bg-[#A7C8F7] text-[#023DCA]" : "text-[#5B5B5B] hover:bg-[#A7C8F7]"
                        }`}
                    onClick={() => onFilter(label)}>
                    {label}
                </button>
            ))}
        </div>
    )
}

export default SwitchTab