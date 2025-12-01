import React from 'react';

interface Props {
  title: string;
  value: string | number;
  className?: string;
}

const InsightCard = ({ title, value, className }: Props) => {
  return (
    <div
      key={title}
      className={`bg-linear-to-t bg-[var(--general-alpha)] rounded-xl text-center py-6 transition ${className}`}
    >
      <p className="text-base font-normal text-[var(--tertiary-text)]">{title}</p>
      <p className="text-2xl font-medium mt-1 text-[var(--brand-alpha)]">{value}</p>
    </div>
  );
};

export default InsightCard;
