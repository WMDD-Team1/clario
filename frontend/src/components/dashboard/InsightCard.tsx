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
      bg-white
      shadow-sm hover:shadow-md flex-1
      "
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <span className="text-xs --page-title font-redhat text-[18px] not-italic font-bold leading-normal">{month}</span>
        <div className="flex items-center gap-2 text-blue-600 text-[16px] font-medium px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-[16px] text-blue-600" />
          {title}
        </div>
      </div>

      {/* Text Content */}
      <p className="text-[1rem] text-gray-700 leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
