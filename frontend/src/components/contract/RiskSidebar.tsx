import { RiskWithId } from '@api/index';
import React from 'react'
import { IHighlight } from 'react-pdf-highlighter'
import RiskCard from './RiskCard';

interface Props {
    highlights: IHighlight[];
    risks: RiskWithId[];
}






const RiskSidebar = ({ highlights, risks }: Props) => {
    const grouped = risks.reduce<Record<string, RiskWithId[]>>(
        (acc, r) => {
            if (!acc[r.category]) acc[r.category] = [];
            acc[r.category].push(r);
            return acc;
        },
        {}
    );

    if (risks.length === 0) {
        return (
            <div className="text-gray-500">
                No risks found.
            </div>
        );
    }
    return (
        <>
            <div className='flex flex-col gap-5 ml-5'>
                <h3 className='text-center text-[24px] font-medium sticky top-0 bg-[#f5f9ff]'>
                    Possible Risks
                </h3>
                <div className='flex flex-col gap-5'>
                    {Object.entries(grouped).map(([category, risks], index) => (
                        <div
                            key={index}
                        >
                            <RiskCard category={category} risks={risks} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default RiskSidebar