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
      w-full max-w-[426px] p-5 rounded-[20px]
      bg-white
      shadow-sm hover:shadow-md flex-1
      "
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-blue-600" />
          {title}
        </div>
        <span className="text-xs font-semibold --page-title font-redhat text-[18px] not-italic font-bold leading-normal">{month}</span>
      </div>

      {/* Text Content */}
      <p className="text-sm text-gray-700 leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
