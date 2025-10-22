import React from 'react'

interface Props {
    title: string;
    value: string;
}

const InsightCard = ({ title, value }: Props) => {
    return (
        <div
            key={title}
            className="bg-linear-to-t from-[#0665ECD9] to-[#0665EC] rounded-xl text-center py-6 hover:shadow-md transition text-white grow"
        >
            <p className="text-sm">{title}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
        </div>
    )
}

export default InsightCard