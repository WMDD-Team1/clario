import { Sparkles } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  month: string;
  text: string;
}
const InsightCard: React.FC<StatCardProps> = ({ title, month, text }) => {
  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
          <Sparkles className="w-3 h-3 text-white" />
          {title}
        </div>
        <span className="text-xs font-semibold text-gray-600">{month}</span>
      </div>
      <p className="text-xs text-gray-600 leading-snug">{text}</p>
    </div>
  );
};

export default InsightCard;
