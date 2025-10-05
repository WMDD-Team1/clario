import React from "react";

interface SelectProps {
    id?: string,
    label?: string,
    options: string[],
    value: string,
    onChange: (value: string) => void;

}

const Select: React.FC<SelectProps> = ({id, label, options, value, onChange})=>{
    return(
        <>
        {label && <label htmlFor={id}>{label}</label>}
        <select id={id} value={value} onChange={e=>{onChange(e.target.value)}}>
            <option value="">-- Please select --</option>
            {options.map((option)=>(
                <option value={option}>
                    {option}
                </option>
            ))}

        </select>
        </>
    )
};


export default Select;