import React from 'react'

interface Props {
    title: string;
    value: string;
}

const InsightCard = ({ title, value }: Props) => {
    return (
        <div
            key={title}
            className="bg-gray-50 rounded-xl text-center py-6 hover:shadow-md transition"
        >
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
        </div>
    )
}

export default InsightCard