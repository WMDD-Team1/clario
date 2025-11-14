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
      w-full lg:max-w-[426px] p-5 rounded-[20px]
      bg-[var(--general-alpha)]
      shadow-sm hover:shadow-md flex-1
      "
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <span className="font-['Red_Hat_Display'] text-lg text-[var(--page-subtitle)] not-italic font-bold leading-normal">{month}</span>
        <div className="flex items-center gap-2 text-[var(--brand-alpha)] text-base font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-base text-[var(--brand-alpha)]" />
          {title}
        </div>
      </div>

      {/* Text Content */}
      <p className="text-lg text-[var(--primary-text)] leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
