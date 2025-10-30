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
        w-[426px] p-5 rounded-[20px]
        bg-[#FFFFFF] gap-5
        shadow-[0_40px_11px_0_rgba(0,0,0,0),_0_25px_10px_0_rgba(0,0,0,0.01),_0_14px_9px_0_rgba(0,0,0,0.02),_0_6px_6px_0_rgba(0,0,0,0.04),_0_2px_3px_0_rgba(0,0,0,0.04)]
      "
    >
      {/* Header Row */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-blue-600" />
          {title}
        </div>
        <span className="text-xs font-semibold text-gray-600">{month}</span>
      </div>

      {/* Text Content */}
      <p className="text-sm text-gray-700 leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
