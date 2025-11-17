interface Props {
    className: string;
    options: { id: string; label: string }[];
    selectedValue: { id: string; label: string }
    onSelect: (option: { id: string; label: string }) => void;
}

const SelectionFilter = ({ className, options, selectedValue, onSelect }: Props) => {
    return (
        <select onChange={(e) => {onSelect(options.find(option => option.id === e.target.value)!)}} value={selectedValue.id}
            className={`border border-gray-300 text-sm rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none ${className}`}>
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
            ))}
        </select>
    )
}

export default SelectionFilter;