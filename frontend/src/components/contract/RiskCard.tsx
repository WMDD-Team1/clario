import { RiskWithId } from '@api/index'
import React from 'react'

interface Props {
    category: string;
    risks: RiskWithId[];
}

const updateHash = (highlightId: string) => {
    document.location.hash = `highlight-${highlightId}`;
};

const RiskCard = ({ category, risks }: Props) => {
    const severityColors: Record<RiskWithId["riskLevel"], string> = {
        High: "bg-[var(--primitive-colors-error-100)] text-[var(--primitive-colors-error-600)]",
        Medium: "bg-[var(--primitive-colors-warning-100)] text-[var(--primitive-colors-warning-700)]",
        Low: "bg-[var(--primitive-colors-success-100)] text-[var(--primitive-colors-success-700)]",
    };

    return (
        <div className="bg-[var(--primitive-colors-gray-light-mode-0)] rounded-2xl p-4 border border-[var(--primitive-colors-gray-light-mode-200)] shadow-sm w-full max-w-sm cursor-pointer">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[17px] font-semibold text-[var(--primitive-colors-gray-light-mode-950)]">
                    {category}
                </h3>
                <span className="bg-[var(--primitive-colors-brand-primary-500-base)] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {risks.length}
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {risks.map((risk, index) => (
                    // <div key={index} onClick={() => updateHash(risk.id)}>
                    <div key={index}>
                        <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColors[risk.riskLevel]}`}
                        >
                            {risk.riskLevel}
                        </span>
                        <p className="text-[var(--primitive-colors-gray-light-mode-900)] text-sm mt-1 leading-snug">
                            Issue: {risk.reason}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RiskCard