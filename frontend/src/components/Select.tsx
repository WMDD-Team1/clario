import React from "react";

interface SelectProps {
    id?: string,
    label?: string,
    options: string[],
    value: string,
    onChange: (value: string) => void;
    color: string
    width?: string
    placeHolder?:string

}

const Select: React.FC<SelectProps> = ({id, label, options, value, onChange,color, width,placeHolder})=>{
    return(
        <>
        <div className="relative">
        {label && <label className={`absolute top-[-.8rem] left-[1rem] pl-[.3rem] pr-[.3rem] rounded-[1rem] ${color}`} htmlFor={id}>{label}</label>}
        <select style={{width: width}} className={`p-[1rem] rounded-[1rem] border-2 cursor-pointer border-neutral-300`} id={id} value={value} onChange={e=>{onChange(e.target.value)}}>
            <option value="" disabled>{placeHolder}</option>
            {options.map((option)=>(
                <option value={option} key={option}>
                    {option}
                </option>
            ))}

        </select>
        </div>
        </>
    )
};


export default Select;