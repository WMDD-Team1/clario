import { Sparkles } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  month: string;
  text: string;
}

const InsightCard: React.FC<StatCardProps> = ({ title, month, text }) => {
  return (
    <div
      className="
      flex flex-col items-start gap-5
      w-full  p-5 rounded-[20px]
      bg-[var(--general-alpha)] border
      border-[var(--sublight-2)] hover:shadow-md flex-1">
      {/* Header Row */}
      <div className="flex justify-between gap-1 items-center w-full">
        <span className="font-['Red_Hat_Display'] text-[1.125rem] text-[var(--page-subtitle)] not-italic font-bold leading-normal">{month}</span>
        <div className="flex items-center gap-2 text-[var(--primitive-colors-brand-primary-500-base)] text-[1.125rem] font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-[1.125rem] text-[var(--primitive-colors-brand-primary-500-base)]" />
          {title}
        </div>
      </div>
      {/* Text Content */}
      <p className="text-[1rem] text-[var(--primary-text)] leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
