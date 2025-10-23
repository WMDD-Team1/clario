import React from 'react'

interface Props {
    title: string;
    value: string;
    className?: string;
}

const InsightCard = ({ title, value, className }: Props) => {
    return (
        <div
            key={title}
            className={`bg-linear-to-t bg-white rounded-xl text-center py-6 hover:shadow-md transition ${className}`}
        >
            <p className="text-sm text-[#344054]">{title}</p>
            <p className="text-xl font-semibold mt-1 text-[#0665EC]">{value}</p>
        </div>
    )
}

export default InsightCard