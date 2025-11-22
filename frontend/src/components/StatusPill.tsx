import React from "react";

interface StatusPillProps {
    status: "Active" | "Draft" | "Archived";
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    const styles = {
        Active: "bg-[#DBFAE6] text-[var(--success-contrast1)]",
        Draft: "bg-[#FEEFC7] text-[var(--warning-contrast1)]",
        Archived: "bg-[#4C4C4C26] text-[#575757]",
    }[status];

    return (
        <span
            className={`ml-3 inline-block px-[16px] py-[4px] font-medium rounded-full ${styles}`}
        >
            {status}
        </span>
    );
};

export default StatusPill;
